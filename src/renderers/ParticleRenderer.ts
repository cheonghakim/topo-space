import * as THREE from 'three'
import type { NetworkLink } from '@/types'
import { LINK_STYLE } from '@/utils/colorUtils'

interface Particle {
  linkId:         string
  linkType:       string
  segments:       THREE.Vector3[]  // path points
  segmentLengths: number[]
  totalLength:    number
  t:              number   // 0~1 along path
  speed:          number   // u/s
  color:          THREE.Color
}

const MAX_PARTICLES = 4000

function buildSegmentInfo(path: THREE.Vector3[]) {
  const lengths: number[] = []
  let total = 0
  for (let i = 0; i < path.length - 1; i++) {
    const len = path[i].distanceTo(path[i + 1])
    lengths.push(len)
    total += len
  }
  return { lengths, total }
}

function pointAlongPath(
  path: THREE.Vector3[], lengths: number[], total: number, t: number,
  out: THREE.Vector3,
): void {
  const target = (t % 1) * total
  let acc = 0
  for (let i = 0; i < path.length - 1; i++) {
    if (acc + lengths[i] >= target) {
      const localT = lengths[i] > 0 ? (target - acc) / lengths[i] : 0
      out.lerpVectors(path[i], path[i + 1], localT)
      return
    }
    acc += lengths[i]
  }
  out.copy(path[path.length - 1])
}

export class ParticleRenderer {
  private scene: THREE.Scene
  private points: THREE.Points
  private particles: Particle[] = []
  private posAttr: THREE.BufferAttribute
  private colAttr: THREE.BufferAttribute

  constructor(scene: THREE.Scene) {
    this.scene = scene
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(MAX_PARTICLES * 3)
    const col = new Float32Array(MAX_PARTICLES * 3)
    this.posAttr = new THREE.BufferAttribute(pos, 3)
    this.colAttr = new THREE.BufferAttribute(col, 3)
    this.posAttr.setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('position', this.posAttr)
    geo.setAttribute('color',    this.colAttr)
    geo.setDrawRange(0, 0)   // 초기에는 그리지 않음 (origin 점 방지)

    const mat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    this.points = new THREE.Points(geo, mat)
    this.points.frustumCulled = false
    scene.add(this.points)
  }

  syncLinks(
    links: NetworkLink[],
    getPath: (linkId: string) => THREE.Vector3[] | null,
    getTraffic: (deviceId: string) => number,
  ) {
    this.particles = []

    links.forEach(link => {
      if (link.status === 'down') return
      const path = getPath(link.id)
      if (!path || path.length < 2) return

      const { lengths, total } = buildSegmentInfo(path)
      if (total === 0) return

      const style   = LINK_STYLE[link.type] ?? LINK_STYLE.manual
      const color   = new THREE.Color(style.color)
      const traffic = getTraffic(link.sourceDeviceId)

      // 트래픽에 비례한 파티클 수 (2~6개)
      const pCount  = Math.min(Math.max(Math.floor(traffic / 150), 2), 6)
      // 속도: 3.5 ~ 8 단위/초 (path 길이로 normalize됨)
      const baseSpd = 3.5 + Math.min(traffic / 1000, 1) * 4.5

      for (let i = 0; i < pCount; i++) {
        this.particles.push({
          linkId:         link.id,
          linkType:       link.type,
          segments:       path,
          segmentLengths: lengths,
          totalLength:    total,
          t:              i / pCount,
          speed:          baseSpd * (0.85 + Math.random() * 0.3),
          color:          color.clone(),
        })
      }
    })
  }

  update(delta: number, visibleTypes: Set<string>) {
    let idx = 0
    const pos = this.posAttr.array as Float32Array
    const col = this.colAttr.array as Float32Array
    const tmp = new THREE.Vector3()

    for (const p of this.particles) {
      if (idx >= MAX_PARTICLES) break
      if (!visibleTypes.has(p.linkType)) continue

      // path 길이로 normalize된 속도
      p.t += (p.speed * delta) / Math.max(p.totalLength, 1)
      if (p.t > 1) p.t -= 1

      pointAlongPath(p.segments, p.segmentLengths, p.totalLength, p.t, tmp)

      pos[idx * 3]     = tmp.x
      pos[idx * 3 + 1] = tmp.y
      pos[idx * 3 + 2] = tmp.z
      col[idx * 3]     = p.color.r
      col[idx * 3 + 1] = p.color.g
      col[idx * 3 + 2] = p.color.b
      idx++
    }

    ;(this.points.geometry as THREE.BufferGeometry).setDrawRange(0, idx)
    this.posAttr.needsUpdate = true
    this.colAttr.needsUpdate = true
  }

  setVisible(v: boolean) {
    this.points.visible = v
    if (!v) (this.points.geometry as THREE.BufferGeometry).setDrawRange(0, 0)
  }

  dispose() {
    this.scene.remove(this.points)
    this.points.geometry.dispose()
    ;(this.points.material as THREE.Material).dispose()
  }
}
