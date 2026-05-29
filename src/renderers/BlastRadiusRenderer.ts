import * as THREE from 'three'

interface RingObj { mesh: THREE.Mesh; hop: number; deviceId: string }

export interface BlastInfo {
  deviceId: string
  hop: number         // 1 or 2
  linkedDeviceId: string
}

export class BlastRadiusRenderer {
  private scene:   THREE.Scene
  private rings:   RingObj[] = []
  private elapsed  = 0

  constructor(scene: THREE.Scene) { this.scene = scene }

  show(
    affectedDevices: BlastInfo[],
    getPos: (id: string) => THREE.Vector3 | null,
  ) {
    this.clear()

    affectedDevices.forEach(({ deviceId, hop }) => {
      const pos = getPos(deviceId)
      if (!pos) return

      // Ring color: hop1=orange, hop2=yellow
      const color  = hop === 1 ? 0xff6b00 : 0xffdd00
      const radius = hop === 1 ? 0.8 : 1.3

      const geo = new THREE.RingGeometry(radius, radius + 0.12, 32)
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: hop === 1 ? 0.7 : 0.4,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = -Math.PI / 2
      mesh.position.set(pos.x, pos.y + 0.3, pos.z)
      mesh.renderOrder = 1
      this.scene.add(mesh)
      this.rings.push({ mesh, hop, deviceId })

      // Outer pulse ring
      const geo2 = new THREE.RingGeometry(radius + 0.15, radius + 0.25, 32)
      const mat2 = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const mesh2 = new THREE.Mesh(geo2, mat2)
      mesh2.rotation.x = -Math.PI / 2
      mesh2.position.set(pos.x, pos.y + 0.3, pos.z)
      mesh2.renderOrder = 1
      this.scene.add(mesh2)
      this.rings.push({ mesh: mesh2, hop, deviceId })
    })
  }

  clear() {
    this.rings.forEach(r => {
      this.scene.remove(r.mesh)
      r.mesh.geometry.dispose()
      ;(r.mesh.material as THREE.Material).dispose()
    })
    this.rings = []
  }

  update(delta: number) {
    this.elapsed += delta
    this.rings.forEach(r => {
      const mat = r.mesh.material as THREE.MeshBasicMaterial
      const base = r.hop === 1 ? 0.7 : 0.4
      // Pulse between base opacity and lower
      mat.opacity = base * (0.5 + 0.5 * Math.abs(Math.sin(this.elapsed * 2.5)))
      // Slow scale pulse on outer rings (every other one)
      if (r.rings) {
        const s = 1 + 0.15 * Math.abs(Math.sin(this.elapsed * 1.8))
        r.mesh.scale.setScalar(s)
      }
    })
  }

  dispose() {
    this.clear()
  }
}
