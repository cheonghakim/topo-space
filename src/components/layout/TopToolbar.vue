<template>
  <header class="toolbar">
    <span class="brand">topospace</span>

    <div class="search-wrap">
      <input v-model="ui.filter.search" placeholder="Search name / IP" class="search" @keydown.escape="ui.resetFilter()" />
      <span v-if="ui.filter.search" class="clr" @click="ui.filter.search = ''">Clear</span>
    </div>

    <select v-model="statusFilter" class="sel">
      <option value="">All status</option>
      <option value="critical">Critical</option>
      <option value="warning">Warning</option>
      <option value="normal">Normal</option>
      <option value="offline">Offline</option>
      <option value="maintenance">Maintenance</option>
    </select>

    <div class="layer-group">
      <span class="group-label">Links</span>
      <label v-for="lt in LINK_TYPES" :key="lt.type" class="layer-chip" :style="{ '--c': lt.color }">
        <input type="checkbox" :checked="ui.visibleLinkTypes.has(lt.type)" @change="ui.toggleLinkType(lt.type)" />
        {{ lt.label }}
      </label>
    </div>

    <div class="spacer" />

    <div class="chip critical">Critical <b>{{ editor.criticalCount }}</b></div>
    <div class="chip warning">Warning <b>{{ editor.warningCount }}</b></div>
    <div class="chip total">Total <b>{{ editor.devices.size }}</b></div>

    <button :class="['btn', ui.wsConnected ? 'btn-on' : '']" @click="toggleWs">
      Live {{ ui.wsConnected ? 'On' : 'Off' }}
    </button>

    <div class="mode-switch">
      <button :class="['mode-btn', ui.mode === 'view' ? 'active' : '']" @click="ui.setMode('view')">View</button>
      <button :class="['mode-btn', ui.mode === 'edit' ? 'active' : '']" @click="ui.setMode('edit')">Edit</button>
    </div>

    <button :class="['btn', ui.linkToolActive ? 'btn-accent-on' : 'btn-accent']" @click="ui.toggleLinkTool()" title="Connect devices (L)">
      Connect
    </button>

    <div class="panel-toggles">
      <button :class="['tgl', ui.showUnmapped   ? 'on' : '']" @click="ui.showUnmapped   = !ui.showUnmapped">Devices</button>
      <button :class="['tgl', ui.showSpaceTree  ? 'on' : '']" @click="ui.showSpaceTree  = !ui.showSpaceTree">Spaces</button>
      <button :class="['tgl', ui.showSavedViews ? 'on' : '']" @click="ui.showSavedViews = !ui.showSavedViews">Views</button>
      <button :class="['tgl', ui.showChangeLog  ? 'on' : '']" @click="ui.showChangeLog  = !ui.showChangeLog">Log</button>
      <button :class="['tgl', ui.showVirtualNodes ? 'on' : '']" @click="ui.showVirtualNodes = !ui.showVirtualNodes">Nodes</button>
      <button :class="['tgl', ui.showParticles  ? 'on' : '']" @click="ui.showParticles  = !ui.showParticles">Traffic</button>
      <button :class="['tgl', ui.showMinimap    ? 'on' : '']" @click="ui.showMinimap    = !ui.showMinimap">Minimap</button>
      <button :class="['tgl', ui.showTimeline   ? 'on' : '']" @click="ui.showTimeline   = !ui.showTimeline">Timeline</button>
    </div>

    <button class="btn" @click="toggleSim">{{ simActive ? 'Stop Sim' : 'Simulate' }}</button>

    <div class="font-ctl" title="Text size">
      <button class="fbtn" @click="ui.setFontScale(ui.fontScale - 0.05)">A−</button>
      <button class="fbtn" @click="ui.setFontScale(ui.fontScale + 0.05)">A+</button>
    </div>

    <button :class="['btn', ui.showHelp ? 'btn-on' : '']" @click="ui.showHelp = !ui.showHelp">Help</button>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditorStore }     from '@/stores/editor'
import { useUIStore }         from '@/stores/ui'
import { useWebSocketSim }    from '@/composables/useWebSocketSim'
import type { DeviceStatus, EdgeType } from '@/types'

const editor = useEditorStore()
const ui     = useUIStore()
const ws     = useWebSocketSim()

const LINK_TYPES: { type: EdgeType; label: string; color: string }[] = [
  { type: 'physical',           label: 'Phys', color: '#3b82f6' },
  { type: 'logical',            label: 'Log',  color: '#8b5cf6' },
  { type: 'service_dependency', label: 'Svc',  color: '#f59e0b' },
  { type: 'traffic_flow',       label: 'Traf', color: '#22c55e' },
  { type: 'security_path',      label: 'Sec',  color: '#ef4444' },
  { type: 'manual',             label: 'Man',  color: '#94a3b8' },
]

const statusFilter = computed({
  get: () => ui.filter.status[0] ?? '',
  set: (v) => ui.setFilter({ status: v ? [v as DeviceStatus] : [] }),
})

