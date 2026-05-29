import * as THREE from 'three'
import type { LinkRenderer }  from '@/renderers/LinkRenderer'
import type { DeviceRenderer } from '@/renderers/DeviceRenderer'
import type { EdgeType } from '@/types'

type OnCreateFn = (srcId: string, tgtId: string, mouseX: number, mouseY: number) => void

/**
 * 노드 에디터 스타일 링크 드래그
 * mousedown(device) → mousemove → mouseup(device) → 링크 생성
 */
export class LinkDragManager {
  private state: 'idle' | 'dragging' = 'idle'
  private sourceId: string | null    = null
  private groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  private raycaster   = new THREE.Raycaster()
  private mouseWorld  = new THREE.Vector3()
  private dragThreshold  = 6    // px — 이 거리 이상 움직여야 drag로 판정

  private _startX = 0
  private _startY = 0
  private _hasMoved = false

  constructor(
    private camera: THREE.Camera,
    private linkRenderer: LinkRenderer,
    private deviceRenderer: DeviceRenderer,
    private onCreate: OnCreateFn,
  ) {}

  get isDrawing()    { return this.state === 'dragging' }
  get isDragging()   { return this._hasMoved && this.state === 'dragging' }
  get source()       { return this.sourceId }

  /** mousedown on device → 드래그 시작 준비 */
  onMouseDown(deviceId: string, e: MouseEvent) {
    this.state    = 'dragging'
    this.sourceId = deviceId
    this._startX  = e.clientX
    this._startY  = e.clientY
    this._hasMoved = false
  }

  /** mousemove → 일정 이상 움직이면 베지어 프리뷰 표시 */
  onMouseMove(e: PointerEvent, canvas: HTMLCanvasElement): boolean {
    if (this.state !== 'dragging' || !this.sourceId) return false

    const dx = e.clientX - this._startX
    const dy = e.clientY - this._startY
    if (Math.sqrt(dx * dx + dy * dy) > this.dragThreshold) {
      this._hasMoved = true
    }
    if (!this._hasMoved) return false

    const srcPos = this.deviceRenderer.getDeviceWorldPos(this.sourceId)
    if (!srcPos) return false

    const rect = canvas.getBoundingClientRect()
    const ndc  = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    )
    this.raycaster.setFromCamera(ndc, this.camera)
    this.raycaster.ray.intersectPlane(this.groundPlane, this.mouseWorld)
    this.linkRenderer.showPreview(srcPos, this.mouseWorld)
    return true
  }

  /** mouseup on device → 링크 생성 시도 */
  onMouseUp(targetDeviceId: string | null, e: MouseEvent): 'created' | 'cancelled' | 'click' {
    if (this.state !== 'dragging') return 'cancelled'

    if (!this._hasMoved) {
      // 드래그 없이 mouseup = 일반 클릭 → link 생성하지 않음
      this.cancel()
      return 'click'
    }

    if (!targetDeviceId || !this.sourceId || targetDeviceId === this.sourceId) {
      this.cancel()
      return 'cancelled'
    }

    this.onCreate(this.sourceId, targetDeviceId, e.clientX, e.clientY)
    this.cancel()
    return 'created'
  }

  cancel() {
    this.state     = 'idle'
    this.sourceId  = null
    this._hasMoved = false
    this.linkRenderer.hidePreview()
  }
}
