import * as THREE from 'three'

export type FlashKind = 'critical' | 'recover' | 'warning'

const FLASH_COLOR: Record<FlashKind, number> = {
  critical: 0xff3344,
  recover:  0x22dd66,
  warning:  0xffaa00,
}

interface Flash {
  rings:   THREE.Mesh[]
  life:    number
  maxLife: number
}

/**
 */
export class FlashEffectRenderer {
  private scene: THREE.Scene
  private flashes: Flash[] = []

  constructor(scene: THREE.Scene) { this.scene = scene }

  flash(pos: THREE.Vector3, kind: FlashKind) {
    const color = FLASH_COLOR[kind]
    const rings: THREE.Mesh[] = []

    for (let i = 0; i < 2; i++) {
      const geo = new THREE.RingGeometry(0.3, 0.45, 32)
      const mat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.9,
        side: THREE.DoubleSide, depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const ring = new THREE.Mesh(geo, mat)
      ring.rotation.x = -Math.PI / 2
      ring.position.copy(pos).setY(pos.y + 0.3 + i * 0.05)
      ring.userData.delay = i * 0.15
      ring.renderOrder = 500
      this.scene.add(ring)
      rings.push(ring)
    }

    const beamGeo = new THREE.CylinderGeometry(0.06, 0.06, 4, 6)
    const beamMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.6,
      depthWrite: false, blending: THREE.AdditiveBlending,
    })
    const beam = new THREE.Mesh(beamGeo, beamMat)
    beam.position.copy(pos).setY(pos.y + 2)
    beam.userData.isBeam = true
    beam.renderOrder = 500
    this.scene.add(beam)
    rings.push(beam)

    this.flashes.push({ rings, life: 1.2, maxLife: 1.2 })
  }

  update(delta: number) {
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i]
      f.life -= delta
      const t = 1 - f.life / f.maxLife

      f.rings.forEach(ring => {
        const mat = ring.material as THREE.MeshBasicMaterial
        if (ring.userData.isBeam) {
          mat.opacity = Math.max(0, 0.6 * (1 - t))
          ring.scale.y = 1 + t * 0.5
        } else {
          const delay = ring.userData.delay as number
          const lt = Math.max(0, Math.min(1, (t - delay) / (1 - delay)))
          const scale = 1 + lt * 5
          ring.scale.setScalar(scale)
          mat.opacity = Math.max(0, 0.9 * (1 - lt))
        }
      })

      if (f.life <= 0) {
        f.rings.forEach(r => {
          this.scene.remove(r)
          r.geometry.dispose()
          ;(r.material as THREE.Material).dispose()
        })
        this.flashes.splice(i, 1)
      }
    }
  }

  dispose() {
    this.flashes.forEach(f => f.rings.forEach(r => {
      this.scene.remove(r)
      r.geometry.dispose()
      ;(r.material as THREE.Material).dispose()
    }))
    this.flashes = []
  }
}
