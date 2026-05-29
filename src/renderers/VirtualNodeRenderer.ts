import * as THREE from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import type { VirtualNode } from '@/types'

const TYPE_COLORS: Record<string, { color: number; emissive: number }> = {
  internet: { color: 0x0088ff, emissive: 0x001133 },
  cloud:    { color: 0x7c3aed, emissive: 0x1a0033 },
  external: { color: 0xf59e0b, emissive: 0x1a0a00 },
  custom:   { color: 0x22c55e, emissive: 0x001a00 },
}

const TYPE_ICONS: Record<string, string> = {
  internet: '🌐',
  cloud:    '☁',
  external: '↔',
  custom:   '◆',
}

interface VNodeObj { group: THREE.Group; hitMesh: THREE.Mesh }

export class VirtualNodeRenderer {
  private scene:   THREE.Scene
  private objects  = new Map<string, VNodeObj>()

  constructor(scene: THREE.Scene) { this.scene = scene }

  loadNodes(nodes: VirtualNode[]) {
    nodes.forEach(n => this.addNode(n))
  }

  addNode(node: VirtualNode) {
    if (this.objects.has(node.id)) return
    const cols = TYPE_COLORS[node.type] ?? TYPE_COLORS.custom
    const group = new THREE.Group()
    const pos = node.position ?? { x: 0, y: 0, z: 0 }
    group.position.set(pos.x, pos.y, pos.z)
    group.userData.virtualNodeId = node.id

    // Main sphere
    const geo = node.type === 'cloud'
      ? new THREE.SphereGeometry(0.85, 12, 10)
      : new THREE.IcosahedronGeometry(0.7, 1)
    const mat = new THREE.MeshStandardMaterial({
      color: cols.color,
      emissive: cols.emissive,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.5,
      transparent: true,
      opacity: 0.82,
      wireframe: node.type === 'internet',
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.y = 1.2
    group.add(mesh)

    // Outer glow ring
    const ringGeo = new THREE.RingGeometry(0.95, 1.1, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: cols.color,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.05
    group.add(ring)

    // Label
    const el = document.createElement('div')
    el.style.cssText = `color:#cbd5e1;font-size:11px;font-family:monospace;
      background:rgba(9,13,24,.85);border:1px solid #2a4a8a;border-radius:5px;
      padding:2px 8px;pointer-events:none;white-space:nowrap;`
    el.textContent = `${TYPE_ICONS[node.type] ?? '◆'} ${node.label}`
    const label = new CSS2DObject(el)
    label.position.set(0, 2.5, 0)
    group.add(label)

    // Hit mesh (invisible, for raycasting)
    const hitMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 8, 8),
      new THREE.MeshBasicMaterial({ visible: false }),
    )
    hitMesh.position.y = 1.2
    hitMesh.userData.virtualNodeId = node.id
    group.add(hitMesh)

    this.scene.add(group)
    this.objects.set(node.id, { group, hitMesh })
  }

  removeNode(id: string) {
    const obj = this.objects.get(id)
    if (!obj) return
    this.scene.remove(obj.group)
    this.objects.delete(id)
  }

  getHitMeshes(): THREE.Mesh[] {
    return [...this.objects.values()].map(o => o.hitMesh)
  }

  getNodeWorldPos(id: string): THREE.Vector3 | null {
    const obj = this.objects.get(id)
    if (!obj) return null
    return obj.group.position.clone().setY(1.2)
  }

  update(elapsed: number) {
    this.objects.forEach(({ group }) => {
      // Slowly rotate
      const sphere = group.children[0] as THREE.Mesh
      if (sphere) sphere.rotation.y = elapsed * 0.4
      // Ring pulse
      const ring = group.children[1] as THREE.Mesh
      if (ring) {
        const mat = ring.material as THREE.MeshBasicMaterial
        mat.opacity = 0.25 + 0.15 * Math.abs(Math.sin(elapsed * 1.5))
        const s = 1 + 0.08 * Math.sin(elapsed * 2.2)
        ring.scale.setScalar(s)
      }
    })
  }

  dispose() {
    this.objects.forEach(({ group }) => this.scene.remove(group))
    this.objects.clear()
  }
}
