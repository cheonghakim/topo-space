<template>
  <div class="vn-panel">
    <div class="vn-head">
      <span>가상 노드</span>
      <button class="icon-btn" @click="showAdd = !showAdd">＋</button>
      <button class="icon-btn" @click="ui.showVirtualNodes = false">✕</button>
    </div>

    <div class="vn-list">
      <div v-for="node in vnList" :key="node.id" class="vn-row" @click="selectNode(node.id)">
        <span class="vn-icon">{{ TYPE_ICON[node.type] }}</span>
        <span class="vn-label">{{ node.label }}</span>
        <span class="vn-type">{{ node.type }}</span>
        <button class="del-btn" @click.stop="removeNode(node.id)">✕</button>
      </div>
      <div v-if="!vnList.length" class="vn-empty">가상 노드 없음</div>
    </div>

    <Transition name="fade">
      <div v-if="showAdd" class="add-form">
        <select v-model="newType" class="add-sel">
          <option value="internet">Internet</option>
          <option value="cloud">Cloud</option>
          <option value="external">External</option>
          <option value="custom">Custom</option>
        </select>
        <input v-model="newLabel" class="add-input" placeholder="이름..." @keydown.enter="addNode" />
        <button class="add-btn" @click="addNode">추가</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'
import type { VirtualNode } from '@/types'

const editor = useEditorStore()
const ui     = useUIStore()
const emit   = defineEmits<{ (e: 'select-node', id: string): void }>()

const showAdd  = ref(false)
const newType  = ref<VirtualNode['type']>('internet')
const newLabel = ref('')

const TYPE_ICON: Record<string, string> = {
  internet: '🌐', cloud: '☁', external: '↔', custom: '◆',
}

const vnList = computed(() => [...editor.virtualNodes.values()])

function addNode() {
  if (!newLabel.value.trim()) return
  const id = `vn-${Date.now()}`
  editor.addVirtualNode({
    id,
    label: newLabel.value.trim(),
    type:  newType.value,
    position: { x: Math.random() * 40 - 20, y: 0, z: Math.random() * 40 - 20 },
    createdAt: new Date().toISOString(),
  })
  editor.logChange('virtualNode.create', `가상 노드 추가: ${newLabel.value}`)
  newLabel.value = ''
  showAdd.value  = false
}

function removeNode(id: string) {
  editor.removeVirtualNode(id)
}

function selectNode(id: string) {
  emit('select-node', id)
}
</script>

<style scoped>
.vn-panel {
  position: absolute; top: 55px; right: 8px;
  width: 200px; background: rgba(9,13,24,.96);
  border: 1px solid #2a4a8a; border-radius: 8px; z-index: 300; overflow: hidden;
}
.vn-head {
  display: flex; align-items: center; gap: 4px;
  padding: 8px 10px; border-bottom: 1px solid #1a2a4a;
  color: #cbd5e1; font-size: 12px; font-weight: 600;
}
.vn-head span { flex: 1; }
.icon-btn { background: none; border: none; color: #64748b; cursor: pointer; }
.icon-btn:hover { color: #e2e8f0; }
.vn-list { max-height: 180px; overflow-y: auto; }
.vn-row { display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-bottom: 1px solid rgba(255,255,255,.03); cursor: pointer; font-size: 11px; }
.vn-row:hover { background: rgba(59,130,246,.08); }
.vn-icon  { font-size: 14px; }
.vn-label { flex: 1; color: #cbd5e1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vn-type  { color: #475569; font-size: 10px; }
.del-btn  { background: none; border: none; color: #334155; cursor: pointer; font-size: 10px; }
.del-btn:hover { color: #ef4444; }
.vn-empty { padding: 10px; color: #475569; font-size: 11px; text-align: center; }
.add-form { padding: 8px 10px; border-top: 1px solid #1a2a4a; display: flex; flex-direction: column; gap: 5px; }
.add-sel, .add-input {
  background: #0f172a; border: 1px solid #1e3a5a; color: #e2e8f0;
  padding: 4px 8px; border-radius: 5px; font-size: 11px; outline: none;
}
.add-btn { background: #1e3a5f; border: 1px solid #2a4a8a; color: #93c5fd; padding: 4px; border-radius: 5px; cursor: pointer; font-size: 11px; }
.fade-enter-active, .fade-leave-active { transition: opacity .15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
