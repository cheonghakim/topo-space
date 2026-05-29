<template>
  <div class="vn-panel">
    <div class="vn-head">
      <span>Virtual Nodes</span>
      <button v-if="ui.mode === 'edit'" class="text-btn" @click="showAdd = !showAdd">Add</button>
      <button class="text-btn" @click="ui.showVirtualNodes = false">Close</button>
    </div>

    <div class="vn-list">
      <div v-for="node in vnList" :key="node.id" class="vn-row" @click="selectNode(node.id)">
        <span class="vn-tag">{{ node.type.slice(0, 3).toUpperCase() }}</span>
        <span class="vn-label">{{ node.label }}</span>
        <button v-if="ui.mode === 'edit'" class="del-btn" @click.stop="removeNode(node.id)">x</button>
      </div>
      <div v-if="!vnList.length" class="vn-empty">No virtual nodes</div>
    </div>

    <Transition name="fade">
      <div v-if="ui.mode === 'edit' && showAdd" class="add-form">
        <select v-model="newType" class="add-sel">
          <option value="internet">Internet</option>
          <option value="cloud">Cloud</option>
          <option value="external">External</option>
          <option value="custom">Custom</option>
        </select>
        <input v-model="newLabel" class="add-input" placeholder="Name" @keydown.enter="addNode" />
        <button class="add-btn" @click="addNode">Add</button>
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

const vnList = computed(() => [...editor.virtualNodes.values()])

function addNode() {
  if (ui.mode !== 'edit') return
  if (!newLabel.value.trim()) return
  const id = `vn-${Date.now()}`
  editor.addVirtualNode({
    id,
    label: newLabel.value.trim(),
    type:  newType.value,
    position: { x: Math.random() * 40 - 20, y: 0, z: Math.random() * 40 - 20 },
    createdAt: new Date().toISOString(),
  })
  editor.logChange('virtualNode.create', `Virtual node added: ${newLabel.value}`)
  newLabel.value = ''
  showAdd.value  = false
}

function removeNode(id: string) {
  if (ui.mode !== 'edit') return
  editor.removeVirtualNode(id)
}

function selectNode(id: string) {
  emit('select-node', id)
}
</script>

<style scoped>
.vn-panel {
  width: 100%; flex-shrink: 0;
  background: rgba(9,13,24,.5);
  border-bottom: 1px solid #1a2a4a; overflow: hidden;
}
.vn-head {
  display: flex; align-items: center; gap: 4px;
  padding: 8px 10px; border-bottom: 1px solid #1a2a4a;
  color: #cbd5e1; font-size: 12px; font-weight: 600;
}
.vn-head span { flex: 1; }
.text-btn { background: none; border: 1px solid #1e3a5a; color: #64748b; cursor: pointer; font-size: 10px; padding: 2px 7px; border-radius: 4px; }
.text-btn:hover { color: #e2e8f0; border-color: #3b82f6; }
.vn-list { max-height: 180px; overflow-y: auto; }
.vn-row { display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-bottom: 1px solid rgba(255,255,255,.03); cursor: pointer; font-size: 11px; }
.vn-row:hover { background: rgba(59,130,246,.08); }
.vn-tag { font-size: 8px; font-weight: 700; font-family: monospace; color: #a78bfa; border: 1px solid #6d28d9; border-radius: 3px; padding: 1px 4px; flex-shrink: 0; }
.vn-label { flex: 1; color: #cbd5e1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
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
