import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import type { DeviceType, CustomDeviceType } from '@/types'
import { loadModel } from '@/utils/modelStorage'
import { loadGltfGeometry } from '@/utils/modelLoader'

// A consistent family of network appliances. Type is encoded by the lid symbol
// and front-panel layout; status color is supplied by the instance material.
const DEVICE_SIZE: Record<DeviceType, [number, number, number]> = {
  server: [0.80, 0.22, 0.50], switch: [1.00, 0.18, 0.50],
  router: [0.80, 0.22, 0.50], firewall: [0.80, 0.24, 0.50],
  database: [0.65, 0.30, 0.55], storage: [1.20, 0.30, 0.55],
  vm: [0.60, 0.16, 0.38], container: [0.50, 0.16, 0.35],
  load_balancer: [0.80, 0.22, 0.50], access_point: [0.55, 0.16, 0.50],
  cloud_service: [0.70, 0.22, 0.50], unknown: [0.60, 0.18, 0.40],
}

function shade(geo: THREE.BufferGeometry, value = 1): THREE.BufferGeometry {
  geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(geo.getAttribute('position').count * 3).fill(value), 3))
  return geo
}

function assemble(parts: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const normalized = parts.map(part => part.index ? part.toNonIndexed() : part)
  const result = mergeGeometries(normalized)
  normalized.forEach((part, i) => { if (part !== parts[i]) part.dispose() })
  parts.forEach(part => part.dispose())
  return result
}

// Small relief pictograms share the same stroke weight and monochrome finish.
const LID_SYMBOLS: Record<DeviceType, string[]> = {
  server: ['11111', '10001', '11111', '10001', '11111'],
  switch: ['10101', '11111', '00100', '11111', '10101'],
  router: ['00100', '01110', '11111', '01110', '00100'],
  firewall: ['11111', '10101', '11111', '01110', '00100'],
  database: ['01110', '10001', '11111', '10001', '01110'],
  storage: ['11111', '10101', '10101', '10101', '11111'],
  vm: ['11110', '10010', '10111', '11101', '00111'],
  container: ['11111', '10101', '10101', '10101', '11111'],
  load_balancer: ['00100', '11111', '10101', '10101', '10101'],
  access_point: ['01110', '10001', '00100', '01010', '00100'],
  cloud_service: ['01100', '10010', '10001', '10001', '01110'],
  unknown: ['01110', '10001', '00110', '00000', '00100'],
}

function buildAppliance(type: DeviceType): THREE.BufferGeometry {
  const [w, h, d] = DEVICE_SIZE[type]
  const parts: THREE.BufferGeometry[] = [shade(new RoundedBoxGeometry(w, h, d, 2, 0.025), 0.9)]
  const front = d / 2
  const bays = type === 'switch' ? 8 : type === 'storage' ? 6 : type === 'unknown' ? 1 : 4
  const pitch = w * 0.76 / bays
  parts.push(shade(new THREE.BoxGeometry(w * 0.92, h * 0.72, 0.012).translate(0, 0, front), 0.22))
  for (let i = 0; i < bays; i++) {
    const x = -w * 0.38 + pitch * (i + 0.5)
    parts.push(shade(new THREE.BoxGeometry(pitch * 0.82, h * 0.52, 0.018).translate(x, 0, front + 0.013), 0.6))
    parts.push(shade(new THREE.BoxGeometry(pitch * 0.6, h * 0.20, 0.009).translate(x, 0, front + 0.026), 0.16))
    parts.push(shade(new THREE.BoxGeometry(0.016, 0.012, 0.01).translate(x, h * 0.22, front + 0.03), 1.4))
  }
  // Dark inset and raised symbol are readable from both plan and perspective views.
  const unit = Math.min(w, d) * 0.095
  parts.push(shade(new RoundedBoxGeometry(unit * 6.4, 0.008, unit * 6.4, 1, 0.003).translate(-w * 0.12, h / 2, 0), 0.24))
  LID_SYMBOLS[type].forEach((row, z) => {
    for (let x = 0; x < row.length; x++) if (row[x] === '1') {
      parts.push(shade(new THREE.BoxGeometry(unit * 0.85, 0.008, unit * 0.85).translate((x - 2) * unit - w * 0.12, h / 2 + 0.008, (z - 2) * unit), 1.35))
    }
  })
  for (let i = 0; i < 5; i++) parts.push(shade(new THREE.BoxGeometry(w * 0.16, 0.003, 0.012).translate(w * 0.32, h / 2, -0.07 + i * 0.035), 0.28))
  return assemble(parts)
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

  const builtIn = Object.prototype.hasOwnProperty.call(DEVICE_SIZE, type) ? type as DeviceType : 'unknown'
  const geo = buildAppliance(builtIn)

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
