<template>
  <aside class="panel">
    <div class="panel-head">
      <span>Unmapped Devices <b>{{ editor.unmappedDevices.length }}</b></span>
      <button class="close-btn" @click="ui.showUnmapped = false" title="Close">✕</button>
    </div>

    <div v-if="editor.unmappedDevices.length === 0" class="empty">
      All devices are placed.
    </div>

    <div class="device-list">
      <div
        v-for="dev in editor.unmappedDevices"
        :key="dev.id"
        class="dev-row"
        draggable="true"
        @dragstart="onDragStart($event, dev.id)"
        @dragend="onDragEnd"
        :class="{ dragging: draggingId === dev.id }"
      >
        <span class="type-tag" :style="{ color: DEVICE_TYPE_COLOR[dev.normalizedType ?? 'unknown'], borderColor: DEVICE_TYPE_COLOR[dev.normalizedType ?? 'unknown'] }">
          {{ DEVICE_TYPE_ABBR[dev.normalizedType ?? 'unknown'] }}
        </span>
        <div class="dev-info">
          <div class="dev-name">{{ dev.hostname ?? dev.id }}</div>
          <div class="dev-ip">{{ dev.ip ?? '—' }}</div>
        </div>
        <span class="dev-source">{{ dev.source }}</span>
        <button class="ignore-btn" @click.stop="ignoreDevice(dev.id)" title="Ignore">✕</button>
      </div>
    </div>

    <div class="panel-footer">
      <span class="hint">Drag a device onto the 3D scene to place it.</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'
import { DEVICE_TYPE_COLOR, DEVICE_TYPE_ABBR } from '@/utils/colorUtils'

const editor = useEditorStore()
const ui     = useUIStore()

const draggingId = ref<string | null>(null)

function onDragStart(e: DragEvent, deviceId: string) {
  draggingId.value = deviceId
  e.dataTransfer?.setData('deviceId', deviceId)
  e.dataTransfer!.effectAllowed = 'move'
}

function onDragEnd() {
  draggingId.value = null
}

function ignoreDevice(deviceId: string) {
  const idx = editor.unmappedDevices.findIndex(d => d.id === deviceId)
  if (idx >= 0) editor.unmappedDevices.splice(idx, 1)
}
</script>

<style scoped>
.panel {
  width: 230px; flex-shrink: 0;
  background: rgba(8,12,24,.96);
  display: flex; flex-direction: column; overflow: hidden; z-index: 100;
}
.panel-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px; border-bottom: 1px solid #1a2a4a;
  color: #cbd5e1; font-size: 12px; font-weight: 600;
}
.panel-head b { color: #60a5fa; }
.close-btn { background: none; border: none; color: #475569; cursor: pointer; }
.close-btn:hover { color: #e2e8f0; }
.empty { padding: 20px 12px; color: #475569; font-size: 11px; text-align: center; }
.device-list { flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #1e3a5a transparent; }
.dev-row {
  display: grid; grid-template-columns: 34px 1fr auto 18px;
  align-items: center; gap: 6px;
  padding: 6px 10px; border-bottom: 1px solid rgba(255,255,255,.03);
  cursor: grab; transition: background .1s;
}
.dev-row:hover    { background: rgba(59,130,246,.08); }
.dev-row.dragging { opacity: 0.4; }
.type-tag {
  font-size: 9px; font-weight: 700; font-family: monospace;
  border: 1px solid; border-radius: 3px; padding: 1px 0; text-align: center;
}
.dev-info { min-width: 0; }
.dev-name { color: #cbd5e1; font-size: 11px; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dev-ip   { color: #475569; font-size: 10px; font-family: monospace; }
.dev-source { color: #334155; font-size: 9px; white-space: nowrap; }
.ignore-btn { background: none; border: none; color: #334155; cursor: pointer; font-size: 10px; }
.ignore-btn:hover { color: #ef4444; }
.panel-footer { padding: 8px 12px; border-top: 1px solid #1a2a4a; }
.hint { color: #334155; font-size: 10px; }
</style>
