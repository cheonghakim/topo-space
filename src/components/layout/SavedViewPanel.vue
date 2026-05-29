<template>
  <div class="sv-panel">
    <div class="sv-head">
      <span>저장된 뷰</span>
      <button class="sv-save" @click="saveCurrentView" title="현재 뷰 저장">💾 저장</button>
      <button class="icon-btn" @click="ui.showSavedViews = false">✕</button>
    </div>

    <div v-if="!editor.savedViews.length" class="sv-empty">저장된 뷰 없음</div>

    <div class="sv-list">
      <div v-for="view in editor.savedViews" :key="view.id" class="sv-row">
        <div class="sv-info" @click="loadView(view)">
          <div class="sv-name">{{ view.name }}</div>
          <div class="sv-time">{{ view.createdAt }}</div>
        </div>
        <button class="del-btn" @click="editor.removeSavedView(view.id)">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore }  from '@/stores/editor'
import { useUIStore }      from '@/stores/ui'
import type { SavedView }  from '@/types'

const editor = useEditorStore()
const ui     = useUIStore()

// 외부에서 카메라 접근을 위해 이벤트 emit
const emit = defineEmits<{
  (e: 'load-view', view: SavedView): void
  (e: 'save-view', name: string): void
}>()

const viewName = ref('')

function saveCurrentView() {
  const name = prompt('뷰 이름을 입력하세요:', `View-${editor.savedViews.length + 1}`) ?? ''
  if (!name) return
  emit('save-view', name)
}

function loadView(view: SavedView) {
  emit('load-view', view)
}
</script>

<style scoped>
.sv-panel {
  position: absolute; top: 55px; right: 8px;
  width: 210px; background: rgba(9,13,24,.96);
  border: 1px solid #2a4a8a; border-radius: 8px;
  z-index: 300; overflow: hidden;
}
.sv-head {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 10px; border-bottom: 1px solid #1a2a4a;
  color: #cbd5e1; font-size: 12px; font-weight: 600;
}
.sv-save { background: #1e3a5f; border: 1px solid #2a4a8a; color: #93c5fd; padding: 3px 8px; border-radius: 5px; font-size: 10px; cursor: pointer; }
.icon-btn { background: none; border: none; color: #475569; cursor: pointer; margin-left: auto; }
.sv-empty { padding: 12px 10px; color: #475569; font-size: 11px; text-align: center; }
.sv-list  { max-height: 220px; overflow-y: auto; }
.sv-row   { display: flex; align-items: center; padding: 7px 10px; border-bottom: 1px solid rgba(255,255,255,.03); }
.sv-info  { flex: 1; cursor: pointer; }
.sv-info:hover .sv-name { color: #60a5fa; }
.sv-name  { color: #cbd5e1; font-size: 11px; }
.sv-time  { color: #475569; font-size: 10px; }
.del-btn  { background: none; border: none; color: #334155; cursor: pointer; font-size: 10px; }
.del-btn:hover { color: #ef4444; }
</style>
