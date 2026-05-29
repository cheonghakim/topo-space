import * as THREE from 'three'
import type { NetworkLink, EdgeType } from '@/types'
import { LINK_STYLE } from '@/utils/colorUtils'

const LINK_Y     = 0.45   // fallback height (preview / ground plane)
const ENDPOINT_LIFT = 0.1 // raise the link slightly above the device top

interface LinkObj {
  group:    THREE.Group
  line:     THREE.Line
  handle:   THREE.Mesh
  link:     NetworkLink
  path:     THREE.Vector3[]
  endpoints: { a: THREE.Vector3; b: THREE.Vector3 }
}

export class LinkRenderer {
  private scene: THREE.Scene
  private objects = new Map<string, LinkObj>()
  private previewLine: THREE.Line | null = null
  private _elapsed = 0

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
    const geo = new THREE.BufferGeometry().setFromPoints(path)
    const mat = new THREE.LineDashedMaterial({
      color, transparent: true, opacity: style.opacity,
      dashSize: style.dashed ? 0.35 : 1000,
      gapSize:  style.dashed ? 0.15 : 0,
      linewidth: 2,
    })
    const line = new THREE.Line(geo, mat)
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
    obj.line.geometry.setFromPoints(newPath)
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

      // Explicit buffer replacement to guarantee the GPU sees the new vertices.
      const posArr = new Float32Array(newPath.length * 3)
      for (let i = 0; i < newPath.length; i++) {
        posArr[i * 3]     = newPath[i].x
        posArr[i * 3 + 1] = newPath[i].y
        posArr[i * 3 + 2] = newPath[i].z
      }
      obj.line.geometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
      obj.line.geometry.computeBoundingSphere()
      obj.line.computeLineDistances()

      obj.handle.position.set(midX, this.midY(a, b), midZ)
    })
  }

  updateLinkStatus(id: string, status: NetworkLink['status']) {
    const obj = this.objects.get(id)
    if (!obj) return
    const style = LINK_STYLE[obj.link.type] ?? LINK_STYLE.manual
    const color = status === 'down' ? '#ef4444' : style.color
    ;(obj.line.material as THREE.LineBasicMaterial).color.set(color)
  }

  setHighlight(id: string | null, prev: string | null) {
    if (prev) {
      const o = this.objects.get(prev)
      if (o) (o.line.material as THREE.LineDashedMaterial).opacity = LINK_STYLE[o.link.type]?.opacity ?? 0.6
    }
    if (id) {
      const o = this.objects.get(id)
      if (o) (o.line.material as THREE.LineDashedMaterial).opacity = 1.0
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
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = new THREE.LineDashedMaterial({
        color: 0x60a5fa, dashSize: 0.3, gapSize: 0.15,
        transparent: true, opacity: 0.9, linewidth: 2,
      })
      this.previewLine = new THREE.Line(geo, mat)
      this.scene.add(this.previewLine)
    } else {
      this.previewLine.geometry.setFromPoints(pts)
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
      if (link.status === 'down') {
        const mat = line.material as THREE.LineDashedMaterial
        mat.opacity = 0.25 + 0.35 * Math.abs(Math.sin(this._elapsed * 2.5))
      }
    })
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
    if (this.previewLine) {
      this.scene.remove(this.previewLine)
      this.previewLine.geometry.dispose()
      ;(this.previewLine.material as THREE.Material).dispose()
      this.previewLine = null
    }
  }
}

