import * as THREE from 'three'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'
import type { DeviceType } from '@/types'
import type { DeviceRenderer } from '@/renderers/DeviceRenderer'
import type { SpaceRenderer }  from '@/renderers/SpaceRenderer'
import type { LinkRenderer }   from '@/renderers/LinkRenderer'

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
THREE.Mesh.prototype.raycast = acceleratedRaycast

export interface RaycastResult {
  deviceId?:     string
  spaceId?:      string
  linkId?:       string
  linkHandleId?: string
  worldPos?:     THREE.Vector3
  hitDistance?:  number
}

export class RaycastManager {
  private raycaster = new THREE.Raycaster()
  private pointer   = new THREE.Vector2(-9999, -9999)
  private groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  private lastTime  = 0

  constructor(
    private camera: THREE.Camera,
    private deviceRenderer: DeviceRenderer,
    private spaceRenderer:  SpaceRenderer,
    private linkRenderer:   LinkRenderer,
  ) {}

  updatePointer(e: PointerEvent | MouseEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect()
    this.pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
    this.pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
  }

  get currentPointer(): THREE.Vector2 { return this.pointer.clone() }

  castHover(throttleMs = 30): RaycastResult {
    const now = performance.now()
    if (now - this.lastTime < throttleMs) return {}
    this.lastTime = now
    return this._cast()
  }

  castClick(preferDevice = false): RaycastResult {
    return this._cast(preferDevice)
  }

  getGroundPoint(e: PointerEvent | MouseEvent, canvas: HTMLCanvasElement): THREE.Vector3 | null {
    this.updatePointer(e, canvas)
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const pt = new THREE.Vector3()
    return this.raycaster.ray.intersectPlane(this.groundPlane, pt) ? pt : null
  }

  private _cast(preferDevice = false): RaycastResult {
    this.raycaster.setFromCamera(this.pointer, this.camera)

    const handles = this.linkRenderer.getAllHandles().filter(h => h.visible)
    if (handles.length > 0) {
      const handleHits = this.raycaster.intersectObjects(handles, false)
      if (handleHits.length > 0) {
        return {
          linkHandleId: handleHits[0].object.userData.linkHandleId as string,
          worldPos:     handleHits[0].point,
          hitDistance:  handleHits[0].distance,
        }
      }
    }

    const meshes = this.deviceRenderer.getInstancedMeshes()
    const devHits = this.raycaster.intersectObjects(meshes, false)

    const spaceHits = this.raycaster.intersectObjects(this.spaceRenderer.getHitMeshes(), false)

    if (devHits.length > 0) {
      const dist = devHits[0].distance
      const hit  = devHits[0]
      const type = hit.object.userData.deviceType as DeviceType
      const id   = this.deviceRenderer.getDeviceIdByInstance(type, hit.instanceId!)

      if (!preferDevice && dist > 35 && spaceHits.length > 0) {
        return {
          spaceId:  spaceHits[0].object.userData.spaceId as string,
          worldPos: spaceHits[0].point,
          hitDistance: spaceHits[0].distance,
        }
      }

      if (id) return { deviceId: id, worldPos: hit.point, hitDistance: dist }
    }

    const linkId = this.linkRenderer.pickLink(this.raycaster)
    if (linkId) return { linkId }

    if (spaceHits.length > 0) {
      return {
        spaceId:     spaceHits[0].object.userData.spaceId as string,
        worldPos:    spaceHits[0].point,
        hitDistance: spaceHits[0].distance,
      }
    }

    return {}
  }
}
