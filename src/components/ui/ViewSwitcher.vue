<template>
  <div v-if="visible" class="vs-wrap">
    <span class="vs-crumb">{{ breadcrumb }}</span>
    <button class="vs-btn" @click="ui.showOverview()" title="Back to campus overview">
      🗺 Campus
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUIStore } from '@/stores/ui'
import { useEditorStore } from '@/stores/editor'

const ui = useUIStore()
const editor = useEditorStore()

const CONTAINER_TYPES = new Set(['building', 'floor', 'site'])

// Only show the switcher when there's actually something to switch between —
// a plain single-site dataset has nothing to drill into, so it stays hidden.
const hasHierarchy = computed(() => {
  if (editor.rootSpaces.length > 1) return true
  return editor.rootSpaces.some(r =>
    editor.childSpaces(r.id).some(c => CONTAINER_TYPES.has(c.type)))
})

const visible = computed(() => ui.viewMode === '3d' && hasHierarchy.value)

const breadcrumb = computed(() => {
  const id = ui.activeRootSpaceId
  if (!id) return ''
  const space = editor.spaces.get(id)
  if (!space) return ''
  const parent = space.parentId ? editor.spaces.get(space.parentId) : null
  return parent ? `${parent.name} › ${space.name}` : space.name
})
</script>

<style scoped>
.vs-wrap {
  position: absolute; top: 10px; left: 10px; z-index: 120;
  display: flex; align-items: center; gap: 8px;
  background: rgba(8, 12, 24, 0.96);
  border: 1px solid #1a2a4a; border-radius: 6px;
  padding: 5px 8px;
  font-size: 11px;
  pointer-events: auto;
}
.vs-crumb {
  color: #94a3b8; font-family: monospace; white-space: nowrap;
}
.vs-btn {
  background: #1e3a5f; border: 1px solid #2a4a8a; border-radius: 5px;
  color: #93c5fd; font-size: 11px; padding: 3px 8px; cursor: pointer;
  white-space: nowrap;
}
.vs-btn:hover { background: #244a75; }
</style>
