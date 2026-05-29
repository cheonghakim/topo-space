// ─── 기초 ──────────────────────────────────────────────────────────────────

export interface Vector3Like { x: number; y: number; z: number }
export interface Size3D { width: number; height: number; depth: number }

export type DeviceStatus =
  | 'normal' | 'warning' | 'critical' | 'offline'
  | 'unknown' | 'maintenance' | 'acknowledged' | 'stale'

export type DeviceType =
  | 'server' | 'switch' | 'router' | 'firewall'
  | 'database' | 'storage' | 'vm' | 'container'
  | 'load_balancer' | 'access_point' | 'cloud_service' | 'unknown'

export type SpaceType =
  | 'site' | 'zone' | 'rack' | 'custom_group'
  | 'security_zone' | 'service' | 'external' | 'cloud'

export type EdgeType =
  | 'physical' | 'logical' | 'service_dependency'
  | 'traffic_flow' | 'security_path' | 'manual' | 'inferred'

export type EditorMode = 'view' | 'edit'

export type EditorAction =
  | 'view'
  | 'layout:update'
  | 'space:create' | 'space:update' | 'space:delete'
  | 'device:map' | 'device:unmap'
  | 'annotation:create' | 'annotation:update' | 'annotation:delete'
  | 'topology:createLink' | 'topology:updateLink' | 'topology:deleteLink'
  | 'virtualNode:create' | 'rawDevice:update'

// ─── 원본 데이터 (읽기 전용) ────────────────────────────────────────────────

export interface DeviceMetrics {
  cpu?: number
  memory?: number
  disk?: number
  networkIn?: number
  networkOut?: number
  temperature?: number
  [key: string]: number | undefined
}

export interface RawDevice {
  id: string
  source: string
  externalId: string
  hostname?: string
  ip?: string
  mac?: string
  normalizedType?: DeviceType
  vendor?: string
  model?: string
  os?: string
  status?: DeviceStatus
  metrics?: DeviceMetrics
  tenantId?: string
  customerId?: string
  siteId?: string
  firstSeenAt?: string
  lastSeenAt?: string
  syncState?: 'active' | 'missing' | 'stale' | 'archived'
  externalUrl?: string
  metadata?: Record<string, unknown>
}

export interface NetworkInterface {
  id: string
  rawDeviceId: string
  name: string
  alias?: string
  mac?: string
  ip?: string
  status?: 'up' | 'down' | 'unknown'
  speed?: number
  trafficIn?: number
  trafficOut?: number
  errors?: number
  discards?: number
}

export interface NetworkLink {
  id: string
  sourceDeviceId: string
  targetDeviceId: string
  sourceInterfaceId?: string
  targetInterfaceId?: string
  type: EdgeType
  status?: 'up' | 'down' | 'unknown'
  bandwidth?: number
  source: 'discovered' | 'manual' | 'cmdb' | 'inferred'
  confidence?: 'high' | 'medium' | 'low'
  lastUpdatedAt?: string
  label?: string
  memo?: string
  midX?: number    // Manhattan routing의 중간 corner X좌표 (수직선 위치)
  midZ?: number    // Manhattan routing의 중간 corner Z좌표 (수평선 위치)
}

// ─── Toast ──────────────────────────────────────────────────────────────────

export interface Toast {
  id:        string
  message:   string
  type:      'info' | 'warning' | 'critical' | 'success'
  timestamp: number
}

// ─── 표현/편집 레이어 ────────────────────────────────────────────────────────

