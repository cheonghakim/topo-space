<template>
  <div class="tl-panel" v-if="ui.showTimeline">
    <div class="tl-head">
      <button :class="['tl-btn', recording ? 'rec' : '']" @click="toggleRecord">
        {{ recording ? '⏹ 녹화 중지' : '⏺ 녹화 시작' }}
      </button>
      <span class="tl-info" v-if="frameCount > 0">{{ frameCount }}개 프레임</span>
      <div class="tl-spacer" />
      <button class="tl-btn" @click="exportTimeline" title="타임라인 내보내기">📤 Export</button>
      <button class="tl-btn" @click="exportLayout" title="레이아웃 내보내기">💾 Layout</button>
      <button class="tl-btn" @click="triggerImport" title="레이아웃 가져오기">📂 Import</button>
      <input ref="fileInput" type="file" accept=".json" style="display:none" @change="onImport" />
      <button class="icon-btn" @click="ui.showTimeline = false">✕</button>
    </div>

    <!-- 슬라이더 (녹화된 프레임이 있을 때) -->
    <div class="tl-slider-wrap" v-if="frameCount > 0">
      <span class="tl-label">LIVE</span>
      <input
        type="range" min="-1" :max="frameCount - 1" step="1"
        v-model.number="ui.timelineFrameIdx"
        class="tl-slider"
        @input="onScrub"
      />
      <span class="tl-label">{{ currentFrame?.label ?? '▶ LIVE' }}</span>
    </div>

    <div v-if="ui.timelineFrameIdx >= 0" class="tl-replay-banner">
      ⏮ 리플레이 모드 — 실시간 업데이트 일시 정지
      <button class="tl-btn" @click="ui.timelineFrameIdx = -1; emit('live')">▶ LIVE로 복귀</button>
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
    editor.logChange('timeline', '타임라인 녹화 중지')
  } else {
    props.timeline.startRecording(() => {
      const state: Record<string, { status: any; metrics?: any }> = {}
      editor.devices.forEach(d => { state[d.id] = { status: d.status, metrics: { ...d.metrics } } })
      return state
    })
    editor.logChange('timeline', '타임라인 녹화 시작')
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
  editor.logChange('export', '레이아웃 내보내기 완료')
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
      editor.logChange('import', `레이아웃 가져오기: ${file.name}`)
    } catch { alert('파일 형식 오류') }
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
.icon-btn     { background: none; border: none; color: #475569; cursor: pointer; }
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
