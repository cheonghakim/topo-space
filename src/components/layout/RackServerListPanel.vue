<template>
  <aside class="panel" v-if="rack">
    <div class="panel-head">
      <span class="rack-name">{{ rack.name }}</span>
      <div class="summary">
        <span class="chip c">C {{ critCount }}</span>
        <span class="chip w">W {{ warnCount }}</span>
        <span class="chip n">N {{ normCount }}</span>
      </div>
      <button class="close-btn" @click="close" title="Close">✕</button>
    </div>

    <div class="hint">Click a device to open details · hover to highlight in 3D.</div>

    <div class="server-list">
      <div
        v-for="dev in sortedDevices"
        :key="dev.id"
        class="srv-row"
        :class="[dev.status, { active: ui.selectedDeviceId === dev.id }]"
        @click="selectDevice(dev.id)"
        @mouseenter="ui.hoveredId = dev.id"
        @mouseleave="ui.hoveredId = null"
      >
        <span class="dot" :style="{ background: STATUS_COLOR_HEX[dev.status ?? 'unknown'] }" />
        <span class="type-tag" :style="{ color: DEVICE_TYPE_COLOR[dev.normalizedType ?? 'unknown'], borderColor: DEVICE_TYPE_COLOR[dev.normalizedType ?? 'unknown'] }">
          {{ DEVICE_TYPE_ABBR[dev.normalizedType ?? 'unknown'] }}
        </span>
        <div class="srv-info">
          <div class="srv-name">{{ dev.hostname ?? dev.id }}</div>
          <div class="srv-ip">{{ dev.ip ?? '—' }}</div>
        </div>
        <div class="srv-metrics" v-if="dev.metrics">
          <span :class="{ hot: (dev.metrics.cpu ?? 0) > 85 }">C{{ (dev.metrics.cpu ?? 0).toFixed(0) }}%</span>
          <span :class="{ hot: (dev.metrics.memory ?? 0) > 85 }">M{{ (dev.metrics.memory ?? 0).toFixed(0) }}%</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'
import { STATUS_COLOR_HEX, DEVICE_TYPE_COLOR, DEVICE_TYPE_ABBR } from '@/utils/colorUtils'

const editor = useEditorStore()
const ui     = useUIStore()

const rack = computed(() => ui.selectedRackForList ? editor.spaces.get(ui.selectedRackForList) ?? null : null)

const rackDevices = computed(() => {
  if (!ui.selectedRackForList) return []
  return editor.devicesBySpace.get(ui.selectedRackForList) ?? []
})

const sortedDevices = computed(() => {
  return [...rackDevices.value].sort((a, b) => {
    const order: Record<string, number> = { critical: 0, warning: 1, offline: 2, normal: 3, unknown: 4, maintenance: 5 }
    return (order[a.status ?? 'unknown'] ?? 9) - (order[b.status ?? 'unknown'] ?? 9)
  })
})

const critCount = computed(() => rackDevices.value.filter(d => d.status === 'critical').length)
const warnCount = computed(() => rackDevices.value.filter(d => d.status === 'warning').length)
const normCount = computed(() => rackDevices.value.filter(d => d.status === 'normal').length)

function selectDevice(id: string) {
  ui.select({ type: 'device', id })
}

function close() {
  ui.showRackServerList  = false
  ui.selectedRackForList = null
  ui.select(null)
}
</script>

<style scoped>
.panel {
  width: 230px; flex-shrink: 0; background: rgba(8,12,24,.96);
  display: flex; flex-direction: column; overflow: hidden; z-index: 100;
}
.panel-head {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 12px; border-bottom: 1px solid #1a2a4a; flex-shrink: 0;
}
.rack-name { color: #cbd5e1; font-size: 12px; font-weight: 600; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.summary   { display: flex; gap: 5px; flex-shrink: 0; }
.chip      { font-size: 11px; padding: 1px 5px; border-radius: 9px; background: rgba(255,255,255,.05); }
.chip.c    { color: #f87171; }
.chip.w    { color: #fbbf24; }
.chip.n    { color: #4ade80; }
.close-btn { background: none; border: none; color: #475569; cursor: pointer; }
.hint { padding: 6px 12px; color: #334155; font-size: 10px; border-bottom: 1px solid #0f1f3a; flex-shrink: 0; }
.server-list { flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #1e3a5a transparent; }
.srv-row {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-bottom: 1px solid rgba(255,255,255,.03);
  cursor: pointer; transition: background .1s;
}
.srv-row:hover       { background: rgba(59,130,246,.12); }
.srv-row.active      { background: rgba(59,130,246,.22); border-left: 2px solid #3b82f6; }
.srv-row.critical    { background: rgba(239,68,68,.05); }
.srv-row.warning     { background: rgba(234,179,8,.04); }
.dot      { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.type-tag {
  font-size: 9px; font-weight: 700; font-family: monospace; flex-shrink: 0;
  border: 1px solid; border-radius: 3px; padding: 1px 4px; min-width: 32px; text-align: center;
}
.srv-info  { flex: 1; min-width: 0; }
.srv-name  { color: #cbd5e1; font-size: 11px; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.srv-ip    { color: #475569; font-size: 10px; font-family: monospace; }
.srv-metrics { display: flex; gap: 4px; font-size: 10px; color: #64748b; font-family: monospace; flex-shrink: 0; }
.srv-metrics .hot { color: #f87171; }
</style>
