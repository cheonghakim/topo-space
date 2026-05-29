<template>
  <aside class="panel">
    <div class="panel-head">
      <span>Unmapped Devices <b>{{ editor.unmappedDevices.length }}</b></span>
      <button class="text-btn" @click="showAdd = !showAdd" title="Add device manually">Add</button>
      <button class="close-btn" @click="ui.showUnmapped = false" title="Close">✕</button>
    </div>

    <Transition name="fade">
      <div v-if="showAdd" class="add-form">
        <input v-model="form.hostname" class="add-input" placeholder="Hostname *" @keydown.enter="submitAdd" />
        <input v-model="form.ip" class="add-input" placeholder="IP address" @keydown.enter="submitAdd" />
        <div class="add-row">
          <select v-model="form.type" class="add-sel">
            <option v-for="t in TYPES" :key="t" :value="t">{{ DEVICE_TYPE_LABEL[t] }}</option>
          </select>
          <input v-model="form.vendor" class="add-input" placeholder="Vendor" />
        </div>
        <button class="add-ok" @click="submitAdd">Add device</button>
      </div>
    </Transition>

    <div v-if="editor.unmappedDevices.length === 0 && !showAdd" class="empty">
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
import { ref, reactive } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'
import { DEVICE_TYPE_COLOR, DEVICE_TYPE_ABBR, DEVICE_TYPE_LABEL } from '@/utils/colorUtils'
import type { DeviceType } from '@/types'

const editor = useEditorStore()
const ui     = useUIStore()

const draggingId = ref<string | null>(null)

const TYPES: DeviceType[] = [
  'server','switch','router','firewall','database','storage',
  'vm','container','load_balancer','access_point','cloud_service','unknown',
]
const showAdd = ref(false)
const form = reactive<{ hostname: string; ip: string; type: DeviceType; vendor: string }>({
  hostname: '', ip: '', type: 'server', vendor: '',
})

function submitAdd() {
  if (!form.hostname.trim()) return
  editor.addManualDevice({
    hostname: form.hostname.trim(),
    ip: form.ip.trim() || undefined,
    type: form.type,
    vendor: form.vendor.trim() || undefined,
  })
  ui.addToast(`Device added: ${form.hostname.trim()}`, 'success')
  form.hostname = ''; form.ip = ''; form.vendor = ''
  showAdd.value = false
}

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
  display: flex; align-items: center; gap: 6px;
  padding: 10px 12px; border-bottom: 1px solid #1a2a4a;
  color: #cbd5e1; font-size: 12px; font-weight: 600;
}
.panel-head > span:first-child { flex: 1; }
.panel-head b { color: #60a5fa; }
.text-btn { background: none; border: 1px solid #1e3a5a; color: #64748b; cursor: pointer; font-size: 10px; padding: 2px 7px; border-radius: 4px; }
.text-btn:hover { color: #e2e8f0; border-color: #3b82f6; }
.close-btn { background: none; border: none; color: #475569; cursor: pointer; }
.close-btn:hover { color: #e2e8f0; }
.empty { padding: 20px 12px; color: #475569; font-size: 11px; text-align: center; }

.add-form {
  padding: 10px 12px; border-bottom: 1px solid #1a2a4a;
  display: flex; flex-direction: column; gap: 6px;
  background: rgba(30,58,95,.12);
}
.add-row { display: flex; gap: 6px; }
.add-input, .add-sel {
  width: 100%; background: #0f172a; border: 1px solid #1e3a5a; color: #e2e8f0;
  padding: 5px 8px; border-radius: 5px; font-size: 11px; outline: none;
}
.add-input:focus, .add-sel:focus { border-color: #3b82f6; }
.add-ok {
  background: #1e3a5f; border: 1px solid #2a4a8a; color: #93c5fd;
  padding: 6px; border-radius: 5px; font-size: 11px; cursor: pointer;
}
.add-ok:hover { background: #2a4a8a; }
.fade-enter-active, .fade-leave-active { transition: opacity .15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
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
