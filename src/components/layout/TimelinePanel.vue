<template>
  <div class="tl-panel" v-if="ui.showTimeline">
    <div class="tl-head">
      <button :class="['tl-btn', recording ? 'rec' : '']" @click="toggleRecord">
        {{ recording ? 'Stop Recording' : 'Record' }}
      </button>
      <span class="tl-info" v-if="frameCount > 0">{{ frameCount }} frames</span>
      <div class="tl-spacer" />
      <button class="tl-btn" @click="exportTimeline" title="Export timeline">Export Timeline</button>
      <button class="tl-btn" @click="exportLayout" title="Export layout">Export Layout</button>
      <button class="tl-btn" @click="triggerImport" title="Import layout">Import Layout</button>
      <input ref="fileInput" type="file" accept=".json" style="display:none" @change="onImport" />
      <button class="text-btn" @click="ui.showTimeline = false">Close</button>
    </div>

    <div class="tl-slider-wrap" v-if="frameCount > 0">
      <span class="tl-label">LIVE</span>
      <input
        type="range" min="-1" :max="frameCount - 1" step="1"
        v-model.number="ui.timelineFrameIdx"
        class="tl-slider"
        @input="onScrub"
      />
      <span class="tl-label">{{ currentFrame?.label ?? 'LIVE' }}</span>
    </div>

    <div v-if="ui.timelineFrameIdx >= 0" class="tl-replay-banner">
      Replay mode — real-time updates paused
      <button class="tl-btn" @click="ui.timelineFrameIdx = -1; emit('live')">Back to LIVE</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUIStore }    from '@/stores/ui'
import { useEditorStore } from '@/stores/editor'
import type { TimelineManager } from '@/core/TimelineManager'

const props = defineProps<{ timeline: TimelineManager }>()
const emit  = defineEmits<{ (e: 'scrub', frame: number): void; (e: 'live'): void }>()

const ui     = useUIStore()
const editor = useEditorStore()
const fileInput = ref<HTMLInputElement | null>(null)

const recording  = computed(() => props.timeline.isRecording)
const frameCount = computed(() => props.timeline.frameCount)
const currentFrame = computed(() => {
  if (ui.timelineFrameIdx < 0) return null
  return props.timeline.getFrame(ui.timelineFrameIdx)
})

function toggleRecord() {
  if (props.timeline.isRecording) {
    props.timeline.stopRecording()
    editor.logChange('timeline', 'Timeline recording stopped')
  } else {
    props.timeline.startRecording(() => {
      const state: Record<string, { status: any; metrics?: any }> = {}
      editor.devices.forEach(d => { state[d.id] = { status: d.status, metrics: { ...d.metrics } } })
      return state
    })
    editor.logChange('timeline', 'Timeline recording started')
  }
}

function onScrub() {
  emit('scrub', ui.timelineFrameIdx)
}

function exportTimeline() {
  const json = props.timeline.export()
  downloadJson(json, `timeline-${Date.now()}.json`)
}

function exportLayout() {
  const snap = editor.exportSnapshot()
  downloadJson(JSON.stringify(snap, null, 2), `layout-${Date.now()}.json`)
  editor.logChange('export', 'Layout exported')
}

function triggerImport() {
  fileInput.value?.click()
}

function onImport(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    try {
      const snap = JSON.parse(ev.target?.result as string)
      editor.importSnapshot(snap)
      editor.logChange('import', `Layout imported: ${file.name}`)
    } catch { alert('Invalid file format') }
  }
  reader.readAsText(file)
}

function downloadJson(content: string, filename: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([content], { type: 'application/json' }))
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<style scoped>
.tl-panel {
  background: rgba(8,12,24,.97); border-top: 1px solid #1a2a4a;
  display: flex; flex-direction: column; flex-shrink: 0; z-index: 200;
}
.tl-head {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 14px; height: 38px;
}
.tl-btn {
  background: #0f172a; border: 1px solid #1e3a5a; color: #94a3b8;
  padding: 3px 10px; border-radius: 5px; font-size: 11px; cursor: pointer;
  white-space: nowrap;
}
.tl-btn:hover { border-color: #3b82f6; color: #e2e8f0; }
.tl-btn.rec   { background: #450a0a; border-color: #7f1d1d; color: #f87171; }
.text-btn     { background: none; border: 1px solid #1e3a5a; color: #64748b; cursor: pointer; font-size: 11px; padding: 3px 9px; border-radius: 5px; }
.text-btn:hover { color: #e2e8f0; border-color: #3b82f6; }
.tl-info      { color: #475569; font-size: 11px; }
.tl-spacer    { flex: 1; }
.tl-slider-wrap {
  display: flex; align-items: center; gap: 10px;
  padding: 4px 14px 6px; border-top: 1px solid #0f1f3a;
}
.tl-label  { color: #475569; font-size: 10px; font-family: monospace; white-space: nowrap; }
.tl-slider { flex: 1; accent-color: #3b82f6; }
.tl-replay-banner {
  background: rgba(234,179,8,.1); border-top: 1px solid #422006;
  color: #fbbf24; font-size: 11px; padding: 5px 14px;
  display: flex; align-items: center; gap: 10px;
}
</style>
