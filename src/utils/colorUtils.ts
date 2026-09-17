import * as THREE from 'three'
import { reactive } from 'vue'
import type { DeviceStatus, DeviceType, EdgeType } from '@/types'

const _DEFAULT_STATUS_COLOR_HEX: Record<DeviceStatus, string> = {
  normal:       '#22c55e',
  warning:      '#eab308',
  critical:     '#ef4444',
  offline:      '#94a3b8',
  unknown:      '#a1a1aa',
  maintenance:  '#3b82f6',
  acknowledged: '#f59e0b',
  stale:        '#78716c',
}

// Okabe–Ito inspired palette — status is told apart mainly by hue in the
// default set (green/yellow/red), which collapses for red-green colorblind
// users (~8% of men). This set relies on blue/yellow/vermillion instead,
// distinguishable under protanopia and deuteranopia.
const _COLORBLIND_STATUS_COLOR_HEX: Record<DeviceStatus, string> = {
  normal:       '#56b4e9',
  warning:      '#f0e442',
  critical:     '#e69f00',
  offline:      '#94a3b8',
  unknown:      '#8a8a8a',
  maintenance:  '#cc79a7',
  acknowledged: '#009e73',
  stale:        '#999999',
}

// Mutable — `applyColorMode` swaps these values in place at runtime so every
// module that captured a reference to this object (canvas renderers,
// THREE.Color instances below) sees the new palette without re-importing.
export const STATUS_COLOR_HEX: Record<DeviceStatus, string> = reactive({ ..._DEFAULT_STATUS_COLOR_HEX })

export const STATUS_COLOR_THREE: Record<DeviceStatus, THREE.Color> = Object.fromEntries(
  Object.entries(STATUS_COLOR_HEX).map(([k, v]) => [k, new THREE.Color(v)])
) as Record<DeviceStatus, THREE.Color>

let _colorMode: 'default' | 'colorblind' = 'default'

export function getColorMode(): 'default' | 'colorblind' {
  return _colorMode
}

export function applyColorMode(mode: 'default' | 'colorblind') {
  _colorMode = mode
  const source = mode === 'colorblind' ? _COLORBLIND_STATUS_COLOR_HEX : _DEFAULT_STATUS_COLOR_HEX
  ;(Object.keys(source) as DeviceStatus[]).forEach((status) => {
    STATUS_COLOR_HEX[status] = source[status]
    STATUS_COLOR_THREE[status].set(source[status])
  })
}

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

// Non-color status indicator (colorblind-safe redundancy) shown as a small
// badge above every non-normal device in the 3D scene — status must never be
// color-only there, since the instanced mesh color is the *only* other signal.
export const STATUS_ICON: Record<DeviceStatus, string> = {
  normal:       '',
  warning:      '▲',   // ▲
  critical:     '✕',   // ✕
  offline:      '⏻',   // ⏻
  unknown:      '?',
  maintenance:  '↻',   // ↻
  acknowledged: '✓',   // ✓
  stale:        '…',   // …
}

// ── Custom type registry (populated from useDeviceTypesStore) ─────────────────

let _customColors = new Map<string, string>()
let _customAbbrs  = new Map<string, string>()
let _customLabels = new Map<string, string>()

export function syncCustomTypes(types: Map<string, import('@/types').CustomDeviceType>) {
  _customColors.clear(); _customAbbrs.clear(); _customLabels.clear()
  types.forEach(t => {
    _customColors.set(t.id, t.color)
    _customAbbrs.set(t.id, t.abbr)
    _customLabels.set(t.id, t.label)
  })
}

export function getTypeColor(type: string): string {
  return _customColors.get(type) ?? (DEVICE_TYPE_COLOR as Record<string, string>)[type] ?? '#6b7280'
}

export function getTypeAbbr(type: string): string {
  return _customAbbrs.get(type) ?? (DEVICE_TYPE_ABBR as Record<string, string>)[type] ?? type.slice(0, 4).toUpperCase()
}

export function getTypeLabel(type: string): string {
  return _customLabels.get(type) ?? (DEVICE_TYPE_LABEL as Record<string, string>)[type] ?? type
}
