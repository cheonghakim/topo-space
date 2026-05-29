<template>
  <div ref="wrapper" class="scene-wrap"
    @dragover.prevent
    @drop="onDrop"
  >
    <canvas ref="canvas" />
    <div ref="overlay" class="html-overlay" />

    <!-- hover tooltip -->
    <Transition name="fade">
      <div
        v-if="tooltip.visible && hovDev"
        class="tooltip"
        :style="{ left: tooltip.x + 14 + 'px', top: tooltip.y - 10 + 'px' }"
      >
        <div class="tt-name">{{ hovDev.hostname }}</div>
        <div class="tt-ip">{{ hovDev.ip }}</div>
        <div class="tt-status" :style="{ color: STATUS_COLOR_HEX[hovDev.status ?? 'unknown'] }">
          {{ STATUS_LABEL[hovDev.status ?? 'unknown'] }}
        </div>
        <div class="tt-metrics" v-if="hovDev.metrics">
          C{{ (hovDev.metrics.cpu ?? 0).toFixed(0) }}%
          M{{ (hovDev.metrics.memory ?? 0).toFixed(0) }}%
        </div>
        <div class="tt-type" :style="{ color: DEVICE_TYPE_COLOR[hovDev.normalizedType ?? 'unknown'] }">
          {{ DEVICE_TYPE_LABEL[hovDev.normalizedType ?? 'unknown'] }}
        </div>
      </div>
    </Transition>

    <div v-if="ui.linkToolActive" class="hint edit-hint">
      Connect mode — <b>drag</b> from one device to another, then pick a link type · <kbd>ESC</kbd> to cancel
    </div>

    <div v-else class="hint">
      Click to select, then drag the
      <span style="color:#ff6b7a">X</span>/<span style="color:#5fd968">Y</span>/<span style="color:#5fb0ff">Z</span>
      arrows to move · select a link and drag its handle · <kbd>L</kbd> Connect · <kbd>Del</kbd> Delete · <kbd>F</kbd> Fit
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useNmsEditor }   from '@/composables/useNmsEditor'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'
import { STATUS_COLOR_HEX, STATUS_LABEL, DEVICE_TYPE_COLOR, DEVICE_TYPE_LABEL } from '@/utils/colorUtils'

const wrapper = ref<HTMLDivElement | null>(null)
const canvas  = ref<HTMLCanvasElement | null>(null)
const overlay = ref<HTMLDivElement | null>(null)

const editor = useEditorStore()
const ui     = useUIStore()
const emit   = defineEmits<{ (e: 'scene-ready'): void }>()
const { init, dispose, dropDeviceAt } = useNmsEditor()

const tooltip = computed(() => ui.tooltip)
const hovDev  = computed(() => ui.tooltip.deviceId ? editor.devices.get(ui.tooltip.deviceId) : null)

function onDrop(e: DragEvent) {
  const deviceId = e.dataTransfer?.getData('deviceId')
  if (!deviceId) return
  dropDeviceAt(deviceId, e)
}

onMounted(() => {
  init(canvas.value!, overlay.value!, wrapper.value!)
  nextTick(() => emit('scene-ready'))
})
onBeforeUnmount(() => dispose())
</script>

<style scoped>
.scene-wrap   { width: 100%; height: 100%; position: relative; overflow: hidden; }
canvas        { width: 100%; height: 100%; display: block; }
.html-overlay { position: absolute; inset: 0; pointer-events: none; }

.tooltip {
  position: fixed; background: rgba(8,12,24,.94);
  border: 1px solid #2a4a8a; border-radius: 8px;
  padding: 8px 12px; font-size: 11px;
  pointer-events: none; z-index: 500; min-width: 130px;
}
.tt-name   { color: #e2e8f0; font-weight: 600; margin-bottom: 2px; font-family: monospace; }
.tt-ip     { color: #475569; font-family: monospace; font-size: 10px; }
.tt-status { font-weight: 600; margin-top: 3px; }
.tt-metrics{ color: #94a3b8; font-size: 10px; margin-top: 2px; font-family: monospace; }
.tt-type   { font-size: 10px; margin-top: 2px; }

.link-hint {
  position: absolute; bottom: 44px; left: 50%; transform: translateX(-50%);
  background: rgba(99,102,241,.2); border: 1px solid #6366f1;
  color: #a5b4fc; font-size: 11px; padding: 5px 14px; border-radius: 20px;
  pointer-events: none; white-space: nowrap;
}
.hint {
  position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
  color: #94a3b8; font-size: 11px; pointer-events: none; letter-spacing: .02em; white-space: nowrap;
  background: rgba(8,12,24,.7); border: 1px solid #1a2a4a;
  padding: 5px 14px; border-radius: 18px; backdrop-filter: blur(4px);
}
.hint b { color: #cbd5e1; }
.hint.edit-hint { color: #a5b4fc; border-color: #3730a3; background: rgba(30,27,75,.5); }
.hint.edit-hint b { color: #c7d2fe; }

kbd {
  background: rgba(148,163,184,.18); border: 1px solid rgba(148,163,184,.35);
  border-radius: 3px; padding: 1px 5px; font-size: 10px; font-family: monospace; color: #cbd5e1;
}

.fade-enter-active, .fade-leave-active { transition: opacity .1s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
