import * as THREE from 'three'
import type { NetworkLink, EdgeType } from '@/types'
import { LINK_STYLE } from '@/utils/colorUtils'

const LINK_Y = 0.45   // 링크가 그려지는 고정 Y높이 (장비 높이 0.4 살짝 위)

interface LinkObj {
  group:    THREE.Group
  line:     THREE.Line
  handle:   THREE.Mesh
  link:     NetworkLink
  path:     THREE.Vector3[]    // 4점 Manhattan path
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

  // ── Manhattan 직각 path 생성 (핸들 (midX,midZ)를 지나는 5점) ──────────────
  // a → (ax,midZ) → (midX,midZ) → (midX,bz) → b
  // 화면(Top-down)에서: 수직선=X축 이동, 수평선=Z축 이동, 양쪽 직각 꺾임
  private buildPath(a: THREE.Vector3, b: THREE.Vector3, midX: number, midZ: number): THREE.Vector3[] {
    return [
      new THREE.Vector3(a.x,  LINK_Y, a.z),
      new THREE.Vector3(a.x,  LINK_Y, midZ),
      new THREE.Vector3(midX, LINK_Y, midZ),
      new THREE.Vector3(midX, LINK_Y, b.z),
      new THREE.Vector3(b.x,  LINK_Y, b.z),
    ]
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

    // Handle (midX,midZ corner) — 드래그용
    const handleGeo = new THREE.BoxGeometry(0.55, 0.3, 0.55)
    const handleMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa, transparent: true, opacity: 0.6, depthTest: false,
    })
    const handle = new THREE.Mesh(handleGeo, handleMat)
    handle.position.set(midX, LINK_Y, midZ)
    handle.renderOrder = 800
    handle.userData.linkHandleId = link.id
    handle.userData.linkId       = link.id
    handle.visible = false   // 링크 hover/선택 시만 표시

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

  // 핸들 드래그 — XZ 자유 이동, 양쪽 직각 꺾임 유지
  updateMidpoint(linkId: string, newX: number, newZ: number) {
    const obj = this.objects.get(linkId)
    if (!obj) return
    obj.link.midX = newX
    obj.link.midZ = newZ
    const newPath = this.buildPath(obj.endpoints.a, obj.endpoints.b, newX, newZ)
    obj.path = newPath
    obj.line.geometry.setFromPoints(newPath)
    obj.line.computeLineDistances()
    obj.handle.position.set(newX, LINK_Y, newZ)
  }

  // 장비 이동 시 링크 endpoint 다시 가져와 path 재계산 (실시간)
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
      obj.line.geometry.setFromPoints(newPath)
      obj.line.computeLineDistances()
      obj.handle.position.set(midX, LINK_Y, midZ)
    })
  }

  updateLinkStatus(id: string, status: NetworkLink['status']) {
    const obj = this.objects.get(id)
    if (!obj) return
    const style = LINK_STYLE[obj.link.type] ?? LINK_STYLE.manual
    const color = status === 'down' ? '#ef4444' : style.color
    ;(obj.line.material as THREE.LineBasicMaterial).color.set(color)
  }

  // hover — 라인만 밝게 (핸들은 건드리지 않음. 선택 시에만 핸들 노출)
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

  // 선택된 링크에만 드래그 핸들 표시 (서버 조작 방해 방지)
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

  // 직각(맨해튼) 프리뷰 — 링크 생성 드래그 중 표시
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

  // 애니메이션: down 펄스, traffic dash 이동
  update(delta: number) {
    this._elapsed += delta
    this.objects.forEach(({ line, link }) => {
      const mat = line.material as THREE.LineDashedMaterial
      if (link.status === 'down') {
        mat.opacity = 0.25 + 0.35 * Math.abs(Math.sin(this._elapsed * 2.5))
      }
      if (link.type === 'traffic_flow') {
        // dash 이동 효과
        mat.dashOffset = -(this._elapsed * 0.5) % 1
      }
    })
  }

  // 핸들 hit-test (linkHandleId 반환)
  pickHandle(raycaster: THREE.Raycaster): string | null {
    const handles = [...this.objects.values()].map(o => o.handle).filter(h => h.visible)
    if (!handles.length) return null
    const hits = raycaster.intersectObjects(handles, false)
    if (!hits.length) return null
    return hits[0].object.userData.linkHandleId as string | null
  }

  // 모든 핸들 (raycast용)
  getAllHandles(): THREE.Mesh[] {
    return [...this.objects.values()].map(o => o.handle)
  }

  // 정확한 ray-segment 최단거리 기반 pick
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

  // ── Particle용 path 제공 ────────────────────────────────────────────────
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