export interface Space {
  id: string
  name: string
  kind: 'physical' | 'logical' | 'virtual'
  type: SpaceType
  parentId?: string
  source: 'manual' | 'api' | 'cmdb' | 'import'
  externalId?: string
  position?: Vector3Like
  rotation?: Vector3Like
  size?: Size3D
  color?: string
  archived?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface DeviceMapping {
  id: string
  rawDeviceId: string
  primarySpaceId?: string
  slotIndex?: number
  mappingStatus: 'unmapped' | 'auto_mapped' | 'mapped' | 'needs_review' | 'ignored' | 'orphaned'
  displayName?: string
  visualType?: DeviceType
  position?: Vector3Like
  rotation?: Vector3Like
  tags?: string[]
  memo?: string
  importance?: 'low' | 'normal' | 'high' | 'critical'
  operatorState?: OperatorState
  updatedAt?: string
  updatedBy?: string
}

export interface OperatorState {
  acknowledged?: boolean
  acknowledgedBy?: string
  acknowledgedAt?: string
  maintenanceMode?: boolean
  maintenanceUntil?: string
  suppressed?: boolean
  memo?: string
}

// ─── 변경 이벤트 ─────────────────────────────────────────────────────────────

export type EditorChangeType =
  | 'layout.update'
  | 'space.create' | 'space.update' | 'space.archive'
  | 'device.map' | 'device.unmap'
  | 'annotation.update'
  | 'topology.link.create' | 'topology.link.update' | 'topology.link.delete'

export interface EditorChange {
  id: string
  type: EditorChangeType
  targetType: 'device' | 'space' | 'link'
  targetId: string
  before?: unknown
  after?: unknown
  source: 'user' | 'api' | 'import'
  timestamp: string
}

export interface EditorSnapshot {
  version: string
  timestamp: string
  spaces: Space[]
  deviceMappings: DeviceMapping[]
  manualLinks: NetworkLink[]
}

// ─── Feature Flags ──────────────────────────────────────────────────────────

export interface FeatureFlags {
  view?: boolean
  search?: boolean
  filter?: boolean
  deviceDetail?: boolean
  topologyView?: boolean
  topologyEdit?: boolean
  realtimeUpdate?: boolean
  savedView?: boolean
  layoutEdit?: boolean
  spaceEdit?: boolean
  annotationEdit?: boolean
  import?: boolean
}

export const DEFAULT_FEATURES: Required<FeatureFlags> = {
  view: true,
  search: true,
  filter: true,
  deviceDetail: true,
  topologyView: true,
  topologyEdit: false,
  realtimeUpdate: true,
  savedView: false,
  layoutEdit: false,
  spaceEdit: false,
  annotationEdit: false,
  import: false,
}

// ─── Permission ──────────────────────────────────────────────────────────────

export interface PermissionContext {
  action: EditorAction
  target?: { id?: string; spaceId?: string; siteId?: string }
  userContext?: Record<string, unknown>
  currentMode?: EditorMode
}

export type PermissionResolver = (ctx: PermissionContext) => boolean

// ─── Selection ───────────────────────────────────────────────────────────────

export interface SelectionTarget {
  type: 'device' | 'space' | 'link'
  id: string
}

// ─── Filter ──────────────────────────────────────────────────────────────────

export interface FilterState {
  search: string
  status: DeviceStatus[]
  type: DeviceType[]
  spaceId: string | null
  tags: string[]
  showUnmapped: boolean
}

export const DEFAULT_FILTER: FilterState = {
  search: '',
  status: [],
  type: [],
  spaceId: null,
  tags: [],
  showUnmapped: true,
}

// ─── Virtual Node ────────────────────────────────────────────────────────────

export interface VirtualNode {
  id:          string
  label:       string
  description?: string
  type:        'internet' | 'cloud' | 'external' | 'custom'
  position?:   Vector3Like
  spaceId?:    string
  tags?:       string[]
  createdAt?:  string
}

// ─── Saved View ──────────────────────────────────────────────────────────────

export interface SavedView {
  id:           string
  name:         string
  cameraPos:    Vector3Like
  cameraTarget: Vector3Like
  filters?:     Partial<FilterState>
  createdAt:    string
}

// ─── 링크 생성 상태 ──────────────────────────────────────────────────────────

export interface LinkDraftState {
  active: boolean
  sourceDeviceId: string | null
}