function toggleWs() {
  if (ws.connected.value) { ws.disconnect(); ui.wsConnected = false }
  else { ws.connect(); ui.wsConnected = true }
}

const simActive = ref(false)
let simTimer: ReturnType<typeof setInterval> | null = null
const STATUS_POOL: DeviceStatus[] = ['normal','normal','normal','warning','critical','offline','maintenance']

function toggleSim() {
  if (simActive.value) {
    clearInterval(simTimer!); simTimer = null; simActive.value = false; return
  }
  simActive.value = true
  simTimer = setInterval(() => {
    const ids = [...editor.devices.keys()]
    for (let i = 0; i < 3; i++) {
      const id = ids[Math.floor(Math.random() * ids.length)]
      editor.updateDeviceStatus(id, STATUS_POOL[Math.floor(Math.random() * STATUS_POOL.length)])
    }
  }, 1400)
}
</script>

<style scoped>
.toolbar {
  height: 50px; background: rgba(8,12,24,.97);
  border-bottom: 1px solid #1a2a4a;
  display: flex; align-items: center;
  padding: 0 12px; gap: 8px; flex-shrink: 0; z-index: 200;
  overflow-x: auto; overflow-y: hidden;
}
.toolbar::-webkit-scrollbar { height: 3px; }
.brand {
  color: #60a5fa; font-weight: 700; font-size: 14px;
  letter-spacing: 0.02em; white-space: nowrap; flex-shrink: 0;
}
.spacer { flex: 1; min-width: 8px; }
.search-wrap { position: relative; flex-shrink: 0; }
.search {
  background: #0f172a; border: 1px solid #1e3a5a; color: #e2e8f0;
  padding: 5px 48px 5px 9px; border-radius: 6px; font-size: 12px; width: 170px; outline: none;
}
.search:focus { border-color: #3b82f6; }
.clr {
  position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
  color: #64748b; cursor: pointer; font-size: 10px;
}
.clr:hover { color: #cbd5e1; }
.sel {
  background: #0f172a; border: 1px solid #1e3a5a; color: #cbd5e1;
  padding: 5px 7px; border-radius: 6px; font-size: 12px; outline: none; flex-shrink: 0;
}
.layer-group { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.group-label { color: #475569; font-size: 10px; text-transform: uppercase; letter-spacing: .06em; }
.layer-chip {
  display: flex; align-items: center; gap: 2px; cursor: pointer;
  font-size: 10px; color: var(--c, #94a3b8);
  border: 1px solid var(--c, #475569); border-radius: 4px;
  padding: 2px 6px; opacity: 0.45; transition: opacity .15s; white-space: nowrap;
}
.layer-chip:has(input:checked) { opacity: 1; }
.layer-chip input { display: none; }
.chip {
  display: flex; align-items: center; gap: 4px;
  padding: 3px 9px; border-radius: 4px; font-size: 11px;
  background: rgba(255,255,255,.04); flex-shrink: 0; white-space: nowrap;
  border: 1px solid transparent;
}
.chip.critical { border-color: #450a0a; color: #f87171; }
.chip.warning  { border-color: #422006; color: #fbbf24; }
.chip.total    { color: #94a3b8; }
.chip b        { font-weight: 700; }
.btn {
  background: #0f172a; border: 1px solid #1e3a5a; color: #94a3b8;
  padding: 5px 11px; border-radius: 6px; font-size: 11px; cursor: pointer;
  white-space: nowrap; flex-shrink: 0; transition: all .12s;
}
.btn:hover { border-color: #3b82f6; color: #e2e8f0; }
.btn-on { border-color: #22c55e; color: #4ade80; }
.btn-accent { border-color: #4338ca; color: #a5b4fc; background: #1e1b4b; }
.btn-accent-on { border-color: #6366f1; color: #c7d2fe; background: #3730a3; }
.mode-switch { display: flex; border: 1px solid #1e3a5a; border-radius: 6px; overflow: hidden; flex-shrink: 0; }
.mode-btn { background: transparent; border: none; color: #64748b; padding: 5px 12px; font-size: 11px; cursor: pointer; }
.mode-btn.active { background: #1e3a5f; color: #93c5fd; }
.panel-toggles { display: flex; gap: 3px; flex-shrink: 0; }
.tgl {
  background: transparent; border: 1px solid transparent; color: #475569;
  font-size: 11px; cursor: pointer; padding: 4px 8px; border-radius: 5px;
  white-space: nowrap; transition: all .12s;
}
.tgl:hover { color: #94a3b8; background: rgba(255,255,255,.04); }
.tgl.on    { color: #93c5fd; background: rgba(59,130,246,.14); border-color: #1e3a5a; }
.font-ctl { display: flex; gap: 2px; flex-shrink: 0; }
.fbtn {
  background: #0f172a; border: 1px solid #1e3a5a; color: #94a3b8;
  padding: 4px 8px; border-radius: 5px; font-size: 11px; cursor: pointer;
}
.fbtn:hover { border-color: #3b82f6; color: #e2e8f0; }
</style>
