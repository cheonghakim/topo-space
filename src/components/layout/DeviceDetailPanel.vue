<template>
  <aside class="panel" v-if="device">
    <div class="panel-head">
      <div class="dev-title">
        <span class="type-tag" :style="{ color: DEVICE_TYPE_COLOR[device.normalizedType ?? 'unknown'], borderColor: DEVICE_TYPE_COLOR[device.normalizedType ?? 'unknown'] }">
          {{ DEVICE_TYPE_ABBR[device.normalizedType ?? 'unknown'] }}
        </span>
        <div>
          <div class="dev-name">{{ mapping?.displayName ?? device.hostname }}</div>
          <div class="dev-ip">{{ device.ip }}</div>
        </div>
        <span class="status-badge" :class="device.status">{{ STATUS_LABEL[device.status ?? 'unknown'] }}</span>
        <button class="close-btn" @click="ui.select(null)" title="Close">✕</button>
      </div>
    </div>

    <div class="panel-body">
      <section class="section">
        <div class="sec-title">Info</div>
        <div class="info-grid">
          <span class="info-k">Vendor</span>  <span class="info-v">{{ device.vendor ?? '—' }}</span>
          <span class="info-k">Model</span>   <span class="info-v">{{ device.model ?? '—' }}</span>
          <span class="info-k">OS</span>      <span class="info-v">{{ device.os ?? '—' }}</span>
          <span class="info-k">Source</span>  <span class="info-v">{{ device.source }}</span>
          <span class="info-k">Sync</span>    <span class="info-v">{{ device.syncState }}</span>
        </div>
      </section>

      <section class="section" v-if="device.metrics">
        <div class="sec-title">Metrics</div>
        <div v-for="m in metrics" :key="m.key" class="metric-row">
          <span class="m-label">{{ m.label }}</span>
          <div class="m-bar-wrap"><div class="m-bar" :style="{ width: m.pct + '%', background: m.color }" /></div>
          <span class="m-val" :class="{ hot: m.pct > 85 }">{{ m.display }}</span>
        </div>
      </section>

      <section class="section">
        <div class="sec-title clickable" @click="ifaceOpen = !ifaceOpen">
          <span>Interfaces ({{ ifaces.length }})</span>
          <span class="if-summary">
            <span class="if-up">Up {{ upCount }}</span>
            <span class="if-dn">Down {{ dnCount }}</span>
          </span>
          <span class="chevron">{{ ifaceOpen ? '−' : '+' }}</span>
        </div>
        <div v-if="ifaceOpen" class="iface-list">
          <div v-for="iface in ifaces" :key="iface.id" class="iface-row" :class="iface.status">
            <span class="if-dot" :class="iface.status" />
            <span class="if-name">{{ iface.name }}</span>
            <span class="if-alias">{{ iface.alias ?? '' }}</span>
            <span class="if-ip">{{ iface.ip ?? '' }}</span>
            <span class="if-speed">{{ iface.speed ? iface.speed + 'M' : '' }}</span>
            <div class="if-traffic">
              <span>In {{ fmt(iface.trafficIn) }}</span>
              <span>Out {{ fmt(iface.trafficOut) }}</span>
            </div>
            <span v-if="iface.errors" class="if-err">err:{{ iface.errors }}</span>
          </div>
        </div>
      </section>

      <section class="section" v-if="ui.mode === 'edit'">
        <div class="sec-title">Annotation</div>
        <div class="anno-form">
          <label>Display name
            <input v-model="displayName" class="anno-input" placeholder="Device alias" />
          </label>
          <label>Memo
            <textarea v-model="memo" class="anno-input anno-textarea" rows="2" />
          </label>
          <label>Tags (comma separated)
            <input v-model="tagsStr" class="anno-input" placeholder="web, db, prod" />
          </label>
          <button class="save-btn" @click="saveAnnotation">Save</button>
        </div>
      </section>

      <section class="section actions" v-if="ui.mode === 'edit'">
        <div class="sec-title">Actions</div>
        <div class="action-btns">
          <button class="act-btn isolate"  @click="isolate">Isolate</button>
          <button class="act-btn recover"  @click="recover">Recover</button>
          <button class="act-btn ack"      @click="acknowledge">Acknowledge</button>
          <button class="act-btn unmap" v-if="ui.mode === 'edit'" @click="unmapDevice">Remove from map</button>
        </div>
        <div v-if="actionLog" class="action-log">{{ actionLog }}</div>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useEditorStore }  from '@/stores/editor'
