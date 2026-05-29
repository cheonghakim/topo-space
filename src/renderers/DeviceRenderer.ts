import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import type { RawDevice, DeviceMapping, DeviceType, DeviceStatus } from '@/types'
import { STATUS_COLOR_THREE, DEVICE_TYPE_COLOR } from '@/utils/colorUtils'
import { getDeviceGeometry } from '@/utils/geometryFactory'

const _matCache = new Map<DeviceType, THREE.MeshStandardMaterial>()

function getMaterial(type: DeviceType): THREE.MeshStandardMaterial {
  if (!_matCache.has(type)) {
    _matCache.set(type, new THREE.MeshStandardMaterial({
      color: new THREE.Color(DEVICE_TYPE_COLOR[type]),
      roughness: 0.35,
      metalness: 0.65,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0,
    }))
  }
  return _matCache.get(type)!
}

interface DeviceObject3D {
  mesh: THREE.Mesh
  label: CSS2DObject
  labelEl: HTMLDivElement
  deviceId: string
  type: DeviceType
  status: DeviceStatus
}

export class DeviceRenderer {
  private scene: THREE.Scene
  private objects = new Map<string, DeviceObject3D>()
  private dummy   = new THREE.Object3D()

  private instancedMeshes = new Map<DeviceType, THREE.InstancedMesh>()
  private instanceIndex   = new Map<string, { type: DeviceType; idx: number }>()
  private instanceColors  = new Map<string, THREE.Color>()
  private statusMap       = new Map<string, DeviceStatus>()
  private dimmedIds       = new Set<string>()

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }


  loadInstanced(
    devices: RawDevice[],
    mappings: Map<string, DeviceMapping>,
    getMappingByDeviceId: (id: string) => DeviceMapping | undefined,
  ) {
    const byType = new Map<DeviceType, { device: RawDevice; mapping: DeviceMapping }[]>()
    devices.forEach(dev => {
      const m = getMappingByDeviceId(dev.id)
      if (!m || !m.position || m.mappingStatus === 'unmapped') return
      const type = dev.normalizedType ?? 'unknown'
      if (!byType.has(type)) byType.set(type, [])
      byType.get(type)!.push({ device: dev, mapping: m })
    })

    byType.forEach((items, type) => {
      const geo = getDeviceGeometry(type)
      const mat = getMaterial(type).clone()
      mat.vertexColors = false
      const mesh = new THREE.InstancedMesh(geo, mat, items.length + 50)
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      mesh.count = items.length
      mesh.userData.deviceType = type

      items.forEach((item, i) => {
        const pos = item.mapping.position!
        this.dummy.position.set(pos.x, pos.y, pos.z)
        this.dummy.rotation.set(0, 0, 0)
        this.dummy.scale.setScalar(1)
        this.dummy.updateMatrix()
        mesh.setMatrixAt(i, this.dummy.matrix)
        const status = item.device.status ?? 'unknown'
        const color = STATUS_COLOR_THREE[status]
        mesh.setColorAt(i, color)
        this.instanceIndex.set(item.device.id, { type, idx: i })
        this.instanceColors.set(item.device.id, color.clone())
        this.statusMap.set(item.device.id, status)
        mesh.userData[`device_${i}`] = item.device.id
      })

      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
      this.instancedMeshes.set(type, mesh)
      this.scene.add(mesh)
    })
  }

  updateStatus(deviceId: string, status: DeviceStatus) {
    const ref = this.instanceIndex.get(deviceId)
    if (!ref) return
    const mesh  = this.instancedMeshes.get(ref.type)
    if (!mesh) return
    this.statusMap.set(deviceId, status)
    let color = STATUS_COLOR_THREE[status].clone()
    if (this.dimmedIds.size > 0 && !this.dimmedIds.has(deviceId)) {
      color = color.clone().multiplyScalar(0.18)
    } else if (this.dimmedIds.size > 0 && this.dimmedIds.has(deviceId)) {
      color = color.clone().multiplyScalar(2.0)
    }
    mesh.setColorAt(ref.idx, color)
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    this.instanceColors.set(deviceId, color)
  }

  pulseStatus(deviceId: string, status: DeviceStatus, t: number) {
    const ref  = this.instanceIndex.get(deviceId)
    if (!ref) return
    const mesh = this.instancedMeshes.get(ref.type)
    if (!mesh) return
    const base   = STATUS_COLOR_THREE[status].clone()
    const bright = base.clone().multiplyScalar(1 + t * 1.5)
    mesh.setColorAt(ref.idx, bright)
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }

  setHighlight(deviceId: string, on: boolean) {
    const ref   = this.instanceIndex.get(deviceId)
    if (!ref) return
    const mesh  = this.instancedMeshes.get(ref.type)
    if (!mesh) return
    const base  = this.instanceColors.get(deviceId) ?? new THREE.Color(0xffffff)
    const color = on ? base.clone().multiplyScalar(2.4) : base.clone()
    mesh.setColorAt(ref.idx, color)
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }

  // deviceId by instanceId + type
  getDeviceIdByInstance(type: DeviceType, instanceId: number): string | undefined {
    const mesh = this.instancedMeshes.get(type)
    return mesh?.userData[`device_${instanceId}`] as string | undefined
  }

  getInstancedMeshes(): THREE.InstancedMesh[] {
    return [...this.instancedMeshes.values()]
  }

  setPosition(deviceId: string, pos: THREE.Vector3) {
    const ref  = this.instanceIndex.get(deviceId)
    if (!ref) return
    const mesh = this.instancedMeshes.get(ref.type)
    if (!mesh) return
    const mat4 = new THREE.Matrix4()
    mesh.getMatrixAt(ref.idx, mat4)
    mat4.setPosition(pos)
    mesh.setMatrixAt(ref.idx, mat4)
    mesh.instanceMatrix.needsUpdate = true
  }

  applySearchFilter(matchingIds: Set<string>, hasFilter: boolean) {
    if (!hasFilter) {
      this.dimmedIds.clear()
      this.instancedMeshes.forEach((mesh) => {
        for (let i = 0; i < mesh.count; i++) {
          const deviceId = mesh.userData[`device_${i}`] as string
          if (!deviceId) continue
          const status = this.statusMap.get(deviceId)
          if (!status) continue
          const color = STATUS_COLOR_THREE[status].clone()
          mesh.setColorAt(i, color)
          this.instanceColors.set(deviceId, color)
        }
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
      })
      return
    }

    this.dimmedIds = matchingIds
    this.instancedMeshes.forEach((mesh) => {
      for (let i = 0; i < mesh.count; i++) {
        const deviceId = mesh.userData[`device_${i}`] as string
        if (!deviceId) continue
        const isMatch = matchingIds.has(deviceId)
        const status  = this.statusMap.get(deviceId)
        if (!status) continue
        const base = STATUS_COLOR_THREE[status].clone()
        const color = isMatch ? base.clone().multiplyScalar(2.4) : base.clone().multiplyScalar(0.15)
        mesh.setColorAt(i, color)
        this.instanceColors.set(deviceId, color)
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    })
  }

  getDeviceWorldPos(deviceId: string): THREE.Vector3 | null {
    const ref  = this.instanceIndex.get(deviceId)
    if (!ref) return null
    const mesh = this.instancedMeshes.get(ref.type)
    if (!mesh) return null
    const mat4 = new THREE.Matrix4()
    mesh.getMatrixAt(ref.idx, mat4)
    const pos = new THREE.Vector3()
    pos.setFromMatrixPosition(mat4)
    return pos
  }

  dispose() {
    this.instancedMeshes.forEach(mesh => {
      mesh.geometry.dispose()
      ;(mesh.material as THREE.Material).dispose()
      this.scene.remove(mesh)
    })
    this.instancedMeshes.clear()
    this.instanceIndex.clear()
    _matCache.forEach(m => m.dispose())
    _matCache.clear()
  }
}
