import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SelectionTarget, EditorMode, FilterState, EdgeType, DeviceStatus, DeviceType, Toast } from '@/types'
import { DEFAULT_FILTER } from '@/types'

export const useUIStore = defineStore('ui', () => {
  // ── 모드 ──────────────────────────────────────────────────────────────────
  const mode = ref<EditorMode>('view')

  // ── 선택/hover ────────────────────────────────────────────────────────────
  const selection  = ref<SelectionTarget | null>(null)
  const hoveredId  = ref<string | null>(null)

  // ── 링크 도구 ────────────────────────────────────────────────────────────
  const linkToolActive    = ref(false)
  const linkSourceDeviceId = ref<string | null>(null)

  // ── 레이어 토글 ───────────────────────────────────────────────────────────
  const visibleLinkTypes = ref<Set<EdgeType>>(new Set([
    'physical','logical','service_dependency','traffic_flow','security_path','manual','inferred',
  ]))

  // ── 필터 ──────────────────────────────────────────────────────────────────
  const filter = ref<FilterState>({ ...DEFAULT_FILTER })

  // ── 컨텍스트 메뉴 ─────────────────────────────────────────────────────────
  const contextMenu = ref<{
    visible: boolean; x: number; y: number
    sourceDeviceId: string; targetDeviceId: string
  }>({ visible: false, x: 0, y: 0, sourceDeviceId: '', targetDeviceId: '' })

  // ── 패널 가시성 ───────────────────────────────────────────────────────────
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

  // 타임라인 재생 상태
  const timelineFrameIdx = ref(-1)   // -1 = live
  const timelineRecording = ref(false)

  // WebSocket 연결 상태
  const wsConnected = ref(false)

  // 블라스트 반경 대상
  const blastSourceId = ref<string | null>(null)

  // ── 토스트 ────────────────────────────────────────────────────────────
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
    showParticles, showBlastRadius, showVirtualNodes, showHelp,
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
