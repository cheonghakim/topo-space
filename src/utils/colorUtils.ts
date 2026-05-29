import * as THREE from 'three'
import type { DeviceStatus, DeviceType, EdgeType } from '@/types'

export const STATUS_COLOR_HEX: Record<DeviceStatus, string> = {
  normal:       '#22c55e',
  warning:      '#eab308',
  critical:     '#ef4444',
  offline:      '#374151',
  unknown:      '#6b7280',
  maintenance:  '#3b82f6',
  acknowledged: '#f59e0b',
  stale:        '#78716c',
}

export const STATUS_COLOR_THREE: Record<DeviceStatus, THREE.Color> = Object.fromEntries(
  Object.entries(STATUS_COLOR_HEX).map(([k, v]) => [k, new THREE.Color(v)])
) as Record<DeviceStatus, THREE.Color>

export const DEVICE_TYPE_COLOR: Record<DeviceType, string> = {
  server:        '#3b82f6',
  switch:        '#10b981',
  router:        '#f59e0b',
  firewall:      '#ef4444',
  database:      '#8b5cf6',
  storage:       '#06b6d4',
  vm:            '#64748b',
  container:     '#475569',
  load_balancer: '#f97316',
  access_point:  '#84cc16',
  cloud_service: '#a78bfa',
  unknown:       '#6b7280',
}

export const LINK_STYLE: Record<EdgeType, { color: string; dashed: boolean; opacity: number }> = {
  physical:           { color: '#3b82f6', dashed: false, opacity: 0.85 },
  logical:            { color: '#8b5cf6', dashed: true,  opacity: 0.65 },
  service_dependency: { color: '#f59e0b', dashed: true,  opacity: 0.65 },
  traffic_flow:       { color: '#22c55e', dashed: false, opacity: 0.75 },
  security_path:      { color: '#ef4444', dashed: false, opacity: 0.85 },
  manual:             { color: '#94a3b8', dashed: true,  opacity: 0.55 },
  inferred:           { color: '#475569', dashed: true,  opacity: 0.40 },
}

export const DEVICE_TYPE_ABBR: Record<DeviceType, string> = {
  server:        'SRV',
  switch:        'SW',
  router:        'RTR',
  firewall:      'FW',
  database:      'DB',
  storage:       'STG',
  vm:            'VM',
  container:     'CTR',
  load_balancer: 'LB',
  access_point:  'AP',
  cloud_service: 'CLD',
  unknown:       'UNK',
}

export const DEVICE_TYPE_LABEL: Record<DeviceType, string> = {
  server:        'Server',
  switch:        'Switch',
  router:        'Router',
  firewall:      'Firewall',
  database:      'Database',
  storage:       'Storage',
  vm:            'VM',
  container:     'Container',
  load_balancer: 'Load Balancer',
  access_point:  'Access Point',
  cloud_service: 'Cloud',
  unknown:       'Unknown',
}

export const STATUS_LABEL: Record<DeviceStatus, string> = {
  normal:       'Normal',
  warning:      'Warning',
  critical:     'Critical',
  offline:      'Offline',
  unknown:      'Unknown',
  maintenance:  'Maintenance',
  acknowledged: 'Acknowledged',
  stale:        'Stale',
}
