<template>
  <aside class="panel" v-if="link">
    <div class="panel-head">
      <div class="link-title">
        <span class="link-icon" :style="{ color: LINK_STYLE[link.type]?.color }">╌</span>
        <div>
          <div class="link-type">{{ LINK_LABEL[link.type] }}</div>
          <div class="link-src">{{ srcName }} → {{ tgtName }}</div>
        </div>
        <span class="status-dot" :class="link.status" />
        <button class="close-btn" @click="ui.select(null)">✕</button>
      </div>
    </div>

    <div class="panel-body">
      <section class="section">
        <div class="sec-title">링크 정보</div>
        <div class="info-grid">
          <span class="k">Type</span>       <span class="v">{{ LINK_LABEL[link.type] }}</span>
          <span class="k">Status</span>     <span class="v" :class="`s-${link.status}`">{{ link.status ?? 'unknown' }}</span>
          <span class="k">Source</span>     <span class="v">{{ link.source }}</span>
          <span class="k">Confidence</span> <span class="v">{{ link.confidence ?? '—' }}</span>
          <span class="k">Bandwidth</span>  <span class="v">{{ link.bandwidth ? link.bandwidth + ' Mbps' : '—' }}</span>
          <span class="k">Label</span>      <span class="v">{{ link.label ?? '—' }}</span>
        </div>
      </section>

      <section class="section" v-if="ui.mode === 'edit' && link.source === 'manual'">
        <div class="sec-title">편집</div>
        <div class="edit-form">
          <label>Status
            <select v-model="editStatus" class="sel">
              <option value="up">Up</option>
              <option value="down">Down</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <label>Label
            <input v-model="editLabel" class="inp" />
          </label>
          <button class="save-btn" @click="save">적용</button>
          <button class="del-btn" @click="deleteLink">삭제</button>
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'
import { LINK_STYLE }     from '@/utils/colorUtils'
import type { EdgeType }  from '@/types'

const editor = useEditorStore()
const ui     = useUIStore()

const LINK_LABEL: Record<EdgeType, string> = {
  physical: 'Physical', logical: 'Logical',
  service_dependency: 'Service Dependency', traffic_flow: 'Traffic Flow',
  security_path: 'Security Path', manual: 'Manual', inferred: 'Inferred',
}

const link    = computed(() => ui.selectedLinkId ? editor.links.get(ui.selectedLinkId) ?? null : null)
const srcDev  = computed(() => link.value ? editor.devices.get(link.value.sourceDeviceId) : null)
const tgtDev  = computed(() => link.value ? editor.devices.get(link.value.targetDeviceId) : null)
const srcName = computed(() => srcDev.value?.hostname ?? '?')
const tgtName = computed(() => tgtDev.value?.hostname ?? '?')

const editStatus = ref<'up'|'down'|'unknown'>('up')
const editLabel  = ref('')
watch(link, l => { editStatus.value = l?.status ?? 'up'; editLabel.value = l?.label ?? '' }, { immediate: true })

function save() {
  if (!link.value) return
  editor.updateLink(link.value.id, { status: editStatus.value, label: editLabel.value || undefined })
}

function deleteLink() {
  if (!link.value) return
  editor.removeLink(link.value.id)
  ui.select(null)
}
</script>

<style scoped>
.panel {
  width: 240px; flex-shrink: 0;
  background: rgba(8,12,24,.96); border-left: 1px solid #1a2a4a;
  display: flex; flex-direction: column; z-index: 100;
}
.panel-head   { padding: 10px 12px; border-bottom: 1px solid #1a2a4a; }
.link-title   { display: flex; align-items: center; gap: 8px; }
.link-icon    { font-size: 18px; }
.link-type    { color: #e2e8f0; font-size: 12px; font-weight: 700; }
.link-src     { color: #64748b; font-size: 10px; font-family: monospace; }
.status-dot   { width: 8px; height: 8px; border-radius: 50%; margin-left: auto; }
.status-dot.up      { background: #22c55e; }
.status-dot.down    { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
.status-dot.unknown { background: #6b7280; }
.close-btn    { background: none; border: none; color: #475569; cursor: pointer; }
.panel-body   { overflow-y: auto; }
.section      { padding: 10px 12px; border-bottom: 1px solid #0f1f3a; }
.sec-title    { color: #475569; font-size: 10px; text-transform: uppercase; margin-bottom: 7px; }
.info-grid    { display: grid; grid-template-columns: 70px 1fr; gap: 3px 8px; font-size: 11px; }
.k { color: #475569; }
.v { color: #94a3b8; font-family: monospace; }
.v.s-up   { color: #22c55e; }
.v.s-down { color: #ef4444; }
.edit-form { display: flex; flex-direction: column; gap: 6px; font-size: 11px; color: #64748b; }
.sel, .inp {
  display: block; width: 100%; margin-top: 3px;
  background: #0f172a; border: 1px solid #1e3a5a; color: #e2e8f0;
  padding: 5px 8px; border-radius: 5px; font-size: 11px; outline: none;
}
.save-btn { background: #1e3a5f; border: 1px solid #2a4a8a; color: #93c5fd; padding: 5px; border-radius: 5px; cursor: pointer; }
.del-btn  { background: #450a0a; border: 1px solid #7f1d1d; color: #fca5a5; padding: 5px; border-radius: 5px; cursor: pointer; }
</style>
