import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import type { DeviceType, CustomDeviceType } from '@/types'
import { loadModel } from '@/utils/modelStorage'
import { loadGltfGeometry } from '@/utils/modelLoader'

const DEVICE_SIZE: Record<DeviceType, [number, number, number]> = {
  server:        [0.80, 0.12, 0.50],
  switch:        [1.00, 0.06, 0.50],
  router:        [0.60, 0.60, 0.60],
  firewall:      [0.80, 0.20, 0.50],
  database:      [0.60, 0.60, 0.60],
  storage:       [1.20, 0.30, 0.55],
  vm:            [0.60, 0.07, 0.38],
  container:     [0.45, 0.06, 0.30],
  load_balancer: [0.50, 0.50, 0.50],  // octahedron
  access_point:  [0.40, 0.40, 0.40],  // sphere
  cloud_service: [0.70, 0.70, 0.70],  // sphere
  unknown:       [0.60, 0.10, 0.40],
}

// Compound built-in silhouettes — a few primitives merged into one static
// geometry per type, so InstancedMesh keeps working unchanged (still one
// draw call per type) while types read as visually distinct at a glance.
function buildServerGeometry(): THREE.BufferGeometry {
  const [w, h, d] = DEVICE_SIZE.server
  const body = new THREE.BoxGeometry(w, h, d)
  const earW = 0.06, earH = h * 1.8, earD = 0.10
  const earZ = d / 2 - earD / 2
  const earL = new THREE.BoxGeometry(earW, earH, earD).translate(-(w / 2 + earW / 2 - 0.01), 0, earZ)
  const earR = new THREE.BoxGeometry(earW, earH, earD).translate( (w / 2 + earW / 2 - 0.01), 0, earZ)
  const ledGeo = () => new THREE.BoxGeometry(0.03, 0.03, 0.02)
  const leds = [0, 1, 2].map(i => ledGeo().translate(-w / 2 + 0.12 + i * 0.06, h / 2 + 0.015, d / 2 - 0.02))
  return mergeGeometries([body, earL, earR, ...leds])
}

function buildSwitchGeometry(): THREE.BufferGeometry {
  const [w, h, d] = DEVICE_SIZE.switch
  const body = new THREE.BoxGeometry(w, h, d)
  const parts: THREE.BufferGeometry[] = [body]
  const portCount = 8
  const portW = 0.06, portH = h * 0.9, portD = 0.05
  const spacing = w / (portCount + 1)
  for (let i = 0; i < portCount; i++) {
    const x = -w / 2 + spacing * (i + 1)
    parts.push(new THREE.BoxGeometry(portW, portH, portD).translate(x, h / 2 + portH * 0.3, d / 2 - portD / 2))
  }
  return mergeGeometries(parts)
}

function buildRouterGeometry(): THREE.BufferGeometry {
  const baseR = 0.28, baseH = 0.12
  const base = new THREE.CylinderGeometry(baseR, baseR * 1.05, baseH, 10)
  const antH = 0.30, antR = 0.018
  const antL = new THREE.CylinderGeometry(antR, antR, antH, 6)
    .rotateZ(THREE.MathUtils.degToRad(18))
    .translate(-baseR * 0.5, baseH / 2 + antH * 0.42, 0)
  const antRt = new THREE.CylinderGeometry(antR, antR, antH, 6)
    .rotateZ(THREE.MathUtils.degToRad(-18))
    .translate(baseR * 0.5, baseH / 2 + antH * 0.42, 0)
  return mergeGeometries([base, antL, antRt])
}

function buildFirewallGeometry(): THREE.BufferGeometry {
  const [w, h, d] = DEVICE_SIZE.firewall
  const body = new THREE.BoxGeometry(w, h, d)
  const stripW = w * 0.85, stripH = 0.03, stripD = 0.14
  const strip = new THREE.BoxGeometry(stripW, stripH, stripD)
    .rotateX(THREE.MathUtils.degToRad(-25))
    .translate(0, h / 2 + 0.03, d / 2 - 0.10)
  return mergeGeometries([body, strip])
}

function buildDatabaseGeometry(): THREE.BufferGeometry {
  const r = 0.30, discH = 0.12, gap = 0.05, n = 3
  const stackH = n * discH + (n - 1) * gap
  const parts: THREE.BufferGeometry[] = []
  let y = -stackH / 2 + discH / 2
  for (let i = 0; i < n; i++) {
    parts.push(new THREE.CylinderGeometry(r, r, discH, 12).translate(0, y, 0))
    y += discH + gap
  }
  return mergeGeometries(parts)
}

function buildStorageGeometry(): THREE.BufferGeometry {
  const [w, h, d] = DEVICE_SIZE.storage
  const body = new THREE.BoxGeometry(w, h, d)
  const parts: THREE.BufferGeometry[] = [body]
  const bays = 6, bayW = 0.05, bayH = h * 0.75, bayD = 0.03
  const spacing = w / (bays + 1)
  for (let i = 0; i < bays; i++) {
    const x = -w / 2 + spacing * (i + 1)
    parts.push(new THREE.BoxGeometry(bayW, bayH, bayD).translate(x, 0, d / 2 - bayD / 2))
  }
  return mergeGeometries(parts)
}

function buildVmGeometry(): THREE.BufferGeometry {
  const [w, h, d] = DEVICE_SIZE.vm
  const layerH = h * 0.7, gap = 0.03
  const l1 = new THREE.BoxGeometry(w, layerH, d).translate(0, -layerH / 2 - gap / 2, 0)
  const l2 = new THREE.BoxGeometry(w * 0.85, layerH, d * 0.85).translate(0.02, layerH / 2 + gap / 2, 0)
  return mergeGeometries([l1, l2])
}

