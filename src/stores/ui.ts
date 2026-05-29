import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import type { SelectionTarget, EditorMode, FilterState, EdgeType, DeviceStatus, DeviceType, Toast } from '@/types'
import { DEFAULT_FILTER } from '@/types'

export const useUIStore = defineStore('ui', () => {
  const mode = ref<EditorMode>('view')

  const selection  = ref<SelectionTarget | null>(null)
  const hoveredId  = ref<string | null>(null)

  const linkToolActive    = ref(false)
  const linkSourceDeviceId = ref<string | null>(null)

  const visibleLinkTypes = ref<Set<EdgeType>>(new Set([
    'physical','logical','service_dependency','traffic_flow','security_path','manual','inferred',
  ]))

  const filter = ref<FilterState>({ ...DEFAULT_FILTER })

  const contextMenu = ref<{
    visible: boolean; x: number; y: number
    sourceDeviceId: string; targetDeviceId: string
  }>({ visible: false, x: 0, y: 0, sourceDeviceId: '', targetDeviceId: '' })

  const showUnmapped        = ref(true)
  const showRackServerList  = ref(false)
  const selectedRackForList = ref<string | null>(null)
  const showSpaceTree     = ref(false)
  const showLinkProp      = ref(false)
  const showSavedViews    = ref(false)
  const showChangeLog     = ref(false)
  const showTimeline      = ref(false)
  const showMinimap       = ref(true)
  const showParticles     = ref(true)
  const showBlastRadius   = ref(true)
  const showVirtualNodes  = ref(true)
  const showHelp          = ref(false)
  const showImport        = ref(false)

  const fontScale = ref(loadFontScale())
  function loadFontScale(): number {
    const v = parseFloat(localStorage.getItem('topospace.fontScale') ?? '')
    return Number.isFinite(v) && v >= 0.8 && v <= 1.6 ? v : 1.1
  }
  function setFontScale(v: number) {
    fontScale.value = Math.max(0.8, Math.min(1.6, Math.round(v * 100) / 100))
    localStorage.setItem('topospace.fontScale', String(fontScale.value))
  }

  const timelineFrameIdx = ref(-1)   // -1 = live
  const timelineRecording = ref(false)

  const wsConnected = ref(false)

  const blastSourceId = ref<string | null>(null)

  const toasts = ref<Toast[]>([])
  function addToast(message: string, type: Toast['type'] = 'info') {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    toasts.value.push({ id, message, type, timestamp: Date.now() })
    if (toasts.value.length > 6) toasts.value.shift()
    setTimeout(() => removeToast(id), 5000)
  }
  function removeToast(id: string) {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx >= 0) toasts.value.splice(idx, 1)
  }

  // ── Tooltip ───────────────────────────────────────────────────────────────
  const tooltip = ref<{ visible: boolean; x: number; y: number; deviceId: string }>({
    visible: false, x: 0, y: 0, deviceId: '',
  })

  // ── Computed ──────────────────────────────────────────────────────────────
  const selectedDeviceId = computed(() =>
    selection.value?.type === 'device' ? selection.value.id : null)
  const selectedSpaceId  = computed(() =>
    selection.value?.type === 'space'  ? selection.value.id : null)
  const selectedLinkId   = computed(() =>
    selection.value?.type === 'link'   ? selection.value.id : null)

  // ── Actions ───────────────────────────────────────────────────────────────
  function setMode(m: EditorMode) {
    mode.value = m
    useEditorStore().setEditorMode(m)
    if (m === 'view') {
      linkToolActive.value = false
      linkSourceDeviceId.value = null
    }
  }

  function select(target: SelectionTarget | null) {
    selection.value = target
    showLinkProp.value = target?.type === 'link'
  }

  function toggleLinkTool() {
    if (mode.value !== 'edit') {
      linkToolActive.value = false
      linkSourceDeviceId.value = null
      return
    }
    linkToolActive.value = !linkToolActive.value
    if (!linkToolActive.value) linkSourceDeviceId.value = null
  }

  function startLinkFrom(deviceId: string) {
    linkSourceDeviceId.value = deviceId
  }

  function cancelLinkDraft() {
    linkSourceDeviceId.value = null
  }

  function showContextMenu(x: number, y: number, srcId: string, tgtId: string) {
    contextMenu.value = { visible: true, x, y, sourceDeviceId: srcId, targetDeviceId: tgtId }
  }

  function hideContextMenu() {
    contextMenu.value.visible = false
    linkSourceDeviceId.value = null
  }

  function toggleLinkType(type: EdgeType) {
    if (visibleLinkTypes.value.has(type)) visibleLinkTypes.value.delete(type)
    else visibleLinkTypes.value.add(type)
  }

  function setFilter(patch: Partial<FilterState>) {
    Object.assign(filter.value, patch)
  }

  function resetFilter() {
    filter.value = { ...DEFAULT_FILTER }
  }

  function showTooltipAt(x: number, y: number, deviceId: string) {
    tooltip.value = { visible: true, x, y, deviceId }
  }

  function hideTooltip() {
    tooltip.value.visible = false
  }

  return {
    mode, selection, hoveredId,
    linkToolActive, linkSourceDeviceId,
    visibleLinkTypes, filter,
    contextMenu, showUnmapped, showSpaceTree, showLinkProp,
    showRackServerList, selectedRackForList,
    showSavedViews, showChangeLog, showTimeline, showMinimap,
    showParticles, showBlastRadius, showVirtualNodes, showHelp, showImport,
    fontScale, setFontScale,
    timelineFrameIdx, timelineRecording, wsConnected, blastSourceId,
    tooltip,
    selectedDeviceId, selectedSpaceId, selectedLinkId,
    setMode, select, toggleLinkTool,
    startLinkFrom, cancelLinkDraft,
    showContextMenu, hideContextMenu,
    toggleLinkType, setFilter, resetFilter,
    showTooltipAt, hideTooltip,
    toasts, addToast, removeToast,
  }
})
