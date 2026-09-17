import * as THREE from 'three'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import type { NetworkLink, EdgeType } from '@/types'
import { LINK_STYLE } from '@/utils/colorUtils'

const LINK_Y     = 0.45   // fallback height (preview / ground plane)
const ENDPOINT_LIFT = 0.1 // raise the link slightly above the device top
const DASH_FLOW_SPEED = 1.4 // world-units/sec the dash pattern travels along dashed links
const PARALLEL_OFFSET = 0.5 // world-units between auto-spread parallel links sharing a device pair

interface LinkObj {
  group:    THREE.Group
  line:     Line2
  handle:   THREE.Mesh
  link:     NetworkLink
  path:     THREE.Vector3[]
  endpoints: { a: THREE.Vector3; b: THREE.Vector3 }
}

function flatten(path: THREE.Vector3[]): number[] {
  const out: number[] = []
  path.forEach(p => out.push(p.x, p.y, p.z))
  return out
}

export class LinkRenderer {
  private scene: THREE.Scene
  private objects = new Map<string, LinkObj>()
  // deviceId -> ids of links touching it. Lets a single device move (drag,
  // gizmo) refresh only its own links instead of walking every link in the
  // scene — critical once link count reaches into the thousands.
  private byDevice = new Map<string, Set<string>>()
  // Unordered device-pair key -> ids of links between that pair with no
  // manual midX/midZ. Used to deterministically spread parallel links apart
  // instead of letting them overlap exactly.
  private byPair = new Map<string, Set<string>>()
  // Ids whose material needs a per-frame touch (down-pulse or dash-flow).
  // update() only walks this subset instead of every link — most links in a
  // large graph are static (up, non-dashed) and cost nothing per frame.
  private animated = new Set<string>()
  private previewLine: Line2 | null = null
  private _elapsed = 0
  private _resolution = new THREE.Vector2(1, 1)
  private highlightedId: string | null = null

  constructor(scene: THREE.Scene) { this.scene = scene }

  loadLinks(links: NetworkLink[], getPos: (id: string) => THREE.Vector3 | null) {
    links.forEach(l => this.addLink(l, getPos))
  }

  private _pairKey(link: NetworkLink): string {
    return [link.sourceDeviceId, link.targetDeviceId].sort().join('|')
  }

  private _index(link: NetworkLink) {
    for (const deviceId of [link.sourceDeviceId, link.targetDeviceId]) {
      let set = this.byDevice.get(deviceId)
      if (!set) { set = new Set(); this.byDevice.set(deviceId, set) }
      set.add(link.id)
    }
    if (link.midX === undefined && link.midZ === undefined) {
      const key = this._pairKey(link)
      let set = this.byPair.get(key)
      if (!set) { set = new Set(); this.byPair.set(key, set) }
      set.add(link.id)
    }
  }

  private _unindex(link: NetworkLink) {
    for (const deviceId of [link.sourceDeviceId, link.targetDeviceId]) {
      const set = this.byDevice.get(deviceId)
      if (!set) continue
      set.delete(link.id)
      if (!set.size) this.byDevice.delete(deviceId)
    }
    const key = this._pairKey(link)
    const pairSet = this.byPair.get(key)
    if (pairSet) {
      pairSet.delete(link.id)
      if (!pairSet.size) this.byPair.delete(key)
    }
  }

  // Deterministic path midpoint: honors a manually-set midX/midZ, otherwise
  // spreads links that share the same device pair apart (alternating sides,
  // growing offset) so they don't render as one indistinguishable overlapping
  // line. Ordinal is derived by sorting sibling ids, not insertion order, so
  // it's stable regardless of add/remove sequence.
  private _parallelMidpoint(link: NetworkLink, a: THREE.Vector3, b: THREE.Vector3): { midX: number; midZ: number } {
    const baseMidX = (a.x + b.x) / 2
    const baseMidZ = (a.z + b.z) / 2
    if (link.midX !== undefined && link.midZ !== undefined) {
      return { midX: link.midX, midZ: link.midZ }
    }

    const siblingIds = [...(this.byPair.get(this._pairKey(link)) ?? [])]
    if (!siblingIds.includes(link.id)) siblingIds.push(link.id)
    siblingIds.sort()
    const ordinal = siblingIds.indexOf(link.id)
    if (ordinal <= 0) return { midX: baseMidX, midZ: baseMidZ }

    const step = Math.ceil(ordinal / 2) * PARALLEL_OFFSET
    const side = ordinal % 2 === 1 ? 1 : -1
    const dx = b.x - a.x, dz = b.z - a.z
    const len = Math.hypot(dx, dz) || 1
    const px = -dz / len, pz = dx / len // perpendicular unit vector, XZ plane
    return { midX: baseMidX + px * step * side, midZ: baseMidZ + pz * step * side }
  }