function buildContainerGeometry(): THREE.BufferGeometry {
  const [w, h, d] = DEVICE_SIZE.container
  const layerH = h * 0.8, gap = 0.02
  const l1 = new THREE.BoxGeometry(w, layerH, d).translate(0, -layerH / 2 - gap / 2, 0)
  const l2 = new THREE.BoxGeometry(w, layerH, d).translate(0,  layerH / 2 + gap / 2, 0)
  return mergeGeometries([l1, l2])
}

function buildAccessPointGeometry(): THREE.BufferGeometry {
  const r = 0.22
  const dome = new THREE.SphereGeometry(r, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2).translate(0, -0.02, 0)
  const base = new THREE.CylinderGeometry(r * 0.9, r * 0.9, 0.02, 12).translate(0, -0.03, 0)
  return mergeGeometries([dome, base])
}

function buildCloudGeometry(): THREE.BufferGeometry {
  const parts = [
    new THREE.SphereGeometry(0.20, 10, 8),
    new THREE.SphereGeometry(0.15, 8, 6).translate(-0.18, -0.03, 0),
    new THREE.SphereGeometry(0.15, 8, 6).translate( 0.18, -0.03, 0),
    new THREE.SphereGeometry(0.13, 8, 6).translate(0,  0.10,  0.08),
    new THREE.SphereGeometry(0.12, 8, 6).translate(0, -0.08, -0.10),
  ]
  return mergeGeometries(parts)
}

const _cache = new Map<string, THREE.BufferGeometry>()

let _customGeoRegistry = new Map<string, CustomDeviceType>()

export function syncCustomGeometries(types: Map<string, CustomDeviceType>) {
  // Dispose and evict any previously cached custom geometries
  _customGeoRegistry.forEach((_, id) => {
    const geo = _cache.get(id)
    if (geo) { geo.disposeBoundsTree?.(); geo.dispose(); _cache.delete(id) }
  })
  _customGeoRegistry = new Map(types)
}

export function getDeviceGeometry(type: string): THREE.BufferGeometry {
  if (_cache.has(type)) return _cache.get(type)!

  // Custom type
  const custom = _customGeoRegistry.get(type)
  if (custom) {
    if (custom.hasModel) {
      // Model not yet loaded (preloadCustomModels hasn't run) — use box placeholder.
      // The placeholder is cached so subsequent calls are cheap; rebuildAll() after
      // preloadCustomModels overwrites this entry with the actual geometry.
      const geo = new THREE.BoxGeometry(custom.w, custom.h, custom.d)
      geo.computeBoundsTree()
      _cache.set(type, geo)
      return geo
    }
    let geo: THREE.BufferGeometry
    switch (custom.shape) {
      case 'cylinder':   geo = new THREE.CylinderGeometry(custom.w / 2, custom.w / 2, custom.h, 10); break
      case 'sphere':     geo = new THREE.SphereGeometry(custom.w / 2, 10, 8); break
      case 'octahedron': geo = new THREE.OctahedronGeometry(custom.w / 2); break
      default:           geo = new THREE.BoxGeometry(custom.w, custom.h, custom.d)
    }
    geo.computeBoundsTree()
    _cache.set(type, geo)
    return geo
  }

  let geo: THREE.BufferGeometry
  switch (type) {
    case 'server':        geo = buildServerGeometry(); break
    case 'switch':        geo = buildSwitchGeometry(); break
    case 'router':        geo = buildRouterGeometry(); break
    case 'firewall':      geo = buildFirewallGeometry(); break
    case 'database':      geo = buildDatabaseGeometry(); break
    case 'storage':       geo = buildStorageGeometry(); break
    case 'vm':             geo = buildVmGeometry(); break
    case 'container':     geo = buildContainerGeometry(); break
    case 'load_balancer': geo = new THREE.OctahedronGeometry(0.24); break
    case 'access_point':  geo = buildAccessPointGeometry(); break
    case 'cloud_service': geo = buildCloudGeometry(); break
    default: {
      const size = (DEVICE_SIZE as Record<string, [number, number, number]>)[type] ?? [0.60, 0.10, 0.40]
      geo = new THREE.BoxGeometry(size[0], size[1], size[2])
    }
  }

  geo.computeBoundsTree()
  _cache.set(type, geo)
  return geo
}

export function getDeviceHeight(type: string): number {
  const custom = _customGeoRegistry.get(type)
  if (custom) return custom.h
  return (DEVICE_SIZE as Record<string, [number, number, number]>)[type]?.[1] ?? 0.1
}

export async function preloadCustomModels(types: Map<string, CustomDeviceType>): Promise<void> {
  const pending: Promise<void>[] = []
  types.forEach((type) => {
    if (!type.hasModel) return
    if (_cache.has(type.id)) return   // already loaded this session
    pending.push((async () => {
      try {
        const data = await loadModel(type.id)
        if (!data) return
        const geo = await loadGltfGeometry(data)
        if (!geo) return
        geo.computeBoundsTree()
        _cache.set(type.id, geo)      // overwrite any placeholder
      } catch (e) {
        console.warn(`[geometryFactory] Failed to preload model "${type.id}":`, e)
      }
    })())
  })
  if (pending.length) await Promise.all(pending)
}

export function disposeGeometryCache() {
  _cache.forEach(geo => { geo.disposeBoundsTree(); geo.dispose() })
  _cache.clear()
}
