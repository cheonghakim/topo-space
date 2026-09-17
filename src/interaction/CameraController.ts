import * as THREE from 'three'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2
}

const animations = new WeakMap<OrbitControls, () => void>()

function animateTo(
  camera: THREE.Camera, controls: OrbitControls,
  toPos: THREE.Vector3, toTarget: THREE.Vector3, duration: number,
) {
  animations.get(controls)?.()
  const start       = performance.now()
  const startPos    = camera.position.clone()
  const startTarget = controls.target.clone()
  let frame = 0
  const cancel = () => {
    cancelAnimationFrame(frame)
    controls.removeEventListener('start', cancel)
    animations.delete(controls)
  }
  animations.set(controls, cancel)
  controls.addEventListener('start', cancel)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) duration = 0

  // The click that triggers this animation (selecting a device, say) almost
  // always carries a pixel or two of pointer drift between down and up —
  // OrbitControls sees that as the start of an orbit and stores it as a
  // damped angular velocity, which then plays out over the next couple
  // hundred ms regardless of what we do to camera.position here. Left alone,
  // it reads as the view spinning briefly on its own right as we fly to the
  // target, then settling. Disabling damping for one update() flushes that
  // pending delta immediately instead of letting it decay on top of our
  // animation.
  const hadDamping = controls.enableDamping
  controls.enableDamping = false
  controls.update()
  controls.enableDamping = hadDamping

  function step(now: number) {
    const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1)
    const e = easeInOutCubic(t)
    camera.position.lerpVectors(startPos, toPos, e)
    controls.target.lerpVectors(startTarget, toTarget, e)
    // Don't call controls.update() here — the scene's main render loop already
    // calls it unconditionally every frame. Calling it a second time here
    // doubles per-frame damping decay, which visibly spins the view when any
    // residual drag momentum is still being damped out.
    if (t < 1) frame = requestAnimationFrame(step)
    else cancel()
  }
  frame = requestAnimationFrame(step)
}

export class CameraController {
  constructor(private camera: THREE.Camera, private controls: OrbitControls) {}

  dispose() {
    animations.get(this.controls)?.()
  }

  zoom(factor: number) {
    const target = this.controls.target.clone()
    const offset = this.camera.position.clone().sub(target)
    const distance = THREE.MathUtils.clamp(offset.length() * factor, this.controls.minDistance, this.controls.maxDistance)
    animateTo(this.camera, this.controls, target.clone().add(offset.setLength(distance)), target, 180)
  }

  setView(view: 'top' | 'perspective') {
    const target = this.controls.target.clone()
    const distance = this.camera.position.distanceTo(target)
    const direction = view === 'top' ? new THREE.Vector3(0, 1, 0.001) : new THREE.Vector3(0.95, 0.55, 1)
    const eye = target.clone().add(direction.normalize().multiplyScalar(distance))
    animateTo(this.camera, this.controls, eye, target, 450)
  }

  flyTo(targetPos: THREE.Vector3, lookAt?: THREE.Vector3, duration = 750) {
    const look = lookAt ?? targetPos.clone().setY(0)
    const eye  = targetPos.clone()
    animateTo(this.camera, this.controls, eye, look, duration)
  }

  flyToDevice(worldPos: THREE.Vector3) {
    const eye    = worldPos.clone().add(new THREE.Vector3(2, 2.5, 3.5))
    const target = worldPos.clone()
    animateTo(this.camera, this.controls, eye, target, 700)
  }

  flyToSpace(worldPos: THREE.Vector3, size: { width: number; depth: number }) {
    const dist   = Math.max(size.width, size.depth) * 0.9
    const eye    = worldPos.clone().add(new THREE.Vector3(0, dist * 0.7, dist * 0.8))
    const target = worldPos.clone()
    animateTo(this.camera, this.controls, eye, target, 700)
  }

  flyToOverview() {
    animateTo(this.camera, this.controls, new THREE.Vector3(0, 60, 80), new THREE.Vector3(0, 0, 0), 700)
  }

  // Moves the current view (angle + zoom preserved) so it's centered on a new
  // XZ point — used for minimap click-to-navigate, where jumping to a fixed
  // device-framing distance would be jarring.
  panToXZ(x: number, z: number) {
    const target = new THREE.Vector3(x, this.controls.target.y, z)
    const delta  = target.clone().sub(this.controls.target)
    const eye    = this.camera.position.clone().add(delta)
    animateTo(this.camera, this.controls, eye, target, 500)
  }
}
