import { describe, it, expect } from 'vitest'
import * as THREE from 'three'
import { computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh'
import { DeviceRenderer } from './DeviceRenderer'
import type { RawDevice, DeviceMapping, DeviceStatus, DeviceType } from '@/types'

// geometryFactory.ts calls geometry.computeBoundsTree() unconditionally; that
// method only exists once three-mesh-bvh's prototype patch has run (normally
// triggered as a side effect of importing interaction/RaycastManager.ts,
// which this benchmark doesn't touch).
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree

const TYPES: DeviceType[] = [
  'server', 'switch', 'router', 'firewall', 'database',
  'storage', 'vm', 'container', 'load_balancer', 'access_point',
]
const STATUSES: DeviceStatus[] = ['normal', 'normal', 'normal', 'warning', 'critical', 'offline']

function buildSyntheticDataset(count: number) {
  const devices: RawDevice[] = []
  const mappings = new Map<string, DeviceMapping>()
  for (let i = 0; i < count; i++) {
    const id = `dev-${i}`
    devices.push({
      id, source: 'bench', externalId: id,
      hostname: `host-${i}`, ip: `10.${Math.floor(i / 65536) % 256}.${Math.floor(i / 256) % 256}.${i % 256}`,
      normalizedType: TYPES[i % TYPES.length],
      status: STATUSES[i % STATUSES.length],
    })
    const col = i % 20
    const row = Math.floor(i / 20)
    const mapId = `map-${id}`
    mappings.set(mapId, {
      id: mapId, rawDeviceId: id, mappingStatus: 'mapped',
      position: { x: col * 2, y: 0.4, z: row * 2.2 },
    })
  }
  return { devices, mappings }
}

describe('DeviceRenderer scalability benchmark', () => {
  it('builds a 3,000-device instanced scene within a generous CI time budget', () => {
    const { devices, mappings } = buildSyntheticDataset(3000)

    // O(1) lookup, mirroring what a well-indexed host integration would do —
    // isolates the renderer's own cost from the naive linear-scan helper the
    // editor store itself uses (getMappingByDeviceId in stores/editor.ts).
    const byDeviceId = new Map<string, DeviceMapping>()
    mappings.forEach((m) => byDeviceId.set(m.rawDeviceId, m))
    const getMappingByDeviceId = (id: string) => byDeviceId.get(id)

    const scene = new THREE.Scene()
    const renderer = new DeviceRenderer(scene)

    const start = performance.now()
    renderer.loadInstanced(devices, mappings, getMappingByDeviceId)
    const elapsedMs = performance.now() - start

    // This runs in jsdom on CPU, not a real browser/GPU frame budget — it is
    // NOT a substitute for a real-device PoC benchmark (review report §5/§12).
    // It exists to (a) catch an accidental O(n²) regression and (b) give the
    // scalability section a measured number instead of zero.
    // eslint-disable-next-line no-console
    console.log(`[bench] DeviceRenderer.loadInstanced(3000 devices) = ${elapsedMs.toFixed(1)}ms (jsdom/CPU)`)
    expect(elapsedMs).toBeLessThan(3000)

    const totalInstances = renderer.getInstancedMeshes().reduce((sum, m) => sum + m.count, 0)
    expect(totalInstances).toBe(3000)
    // One InstancedMesh per device *type*, not per device — the actual lever
    // that keeps draw calls flat as device count grows.
    expect(renderer.getInstancedMeshes().length).toBeLessThanOrEqual(TYPES.length)

    renderer.dispose()
  })
})
