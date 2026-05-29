<template>
  <aside class="panel" v-if="space">
    <div class="panel-head">
      <span class="kind-tag">{{ space.type.toUpperCase() }}</span>
      <span class="sp-name">{{ space.name }}</span>
      <button class="close-btn" @click="ui.select(null)" title="Close">✕</button>
    </div>

    <div class="panel-body">
      <section class="section">
        <div class="sec-title">Info</div>
        <div class="info-grid">
          <span class="k">Kind</span>    <span class="v">{{ space.kind }}</span>
          <span class="k">Type</span>    <span class="v">{{ space.type }}</span>
          <span class="k">Devices</span> <span class="v">{{ deviceCount }}</span>
        </div>
      </section>

      <section class="section">
        <div class="sec-title">Name</div>
        <input v-model="name" class="inp" @change="applyName" />
      </section>

      <section class="section" v-if="space.size">
        <div class="sec-title">Size</div>
        <div class="slider-row">
          <span class="s-label">Width</span>
          <input type="range" :min="range.min" :max="range.max" step="0.5"
            v-model.number="width" class="slider" @input="applySize" />
          <span class="s-val">{{ width.toFixed(1) }}</span>
        </div>
        <div class="slider-row">
          <span class="s-label">Depth</span>
          <input type="range" :min="range.min" :max="range.max" step="0.5"
            v-model.number="depth" class="slider" @input="applySize" />
          <span class="s-val">{{ depth.toFixed(1) }}</span>
        </div>
      </section>

      <section class="section actions">
        <button class="act-btn archive" @click="archive">Archive space</button>
      </section>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useEditorStore }  from '@/stores/editor'
import { useUIStore }      from '@/stores/ui'
import { useNmsEditor }    from '@/composables/useNmsEditor'

const editor = useEditorStore()
const ui     = useUIStore()
const { refreshSpace } = useNmsEditor()

const space = computed(() => ui.selectedSpaceId ? editor.spaces.get(ui.selectedSpaceId) ?? null : null)
const deviceCount = computed(() =>
  ui.selectedSpaceId ? (editor.devicesBySpace.get(ui.selectedSpaceId)?.length ?? 0) : 0)

const name  = ref('')
const width = ref(10)
const depth = ref(10)

const range = computed(() => {
  const t = space.value?.type
  if (t === 'rack') return { min: 2, max: 16 }
  if (t === 'site') return { min: 20, max: 120 }
  return { min: 6, max: 60 }
})

watch(space, s => {
  name.value  = s?.name ?? ''
  width.value = s?.size?.width ?? 10
  depth.value = s?.size?.depth ?? 10
}, { immediate: true })

function applyName() {
  if (!space.value) return
  editor.updateSpace(space.value.id, { name: name.value })
}

function applySize() {
  if (!space.value || !space.value.size) return
  editor.updateSpace(space.value.id, {
    size: { ...space.value.size, width: width.value, depth: depth.value },
  })
  refreshSpace(space.value.id)
}

function archive() {
  if (!space.value) return
  if (!confirm('Archive this space?')) return
  editor.archiveSpace(space.value.id)
  editor.logChange('space.archive', `Space archived: ${space.value.id}`)
  refreshSpace(space.value.id)
  ui.select(null)
}
</script>

<style scoped>
.panel { width: 100%; flex-shrink: 0; display: flex; flex-direction: column; overflow: hidden; }
.panel-head {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px; border-bottom: 1px solid #1a2a4a;
}
.kind-tag {
  font-size: 9px; font-weight: 700; font-family: monospace; color: #93c5fd;
  border: 1px solid #2a4a8a; border-radius: 3px; padding: 1px 5px; flex-shrink: 0;
}
.sp-name { color: #e2e8f0; font-weight: 600; font-size: 12px; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.close-btn { background: none; border: none; color: #475569; cursor: pointer; }
.panel-body { overflow-y: auto; }
.section { padding: 10px 12px; border-bottom: 1px solid #0f1f3a; }
.sec-title { color: #475569; font-size: 10px; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 7px; }
.info-grid { display: grid; grid-template-columns: 60px 1fr; gap: 3px 8px; font-size: 11px; }
.k { color: #475569; }
.v { color: #94a3b8; font-family: monospace; }
.inp {
  width: 100%; background: #0f172a; border: 1px solid #1e3a5a; color: #e2e8f0;
  padding: 5px 8px; border-radius: 5px; font-size: 12px; outline: none;
}
.slider-row { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
.s-label { color: #64748b; font-size: 10px; width: 40px; flex-shrink: 0; }
.slider  { flex: 1; accent-color: #3b82f6; }
.s-val   { color: #94a3b8; font-size: 11px; font-family: monospace; width: 40px; text-align: right; }
.actions { border-bottom: none; }
.act-btn {
  width: 100%; padding: 7px; border-radius: 5px; font-size: 12px; cursor: pointer; border: 1px solid;
}
.act-btn.archive { background: #1e293b; border-color: #334155; color: #94a3b8; }
.act-btn.archive:hover { border-color: #ef4444; color: #fca5a5; }
</style>
