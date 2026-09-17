import * as THREE from 'three'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import type { NetworkLink, EdgeType } from '@/types'
import { LINK_STYLE } from '@/utils/colorUtils'

const LINK_Y     = 0.45   // fallback height (preview / ground plane)
const ENDPOINT_LIFT = 0.1 // raise the link slightly above the device top
const DASH_FLOW_SPEED = 1.4 // world-units/sec the dash pattern travels along dashed links

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
  private previewLine: Line2 | null = null
  private _elapsed = 0
  private _resolution = new THREE.Vector2(1, 1)
  private highlightedId: string | null = null

  constructor(scene: THREE.Scene) { this.scene = scene }

  loadLinks(links: NetworkLink[], getPos: (id: string) => THREE.Vector3 | null) {
    links.forEach(l => this.addLink(l, getPos))
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

  addLink(link: NetworkLink, getPos: (id: string) => THREE.Vector3 | null) {
    const aPos = getPos(link.sourceDeviceId)
    const bPos = getPos(link.targetDeviceId)
    if (!aPos || !bPos) return

    const style = LINK_STYLE[link.type] ?? LINK_STYLE.manual
    const color = link.status === 'down' ? '#ef4444' : style.color
    const midX  = link.midX ?? (aPos.x + bPos.x) / 2
    const midZ  = link.midZ ?? (aPos.z + bPos.z) / 2
    const path  = this.buildPath(aPos, bPos, midX, midZ)

    // Line
    const geo = new LineGeometry()
    geo.setPositions(flatten(path))
    const mat = new LineMaterial({
      color: new THREE.Color(color).getHex(),
      transparent: true,
      opacity: style.opacity,
      linewidth: link.type === 'physical' || link.type === 'security_path' ? 2.5 : 2,
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
  }

  removeLink(id: string) {
    const obj = this.objects.get(id)
    if (!obj) return
    this.scene.remove(obj.group)
    obj.line.geometry.dispose()
    obj.handle.geometry.dispose()
    ;(obj.line.material as THREE.Material).dispose()
    ;(obj.handle.material as THREE.Material).dispose()
    this.objects.delete(id)
  }

  updateMidpoint(linkId: string, newX: number, newZ: number) {
    const obj = this.objects.get(linkId)
    if (!obj) return
    obj.link.midX = newX
    obj.link.midZ = newZ
    const newPath = this.buildPath(obj.endpoints.a, obj.endpoints.b, newX, newZ)
    obj.path = newPath
    obj.line.geometry.setPositions(flatten(newPath))
    obj.line.computeLineDistances()
    obj.handle.position.set(newX, this.midY(obj.endpoints.a, obj.endpoints.b), newZ)
  }

  refreshPositions(getPos: (id: string) => THREE.Vector3 | null) {
    this.objects.forEach(obj => {
      const a = getPos(obj.link.sourceDeviceId)
      const b = getPos(obj.link.targetDeviceId)
      if (!a || !b) return
      obj.endpoints.a = a.clone()
      obj.endpoints.b = b.clone()
      const midX = obj.link.midX ?? (a.x + b.x) / 2
      const midZ = obj.link.midZ ?? (a.z + b.z) / 2
      const newPath = this.buildPath(a, b, midX, midZ)
      obj.path = newPath

      obj.line.geometry.setPositions(flatten(newPath))
      obj.line.computeLineDistances()

      obj.handle.position.set(midX, this.midY(a, b), midZ)
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
    this.objects.forEach(({ line, link }) => {
      const mat = line.material as LineMaterial
      if (link.status === 'down') {
        // Held at full opacity while hovered — otherwise this pulse fights
        // setHighlight's one-shot opacity write every frame and the
        // highlight flickers, the same conflict pulseStatus had with device
        // hover before it was moved to a ring (see DeviceRenderer.setHighlight).
        mat.opacity = link.id === this.highlightedId
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
    this.highlightedId = null
    if (this.previewLine) {
      this.scene.remove(this.previewLine)
      this.previewLine.geometry.dispose()
      ;(this.previewLine.material as THREE.Material).dispose()
      this.previewLine = null
    }
  }
}
