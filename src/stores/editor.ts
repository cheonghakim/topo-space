import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { PermissionGuard } from '@/core/PermissionGuard'
import type {
  RawDevice, Space, DeviceMapping, NetworkLink,
  NetworkInterface, DeviceStatus, DeviceMetrics,
  VirtualNode, SavedView, EditorSnapshot,
  EditorAction, EditorData, EditorMode, FeatureFlags,
  PermissionContext, PermissionResolver,
} from '@/types'
import { generateMockData } from '@/utils/mockDataGenerator'

export const useEditorStore = defineStore('editor', () => {
  const guard = new PermissionGuard({ topologyEdit: true, layoutEdit: true, spaceEdit: true, annotationEdit: true, import: true })
  let permissionDeniedHandler: ((ctx: PermissionContext) => void) | undefined
  let changeHandler: ((event: { type: string; target?: { id?: string; type?: string }; source: 'user' | 'api' | 'plugin' | 'system'; timestamp: number }) => void) | undefined

  const devices    = ref<Map<string, RawDevice>>(new Map())
  const spaces     = ref<Map<string, Space>>(new Map())
  const mappings   = ref<Map<string, DeviceMapping>>(new Map())
  const links      = ref<Map<string, NetworkLink>>(new Map())
  const interfaces = ref<Map<string, NetworkInterface>>(new Map())

  const unmappedDevices = ref<RawDevice[]>([])
  const virtualNodes    = ref<Map<string, VirtualNode>>(new Map())
  const savedViews      = ref<SavedView[]>([])
  const changeLog       = ref<{ id: string; type: string; msg: string; ts: string }[]>([])

  function configureSecurity(input: {
    mode?: EditorMode
    features?: FeatureFlags
    permissionResolver?: PermissionResolver
    onPermissionDenied?: (ctx: PermissionContext) => void
    onChange?: (event: { type: string; target?: { id?: string; type?: string }; source: 'user' | 'api' | 'plugin' | 'system'; timestamp: number }) => void
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

  function deny(action: EditorAction, target?: PermissionContext['target']) {
    const ctx: PermissionContext = { action, target }
    permissionDeniedHandler?.(ctx)
  }

  function requirePermission(action: EditorAction, target?: PermissionContext['target']): boolean {
    const allowed = can(action, target)
    if (!allowed) deny(action, target)
    return allowed
  }

  function emitChange(type: string, target?: { id?: string; type?: string }) {
    changeHandler?.({ type, target, source: 'user', timestamp: Date.now() })
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

  // ── Actions ───────────────────────────────────────────────────────────────
  function loadMockData() {
    const data = generateMockData()
    devices.value    = new Map(data.devices.map(d => [d.id, d]))
    spaces.value     = new Map(data.spaces.map(s => [s.id, s]))
    mappings.value   = new Map(data.deviceMappings.map(m => [m.id, m]))
    links.value      = new Map(data.links.map(l => [l.id, l]))
    interfaces.value = new Map(data.interfaces.map(i => [i.id, i]))
    unmappedDevices.value = data.unmappedDevices
  }

  function replaceData(data: EditorData) {
    devices.value    = new Map((data.devices ?? []).map(d => [d.id, d]))
    spaces.value     = new Map((data.spaces ?? []).map(s => [s.id, s]))
    mappings.value   = new Map((data.deviceMappings ?? []).map(m => [m.id, m]))
    links.value      = new Map((data.links ?? []).map(l => [l.id, l]))
    interfaces.value = new Map((data.interfaces ?? []).map(i => [i.id, i]))
    unmappedDevices.value = [...(data.unmappedDevices ?? [])]
    virtualNodes.value = new Map((data.virtualNodes ?? []).map(n => [n.id, n]))
  }

  function updateDeviceStatus(id: string, status: DeviceStatus, metrics?: Partial<DeviceMetrics>) {
    const dev = devices.value.get(id)
    if (!dev) return
    dev.status = status
    if (metrics) Object.assign(dev.metrics ??= {}, metrics)
  }

  function upsertDevices(incoming: RawDevice[]) {
    incoming.forEach(dev => {
      if (!devices.value.has(dev.id)) {
        unmappedDevices.value.push(dev)
      }
      devices.value.set(dev.id, dev)
    })
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
  function logChange(type: string, msg: string) {
    changeLog.value.unshift({ id: Math.random().toString(36).slice(2), type, msg, ts: new Date().toLocaleTimeString() })
    if (changeLog.value.length > 100) changeLog.value.pop()
  }

  // ── Import / Export ──────────────────────────────────────────────────────
  function importTopology(rows: {
    hostname: string; ip?: string; type: string; vendor?: string;
    site?: string; zone?: string; rack?: string;
    status?: string; uplink?: string;
  }[]): { devices: number; spaces: number; links: number } {
    if (!requirePermission('import')) return { devices: 0, spaces: 0, links: 0 }
    // Group rows by site / zone / rack so we can assign coordinates deterministically.
    type Group = Map<string, Map<string, Map<string, typeof rows>>>
    const tree: Group = new Map()
    rows.forEach(r => {
      const s = r.site || 'Site'
      const z = r.zone || 'Default'
      const k = r.rack || 'Rack'
      if (!tree.has(s)) tree.set(s, new Map())
      const zmap = tree.get(s)!
      if (!zmap.has(z)) zmap.set(z, new Map())
      const rmap = zmap.get(z)!
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
    const SITE_GAP  = 14.0

    const createdSpaces: Space[] = []
    const createdDevices: RawDevice[] = []
    const createdMappings: DeviceMapping[] = []
    const createdLinks: NetworkLink[] = []
    const deviceByHost = new Map<string, string>()

    let siteCursor = 0
    const sites = [...tree.entries()]

    sites.forEach(([siteName, zoneMap], si) => {
      const siteId = `site-${slug(siteName)}-${si}`
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

      const siteW = zoneLayouts.reduce((a, z) => a + z.zoneW, 0) + Math.max(0, zoneLayouts.length - 1) * ZONE_GAP + SITE_PAD
      const siteD = Math.max(...zoneLayouts.map(z => z.zoneD), 1) + SITE_PAD

      const siteX = siteCursor + siteW / 2
      const siteZ = 0
      siteCursor += siteW + SITE_GAP

      const site: Space = {
        id: siteId, name: siteName, kind: 'physical', type: 'site',
        source: 'import',
        position: { x: siteX, y: 0, z: siteZ },
        size: { width: siteW, height: 0.1, depth: siteD },
      }
      spaces.value.set(site.id, site)
      createdSpaces.push(site)

      let zoneCursor = siteX - siteW / 2 + SITE_PAD / 2
      zoneLayouts.forEach(({ zoneName, racks, zoneW, zoneD }, zi) => {
        const zoneId = `${siteId}-zone-${slug(zoneName)}-${zi}`
        const zoneX  = zoneCursor + zoneW / 2
        const zoneZ  = siteZ
        zoneCursor  += zoneW + ZONE_GAP

        const zone: Space = {
          id: zoneId, name: zoneName, kind: 'physical', type: 'zone',
          parentId: siteId, source: 'import',
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
              tags: [r.type, siteName],
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
    }
  }

  function importSnapshot(snap: EditorSnapshot) {
    if (!requirePermission('import')) return
    const safeSnap = sanitizeSnapshot(snap)
    safeSnap.spaces.forEach(s => spaces.value.set(s.id, s))
    safeSnap.deviceMappings.forEach(m => mappings.value.set(m.id, m))
    safeSnap.manualLinks.forEach(l => links.value.set(l.id, l))
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
    configureSecurity, setEditorMode, can,
    loadMockData, replaceData, updateDeviceStatus, upsertDevices, addManualDevice,
    importTopology,
    addSpace, updateSpace, archiveSpace,
    mapDevice, unmapDevice, updateAnnotation,
    addLink, updateLink, removeLink,
    getMappingByDeviceId, getDevice,
    virtualNodes, savedViews, changeLog,
    addVirtualNode, removeVirtualNode, updateVirtualNode,
    addSavedView, removeSavedView,
    logChange, exportSnapshot, importSnapshot,
  }
})
