import * as THREE from 'three'

export type GizmoTarget = { type: 'device' | 'space' | 'virtualNode'; id: string }
export type GizmoAxis   = 'x' | 'y' | 'z' | 'xz'

/**
 * Maya 스타일 자체 이동 gizmo.
 * - 빨강 화살표 = X축(수직선), 파랑 화살표 = Z축(수평선)
 * - 노랑 평면 핸들 = XZ 자유 이동
 * - Y축 없음 (요청: XZ 평면만)
 * TransformControls 버전 호환 이슈를 피하기 위해 직접 구현.
 */
export class ArrowGizmo {
  group = new THREE.Group()
  private scene: THREE.Scene
  private pickMeshes: THREE.Mesh[] = []
  private target: GizmoTarget | null = null
  private ray = new THREE.Raycaster()

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.group.visible = false
    this._build()
    scene.add(this.group)
  }

  private _build() {
    // 중심 박스 (XZ 자유 이동)
    const center = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshBasicMaterial({ color: 0xffff66, depthTest: false, transparent: true, opacity: 0.9 }),
    )
    center.renderOrder = 1001
    center.userData.axis = 'xz'
    this.group.add(center)
    this.pickMeshes.push(center)

    this._buildAxis('x', 0xff3355, new THREE.Vector3(1, 0, 0))   // 빨강 (수직선)
    this._buildAxis('y', 0x44dd55, new THREE.Vector3(0, 1, 0))   // 초록 (높이)
    this._buildAxis('z', 0x3399ff, new THREE.Vector3(0, 0, 1))   // 파랑 (수평선)

    // XZ 평면 핸들 (노랑 반투명 사각형)
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(0.55, 0.55),
      new THREE.MeshBasicMaterial({
        color: 0xffff66, depthTest: false, transparent: true,
        opacity: 0.22, side: THREE.DoubleSide,
      }),
    )
    plane.rotation.x = -Math.PI / 2
    plane.position.set(0.5, 0, 0.5)
    plane.renderOrder = 1000
    plane.userData.axis = 'xz'
    this.group.add(plane)
    this.pickMeshes.push(plane)
  }

  private _buildAxis(axis: GizmoAxis, color: number, dir: THREE.Vector3) {
    const mat   = new THREE.MeshBasicMaterial({ color, depthTest: false, transparent: true })
    const len   = 1.6
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, len, 8), mat)
    const cone  = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.4, 12), mat)

    // 기본 +Y → dir 방향으로 회전
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    shaft.quaternion.copy(quat)
    cone.quaternion.copy(quat)
    shaft.position.copy(dir.clone().multiplyScalar(len / 2))
    cone.position.copy(dir.clone().multiplyScalar(len + 0.2))

    shaft.userData.axis = axis; cone.userData.axis = axis
    shaft.renderOrder = 1001;   cone.renderOrder = 1001
    this.group.add(shaft, cone)
    this.pickMeshes.push(shaft, cone)
  }

  attach(target: GizmoTarget, pos: THREE.Vector3) {
    this.target = target
    this.group.position.copy(pos)
    this.group.visible = true
  }

  detach() {
    this.target = null
    this.group.visible = false
  }

  setPosition(pos: THREE.Vector3) { this.group.position.copy(pos) }

  get isVisible()     { return this.group.visible }
  get currentTarget() { return this.target }
  get position()      { return this.group.position.clone() }

  // 화면상 일정 크기 유지
  update(camera: THREE.Camera) {
    if (!this.group.visible) return
    const dist = camera.position.distanceTo(this.group.position)
    this.group.scale.setScalar(Math.max(dist * 0.045, 0.4))
  }

  // 포인터(NDC)로 어떤 축을 클릭했는지
  pickAxis(pointer: THREE.Vector2, camera: THREE.Camera): GizmoAxis | null {
    if (!this.group.visible) return null
    this.ray.setFromCamera(pointer, camera)
    const hits = this.ray.intersectObjects(this.pickMeshes, false)
    if (!hits.length) return null
    return (hits[0].object.userData.axis as GizmoAxis) ?? null
  }

  // 마우스가 gizmo 위에 있는지 (hover 시 일반 클릭 차단용)
  isHovering(pointer: THREE.Vector2, camera: THREE.Camera): boolean {
    return this.pickAxis(pointer, camera) !== null
  }

  dispose() {
    this.scene.remove(this.group)
  }
}
