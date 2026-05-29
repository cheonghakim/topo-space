import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import type { Space } from '@/types'

const SPACE_COLORS: Record<string, { floor: number; edge: number }> = {
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
    } else if (space.type === 'site') {
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

    const badge = new CSS2DObject(badgeEl)
    badge.position.set(0, (space.type === 'rack' ? 1.0 : 0.8), 0)
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
      new THREE.PlaneGeometry(size.width, size.depth),
      new THREE.MeshStandardMaterial({
        color: colors.floor, transparent: true, opacity: 0.18, roughness: 1,
        polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
      }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = 0.05
    group.add(floor)
    // border
    const border = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-size.width/2, 0.01, -size.depth/2),
        new THREE.Vector3( size.width/2, 0.01, -size.depth/2),
        new THREE.Vector3( size.width/2, 0.01,  size.depth/2),
        new THREE.Vector3(-size.width/2, 0.01,  size.depth/2),
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
    edgeLine.position.y = 0.01
    group.add(edgeLine)
  }

  setSelected(spaceId: string, on: boolean) {
    const obj = this.objects.get(spaceId)
    if (!obj) return
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
    if (obj) obj.badgeEl.textContent = text
  }

  applyBadgeLod() {
    this.objects.forEach((obj) => {
      const type = obj.hitMesh.userData.spaceType as Space['type']
      const source = obj.hitMesh.userData.spaceSource as Space['source'] | undefined
      obj.badge.visible = this.shouldShowBadge(type, source)
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

  private shouldShowBadge(type: Space['type'], source?: Space['source']): boolean {
    const count = this.objects.size
    if (type === 'site') return true
    if (type === 'rack' && source === 'import') return false
    if (count > 120) return false
    if (count > 60) return type !== 'rack'
    return type === 'rack' || type === 'zone' || type === 'cloud'
  }

  dispose() {
    this.objects.forEach(obj => this.disposeSpaceObject(obj))
    this.objects.clear()
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
