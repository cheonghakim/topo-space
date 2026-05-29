import * as THREE from 'three'
import type { DeviceType } from '@/types'
import type { DeviceRenderer } from '@/renderers/DeviceRenderer'
import type { SpaceRenderer }  from '@/renderers/SpaceRenderer'
import type { LinkRenderer }   from '@/renderers/LinkRenderer'

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

    // 0. 링크 핸들 (가장 우선, 가시 상태인 것만)
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

    // 1. 장비 InstancedMesh
    const meshes = this.deviceRenderer.getInstancedMeshes()
    const devHits = this.raycaster.intersectObjects(meshes, false)

    // 2. 공간 hit
    const spaceHits = this.raycaster.intersectObjects(this.spaceRenderer.getHitMeshes(), false)

    // 거리 기반 우선순위:
    //   카메라가 멀 때(거리 > 60) 장비 hit이 있어도 그 장비의 공간을 우선
    //   가까울 때(거리 ≤ 60)는 장비를 직접 선택
    if (devHits.length > 0) {
      const dist = devHits[0].distance
      const hit  = devHits[0]
      const type = hit.object.userData.deviceType as DeviceType
      const id   = this.deviceRenderer.getDeviceIdByInstance(type, hit.instanceId!)

      // 카메라 멀고 같은 위치에 공간 hit이 있으면 공간(랙) 우선
      // (작은 장비는 멀리서 클릭하기 어려우므로 랙을 선택해 좌측 목록을 띄움)
      // preferDevice(링크 도구)일 때는 항상 장비 우선
      if (!preferDevice && dist > 35 && spaceHits.length > 0) {
        return {
          spaceId:  spaceHits[0].object.userData.spaceId as string,
          worldPos: spaceHits[0].point,
          hitDistance: spaceHits[0].distance,
        }
      }

      if (id) return { deviceId: id, worldPos: hit.point, hitDistance: dist }
    }

    // 3. 링크 라인 (공간 floor보다 우선 — 큰 floor에 가려지지 않도록)
    const linkId = this.linkRenderer.pickLink(this.raycaster)
    if (linkId) return { linkId }

    // 4. 공간 (rack/zone/site)
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
