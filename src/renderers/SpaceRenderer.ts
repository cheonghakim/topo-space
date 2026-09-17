import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import type { Space } from '@/types'
import { layoutLabels, type LabelCandidate, type LabelRect } from '@/utils/labelLayout'

const SPACE_COLORS: Record<string, { floor: number; edge: number }> = {
  building:      { floor: 0x0d1526, edge: 0x1a2a4a },
  floor:         { floor: 0x0d1526, edge: 0x1a2a4a },
  site:          { floor: 0x0d1526, edge: 0x1a2a4a },
  zone:          { floor: 0x0f1e35, edge: 0x1e3560 },
  security_zone: { floor: 0x2a0a0a, edge: 0x5a1010 },
  service:       { floor: 0x0a1a2a, edge: 0x1a3a5a },
  custom_group:  { floor: 0x1a1a0a, edge: 0x3a3a1a },
  external:      { floor: 0x1a0a2a, edge: 0x3a1a5a },
  cloud:         { floor: 0x0a1a2a, edge: 0x1a3a6a },
  rack:          { floor: 0x1a2540, edge: 0x2a4a8a },
}

interface SpaceObj { group: THREE.Group; hitMesh: THREE.Mesh; badgeEl: HTMLDivElement; badge: CSS2DObject }

export class SpaceRenderer {
  private scene: THREE.Scene
  private objects = new Map<string, SpaceObj>()
  private selectedIds = new Set<string>()
  private labelSizes = new WeakMap<HTMLElement, { text: string | null; width: number; height: number }>()

  constructor(scene: THREE.Scene) { this.scene = scene }

  loadSpaces(spaces: Space[]) {
    spaces.filter(s => !s.archived).forEach(s => this.addSpace(s))
  }