  // Endpoints follow each device's Y; the middle corner uses the average so the
  // path smoothly tilts when devices are at different heights.
  private buildPath(a: THREE.Vector3, b: THREE.Vector3, midX: number, midZ: number): THREE.Vector3[] {
    const aY  = a.y + ENDPOINT_LIFT
    const bY  = b.y + ENDPOINT_LIFT
    const midY = (aY + bY) / 2
    return [
      new THREE.Vector3(a.x,  aY,   a.z),
      new THREE.Vector3(a.x,  midY, midZ),
      new THREE.Vector3(midX, midY, midZ),
      new THREE.Vector3(midX, midY, b.z),
      new THREE.Vector3(b.x,  bY,   b.z),
    ]
  }

  private midY(a: THREE.Vector3, b: THREE.Vector3): number {
    return ((a.y + b.y) / 2) + ENDPOINT_LIFT
  }

  // Fat lines (Line2) need the renderer's pixel size to compute a real,
  // configurable on-screen width — call this whenever the canvas resizes.
  setResolution(width: number, height: number) {
    this._resolution.set(width, height)
    this.objects.forEach(o => (o.line.material as LineMaterial).resolution.set(width, height))
    if (this.previewLine) (this.previewLine.material as LineMaterial).resolution.set(width, height)
  }

  private _syncAnimated(obj: LinkObj) {
    const needsAnimation = obj.link.status === 'down' || (obj.line.material as LineMaterial).dashed
    if (needsAnimation) this.animated.add(obj.link.id)
    else this.animated.delete(obj.link.id)
  }

  private _styleFor(link: NetworkLink) {
    const style = LINK_STYLE[link.type] ?? LINK_STYLE.manual
    const color = link.status === 'down' ? '#ef4444' : style.color
    const linewidth = link.type === 'physical' || link.type === 'security_path' ? 2.5 : 2
    return { style, color, linewidth }
  }