import { useUIStore }      from '@/stores/ui'
import { DEVICE_TYPE_COLOR, DEVICE_TYPE_ABBR, STATUS_LABEL } from '@/utils/colorUtils'

const editor = useEditorStore()
const ui     = useUIStore()

const ifaceOpen  = ref(false)
const actionLog  = ref('')
const displayName = ref('')
const memo       = ref('')
const tagsStr    = ref('')

const device  = computed(() => ui.selectedDeviceId ? editor.devices.get(ui.selectedDeviceId) ?? null : null)
const mapping = computed(() => device.value ? editor.getMappingByDeviceId(device.value.id) ?? null : null)
const ifaces  = computed(() => device.value ? (editor.interfacesByDevice.get(device.value.id) ?? []) : [])
const upCount = computed(() => ifaces.value.filter(i => i.status === 'up').length)
const dnCount = computed(() => ifaces.value.filter(i => i.status === 'down').length)

watch(mapping, m => {
  displayName.value = m?.displayName ?? ''
  memo.value        = m?.memo ?? ''
  tagsStr.value     = m?.tags?.join(', ') ?? ''
}, { immediate: true })

const metrics = computed(() => {
  const m = device.value?.metrics
  if (!m) return []
  return [
    { key: 'cpu',    label: 'CPU',    pct: m.cpu    ?? 0, display: `${(m.cpu ?? 0).toFixed(1)}%`,        color: bar(m.cpu ?? 0) },
    { key: 'mem',    label: 'Memory', pct: m.memory ?? 0, display: `${(m.memory ?? 0).toFixed(1)}%`,     color: bar(m.memory ?? 0) },
    { key: 'disk',   label: 'Disk',   pct: m.disk   ?? 0, display: `${(m.disk ?? 0).toFixed(1)}%`,       color: bar(m.disk ?? 0) },
    { key: 'netin',  label: 'Net In', pct: Math.min((m.networkIn ?? 0) / 10, 100), display: `${(m.networkIn ?? 0).toFixed(0)} M`, color: '#3b82f6' },
    { key: 'temp',   label: 'Temp',   pct: Math.min(((m.temperature ?? 40) - 20) / 60 * 100, 100), display: `${(m.temperature ?? 0).toFixed(0)}°C`, color: bar(((m.temperature ?? 40) - 20) / 60 * 100) },
  ]
})

function bar(pct: number) { return pct >= 90 ? '#ef4444' : pct >= 70 ? '#eab308' : '#22c55e' }
function fmt(n?: number)  { if (!n) return '0'; return n >= 1000 ? `${(n/1000).toFixed(1)}G` : `${n.toFixed(0)}M` }

function isolate()     { if (device.value) editor.updateDeviceStatus(device.value.id, 'offline');  actionLog.value = `[${ts()}] Isolated` }
function recover()     { if (device.value) editor.updateDeviceStatus(device.value.id, 'normal');   actionLog.value = `[${ts()}] Recovered` }
function acknowledge() { if (device.value) editor.updateDeviceStatus(device.value.id, 'acknowledged'); actionLog.value = `[${ts()}] Acknowledged` }

function saveAnnotation() {
  if (!device.value) return
  editor.updateAnnotation(device.value.id, {
    displayName: displayName.value || undefined,
    memo: memo.value || undefined,
    tags: tagsStr.value ? tagsStr.value.split(',').map(t => t.trim()).filter(Boolean) : [],
  })
  actionLog.value = `[${ts()}] Annotation saved`
}

function unmapDevice() {
  if (!device.value) return
  editor.unmapDevice(device.value.id)
  ui.select(null)
}

function ts() { return new Date().toLocaleTimeString() }
</script>

