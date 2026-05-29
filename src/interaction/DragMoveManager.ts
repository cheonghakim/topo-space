import * as THREE from 'three'

type TargetType = 'device' | 'space' | 'linkHandle'

interface MoveResult {
  targetId:   string
  targetType: TargetType
  newPos:     THREE.Vector3
}

/**
 * mousedown → mousemove → mouseup
 */
export class DragMoveManager {
  private state: 'idle' | 'pending' | 'dragging' = 'idle'
  private targetId:   string | null = null
  private targetType: TargetType | null = null
  private startX = 0
  private startY = 0
  private groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  private raycaster   = new THREE.Raycaster()
  private worldPos    = new THREE.Vector3()
  private dragThreshold = 8   // px

  get isDragging()  { return this.state === 'dragging' }
  get hasPending()  { return this.state !== 'idle' }
  get currentTarget() { return { id: this.targetId, type: this.targetType } }

  onMouseDown(targetId: string, targetType: TargetType, e: MouseEvent) {
    this.state      = 'pending'
    this.targetId   = targetId
    this.targetType = targetType
    this.startX     = e.clientX
    this.startY     = e.clientY
  }

  onMouseMove(e: PointerEvent, canvas: HTMLCanvasElement, camera: THREE.Camera): THREE.Vector3 | null {
    if (this.state === 'idle') return null
    const dx = e.clientX - this.startX
    const dy = e.clientY - this.startY
    if (Math.sqrt(dx * dx + dy * dy) > this.dragThreshold) {
      this.state = 'dragging'
    }
    if (this.state !== 'dragging') return null

    const rect = canvas.getBoundingClientRect()
    const ndc  = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    )
    this.raycaster.setFromCamera(ndc, camera)
    if (this.raycaster.ray.intersectPlane(this.groundPlane, this.worldPos)) {
      return this.worldPos.clone()
    }
    return null
  }

  onMouseUp(e: PointerEvent, canvas: HTMLCanvasElement, camera: THREE.Camera): MoveResult | null {
    if (this.state !== 'dragging') {
      this.cancel()
      return null
    }
    const rect = canvas.getBoundingClientRect()
    const ndc  = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    )
    this.raycaster.setFromCamera(ndc, camera)
    const pt = new THREE.Vector3()
    if (!this.raycaster.ray.intersectPlane(this.groundPlane, pt)) {
      this.cancel()
      return null
    }
    const result: MoveResult = {
      targetId:   this.targetId!,
      targetType: this.targetType!,
      newPos:     pt.clone(),
    }
    this.cancel()
    return result
  }

  cancel() {
    this.state      = 'idle'
    this.targetId   = null
    this.targetType = null
  }
}
