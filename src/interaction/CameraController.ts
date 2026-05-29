import * as THREE from 'three'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2
}

function animateTo(
  camera: THREE.Camera, controls: OrbitControls,
  toPos: THREE.Vector3, toTarget: THREE.Vector3, duration: number,
) {
  const start       = performance.now()
  const startPos    = camera.position.clone()
  const startTarget = controls.target.clone()

  function step(now: number) {
    const t = Math.min((now - start) / duration, 1)
    const e = easeInOutCubic(t)
    camera.position.lerpVectors(startPos, toPos, e)
    controls.target.lerpVectors(startTarget, toTarget, e)
    controls.update()
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export class CameraController {
  constructor(private camera: THREE.Camera, private controls: OrbitControls) {}

  flyTo(targetPos: THREE.Vector3, lookAt?: THREE.Vector3, duration = 750) {
    const look = lookAt ?? targetPos.clone().setY(0)
    const eye  = targetPos.clone()
    animateTo(this.camera, this.controls, eye, look, duration)
  }

  flyToDevice(worldPos: THREE.Vector3) {
    const eye    = worldPos.clone().add(new THREE.Vector3(0, 10, 15))
    const target = worldPos.clone().setY(1.5)
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
}
