import * as THREE from 'three'
import type { DeviceType } from '@/types'

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

const _cache = new Map<DeviceType, THREE.BufferGeometry>()

export function getDeviceGeometry(type: DeviceType): THREE.BufferGeometry {
  if (_cache.has(type)) return _cache.get(type)!

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
      const [w, h, d] = DEVICE_SIZE[type]
      geo = new THREE.BoxGeometry(w, h, d)
    }
  }

  _cache.set(type, geo)
  return geo
}

export function getDeviceHeight(type: DeviceType): number {
  return DEVICE_SIZE[type][1]
}

export function disposeGeometryCache() {
  _cache.forEach(geo => geo.dispose())
  _cache.clear()
}