  addSpace(space: Space) {
    if (this.objects.has(space.id)) return
    const colors = SPACE_COLORS[space.type] ?? SPACE_COLORS.zone
    const group  = new THREE.Group()
    const pos    = space.position ?? { x: 0, y: 0, z: 0 }
    const size   = space.size    ?? { width: 10, height: 0.1, depth: 10 }
    group.position.set(pos.x, pos.y, pos.z)
    group.userData.spaceId = space.id

    if (space.type === 'rack') {
      this._buildRack(group, space, size, colors)
    } else if (space.type === 'site' || space.type === 'floor' || space.type === 'building') {
      this._buildSite(group, space, size, colors)
    } else {
      this._buildZone(group, space, size, colors)
    }

    // Badge (CSS2D)
    const badgeEl = document.createElement('div')
    badgeEl.className = 'space-badge'
    badgeEl.style.cssText = `
      background:rgba(9,13,24,.90);border:1px solid #2a4a8a;border-radius:5px;
      padding:2px 7px;font-size:10px;font-family:monospace;color:#94a3b8;
      white-space:nowrap;pointer-events:none;`
    badgeEl.textContent = space.name
    badgeEl.title = space.name
    badgeEl.dataset.spaceId = space.id

    const badge = new CSS2DObject(badgeEl)
    // Keep rack names at the aisle edge, away from alarm badges over devices.
    badge.position.set(0, 0.3, size.depth / 2 + 0.35)
    badge.visible = this.shouldShowBadge(space.type, space.source)
    group.add(badge)

    const hitH = space.type === 'rack' ? 0.25 : 0.4
    const hitGeo = new THREE.BoxGeometry(size.width, hitH, size.depth)
    hitGeo.computeBoundsTree()
    const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }))
    hitMesh.position.y = hitH / 2
    hitMesh.userData.spaceId = space.id
    hitMesh.userData.spaceType = space.type
    hitMesh.userData.spaceSource = space.source
    group.add(hitMesh)

    this.scene.add(group)
    this.objects.set(space.id, { group, hitMesh, badgeEl, badge })
    this.applyBadgeLod()
  }

  private _buildRack(group: THREE.Group, _space: Space, size: Size3DLike, colors: { floor: number; edge: number }) {
    const w = size.width, d = size.depth
    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.15, d),
      new THREE.MeshStandardMaterial({
        color: colors.floor, roughness: 0.7, metalness: 0.3,
        transparent: true, opacity: 0.55,
        polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6,
      }),
    )
    pad.position.y = 0.075
    pad.receiveShadow = true
    group.add(pad)

    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, 0.15, d))
    const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: colors.edge, transparent: true, opacity: 0.8 }))
    lines.position.y = 0.075
    group.add(lines)
  }

  private _buildSite(group: THREE.Group, space: Space, size: Size3DLike, colors: { floor: number; edge: number }) {
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(size.width, 0.28, size.depth),
      new THREE.MeshStandardMaterial({
        color: space.color ?? 0x17253b, roughness: 0.9,
        polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
      }),
    )
    floor.position.y = -0.09
    floor.receiveShadow = true
    floor.castShadow = true
    group.add(floor)
    // A subtle architectural grid conveys scale without an image texture.
    const points: THREE.Vector3[] = []
    const spacing = Math.max(2, Math.max(size.width, size.depth) / 40)
    for (let x = -size.width / 2 + spacing; x < size.width / 2; x += spacing) {
      points.push(new THREE.Vector3(x, 0.055, -size.depth / 2), new THREE.Vector3(x, 0.055, size.depth / 2))
    }
    for (let z = -size.depth / 2 + spacing; z < size.depth / 2; z += spacing) {
      points.push(new THREE.Vector3(-size.width / 2, 0.055, z), new THREE.Vector3(size.width / 2, 0.055, z))
    }
    group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0x344860, transparent: true, opacity: 0.32 })))
    // border
    const border = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-size.width/2, 0.06, -size.depth/2),
        new THREE.Vector3( size.width/2, 0.06, -size.depth/2),
        new THREE.Vector3( size.width/2, 0.06,  size.depth/2),
        new THREE.Vector3(-size.width/2, 0.06,  size.depth/2),
      ]),
      new THREE.LineBasicMaterial({ color: colors.edge, transparent: true, opacity: 0.5 }),
    )
    group.add(border)
  }

  private _buildZone(group: THREE.Group, space: Space, size: Size3DLike, colors: { floor: number; edge: number }) {
    const col = space.color ? parseInt(space.color.slice(1), 16) : colors.floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(size.width, size.depth),
      new THREE.MeshStandardMaterial({
        color: col, transparent: true, opacity: 0.28, roughness: 1,
        polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
      }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = 0.12
    group.add(floor)

    const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(size.width, 0.02, size.depth))
    const edgeLine = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: colors.edge, transparent: true, opacity: 0.5 }))
    edgeLine.position.y = 0.13
    group.add(edgeLine)
  }

  setSelected(spaceId: string, on: boolean) {
    const obj = this.objects.get(spaceId)
    if (!obj) return
    if (on) this.selectedIds.add(spaceId)
    else this.selectedIds.delete(spaceId)
    obj.badgeEl.style.borderColor = on ? '#7dd3fc' : '#2a4a8a'
    obj.badgeEl.style.color = on ? '#e0f2fe' : '#b4c5dc'
    const frame = obj.group.children.find(c => c instanceof THREE.Mesh && c !== obj.hitMesh) as THREE.Mesh | undefined
    if (frame) {
      const mat = frame.material as THREE.MeshStandardMaterial
      mat.emissive    = on ? new THREE.Color(0x0055ff) : new THREE.Color(0x000000)
      mat.emissiveIntensity = on ? 0.3 : 0
    }
    const type = obj.hitMesh.userData.spaceType as Space['type']
    const source = obj.hitMesh.userData.spaceSource as Space['source'] | undefined
    obj.badge.visible = on || this.shouldShowBadge(type, source)
  }

  updateBadge(spaceId: string, text: string) {
    const obj = this.objects.get(spaceId)
    if (obj) { obj.badgeEl.textContent = text; obj.badgeEl.title = text }
  }

  applyBadgeLod(cameraDistance = 0) {
    this.objects.forEach((obj) => {
      const type = obj.hitMesh.userData.spaceType as Space['type']
      const source = obj.hitMesh.userData.spaceSource as Space['source'] | undefined
      obj.badge.visible = this.selectedIds.has(obj.group.userData.spaceId) || this.shouldShowBadge(type, source, cameraDistance)
    })
  }

  updateLod(camera: THREE.Camera, controlsTarget: THREE.Vector3, viewport?: { width: number; height: number }, obstacles: CSS2DObject[] = [], reserved: LabelRect[] = []) {
    const dist = camera.position.distanceTo(controlsTarget)
    this.applyBadgeLod(dist)
    if (!viewport) return
    camera.updateMatrixWorld()
    const project = (label: CSS2DObject): LabelRect | null => {
      const point = label.getWorldPosition(new THREE.Vector3()).project(camera)
      if (point.z < -1 || point.z > 1 || !Number.isFinite(point.x + point.y)) return null
      // offsetWidth still measures visibility:hidden elements, unlike display:none.
      const element = label.element
      let measured = this.labelSizes.get(element)
      if (!measured || measured.text !== element.textContent) {
        const width = element.offsetWidth, height = element.offsetHeight
        measured = { text: element.textContent, width: width || (element.textContent?.length ?? 0) * 6.5 + 16, height: height || 20 }
        if (width && height) this.labelSizes.set(element, measured)
      }
      const { width, height } = measured
      return { x: (point.x + 1) * viewport.width / 2 - width / 2, y: (1 - point.y) * viewport.height / 2 - height / 2, width, height }
    }
    const occupied = obstacles.filter(label => label.visible).map(project).filter((rect): rect is LabelRect => rect !== null)
    const candidates: LabelCandidate[] = []
    this.objects.forEach((obj, id) => {
      if (!obj.badge.visible) return
      const rect = project(obj.badge)
      if (rect) candidates.push({ ...rect, id, priority: this.selectedIds.has(id) ? 100 : obj.hitMesh.userData.spaceType === 'rack' ? 40 : 20 })
    })
    const visible = layoutLabels(candidates, viewport.width, viewport.height, [...occupied, ...reserved])
    this.objects.forEach((obj, id) => {
      obj.badgeEl.style.visibility = visible.has(id) ? 'visible' : 'hidden'
    })
  }

  setPosition(spaceId: string, pos: THREE.Vector3) {
    const obj = this.objects.get(spaceId)
    if (!obj) return
    obj.group.position.set(pos.x, pos.y, pos.z)
  }

  removeSpace(spaceId: string) {
    const obj = this.objects.get(spaceId)
    if (!obj) return
    this.disposeSpaceObject(obj)
    this.objects.delete(spaceId)
    this.selectedIds.delete(spaceId)
    this.applyBadgeLod()
  }

  getHitMeshes(): THREE.Mesh[] {
    return [...this.objects.values()].map(o => o.hitMesh)
  }

  getSpaceWorldPos(spaceId: string): THREE.Vector3 {
    const obj = this.objects.get(spaceId)
    if (!obj) return new THREE.Vector3()
    return obj.group.position.clone()
  }

  private shouldShowBadge(type: Space['type'], source?: Space['source'], cameraDistance = 0): boolean {
    if (type === 'site' || type === 'floor' || type === 'building') return true
    if (type === 'rack' && source === 'import') return false
    // Screen-space collision culling handles density; do not hide all rack
    // names merely because the dataset contains many spaces.
    if (cameraDistance > 120) return false
    return type === 'rack' || type === 'zone' || type === 'cloud'
  }

  dispose() {
    this.objects.forEach(obj => this.disposeSpaceObject(obj))
    this.objects.clear()
    this.selectedIds.clear()
  }

  private disposeSpaceObject(obj: SpaceObj) {
    this.scene.remove(obj.group)
    obj.badge.element.remove()
    obj.group.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments || child instanceof THREE.LineLoop) {
        child.geometry?.disposeBoundsTree?.()
        child.geometry?.dispose()
        const material = child.material
        if (Array.isArray(material)) material.forEach(m => m.dispose())
        else material?.dispose()
      }
    })
  }
}

interface Size3DLike { width: number; height: number; depth: number }