<style scoped>
.panel {
  width: 100%; flex-shrink: 0;
  display: flex; flex-direction: column; overflow: hidden;
}
.panel-head { padding: 10px 12px; border-bottom: 1px solid #1a2a4a; }
.dev-title  { display: flex; align-items: center; gap: 8px; }
.type-tag   {
  font-size: 10px; font-weight: 700; font-family: monospace;
  border: 1px solid; border-radius: 4px; padding: 2px 5px; flex-shrink: 0;
}
.dev-name   { color: #e2e8f0; font-weight: 700; font-size: 12px; }
.dev-ip     { color: #475569; font-family: monospace; font-size: 10px; }
.status-badge {
  margin-left: auto; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600;
}
.status-badge.normal       { background: #052e16; color: #4ade80; }
.status-badge.warning      { background: #422006; color: #fbbf24; }
.status-badge.critical     { background: #450a0a; color: #f87171; }
.status-badge.offline      { background: #1e293b; color: #6b7280; }
.status-badge.acknowledged { background: #422006; color: #fbbf24; }
.status-badge.unknown      { background: #1e293b; color: #94a3b8; }
.status-badge.maintenance  { background: #1e3a5f; color: #93c5fd; }
.status-badge.stale        { background: #1e1a18; color: #78716c; }
.close-btn { background: none; border: none; color: #475569; cursor: pointer; margin-left: 4px; }
.panel-body { flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #1e3a5a transparent; }
.section    { padding: 10px 12px; border-bottom: 1px solid #0f1f3a; }
.sec-title  { color: #475569; font-size: 10px; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 7px; font-weight: 600; }
.sec-title.clickable { cursor: pointer; display: flex; align-items: center; gap: 6px; user-select: none; }
.chevron    { margin-left: auto; }
.info-grid  { display: grid; grid-template-columns: 60px 1fr; gap: 3px 8px; font-size: 11px; }
.info-k     { color: #475569; }
.info-v     { color: #94a3b8; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.metric-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
.m-label    { color: #64748b; font-size: 10px; width: 40px; flex-shrink: 0; }
.m-bar-wrap { flex: 1; height: 5px; background: #0f1f3a; border-radius: 3px; overflow: hidden; }
.m-bar      { height: 100%; border-radius: 3px; transition: width .4s; }
.m-val      { color: #94a3b8; font-size: 10px; font-family: monospace; width: 60px; text-align: right; }
.m-val.hot  { color: #f87171; }

.if-summary   { margin-left: auto; display: flex; gap: 8px; font-size: 10px; }
.if-up        { color: #22c55e; }
.if-dn        { color: #ef4444; }
.iface-list   { font-size: 10px; font-family: monospace; }
.iface-row {
  display: grid; grid-template-columns: 8px 55px 40px 90px 35px 1fr auto;
  align-items: center; gap: 4px;
  padding: 3px 4px; border-bottom: 1px solid rgba(255,255,255,.03);
}
.iface-row.down   { opacity: 0.45; }
.if-dot           { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.if-dot.up        { background: #22c55e; }
.if-dot.down      { background: #ef4444; }
.if-dot.unknown   { background: #6b7280; }
.if-name          { color: #e2e8f0; }
.if-alias         { color: #64748b; overflow: hidden; }
.if-ip            { color: #3b82f6; }
.if-speed         { color: #475569; }
.if-traffic       { color: #94a3b8; display: flex; gap: 6px; }
.if-err           { color: #ef4444; }

.anno-form  { display: flex; flex-direction: column; gap: 6px; font-size: 11px; color: #64748b; }
.anno-input {
  display: block; width: 100%; margin-top: 3px;
  background: #0f172a; border: 1px solid #1e3a5a; color: #e2e8f0;
  padding: 5px 8px; border-radius: 5px; font-size: 11px; outline: none;
}
.anno-textarea { resize: none; }
.save-btn { background: #1e3a5f; border: 1px solid #2a4a8a; color: #93c5fd; padding: 5px; border-radius: 5px; cursor: pointer; font-size: 11px; }

/* Actions */
.actions    { border-bottom: none; }
.action-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
.act-btn { padding: 6px; border-radius: 5px; font-size: 11px; font-weight: 600; cursor: pointer; border: 1px solid; }
.act-btn.isolate  { background: #450a0a; border-color: #7f1d1d; color: #fca5a5; }
.act-btn.recover  { background: #052e16; border-color: #14532d; color: #86efac; }
.act-btn.ack      { background: #422006; border-color: #7c2d12; color: #fdba74; }
.act-btn.unmap    { background: #1e293b; border-color: #334155; color: #94a3b8; grid-column: span 2; }
.action-log { margin-top: 6px; background: #0f172a; border: 1px solid #1e3a5a; border-radius: 4px; padding: 5px 7px; font-size: 10px; font-family: monospace; color: #22c55e; }
</style>
