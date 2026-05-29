import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  RawDevice, Space, DeviceMapping, NetworkLink,
  NetworkInterface, DeviceStatus, DeviceMetrics,
  VirtualNode, SavedView, EditorSnapshot,
} from '@/types'
import { generateMockData } from '@/utils/mockDataGenerator'

export const useEditorStore = defineStore('editor', () => {
  // ── 원본 데이터 ──────────────────────────────────────────────────────────
  const devices    = ref<Map<string, RawDevice>>(new Map())
  const spaces     = ref<Map<string, Space>>(new Map())
  const mappings   = ref<Map<string, DeviceMapping>>(new Map())
  const links      = ref<Map<string, NetworkLink>>(new Map())
  const interfaces = ref<Map<string, NetworkInterface>>(new Map())

  const unmappedDevices = ref<RawDevice[]>([])
  const virtualNodes    = ref<Map<string, VirtualNode>>(new Map())
  const savedViews      = ref<SavedView[]>([])
  const changeLog       = ref<{ id: string; type: string; msg: string; ts: string }[]>([])

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

  function addSpace(space: Space) {
    spaces.value.set(space.id, space)
  }

  function updateSpace(id: string, patch: Partial<Space>) {
    const s = spaces.value.get(id)
    if (s) Object.assign(s, patch)
  }

  function archiveSpace(id: string) {
    const s = spaces.value.get(id)
    if (s) s.archived = true
  }

  function mapDevice(deviceId: string, spaceId: string, slotIndex: number, position: { x: number; y: number; z: number }) {
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
  }

  function unmapDevice(deviceId: string) {
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
  }

  function updateAnnotation(deviceId: string, patch: { displayName?: string; tags?: string[]; memo?: string }) {
    const m = [...mappings.value.values()].find(m => m.rawDeviceId === deviceId)
    if (m) Object.assign(m, patch)
  }

  function addLink(link: NetworkLink) {
    links.value.set(link.id, link)
  }

  function updateLink(id: string, patch: Partial<NetworkLink>) {
    const l = links.value.get(id)
    if (l) Object.assign(l, patch)
  }

  function removeLink(id: string) {
    links.value.delete(id)
  }

  function getMappingByDeviceId(deviceId: string): DeviceMapping | undefined {
    return [...mappings.value.values()].find(m => m.rawDeviceId === deviceId)
  }

  // ── Virtual Nodes ─────────────────────────────────────────────────────────
  function addVirtualNode(node: VirtualNode) {
    virtualNodes.value.set(node.id, node)
  }
  function removeVirtualNode(id: string) {
    virtualNodes.value.delete(id)
  }
  function updateVirtualNode(id: string, patch: Partial<VirtualNode>) {
    const n = virtualNodes.value.get(id)
    if (n) Object.assign(n, patch)
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
    snap.spaces.forEach(s => spaces.value.set(s.id, s))
    snap.deviceMappings.forEach(m => mappings.value.set(m.id, m))
    snap.manualLinks.forEach(l => links.value.set(l.id, l))
    unmappedDevices.value = unmappedDevices.value.filter(
      d => !snap.deviceMappings.find(m => m.rawDeviceId === d.id && m.mappingStatus === 'mapped')
    )
  }

  return {
    devices, spaces, mappings, links, interfaces, unmappedDevices,
    mappedDeviceIds, criticalCount, warningCount,
    devicesBySpace, interfacesByDevice, rackSpaces, allSpacesList,
    loadMockData, updateDeviceStatus, upsertDevices,
    addSpace, updateSpace, archiveSpace,
    mapDevice, unmapDevice, updateAnnotation,
    addLink, updateLink, removeLink,
    getMappingByDeviceId,
    virtualNodes, savedViews, changeLog,
    addVirtualNode, removeVirtualNode, updateVirtualNode,
    addSavedView, removeSavedView,
    logChange, exportSnapshot, importSnapshot,
  }
})
