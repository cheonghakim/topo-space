<template>
  <div class="cl-panel">
    <div class="cl-head">
      <span>Change Log</span>
      <button class="cl-clear" @click="editor.changeLog.splice(0)">Clear</button>
      <button class="icon-btn" @click="ui.showChangeLog = false">Close</button>
    </div>

    <div v-if="!editor.changeLog.length" class="cl-empty">No changes yet</div>

    <div class="cl-list">
      <div v-for="entry in editor.changeLog" :key="entry.id" class="cl-row">
        <span class="cl-type" :class="entryClass(entry.type)">{{ entry.type }}</span>
        <span class="cl-msg">{{ entry.msg }}</span>
        <span class="cl-ts">{{ entry.ts }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'

const editor = useEditorStore()
const ui     = useUIStore()

function entryClass(type: string) {
  if (type.includes('link'))    return 'link'
  if (type.includes('space'))   return 'space'
  if (type.includes('device'))  return 'device'
  return 'other'
}
</script>

<style scoped>
.cl-panel {
  width: 100%; flex-shrink: 0;
  background: rgba(9,13,24,.5);
  border-bottom: 1px solid #1a2a4a;
  overflow: hidden; max-height: 320px; display: flex; flex-direction: column;
}
.cl-head {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 10px; border-bottom: 1px solid #1a2a4a;
  color: #cbd5e1; font-size: 12px; font-weight: 600; flex-shrink: 0;
}
.cl-clear  { background: transparent; border: 1px solid #334155; color: #64748b; padding: 2px 7px; border-radius: 4px; font-size: 10px; cursor: pointer; }
.icon-btn  { background: none; border: 1px solid #1e3a5a; color: #64748b; cursor: pointer; font-size: 10px; padding: 2px 7px; border-radius: 4px; }
.icon-btn:hover { color: #e2e8f0; border-color: #3b82f6; }
.cl-empty  { padding: 12px; color: #475569; font-size: 11px; text-align: center; }
.cl-list   { overflow-y: auto; scrollbar-width: thin; }
.cl-row    { display: grid; grid-template-columns: 90px 1fr auto; gap: 4px; align-items: baseline; padding: 5px 10px; border-bottom: 1px solid rgba(255,255,255,.03); font-size: 10px; }
.cl-type   { font-family: monospace; border-radius: 3px; padding: 1px 4px; }
.cl-type.device { background: #1e3a5f; color: #93c5fd; }
.cl-type.space  { background: #1a3a2a; color: #4ade80; }
.cl-type.link   { background: #1e1b4b; color: #a5b4fc; }
.cl-type.other  { background: #1e293b; color: #94a3b8; }
.cl-msg    { color: #94a3b8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cl-ts     { color: #334155; flex-shrink: 0; }
</style>
