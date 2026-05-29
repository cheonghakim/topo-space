<template>
  <Teleport to="body">
    <Transition name="ctx-fade">
      <div
        v-if="ui.contextMenu.visible"
        class="ctx-menu"
        :style="{ left: ui.contextMenu.x + 'px', top: ui.contextMenu.y + 'px' }"
        @click.stop
      >
        <div class="ctx-title">Select link type</div>
        <button
          v-for="item in LINK_TYPES"
          :key="item.type"
          class="ctx-item"
          :style="{ borderLeftColor: item.color }"
          @click="select(item.type)"
        >
          <span class="ctx-dot" :style="{ background: item.color }" />
          <span>{{ item.label }}</span>
        </button>
        <div class="ctx-sep" />
        <button class="ctx-item cancel" @click="ui.hideContextMenu()">Cancel</button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useUIStore }     from '@/stores/ui'
import { useNmsEditor }   from '@/composables/useNmsEditor'
import type { EdgeType }  from '@/types'

const ui     = useUIStore()
const { confirmCreateLink } = useNmsEditor()

const LINK_TYPES: { type: EdgeType; label: string; color: string }[] = [
  { type: 'physical',           label: 'Physical',            color: '#3b82f6' },
  { type: 'logical',            label: 'Logical',             color: '#8b5cf6' },
  { type: 'service_dependency', label: 'Service Dependency',  color: '#f59e0b' },
  { type: 'traffic_flow',       label: 'Traffic Flow',        color: '#22c55e' },
  { type: 'security_path',      label: 'Security Path',       color: '#ef4444' },
]

function select(type: EdgeType) {
  confirmCreateLink(ui.contextMenu.sourceDeviceId, ui.contextMenu.targetDeviceId, type)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') ui.hideContextMenu()
}

onMounted(()        => document.addEventListener('keydown', onKeyDown))
onBeforeUnmount(()  => document.removeEventListener('keydown', onKeyDown))
</script>

<style scoped>
.ctx-menu {
  position: fixed;
  background: rgba(9,13,24,0.97);
  border: 1px solid #2a4a8a;
  border-radius: 8px;
  padding: 6px;
  z-index: 9999;
  min-width: 190px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
}
.ctx-title {
  color: #475569;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 10px 6px;
}
.ctx-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: transparent;
  border: none;
  border-left: 3px solid transparent;
  color: #cbd5e1;
  padding: 7px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s;
}
.ctx-item:hover { background: rgba(59,130,246,0.12); }
.ctx-item.cancel { color: #64748b; border-left-color: transparent !important; }
.ctx-dot { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
.ctx-sep  { height: 1px; background: #1a2a4a; margin: 4px 0; }
.ctx-fade-enter-active, .ctx-fade-leave-active { transition: opacity 0.1s, transform 0.1s; }
.ctx-fade-enter-from, .ctx-fade-leave-to { opacity: 0; transform: scale(0.95); }
</style>
