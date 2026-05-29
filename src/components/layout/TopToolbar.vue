<template>
  <header class="toolbar">
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

    <div class="chip critical">Critical <b>{{ editor.criticalCount }}</b></div>
    <div class="chip warning">Warning <b>{{ editor.warningCount }}</b></div>
    <div class="chip total">Total <b>{{ editor.devices.size }}</b></div>

    <div class="spacer" />

    <div class="mode-switch">
      <button :class="['mode-btn', ui.mode === 'view' ? 'active' : '']" @click="ui.setMode('view')">View</button>
      <button :class="['mode-btn', ui.mode === 'edit' ? 'active' : '']" @click="ui.setMode('edit')">Edit</button>
    </div>

    <button :class="['btn', ui.linkToolActive ? 'btn-accent-on' : 'btn-accent']" @click="ui.toggleLinkTool()" title="Connect devices (L)">
      Connect
    </button>

    <button :class="['btn', ui.showHelp ? 'btn-on' : '']" @click="ui.showHelp = !ui.showHelp">Help</button>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'
import type { DeviceStatus } from '@/types'

const editor = useEditorStore()
const ui     = useUIStore()

const statusFilter = computed({
  get: () => ui.filter.status[0] ?? '',
  set: (v) => ui.setFilter({ status: v ? [v as DeviceStatus] : [] }),
})
</script>

<style scoped>
.toolbar {
  height: 42px; background: rgba(8,12,24,.97);
  border-bottom: 1px solid #1a2a4a;
  display: flex; align-items: center;
  padding: 0 12px; gap: 8px; flex-shrink: 0; z-index: 200;
}
.spacer { flex: 1; min-width: 8px; }
.search-wrap { position: relative; flex-shrink: 0; }
.search {
  background: #0f172a; border: 1px solid #1e3a5a; color: #e2e8f0;
  padding: 5px 48px 5px 9px; border-radius: 6px; font-size: 12px; width: 200px; outline: none;
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
</style>
