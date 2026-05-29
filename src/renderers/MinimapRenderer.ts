import type { Space, DeviceMapping } from '@/types'
import type { RawDevice } from '@/types'
import { STATUS_COLOR_HEX } from '@/utils/colorUtils'

interface WorldBounds { minX: number; maxX: number; minZ: number; maxZ: number }

export class MinimapRenderer {
  private canvas: HTMLCanvasElement
  private ctx:    CanvasRenderingContext2D
  private bounds: WorldBounds = { minX: -100, maxX: 100, minZ: -60, maxZ: 60 }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx    = canvas.getContext('2d')!
  }

  private toMM(wx: number, wz: number): { x: number; y: number } {
    const { minX, maxX, minZ, maxZ } = this.bounds
    const margin = 8
    const w = this.canvas.width  - margin * 2
    const h = this.canvas.height - margin * 2
    return {
      x: margin + (wx - minX) / (maxX - minX) * w,
      y: margin + (wz - minZ) / (maxZ - minZ) * h,
    }
  }

  render(
    spaces: Space[],
    devices: RawDevice[],
    mappings: Map<string, DeviceMapping>,
    cameraPos: { x: number; z: number },
    cameraTarget: { x: number; z: number },
    getMappingByDeviceId: (id: string) => DeviceMapping | undefined,
  ) {
    const ctx = this.ctx
    const W = this.canvas.width
    const H = this.canvas.height
    ctx.clearRect(0, 0, W, H)

    // Background
    ctx.fillStyle = 'rgba(8,12,24,0.92)'
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = '#1a2a4a'
    ctx.lineWidth = 1
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1)

    // Spaces (racks and zones)
    spaces.filter(s => s.position && !s.archived).forEach(s => {
      const p = this.toMM(s.position!.x, s.position!.z)
      if (s.type === 'rack') {
        ctx.fillStyle = '#1e3a5f'
        ctx.fillRect(p.x - 3, p.y - 2, 6, 4)
      } else if (s.type === 'zone' || s.type === 'site') {
        const sz = s.size ?? { width: 20, depth: 20 }
        const w  = (sz.width / (this.bounds.maxX - this.bounds.minX)) * (W - 16)
        const h  = (sz.depth / (this.bounds.maxZ - this.bounds.minZ)) * (H - 16)
        ctx.strokeStyle = s.type === 'site' ? '#2a4a8a' : '#1e3a5f'
        ctx.lineWidth = s.type === 'site' ? 1.5 : 1
        ctx.setLineDash(s.type === 'zone' ? [2, 2] : [])
        ctx.strokeRect(p.x - w / 2, p.y - h / 2, w, h)
        ctx.setLineDash([])
      }
    })

    // Devices
    devices.forEach(dev => {
      const m = getMappingByDeviceId(dev.id)
      if (!m?.position) return
      const p = this.toMM(m.position.x, m.position.z)
      const color = STATUS_COLOR_HEX[dev.status ?? 'unknown']
      ctx.fillStyle = color
      if (dev.status === 'critical') {
        ctx.shadowColor = color
        ctx.shadowBlur = 4
      }
      ctx.beginPath()
      ctx.arc(p.x, p.y, dev.status === 'critical' ? 3 : 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // Camera position indicator
    const cp = this.toMM(cameraTarget.x, cameraTarget.z)
    ctx.strokeStyle = '#60a5fa'
    ctx.lineWidth   = 1.5
    ctx.beginPath()
    ctx.arc(cp.x, cp.y, 5, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = 'rgba(96,165,250,0.3)'
    ctx.fill()

    // Title
    ctx.fillStyle = '#475569'
    ctx.font = '9px monospace'
    ctx.fillText('Minimap', 5, 11)
  }

  updateBounds(spaces: Space[]) {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity
    spaces.forEach(s => {
      if (!s.position) return
      const sz = s.size ?? { width: 20, depth: 20 }
      minX = Math.min(minX, s.position.x - sz.width / 2)
      maxX = Math.max(maxX, s.position.x + sz.width / 2)
      minZ = Math.min(minZ, s.position.z - sz.depth / 2)
      maxZ = Math.max(maxZ, s.position.z + sz.depth / 2)
    })
    const pad = 15
    this.bounds = {
      minX: minX === Infinity ? -100 : minX - pad,
      maxX: maxX === -Infinity ? 100 : maxX + pad,
      minZ: minZ === Infinity ? -60 : minZ - pad,
      maxZ: maxZ === -Infinity ? 60 : maxZ + pad,
    }
  }
}
