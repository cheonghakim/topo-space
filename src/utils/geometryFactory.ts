import * as THREE from 'three'
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
    case 'router':
      geo = new THREE.CylinderGeometry(0.28, 0.28, 0.12, 10)
      break
    case 'database':
      geo = new THREE.CylinderGeometry(0.28, 0.28, 0.50, 10)
      break
    case 'load_balancer':
      geo = new THREE.OctahedronGeometry(0.24)
      break
    case 'access_point':
      geo = new THREE.SphereGeometry(0.20, 8, 6)
      break
    case 'cloud_service':
      geo = new THREE.SphereGeometry(0.30, 10, 8)
      break
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
