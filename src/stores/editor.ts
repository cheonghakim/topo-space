import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { PermissionGuard } from '@/core/PermissionGuard'
import type {
  RawDevice, Space, DeviceMapping, NetworkLink,
  NetworkInterface, DeviceStatus, DeviceMetrics,
  VirtualNode, BackgroundObject, SavedView, EditorSnapshot,
  EditorAction, EditorData, EditorMode, FeatureFlags,
  PermissionContext, PermissionResolver, OperatorState,
  EditorEventPayload,
} from '@/types'
import { generateMockData } from '@/utils/mockDataGenerator'

export const useEditorStore = defineStore('editor', () => {
  // Permissive bootstrap defaults used until a host explicitly calls
  // configureSecurity({ features }) — covers local dev (main.ts mounts App.vue
  // directly, with no createNmsEditor/features config at all) and any ad-hoc
  // `createNmsEditor({ container })` call that skips `features`. A production
  // embed that wants a locked-down/read-only editor must pass `features`
  // explicitly, same as it already must to disable topologyEdit/import/etc.
  const guard = new PermissionGuard({ topologyEdit: true, layoutEdit: true, spaceEdit: true, annotationEdit: true, import: true, backgroundEdit: true, chaosSimulator: true })
  let permissionDeniedHandler: ((ctx: PermissionContext) => void) | undefined
  let changeHandler: ((event: EditorEventPayload) => void) | undefined

  const devices    = ref<Map<string, RawDevice>>(new Map())
  const spaces     = ref<Map<string, Space>>(new Map())
  const mappings   = ref<Map<string, DeviceMapping>>(new Map())
  const links      = ref<Map<string, NetworkLink>>(new Map())
  const interfaces = ref<Map<string, NetworkInterface>>(new Map())

  const unmappedDevices  = ref<RawDevice[]>([])
  const virtualNodes     = ref<Map<string, VirtualNode>>(new Map())
  const backgroundObjects = ref<Map<string, BackgroundObject>>(new Map())
  const savedViews      = ref<SavedView[]>([])
  const changeLog       = ref<{ id: string; type: string; msg: string; ts: string }[]>([])

  function configureSecurity(input: {
    mode?: EditorMode
    features?: FeatureFlags
    permissionResolver?: PermissionResolver
    onPermissionDenied?: (ctx: PermissionContext) => void
    onChange?: (event: EditorEventPayload) => void
  }) {
    if (input.mode) guard.setMode(input.mode)
    if (input.features) guard.setFeatures(input.features)
    if (input.permissionResolver) guard.setResolver(input.permissionResolver)
    permissionDeniedHandler = input.onPermissionDenied
    changeHandler = input.onChange
  }

  function setEditorMode(mode: EditorMode) {
    guard.setMode(mode)
  }

  function can(action: EditorAction, target?: PermissionContext['target']): boolean {
    return guard.can(action, target)
  }

  function hasFeature(flag: Parameters<typeof guard.hasFeature>[0]): boolean {
    return guard.hasFeature(flag)
  }

  function deny(action: EditorAction, target?: PermissionContext['target']) {
    const ctx: PermissionContext = { action, target }
    permissionDeniedHandler?.(ctx)
  }

  function requirePermission(action: EditorAction, target?: PermissionContext['target']): boolean {
    const allowed = can(action, target)
    if (!allowed) deny(action, target)
    return allowed
  }

  function emitChange(type: string, target?: { id?: string; type?: string }, source: EditorEventPayload['source'] = 'user') {
    changeHandler?.({ type, target, source, timestamp: Date.now() })
  }

  // ── Computed ──────────────────────────────────────────────────────────────
  const mappedDeviceIds = computed(() => {
    const ids = new Set<string>()
    mappings.value.forEach(m => { if (m.mappingStatus === 'mapped' || m.mappingStatus === 'auto_mapped') ids.add(m.rawDeviceId) })
    return ids
  })

  const criticalCount = computed(() =>
    [...devices.value.values()].filter(d => d.status === 'critical').length)
  const warningCount = computed(() =>
    [...devices.value.values()].filter(d => d.status === 'warning').length)

  const devicesBySpace = computed(() => {
    const map = new Map<string, RawDevice[]>()
    mappings.value.forEach(m => {
      if (!m.primarySpaceId) return
      const dev = devices.value.get(m.rawDeviceId)
      if (!dev) return
      if (!map.has(m.primarySpaceId)) map.set(m.primarySpaceId, [])
      map.get(m.primarySpaceId)!.push(dev)
    })
    return map
  })

  const interfacesByDevice = computed(() => {
    const map = new Map<string, NetworkInterface[]>()
    interfaces.value.forEach(iface => {
      if (!map.has(iface.rawDeviceId)) map.set(iface.rawDeviceId, [])
      map.get(iface.rawDeviceId)!.push(iface)
    })
    return map
  })

  const rackSpaces = computed(() =>
    [...spaces.value.values()].filter(s => s.type === 'rack'))

  const allSpacesList = computed(() => [...spaces.value.values()])

  // A "root space" is any non-archived space with no parent — a legacy flat `site`,
  // or a new top-level `building` once the caller adopts the building/floor hierarchy.
  const rootSpaces = computed(() =>
    [...spaces.value.values()].filter(s => !s.parentId && !s.archived))

  function childSpaces(parentId: string): Space[] {
    return [...spaces.value.values()].filter(s => s.parentId === parentId && !s.archived)
  }

  // All space ids under (and including) a root space, walked via parentId.
  function descendantSpaceIds(rootId: string): Set<string> {
    const ids = new Set<string>([rootId])
    const queue = [rootId]
    while (queue.length) {
      const id = queue.shift()!
      childSpaces(id).forEach(c => {
        if (!ids.has(c.id)) { ids.add(c.id); queue.push(c.id) }
      })
    }
    return ids
  }

  // Scoped views used to feed the 3D scene. `rootId: null` returns everything —
  // this is what keeps datasets with no building/floor hierarchy behaving exactly
  // as they always have.
  function scopedSpaces(rootId: string | null): Space[] {
    if (!rootId) return [...spaces.value.values()].filter(s => !s.archived)
    const ids = descendantSpaceIds(rootId)
    return [...spaces.value.values()].filter(s => ids.has(s.id) && !s.archived)
  }

  function scopedDeviceIds(rootId: string | null): Set<string> {
    if (!rootId) return new Set(devices.value.keys())
    const ids = new Set<string>()
    descendantSpaceIds(rootId).forEach(sid => {
      (devicesBySpace.value.get(sid) ?? []).forEach(d => ids.add(d.id))
    })
    return ids
  }

  function scopedDevices(rootId: string | null): RawDevice[] {
    const ids = scopedDeviceIds(rootId)
    return [...devices.value.values()].filter(d => ids.has(d.id))
  }

  function scopedCriticalCount(rootId: string | null): number {
    return scopedDevices(rootId).filter(d => d.status === 'critical').length
  }

  function scopedWarningCount(rootId: string | null): number {
    return scopedDevices(rootId).filter(d => d.status === 'warning').length
  }

  function scopedLinks(rootId: string | null): NetworkLink[] {
    if (!rootId) return [...links.value.values()]
    const ids = scopedDeviceIds(rootId)
    return [...links.value.values()].filter(l => ids.has(l.sourceDeviceId) && ids.has(l.targetDeviceId))
  }

  function scopedBackgroundObjects(rootId: string | null): BackgroundObject[] {
    if (!rootId) return [...backgroundObjects.value.values()]
    const ids = descendantSpaceIds(rootId)
    return [...backgroundObjects.value.values()].filter(b => ids.has(b.spaceId))
  }

  // Spaces of these types are navigable scopes (a building's floors, a bare
  // top-level site) rather than in-scene content — the 3D scene must never be
  // scoped to one of these directly, since e.g. a building's floors reuse the
  // same local coordinate space and would overlap if loaded together.
  const CONTAINER_TYPES = new Set(['building', 'floor', 'site'])

  // Given any space id (a rack, a zone, a floor, a building — anything),
  // resolves the leaf floor/site scope that must be active in the 3D scene to
  // see it: walk up to the nearest container ancestor (or itself), then
  // descend through container children (e.g. a building) to its first floor.
  function resolveLeafScope(spaceId: string): string | null {
    let cur = spaces.value.get(spaceId)
    while (cur && !CONTAINER_TYPES.has(cur.type)) {
      cur = cur.parentId ? spaces.value.get(cur.parentId) : undefined
    }
    if (!cur) return null
    let id = cur.id
    for (;;) {
      const containerChild = childSpaces(id).find(c => CONTAINER_TYPES.has(c.type))
      if (!containerChild) return id
      id = containerChild.id
    }
  }

  // World-space bounding box of everything in scope, used to fly the camera
  // to frame a floor's actual content instead of a fixed default distance.
  function scopedBounds(rootId: string | null): { minX: number; maxX: number; minZ: number; maxZ: number } | null {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity
    scopedSpaces(rootId).forEach(s => {
      if (!s.position) return
      const sz = s.size ?? { width: 10, depth: 10 }
      minX = Math.min(minX, s.position.x - sz.width / 2)
      maxX = Math.max(maxX, s.position.x + sz.width / 2)
      minZ = Math.min(minZ, s.position.z - sz.depth / 2)
      maxZ = Math.max(maxZ, s.position.z + sz.depth / 2)
    })
    return minX === Infinity ? null : { minX, maxX, minZ, maxZ }
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  function loadMockData() {
    const data = generateMockData()
    const allDevices = [...data.devices, ...data.unmappedDevices]
    devices.value    = new Map(allDevices.map(d => [d.id, d]))
    spaces.value     = new Map(data.spaces.map(s => [s.id, s]))
    mappings.value   = new Map(data.deviceMappings.map(m => [m.id, m]))
    links.value      = new Map(data.links.map(l => [l.id, l]))
    interfaces.value = new Map(data.interfaces.map(i => [i.id, i]))
    unmappedDevices.value = data.unmappedDevices
  }

  function replaceData(data: EditorData) {
    const allDevices = [...(data.devices ?? []), ...(data.unmappedDevices ?? [])]
    devices.value    = new Map(allDevices.map(d => [d.id, d]))
    spaces.value     = new Map((data.spaces ?? []).map(s => [s.id, s]))
    mappings.value   = new Map((data.deviceMappings ?? []).map(m => [m.id, m]))
    links.value      = new Map((data.links ?? []).map(l => [l.id, l]))
    interfaces.value = new Map((data.interfaces ?? []).map(i => [i.id, i]))
    unmappedDevices.value = [...(data.unmappedDevices ?? [])]
    virtualNodes.value = new Map((data.virtualNodes ?? []).map(n => [n.id, n]))
    backgroundObjects.value = new Map((data.backgroundObjects ?? []).map(b => [b.id, b]))
  }

  function updateDeviceStatus(id: string, status: DeviceStatus, metrics?: Partial<DeviceMetrics>) {
    const dev = devices.value.get(id)
    if (!dev) return
    dev.status = status
    if (metrics) Object.assign(dev.metrics ??= {}, metrics)
  }

  // Live data update — bypasses permission guard (same pattern as updateDeviceStatus).
  function updateLinkStatus(id: string, status: NetworkLink['status']) {
    const l = links.value.get(id)
    if (l) l.status = status
  }

  function upsertDevices(incoming: RawDevice[]) {
    incoming.forEach(dev => {
      if (!devices.value.has(dev.id)) {
        unmappedDevices.value.push(dev)
      }
      devices.value.set(dev.id, dev)
    })
  }

  // Backend push — bypasses permission guard (same trust boundary as
  // upsertDevices/updateDeviceStatus: this is the host's own already-trusted
  // backend removing devices it owns, not a UI edit action). Also cleans up
  // the device's mapping and any link that referenced it, so callers don't
  // have to separately track down orphaned links/mappings.
  function removeDevices(ids: string[]) {
    const idSet = new Set(ids)
    ids.forEach(id => {
      devices.value.delete(id)
      unmappedDevices.value = unmappedDevices.value.filter(d => d.id !== id)
      const mapEntry = [...mappings.value.entries()].find(([, m]) => m.rawDeviceId === id)
      if (mapEntry) mappings.value.delete(mapEntry[0])
    })
    ;[...links.value.entries()].forEach(([linkId, l]) => {
      if (idSet.has(l.sourceDeviceId) || idSet.has(l.targetDeviceId)) {
        links.value.delete(linkId)
        emitChange('topology:deleteLink', { id: linkId, type: 'link' }, 'api')
      }
    })
    ids.forEach(id => emitChange('device:unmap', { id, type: 'device' }, 'api'))
  }

  // ── Backend push: links/spaces/interfaces/virtualNodes ──────────────────
  // These bypass the permission guard, unlike their addX/updateX counterparts
  // below — a host's own backend pushing topology facts it discovered is a
  // different trust boundary than a UI user editing the topology by hand.
  function upsertLinks(incoming: NetworkLink[]) {
    incoming.forEach(l => {
      links.value.set(l.id, l)
      emitChange('topology:updateLink', { id: l.id, type: 'link' }, 'api')
    })
  }

  function removeLinks(ids: string[]) {
    ids.forEach(id => {
      links.value.delete(id)
      emitChange('topology:deleteLink', { id, type: 'link' }, 'api')
    })
  }

  function upsertSpaces(incoming: Space[]) {
    incoming.forEach(s => {
      spaces.value.set(s.id, s)
      emitChange('space:update', { id: s.id, type: 'space' }, 'api')
    })
  }

  // Soft delete (archived = true), matching archiveSpace's semantics, so a
  // removed space doesn't leave dangling parentId references from children
  // that are still mapped underneath it.
  function removeSpaces(ids: string[]) {
    ids.forEach(id => {
      const s = spaces.value.get(id)
      if (s) s.archived = true
      emitChange('space:delete', { id, type: 'space' }, 'api')
    })
  }

  function upsertInterfaces(incoming: NetworkInterface[]) {
    incoming.forEach(i => {
      interfaces.value.set(i.id, i)
      emitChange('interface:update', { id: i.id, type: 'interface' }, 'api')
    })
  }

  function upsertVirtualNodes(incoming: VirtualNode[]) {
    incoming.forEach(n => {
      virtualNodes.value.set(n.id, n)
      emitChange('virtualNode:update', { id: n.id, type: 'virtualNode' }, 'api')
    })
  }

  function removeVirtualNodes(ids: string[]) {
    ids.forEach(id => {
      virtualNodes.value.delete(id)
      emitChange('virtualNode:delete', { id, type: 'virtualNode' }, 'api')
    })
  }

  // Backend push — bypasses permission guard, unlike acknowledgeDevice/
  // unacknowledgeDevice/assignDevice below (kept independent on purpose: they
  // gate a UI operator action, this covers a backend syncing ack/maintenance/
  // suppression state from elsewhere). Partial merge so one call can't
  // clobber fields it doesn't mention.
  function setOperatorState(deviceId: string, patch: Partial<OperatorState>) {
    const m = getMappingByDeviceId(deviceId)
    if (!m) return
    m.operatorState = { ...m.operatorState, ...patch }
    emitChange('annotation:update', { id: deviceId, type: 'device' }, 'api')
  }

  // Manual entry (fallback for devices not provided by an external source)
  function addManualDevice(input: {
    hostname: string; ip?: string; type: RawDevice['normalizedType']; vendor?: string
  }): RawDevice {
    const id = `manual-${Date.now()}`
    const dev: RawDevice = {
      id, source: 'manual', externalId: id,
      hostname: input.hostname,
      ip: input.ip,
      normalizedType: input.type,
      vendor: input.vendor,
      status: 'unknown',
      syncState: 'active',
      metrics: { cpu: 0, memory: 0, disk: 0, networkIn: 0, networkOut: 0 },
      firstSeenAt: new Date().toISOString(),
      lastSeenAt:  new Date().toISOString(),
    }
    devices.value.set(id, dev)
    unmappedDevices.value.push(dev)
    logChange('device.add', `Device added (manual): ${input.hostname}`)
    return dev
  }

  function addSpace(space: Space) {
    if (!requirePermission('space:create', { id: space.id, spaceId: space.id })) return
    spaces.value.set(space.id, space)
    emitChange('space:create', { id: space.id, type: 'space' })
  }

  function updateSpace(id: string, patch: Partial<Space>) {
    if (!requirePermission('space:update', { id, spaceId: id })) return
    const s = spaces.value.get(id)
    if (s) Object.assign(s, patch)
    emitChange('space:update', { id, type: 'space' })
  }

  function archiveSpace(id: string) {
    if (!requirePermission('space:delete', { id, spaceId: id })) return
    const s = spaces.value.get(id)
    if (s) s.archived = true
    emitChange('space:delete', { id, type: 'space' })
  }

  function mapDevice(deviceId: string, spaceId: string, slotIndex: number, position: { x: number; y: number; z: number }) {
    if (!requirePermission('device:map', { id: deviceId, spaceId })) return
    const existing = [...mappings.value.values()].find(m => m.rawDeviceId === deviceId)
    const id = existing?.id ?? `map-${deviceId}`
    const mapping: DeviceMapping = {
      id, rawDeviceId: deviceId,
      primarySpaceId: spaceId, slotIndex,
      mappingStatus: 'mapped',
      position,
      tags: [], importance: 'normal',
      updatedAt: new Date().toISOString(),
    }
    mappings.value.set(id, mapping)
    unmappedDevices.value = unmappedDevices.value.filter(d => d.id !== deviceId)
    emitChange('device:map', { id: deviceId, type: 'device' })
  }

  function unmapDevice(deviceId: string) {
    if (!requirePermission('device:unmap', { id: deviceId })) return
    const entry = [...mappings.value.entries()].find(([, m]) => m.rawDeviceId === deviceId)
    if (!entry) return
    const [key, m] = entry
    m.mappingStatus = 'unmapped'
    m.primarySpaceId = undefined
    const dev = devices.value.get(deviceId)
    if (dev && !unmappedDevices.value.find(d => d.id === deviceId)) {
      unmappedDevices.value.push(dev)
    }
    mappings.value.delete(key)
    emitChange('device:unmap', { id: deviceId, type: 'device' })
  }

  function updateAnnotation(deviceId: string, patch: { displayName?: string; tags?: string[]; memo?: string }) {
    if (!requirePermission('annotation:update', { id: deviceId })) return
    const m = [...mappings.value.values()].find(m => m.rawDeviceId === deviceId)
    if (m) Object.assign(m, patch)
    emitChange('annotation:update', { id: deviceId, type: 'device' })
  }

  function setVisualType(deviceId: string, visualType: string | undefined) {
    if (!requirePermission('annotation:update', { id: deviceId })) return
    const m = getMappingByDeviceId(deviceId)
    if (m) m.visualType = visualType
    emitChange('annotation:update', { id: deviceId, type: 'device' })
  }

  // Acknowledging an alert records who/when confirmed it without touching
  // device.status — overwriting status would destroy the original severity
  // (there'd be no way to tell a confirmed critical from a confirmed warning).
  function acknowledgeDevice(deviceId: string, by = 'operator') {
    if (!requirePermission('annotation:update', { id: deviceId })) return
    const m = getMappingByDeviceId(deviceId)
    if (m) {
      m.operatorState = {
        ...m.operatorState,
        acknowledged: true,
        acknowledgedBy: by,
        acknowledgedAt: new Date().toISOString(),
      }
    }
    logChange('device.ack', `Acknowledged: ${devices.value.get(deviceId)?.hostname ?? deviceId}`)
    emitChange('annotation:update', { id: deviceId, type: 'device' })
  }

  function unacknowledgeDevice(deviceId: string) {
    if (!requirePermission('annotation:update', { id: deviceId })) return
    const m = getMappingByDeviceId(deviceId)
    if (m && m.operatorState) {
      m.operatorState = { ...m.operatorState, acknowledged: false, acknowledgedBy: undefined, acknowledgedAt: undefined }
    }
    emitChange('annotation:update', { id: deviceId, type: 'device' })
  }

  // Lightweight self-service triage — not a ticket/SOAR integration, just
  // enough for "who's on this" to be visible in the Alert panel without
  // leaving the app. Empty string clears the assignment.
  function assignDevice(deviceId: string, assignee: string) {
    if (!requirePermission('annotation:update', { id: deviceId })) return
    const m = getMappingByDeviceId(deviceId)
    if (m) {
      m.operatorState = {
        ...m.operatorState,
        assignedTo: assignee || undefined,
        assignedAt: assignee ? new Date().toISOString() : undefined,
      }
    }
    logChange('device.assign', assignee
      ? `Assigned ${devices.value.get(deviceId)?.hostname ?? deviceId} to ${assignee}`
      : `Unassigned ${devices.value.get(deviceId)?.hostname ?? deviceId}`)
    emitChange('annotation:update', { id: deviceId, type: 'device' })
  }

  function addLink(link: NetworkLink) {
    if (!requirePermission('topology:createLink', { id: link.id })) return
    links.value.set(link.id, link)
    emitChange('topology:createLink', { id: link.id, type: 'link' })
  }

  function updateLink(id: string, patch: Partial<NetworkLink>) {
    if (!requirePermission('topology:updateLink', { id })) return
    const l = links.value.get(id)
    if (l) Object.assign(l, patch)
    emitChange('topology:updateLink', { id, type: 'link' })
  }

  function removeLink(id: string) {
    if (!requirePermission('topology:deleteLink', { id })) return
    links.value.delete(id)
    emitChange('topology:deleteLink', { id, type: 'link' })
  }

  function getMappingByDeviceId(deviceId: string): DeviceMapping | undefined {
    return [...mappings.value.values()].find(m => m.rawDeviceId === deviceId)
  }

  function getDevice(id: string): Readonly<RawDevice> | undefined {
    const dev = devices.value.get(id)
    return dev ? readonlyDevice(dev) : undefined
  }

  // ── Virtual Nodes ─────────────────────────────────────────────────────────
  function addVirtualNode(node: VirtualNode) {
    if (!requirePermission('virtualNode:create', { id: node.id })) return
    virtualNodes.value.set(node.id, node)
    emitChange('virtualNode:create', { id: node.id, type: 'virtualNode' })
  }
  function removeVirtualNode(id: string) {
    if (!requirePermission('virtualNode:delete', { id })) return
    virtualNodes.value.delete(id)
    emitChange('virtualNode:delete', { id, type: 'virtualNode' })
  }
  function updateVirtualNode(id: string, patch: Partial<VirtualNode>) {
    if (!requirePermission('virtualNode:update', { id })) return
    const n = virtualNodes.value.get(id)
    if (n) Object.assign(n, patch)
    emitChange('virtualNode:update', { id, type: 'virtualNode' })
  }

  // ── Background Objects ───────────────────────────────────────────────────
  function addBackgroundObject(obj: BackgroundObject) {
    if (!requirePermission('background:create', { id: obj.id, spaceId: obj.spaceId })) return
    backgroundObjects.value.set(obj.id, obj)
    emitChange('background:create', { id: obj.id, type: 'background' })
  }
  function removeBackgroundObject(id: string) {
    if (!requirePermission('background:delete', { id })) return
    backgroundObjects.value.delete(id)
    emitChange('background:delete', { id, type: 'background' })
  }
  function updateBackgroundObject(id: string, patch: Partial<BackgroundObject>) {
    if (!requirePermission('background:update', { id })) return
    const b = backgroundObjects.value.get(id)
    if (b) Object.assign(b, patch)
    emitChange('background:update', { id, type: 'background' })
  }

  // ── Saved Views ──────────────────────────────────────────────────────────
  function addSavedView(view: SavedView) {
    savedViews.value.unshift(view)
    if (savedViews.value.length > 20) savedViews.value.pop()
  }
  function removeSavedView(id: string) {
    const idx = savedViews.value.findIndex(v => v.id === id)
    if (idx >= 0) savedViews.value.splice(idx, 1)
  }

  // ── Change Log ───────────────────────────────────────────────────────────
  // This panel is a rolling view of the most recent 100 entries, not a durable
  // audit trail — hosts that need permanent audit records should persist the
  // `onChange` callback events (see configureSecurity) to their own store.
  function logChange(type: string, msg: string) {
    changeLog.value.unshift({ id: Math.random().toString(36).slice(2), type, msg, ts: new Date().toLocaleTimeString() })
    if (changeLog.value.length > 100) changeLog.value.pop()
  }

  function exportChangeLog(): string {
    return JSON.stringify(changeLog.value, null, 2)
  }

  // ── Import / Export ──────────────────────────────────────────────────────
  function importTopology(rows: {
    hostname: string; ip?: string; type: string; vendor?: string;
    building?: string; floor?: string; site?: string; zone?: string; rack?: string;
    status?: string; uplink?: string;
  }[]): { devices: number; spaces: number; links: number } {
    if (!requirePermission('import')) return { devices: 0, spaces: 0, links: 0 }
    // Group rows by floor / zone / rack so we can assign coordinates deterministically.
    // `floor` is the new column; the legacy `site` column maps to it so existing
    // CSVs keep working unchanged. `building` is optional and only wraps floors
    // when a row actually specifies one.
    type Group = Map<string, { building?: string; zones: Map<string, Map<string, typeof rows>> }>
    const tree: Group = new Map()
    rows.forEach(r => {
      const f = r.floor || r.site || 'Floor'
      const z = r.zone || 'Default'
      const k = r.rack || 'Rack'
      if (!tree.has(f)) tree.set(f, { building: r.building, zones: new Map() })
      const entry = tree.get(f)!
      if (!entry.building && r.building) entry.building = r.building
      if (!entry.zones.has(z)) entry.zones.set(z, new Map())
      const rmap = entry.zones.get(z)!
      if (!rmap.has(k)) rmap.set(k, [])
      rmap.get(k)!.push(r)
    })

    const COL_GAP   = 2.0
    const ROW_GAP   = 2.2
    const RACK_PAD  = 1.2
    const RACK_GAP  = 2.0
    const ZONE_PAD  = 4.0
    const ZONE_GAP  = 6.0
    const SITE_PAD  = 8.0

    const createdSpaces: Space[] = []
    const createdDevices: RawDevice[] = []
    const createdMappings: DeviceMapping[] = []
    const createdLinks: NetworkLink[] = []
    const deviceByHost = new Map<string, string>()

    // Optional building wrapper — created on first use, reused across floors
    // that share the same building name.
    const buildingIdByName = new Map<string, string>()
    function ensureBuilding(name: string): string {
      const key = slug(name)
      let id = buildingIdByName.get(key)
      if (!id) {
        id = `building-${key}`
        const buildingSpace: Space = {
          id, name, kind: 'physical', type: 'building', source: 'import',
        }
        spaces.value.set(id, buildingSpace)
        createdSpaces.push(buildingSpace)
        buildingIdByName.set(key, id)
      }
      return id
    }

    const floors = [...tree.entries()]

    floors.forEach(([floorName, { building: buildingName, zones: zoneMap }], fi) => {
      const floorId = `floor-${slug(floorName)}-${fi}`
      const zones = [...zoneMap.entries()]

      // First pass: rack sizes inside each zone (in local rack coordinates)
      const zoneLayouts = zones.map(([zoneName, rackMap]) => {
        const racks = [...rackMap.entries()].map(([rackName, devs]) => {
          const count = devs.length
          const rows2 = Math.ceil(count / 2)
          const w = COL_GAP * 2 + RACK_PAD
          const d = rows2 * ROW_GAP + RACK_PAD
          return { rackName, devs, w, d, rows: rows2 }
        })
        const zoneW = racks.reduce((a, r) => a + r.w, 0) + Math.max(0, racks.length - 1) * RACK_GAP + ZONE_PAD
        const zoneD = Math.max(...racks.map(r => r.d), 1) + ZONE_PAD
        return { zoneName, racks, zoneW, zoneD }
      })

      const floorW = zoneLayouts.reduce((a, z) => a + z.zoneW, 0) + Math.max(0, zoneLayouts.length - 1) * ZONE_GAP + SITE_PAD
      const floorD = Math.max(...zoneLayouts.map(z => z.zoneD), 1) + SITE_PAD

      // Local coordinates — only one floor is ever loaded into the 3D scene
      // at a time, so every floor can start from the same origin.
      const floorX = 0
      const floorZ = 0

      const floor: Space = {
        id: floorId, name: floorName, kind: 'physical', type: 'floor',
        parentId: buildingName ? ensureBuilding(buildingName) : undefined,
        source: 'import',
        position: { x: floorX, y: 0, z: floorZ },
        size: { width: floorW, height: 0.1, depth: floorD },
      }
      spaces.value.set(floor.id, floor)
      createdSpaces.push(floor)

      let zoneCursor = floorX - floorW / 2 + SITE_PAD / 2
      zoneLayouts.forEach(({ zoneName, racks, zoneW, zoneD }, zi) => {
        const zoneId = `${floorId}-zone-${slug(zoneName)}-${zi}`
        const zoneX  = zoneCursor + zoneW / 2
        const zoneZ  = floorZ
        zoneCursor  += zoneW + ZONE_GAP

        const zone: Space = {
          id: zoneId, name: zoneName, kind: 'physical', type: 'zone',
          parentId: floorId, source: 'import',
          position: { x: zoneX, y: 0, z: zoneZ },
          size: { width: zoneW, height: 0.1, depth: zoneD },
          color: pickZoneColor(zi),
        }
        spaces.value.set(zone.id, zone)
        createdSpaces.push(zone)

        let rackCursor = zoneX - zoneW / 2 + ZONE_PAD / 2
        racks.forEach(({ rackName, devs, w, d, rows: rows2 }, ri) => {
          const rackId = `${zoneId}-rack-${slug(rackName)}-${ri}`
          const rackX  = rackCursor + w / 2
          const rackZ  = zoneZ
          rackCursor  += w + RACK_GAP

          const rack: Space = {
            id: rackId, name: rackName, kind: 'physical', type: 'rack',
            parentId: zoneId, source: 'import',
            position: { x: rackX, y: 0, z: rackZ },
            size: { width: w, height: 0.3, depth: d },
          }
          spaces.value.set(rack.id, rack)
          createdSpaces.push(rack)

          // Place devices on a 2-column grid inside the rack
          devs.forEach((r, slot) => {
            const col = slot % 2
            const row = Math.floor(slot / 2)
            const dx  = (col - 0.5) * COL_GAP
            const dz  = (row - (rows2 - 1) / 2) * ROW_GAP

            const devId = `imp-${Date.now()}-${createdDevices.length}-${slot}`
            const dev: RawDevice = {
              id: devId, source: 'import', externalId: devId,
              hostname: r.hostname,
              ip: r.ip,
              normalizedType: (r.type as RawDevice['normalizedType']) ?? 'unknown',
              vendor: r.vendor,
              status: (r.status as RawDevice['status']) ?? 'unknown',
              syncState: 'active',
              metrics: { cpu: 0, memory: 0, disk: 0, networkIn: 0, networkOut: 0 },
              firstSeenAt: new Date().toISOString(),
              lastSeenAt:  new Date().toISOString(),
            }
            devices.value.set(devId, dev)
            createdDevices.push(dev)
            deviceByHost.set(r.hostname, devId)

            const mapping: DeviceMapping = {
              id: `map-${devId}`,
              rawDeviceId: devId,
              primarySpaceId: rackId,
              slotIndex: slot,
              mappingStatus: 'mapped',
              position: { x: rackX + dx, y: 0.4, z: rackZ + dz },
              tags: [r.type, floorName],
              importance: dev.status === 'critical' ? 'critical' : 'normal',
              updatedAt: new Date().toISOString(),
            }
            mappings.value.set(mapping.id, mapping)
            createdMappings.push(mapping)
          })
        })
      })
    })

    // Second pass: uplink → link
    rows.forEach(r => {
      if (!r.uplink) return
      const a = deviceByHost.get(r.hostname)
      const b = deviceByHost.get(r.uplink)
      if (!a || !b) return
      const id = `lnk-${a}-${b}`
      const lnk: NetworkLink = {
        id, sourceDeviceId: a, targetDeviceId: b,
        type: 'physical', status: 'up',
        source: 'import', confidence: 'high',
      }
      links.value.set(id, lnk)
      createdLinks.push(lnk)
    })

    logChange('import',
      `Imported ${createdDevices.length} devices, ${createdSpaces.length} spaces, ${createdLinks.length} links`)

    return { devices: createdDevices.length, spaces: createdSpaces.length, links: createdLinks.length }
  }

  function slug(s: string): string {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'x'
  }
  function pickZoneColor(i: number): string {
    const palette = ['#1e3a5f', '#1a3a2a', '#3a1a2a', '#2a2a1a', '#1a2a3a', '#3a2a1a']
    return palette[i % palette.length]
  }

  function exportSnapshot(): EditorSnapshot {
    return {
      version: '2.0',
      timestamp: new Date().toISOString(),
      spaces: [...spaces.value.values()],
      deviceMappings: [...mappings.value.values()],
      manualLinks: [...links.value.values()].filter(l => l.source === 'manual'),
      backgroundObjects: [...backgroundObjects.value.values()],
    }
  }

  function importSnapshot(snap: EditorSnapshot) {
    if (!requirePermission('import')) return
    const safeSnap = sanitizeSnapshot(snap)
    safeSnap.spaces.forEach(s => spaces.value.set(s.id, s))
    safeSnap.deviceMappings.forEach(m => mappings.value.set(m.id, m))
    safeSnap.manualLinks.forEach(l => links.value.set(l.id, l))
    ;(safeSnap.backgroundObjects ?? []).forEach(b => backgroundObjects.value.set(b.id, b))
    unmappedDevices.value = unmappedDevices.value.filter(
      d => !safeSnap.deviceMappings.find(m => m.rawDeviceId === d.id && m.mappingStatus === 'mapped')
    )
  }

  function sanitizeSnapshot(snap: EditorSnapshot): EditorSnapshot {
    return sanitizePlainObject(snap) as EditorSnapshot
  }

  function sanitizePlainObject<T>(value: T): T {
    if (Array.isArray(value)) return value.map(sanitizePlainObject) as T
    if (!value || typeof value !== 'object') return value
    const out: Record<string, unknown> = {}
    Object.entries(value as Record<string, unknown>).forEach(([key, item]) => {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') return
      out[key] = sanitizePlainObject(item)
    })
    return out as T
  }

  function readonlyDevice(dev: RawDevice): Readonly<RawDevice> {
    return new Proxy(dev, {
      set() {
        throw new TypeError('RawDevice is read-only. Use explicit editor commands for changes.')
      },
      deleteProperty() {
        throw new TypeError('RawDevice is read-only. Use explicit editor commands for changes.')
      },
    })
  }

  return {
    devices, spaces, mappings, links, interfaces, unmappedDevices,
    mappedDeviceIds, criticalCount, warningCount,
    devicesBySpace, interfacesByDevice, rackSpaces, allSpacesList,
    rootSpaces, childSpaces, descendantSpaceIds,
    scopedSpaces, scopedDeviceIds, scopedDevices, scopedLinks, scopedBounds,
    scopedBackgroundObjects, scopedCriticalCount, scopedWarningCount,
    resolveLeafScope,
    configureSecurity, setEditorMode, can, hasFeature,
    loadMockData, replaceData, updateDeviceStatus, updateLinkStatus, upsertDevices, addManualDevice,
    removeDevices,
    importTopology,
    addSpace, updateSpace, archiveSpace,
    upsertSpaces, removeSpaces,
    mapDevice, unmapDevice, updateAnnotation, setVisualType,
    acknowledgeDevice, unacknowledgeDevice, assignDevice, setOperatorState,
    addLink, updateLink, removeLink,
    upsertLinks, removeLinks,
    upsertInterfaces,
    getMappingByDeviceId, getDevice,
    virtualNodes, savedViews, changeLog,
    addVirtualNode, removeVirtualNode, updateVirtualNode,
    upsertVirtualNodes, removeVirtualNodes,
    backgroundObjects,
    addBackgroundObject, removeBackgroundObject, updateBackgroundObject,
    addSavedView, removeSavedView,
    logChange, exportChangeLog, exportSnapshot, importSnapshot,
  }
})