  addLink(link: NetworkLink, getPos: (id: string) => THREE.Vector3 | null) {
    const aPos = getPos(link.sourceDeviceId)
    const bPos = getPos(link.targetDeviceId)
    if (!aPos || !bPos) return

    const { style, color, linewidth } = this._styleFor(link)
    const { midX, midZ } = this._parallelMidpoint(link, aPos, bPos)
    const path  = this.buildPath(aPos, bPos, midX, midZ)

    // Line
    const geo = new LineGeometry()
    geo.setPositions(flatten(path))
    const mat = new LineMaterial({
      color: new THREE.Color(color).getHex(),
      transparent: true,
      opacity: style.opacity,
      linewidth,
      dashed: style.dashed,
      dashSize: 0.35,
      gapSize: 0.22,
      dashScale: 1,
      resolution: this._resolution,
      alphaToCoverage: true,
    })
    const line = new Line2(geo, mat)
    line.computeLineDistances()
    line.userData.linkId = link.id

    const handleGeo = new THREE.BoxGeometry(0.55, 0.3, 0.55)
    const handleMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa, transparent: true, opacity: 0.6, depthTest: false,
    })
    const handle = new THREE.Mesh(handleGeo, handleMat)
    handle.position.set(midX, this.midY(aPos, bPos), midZ)
    handle.renderOrder = 800
    handle.userData.linkHandleId = link.id
    handle.userData.linkId       = link.id
    handle.visible = false

    const group = new THREE.Group()
    group.add(line, handle)
    this.scene.add(group)

    this.objects.set(link.id, {
      group, line, handle, link, path,
      endpoints: { a: aPos.clone(), b: bPos.clone() },
    })
    this._index(link)
    this._syncAnimated(this.objects.get(link.id)!)
  }

  removeLink(id: string) {
    const obj = this.objects.get(id)
    if (!obj) return
    this.scene.remove(obj.group)
    obj.line.geometry.dispose()
    obj.handle.geometry.dispose()
    ;(obj.line.material as THREE.Material).dispose()
    ;(obj.handle.material as THREE.Material).dispose()
    this._unindex(obj.link)
    this.animated.delete(id)
    this.objects.delete(id)
  }

  getRenderedLinkIds(): Set<string> {
    return new Set(this.objects.keys())
  }

  // Applies a (possibly new) NetworkLink object's data — style, status color,
  // and path — onto the already-rendered link with the same id. Used for
  // in-place upserts so a full teardown/rebuild isn't needed just because a
  // link's fields changed. Falls back to addLink if it isn't rendered yet.
  updateLink(link: NetworkLink, getPos: (id: string) => THREE.Vector3 | null) {
    const obj = this.objects.get(link.id)
    if (!obj) { this.addLink(link, getPos); return }

    if (obj.link !== link) {
      this._unindex(obj.link)
      obj.link = link
      this._index(link)
    }

    const { style, color, linewidth } = this._styleFor(link)
    const mat = obj.line.material as LineMaterial
    mat.color.set(color)
    mat.opacity = link.id === this.highlightedId ? 1.0 : style.opacity
    mat.linewidth = linewidth
    mat.dashed = style.dashed
    this._syncAnimated(obj)

    this._refreshOne(obj, getPos)
  }

  updateMidpoint(linkId: string, newX: number, newZ: number) {
    const obj = this.objects.get(linkId)
    if (!obj) return
    // First manual bend: this link no longer participates in parallel-edge
    // auto-spread, so drop it from the pair index.
    if (obj.link.midX === undefined && obj.link.midZ === undefined) {
      const key = this._pairKey(obj.link)
      const set = this.byPair.get(key)
      if (set) { set.delete(linkId); if (!set.size) this.byPair.delete(key) }
    }
    obj.link.midX = newX
    obj.link.midZ = newZ
    const newPath = this.buildPath(obj.endpoints.a, obj.endpoints.b, newX, newZ)
    obj.path = newPath
    obj.line.geometry.setPositions(flatten(newPath))
    obj.line.computeLineDistances()
    obj.handle.position.set(newX, this.midY(obj.endpoints.a, obj.endpoints.b), newZ)
  }

  private _refreshOne(obj: LinkObj, getPos: (id: string) => THREE.Vector3 | null) {
    const a = getPos(obj.link.sourceDeviceId)
    const b = getPos(obj.link.targetDeviceId)
    if (!a || !b) return
    obj.endpoints.a = a.clone()
    obj.endpoints.b = b.clone()
    const { midX, midZ } = this._parallelMidpoint(obj.link, a, b)
    const newPath = this.buildPath(a, b, midX, midZ)
    obj.path = newPath

    obj.line.geometry.setPositions(flatten(newPath))
    obj.line.computeLineDistances()

    obj.handle.position.set(midX, this.midY(a, b), midZ)
  }

  refreshPositions(getPos: (id: string) => THREE.Vector3 | null) {
    this.objects.forEach(obj => this._refreshOne(obj, getPos))
  }

  // Refreshes only the links touching the given devices — O(degree) instead
  // of O(all links). Use this for single/few-device drags at scale.
  refreshPositionsFor(deviceIds: Iterable<string>, getPos: (id: string) => THREE.Vector3 | null) {
    const linkIds = new Set<string>()
    for (const deviceId of deviceIds) {
      this.byDevice.get(deviceId)?.forEach(id => linkIds.add(id))
    }
    linkIds.forEach(id => {
      const obj = this.objects.get(id)
      if (obj) this._refreshOne(obj, getPos)
    })
  }

  updateLinkStatus(id: string, status: NetworkLink['status']) {
    const obj = this.objects.get(id)
    if (!obj) return
    const style = LINK_STYLE[obj.link.type] ?? LINK_STYLE.manual
    const color = status === 'down' ? '#ef4444' : style.color
    ;(obj.line.material as LineMaterial).color.set(color)
  }

  setHighlight(id: string | null, prev: string | null) {
    this.highlightedId = id
    if (prev) {
      const o = this.objects.get(prev)
      if (o) (o.line.material as LineMaterial).opacity = LINK_STYLE[o.link.type]?.opacity ?? 0.6
    }
    if (id) {
      const o = this.objects.get(id)
      if (o) (o.line.material as LineMaterial).opacity = 1.0
    }
  }

  setSelected(id: string | null) {
    this.objects.forEach((o, oid) => {
      o.handle.visible = oid === id
    })
  }

  setVisible(type: EdgeType, visible: boolean) {
    this.objects.forEach(({ group, link }) => {
      if (link.type === type) group.visible = visible
    })
  }

  showPreview(from: THREE.Vector3, to: THREE.Vector3) {
    const midZ = (from.z + to.z) / 2
    const pts: THREE.Vector3[] = [
      new THREE.Vector3(from.x, LINK_Y, from.z),
      new THREE.Vector3(from.x, LINK_Y, midZ),
      new THREE.Vector3(to.x,   LINK_Y, midZ),
      new THREE.Vector3(to.x,   LINK_Y, to.z),
    ]
    if (!this.previewLine) {
      const geo = new LineGeometry()
      geo.setPositions(flatten(pts))
      const mat = new LineMaterial({
        color: 0x60a5fa, dashed: true, dashSize: 0.3, gapSize: 0.15, dashScale: 1,
        transparent: true, opacity: 0.9, linewidth: 2.5, resolution: this._resolution,
      })
      this.previewLine = new Line2(geo, mat)
      this.scene.add(this.previewLine)
    } else {
      this.previewLine.geometry.setPositions(flatten(pts))
      this.previewLine.computeLineDistances()
    }
    this.previewLine.visible = true
  }

  hidePreview() {
    if (this.previewLine) this.previewLine.visible = false
  }

  update(delta: number) {
    this._elapsed += delta
    // Only the down/dashed subset needs a per-frame touch — most links in a
    // large graph are static and are skipped entirely (see `animated`).
    this.animated.forEach(id => {
      const obj = this.objects.get(id)
      if (!obj) { this.animated.delete(id); return }
      const mat = obj.line.material as LineMaterial
      if (obj.link.status === 'down') {
        // Held at full opacity while hovered — otherwise this pulse fights
        // setHighlight's one-shot opacity write every frame and the
        // highlight flickers, the same conflict pulseStatus had with device
        // hover before it was moved to a ring (see DeviceRenderer.setHighlight).
        mat.opacity = obj.link.id === this.highlightedId
          ? 1.0
          : 0.25 + 0.35 * Math.abs(Math.sin(this._elapsed * 2.5))
      } else if (mat.dashed) {
        // Marching-ants flow — only dashed link types (logical/service_dependency/
        // manual/inferred) animate; solid types read "flow" via the particle stream.
        mat.dashOffset -= DASH_FLOW_SPEED * delta
      }
    })
    if (this.previewLine) {
      (this.previewLine.material as LineMaterial).dashOffset -= DASH_FLOW_SPEED * delta
    }
  }

  pickHandle(raycaster: THREE.Raycaster): string | null {
    const handles = [...this.objects.values()].map(o => o.handle).filter(h => h.visible)
    if (!handles.length) return null
    const hits = raycaster.intersectObjects(handles, false)
    if (!hits.length) return null
    return hits[0].object.userData.linkHandleId as string | null
  }

  getAllHandles(): THREE.Mesh[] {
    return [...this.objects.values()].map(o => o.handle)
  }

  pickLink(raycaster: THREE.Raycaster, threshold = 0.8): string | null {
    let best: string | null = null
    let bestSq = threshold * threshold

    this.objects.forEach(({ link, path, group }) => {
      if (!group.visible) return
      for (let i = 0; i < path.length - 1; i++) {
        const distSq = raycaster.ray.distanceSqToSegment(path[i], path[i + 1])
        if (distSq < bestSq) {
          bestSq = distSq
          best   = link.id
        }
      }
    })
    return best
  }

  getLinkPath(linkId: string): THREE.Vector3[] | null {
    const obj = this.objects.get(linkId)
    return obj ? obj.path.map(p => p.clone()) : null
  }

  getVisibleLinks(): NetworkLink[] {
    return [...this.objects.values()]
      .filter(o => o.group.visible)
      .map(o => o.link)
  }

  dispose() {
    this.objects.forEach(({ group, line, handle }) => {
      this.scene.remove(group)
      line.geometry.dispose(); handle.geometry.dispose()
      ;(line.material as THREE.Material).dispose()
      ;(handle.material as THREE.Material).dispose()
    })
    this.objects.clear()
    this.byDevice.clear()
    this.byPair.clear()
    this.animated.clear()
    this.highlightedId = null
    if (this.previewLine) {
      this.scene.remove(this.previewLine)
      this.previewLine.geometry.dispose()
      ;(this.previewLine.material as THREE.Material).dispose()
      this.previewLine = null
    }
  }
}
