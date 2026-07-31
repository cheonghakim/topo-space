import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import type { RawDevice, DeviceMapping, DeviceStatus } from '@/types'
import { STATUS_COLOR_THREE, STATUS_COLOR_HEX, STATUS_ICON, getTypeColor } from '@/utils/colorUtils'
import { getDeviceGeometry, disposeGeometryCache } from '@/utils/geometryFactory'

const _matCache = new Map<string, THREE.MeshStandardMaterial>()

function getMaterial(type: string): THREE.MeshStandardMaterial {
  if (!_matCache.has(type)) {
    _matCache.set(type, new THREE.MeshStandardMaterial({
      color: new THREE.Color(getTypeColor(type)),
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
  type: string
  status: DeviceStatus
}

export class DeviceRenderer {
  private scene: THREE.Scene
  private objects = new Map<string, DeviceObject3D>()
  private dummy   = new THREE.Object3D()

  private instancedMeshes = new Map<string, THREE.InstancedMesh>()
  private instanceIndex   = new Map<string, { type: string; idx: number }>()
  private instanceColors  = new Map<string, THREE.Color>()
  private statusMap       = new Map<string, DeviceStatus>()
  private dimmedIds       = new Set<string>()
  private searchLabels    = new Map<string, CSS2DObject>()

  // Non-color status redundancy — a small icon badge shown above every
  // non-normal device, plus an ack checkmark. Never gated on search/dim state:
  // status must stay legible regardless of what else is happening on screen.
  private statusBadges    = new Map<string, CSS2DObject>()
  private ackedIds        = new Set<string>()

  // The app's font-scale preference deliberately excludes the 3D canvas
  // itself (App.vue zooms chrome only), but that left the two label types
  // this class draws — search-match tags and status badges — stuck at a
  // fixed size even for users who'd bumped text size up for readability.
  // Applied via a separate channel: this multiplier, driven by useNmsEditor's
  // watch on ui.fontScale.
  private labelScale = 1

  private selectionRing: THREE.Mesh | null = null
  private selectedDeviceId: string | null = null

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  // Colorblind-safe redundancy: renders a small icon badge above the device
  // whenever its status isn't 'normal', or it's been acknowledged. Independent
  // of instance color, search dimming, and hover/selection highlight state.
  private _updateBadge(deviceId: string, status: DeviceStatus) {
    const existing = this.statusBadges.get(deviceId)
    if (existing) {
      this.scene.remove(existing)
      existing.element.remove()
      this.statusBadges.delete(deviceId)
    }

    const acked = this.ackedIds.has(deviceId)
    const icon  = STATUS_ICON[status]
    if (!icon && !acked) return

    const pos = this.getDeviceWorldPos(deviceId)
    if (!pos) return

    const el = document.createElement('div')
    el.className = 'device-status-badge'
    el.style.cssText = `
      display:flex; align-items:center; gap:3px;
      background:rgba(15,23,42,.92); border:1px solid ${STATUS_COLOR_HEX[status]};
      border-radius:5px; padding:1px 5px; pointer-events:none; white-space:nowrap;
      font-family:monospace; font-size:${11 * this.labelScale}px; font-weight:700; color:${STATUS_COLOR_HEX[status]};`
    el.textContent = icon
    if (acked) {
      const ack = document.createElement('span')
      ack.textContent = STATUS_ICON.acknowledged
      ack.style.cssText = 'color:#4ade80;'
      el.appendChild(ack)
    }

    const badge = new CSS2DObject(el)
    badge.position.copy(pos).add(new THREE.Vector3(0, 1.3, 0))
    this.scene.add(badge)
    this.statusBadges.set(deviceId, badge)
  }

  setAcknowledged(deviceId: string, acked: boolean) {
    if (acked) this.ackedIds.add(deviceId)
    else this.ackedIds.delete(deviceId)
    const status = this.statusMap.get(deviceId)
    if (status) this._updateBadge(deviceId, status)
  }


  loadInstanced(
    devices: RawDevice[],
    mappings: Map<string, DeviceMapping>,
    getMappingByDeviceId: (id: string) => DeviceMapping | undefined,
  ) {
    const byType = new Map<string, { device: RawDevice; mapping: DeviceMapping }[]>()
    devices.forEach(dev => {
      const m = getMappingByDeviceId(dev.id)
      if (!m || !m.position || m.mappingStatus === 'unmapped') return
      const type = m.visualType ?? dev.normalizedType ?? 'unknown'
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
        if (item.mapping.operatorState?.acknowledged) this.ackedIds.add(item.device.id)
      })

      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
      this.instancedMeshes.set(type, mesh)
      this.scene.add(mesh)
    })

    this.instanceIndex.forEach((_, id) => this._updateBadge(id, this.statusMap.get(id) ?? 'unknown'))
  }

  addDevice(dev: RawDevice, mapping: DeviceMapping) {
    if (!mapping.position || mapping.mappingStatus === 'unmapped') return
    if (this.instanceIndex.has(dev.id)) {
      // Already in scene — just update position in case it changed
      this.setPosition(dev.id, new THREE.Vector3(mapping.position.x, mapping.position.y, mapping.position.z))
      return
    }
    const type = mapping.visualType ?? dev.normalizedType ?? 'unknown'
    const status = (dev.status ?? 'unknown') as DeviceStatus
    const color  = STATUS_COLOR_THREE[status] ?? new THREE.Color(0x6b7280)

    let mesh = this.instancedMeshes.get(type)

    if (mesh && mesh.count < mesh.instanceMatrix.count) {
      // Slot available in existing mesh — add in-place
      const idx = mesh.count
      this.dummy.position.set(mapping.position.x, mapping.position.y, mapping.position.z)
      this.dummy.rotation.set(0, 0, 0)
      this.dummy.scale.setScalar(1)
      this.dummy.updateMatrix()
      mesh.setMatrixAt(idx, this.dummy.matrix)
      mesh.setColorAt(idx, color)
      mesh.count = idx + 1
      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
      mesh.userData[`device_${idx}`] = dev.id
      this.instanceIndex.set(dev.id, { type, idx })
      this.instanceColors.set(dev.id, color.clone())
      this.statusMap.set(dev.id, status)
      if (mapping.operatorState?.acknowledged) this.ackedIds.add(dev.id)
      this._updateBadge(dev.id, status)
    } else {
      // No mesh or no capacity — rebuild mesh for this type including new device
      const existing: Array<{ id: string; pos: THREE.Vector3; status: DeviceStatus }> = []
      if (mesh) {
        for (let i = 0; i < mesh.count; i++) {
          const id = mesh.userData[`device_${i}`] as string
          if (!id) continue
          const m4 = new THREE.Matrix4()
          mesh.getMatrixAt(i, m4)
          existing.push({ id, pos: new THREE.Vector3().setFromMatrixPosition(m4), status: this.statusMap.get(id) ?? 'unknown' as DeviceStatus })
        }
        this.scene.remove(mesh)
        ;(mesh.material as THREE.Material).dispose()
        this.instancedMeshes.delete(type)
      }
      existing.push({ id: dev.id, pos: new THREE.Vector3(mapping.position.x, mapping.position.y, mapping.position.z), status })

      const geo  = getDeviceGeometry(type)
      const mat  = getMaterial(type).clone()
      mat.vertexColors = false
      const newMesh = new THREE.InstancedMesh(geo, mat, existing.length + 50)
      newMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      newMesh.count = existing.length
      newMesh.userData.deviceType = type

      existing.forEach(({ id, pos, status: s }, i) => {
        this.dummy.position.copy(pos)
        this.dummy.rotation.set(0, 0, 0)
        this.dummy.scale.setScalar(1)
        this.dummy.updateMatrix()
        newMesh.setMatrixAt(i, this.dummy.matrix)
        const c = STATUS_COLOR_THREE[s] ?? new THREE.Color(0x6b7280)
        newMesh.setColorAt(i, c)
        this.instanceIndex.set(id, { type, idx: i })
        this.instanceColors.set(id, c.clone())
        this.statusMap.set(id, s)
        newMesh.userData[`device_${i}`] = id
      })

      newMesh.instanceMatrix.needsUpdate = true
      if (newMesh.instanceColor) newMesh.instanceColor.needsUpdate = true
      this.instancedMeshes.set(type, newMesh)
      this.scene.add(newMesh)
      if (mapping.operatorState?.acknowledged) this.ackedIds.add(dev.id)
      this._updateBadge(dev.id, status)
    }
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
    this._updateBadge(deviceId, status)
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

  setMultiHighlight(deviceIds: string[]) {
    const selectedSet = new Set(deviceIds)
    this.instancedMeshes.forEach(mesh => {
      for (let i = 0; i < mesh.count; i++) {
        const id = mesh.userData[`device_${i}`] as string
        if (!id) continue
        const base = this.instanceColors.get(id) ?? new THREE.Color(0xffffff)
        mesh.setColorAt(i, selectedSet.has(id) ? base.clone().multiplyScalar(3.0) : base.clone())
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    })
  }

  setSearchFocus(matchingIds: Set<string>, labelFor: (id: string) => string | undefined) {
    this.clearSearchLabels()
    if (!matchingIds.size) return

    let rendered = 0
    matchingIds.forEach((id) => {
      if (rendered >= 80) return
      const pos = this.getDeviceWorldPos(id)
      if (!pos) return

      const el = document.createElement('div')
      el.className = 'device-search-label'
      el.style.cssText = `
        background:rgba(250,204,21,.96);border:1px solid #fef08a;border-radius:6px;
        box-shadow:0 0 18px rgba(250,204,21,.8),0 0 2px #000;
        color:#111827;font-size:${11 * this.labelScale}px;font-weight:700;font-family:monospace;
        padding:3px 8px;white-space:nowrap;pointer-events:none;`
      el.textContent = labelFor(id) ?? id

      const label = new CSS2DObject(el)
      label.position.copy(pos).add(new THREE.Vector3(0, 1.7, 0))
      this.scene.add(label)
      this.searchLabels.set(id, label)
      rendered += 1
    })
  }

  // deviceId by instanceId + type
  getDeviceIdByInstance(type: string, instanceId: number): string | undefined {
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
      this.clearSearchLabels()
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
        // Matches keep their real status color — overwriting it (as this used
        // to do with a fixed yellow) hid whether a matched device was actually
        // critical/warning/normal. The CSS2D label from setSearchFocus already
        // marks "this is a match"; color still has to answer "how bad is it".
        const base = STATUS_COLOR_THREE[status].clone()
        const color = isMatch ? base.clone() : base.clone().multiplyScalar(0.3)
        mesh.setColorAt(i, color)
        this.instanceColors.set(deviceId, color)
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    })
  }

  setLabelScale(scale: number) {
    if (scale === this.labelScale) return
    this.labelScale = scale
    this.statusBadges.forEach((_, id) => {
      const status = this.statusMap.get(id)
      if (status) this._updateBadge(id, status)
    })
    // Search labels are rebuilt from the currently-matching set the next
    // time applySearchFilter runs; if one is active right now, refresh it
    // immediately rather than waiting for the next filter change.
    if (this.searchLabels.size) {
      const ids = new Set(this.searchLabels.keys())
      const texts = new Map(
        [...this.searchLabels.entries()].map(([id, label]) => [id, label.element.textContent ?? id]),
      )
      this.setSearchFocus(ids, (id) => texts.get(id))
    }
  }

  // Re-applies STATUS_COLOR_THREE to every instance, respecting whatever
  // dim/match state is currently active — called after applyColorMode() (in
  // colorUtils.ts) swaps the palette in place, since the Color objects this
  // renderer already cloned into instanceColors won't update on their own.
  recolorAll() {
    this.instancedMeshes.forEach((mesh) => {
      for (let i = 0; i < mesh.count; i++) {
        const deviceId = mesh.userData[`device_${i}`] as string
        if (!deviceId) continue
        const status = this.statusMap.get(deviceId)
        if (!status) continue
        const base = STATUS_COLOR_THREE[status].clone()
        const isMatch = this.dimmedIds.size === 0 || this.dimmedIds.has(deviceId)
        const color = isMatch ? base.clone() : base.clone().multiplyScalar(0.3)
        mesh.setColorAt(i, color)
        this.instanceColors.set(deviceId, color)
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    })
    this.statusMap.forEach((status, id) => this._updateBadge(id, status))
  }

  // Selection is shown as a ground ring rather than an instance-color tint,
  // since the pulse animation on warning/critical devices (see pulseStatus)
  // overwrites instance colors every frame and would mask a color-based marker.
  setSelectedDevice(deviceId: string | null) {
    this.selectedDeviceId = deviceId
    if (!deviceId) {
      if (this.selectionRing) this.selectionRing.visible = false
      return
    }
    if (!this.selectionRing) {
      const geo = new THREE.RingGeometry(0.85, 1.05, 32)
      const mat = new THREE.MeshBasicMaterial({
        color: 0x60a5fa, transparent: true, opacity: 0.95,
        side: THREE.DoubleSide, depthTest: false,
      })
      this.selectionRing = new THREE.Mesh(geo, mat)
      this.selectionRing.rotation.x = -Math.PI / 2
      this.selectionRing.renderOrder = 999
      this.scene.add(this.selectionRing)
    }
    this.selectionRing.visible = true
    this.tick()
  }

  // Keeps the selection ring pinned under the selected device even while it's
  // being dragged; called once per frame from the render loop.
  tick() {
    if (this.selectedDeviceId && this.selectionRing?.visible) {
      const pos = this.getDeviceWorldPos(this.selectedDeviceId)
      if (pos) this.selectionRing.position.set(pos.x, 0.03, pos.z)
    }
    this.statusBadges.forEach((badge, id) => {
      const pos = this.getDeviceWorldPos(id)
      if (pos) badge.position.copy(pos).add(new THREE.Vector3(0, 1.3, 0))
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
    this.clearSearchLabels()
    this.statusBadges.forEach((badge) => {
      this.scene.remove(badge)
      badge.element.remove()
    })
    this.statusBadges.clear()
    this.ackedIds.clear()
    if (this.selectionRing) {
      this.scene.remove(this.selectionRing)
      this.selectionRing.geometry.dispose()
      ;(this.selectionRing.material as THREE.Material).dispose()
      this.selectionRing = null
    }
    this.selectedDeviceId = null
    this.instancedMeshes.forEach(mesh => {
      // Don't dispose mesh.geometry here — it's shared with the module-level
      // geometry cache. disposeGeometryCache() handles cleanup and clears the
      // cache so the next loadInstanced gets fresh geometries.
      ;(mesh.material as THREE.Material).dispose()
      this.scene.remove(mesh)
    })
    this.instancedMeshes.clear()
    this.instanceIndex.clear()
    _matCache.forEach(m => m.dispose())
    _matCache.clear()
    disposeGeometryCache()
  }

  private clearSearchLabels() {
    this.searchLabels.forEach((label) => {
      this.scene.remove(label)
      label.element.remove()
    })
    this.searchLabels.clear()
  }
}
