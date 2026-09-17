<template>
  <div ref="wrapper" class="scene-wrap"
    @dragover.prevent
    @drop="onDrop"
  >
    <canvas ref="canvas" />
    <div ref="overlay" class="html-overlay" />

    <nav class="camera-tools" aria-label="Camera controls">
      <span class="camera-caption">NAVIGATE</span>
      <button @click="resetCamera" title="Reset camera (F)">Reset view</button>
      <button @click="setCameraView('top')" :aria-pressed="cameraView === 'top'" title="Look down at the current area">Top view</button>
      <button @click="setCameraView('perspective')" :aria-pressed="cameraView === 'perspective'" title="View the current area in 3D">3D view</button>
      <div class="zoom-controls">
        <button @click="zoomCamera(0.8)" aria-label="Zoom in" title="Zoom in">+</button>
        <button @click="zoomCamera(1.25)" aria-label="Zoom out" title="Zoom out">−</button>
      </div>
      <button :disabled="!ui.selectedDeviceId" @click="focusSelected" title="Move closer to the selected device">Focus selected</button>
      <button :aria-expanded="showNavigationHelp" aria-controls="navigation-help" @click="showNavigationHelp = !showNavigationHelp">Controls guide</button>
    </nav>
    <div v-if="showNavigationHelp" id="navigation-help" class="navigation-help">
      <strong>Explore your topology</strong>
      <dl>
        <dt>Rotate</dt><dd>Left-drag empty space</dd>
        <dt>Pan</dt><dd>Right-drag / Ctrl + drag</dd>
        <dt>Zoom</dt><dd>Scroll / pinch</dd>
        <dt>Inspect</dt><dd>Click a device</dd>
        <dt>Touch</dt><dd>One finger rotates; two fingers pan</dd>
      </dl>
      <p>{{ ui.mode === 'edit' ? 'Move selected devices with the colored arrows. Esc cancels a connection.' : 'Switch to Edit to move devices or create connections.' }}</p>
    </div>

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
        <div class="tt-type" :style="{ color: typeColor(hovDev.normalizedType) }">
          {{ typeLabel(hovDev.normalizedType) }}
        </div>
      </div>
    </Transition>

    <div v-if="ui.linkToolActive" class="hint edit-hint">
      Connect mode — <b>drag</b> from one device to another, then pick a link type · <kbd>ESC</kbd> to cancel
    </div>

    <div v-else-if="ui.mode === 'edit'" class="hint">
      Click to select · <kbd>Ctrl</kbd>+Click multi-select · drag
      <span style="color:#ff6b7a">X</span>/<span style="color:#5fd968">Y</span>/<span style="color:#5fb0ff">Z</span>
      arrows to move · <kbd>L</kbd> Connect · <kbd>Del</kbd> Delete · <kbd>Ctrl+Z</kbd> Undo · <kbd>F</kbd> Fit
    </div>

    <div v-else class="hint">
      View mode - click to inspect - <kbd>F</kbd> Fit
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useNmsEditor }   from '@/composables/useNmsEditor'
import { useEditorStore } from '@/stores/editor'
import { useUIStore }     from '@/stores/ui'
import { STATUS_COLOR_HEX, STATUS_LABEL } from '@/utils/colorUtils'
import { useDeviceTypeHelpers } from '@/composables/useDeviceTypeHelpers'

const wrapper = ref<HTMLDivElement | null>(null)
const canvas  = ref<HTMLCanvasElement | null>(null)
const overlay = ref<HTMLDivElement | null>(null)

const editor = useEditorStore()
const ui     = useUIStore()
const emit   = defineEmits<{ (e: 'scene-ready'): void }>()
const { init, dispose, dropDeviceAt, resetCamera, focusDevice, zoomCamera, setCameraView, getScene } = useNmsEditor()
const cameraView = ref<'top' | 'perspective'>('perspective')
function syncCameraView() {
  cameraView.value = getScene().controls.getPolarAngle() < 0.1 ? 'top' : 'perspective'
}
const showNavigationHelp = ref(false)
function focusSelected() {
  if (ui.selectedDeviceId) focusDevice(ui.selectedDeviceId)
}
const { typeColor, typeLabel } = useDeviceTypeHelpers()

const tooltip = computed(() => ui.tooltip)
const hovDev  = computed(() => ui.tooltip.deviceId ? editor.devices.get(ui.tooltip.deviceId) : null)

function onDrop(e: DragEvent) {
  const deviceId = e.dataTransfer?.getData('deviceId')
  if (!deviceId) return
  dropDeviceAt(deviceId, e)
}

onMounted(() => {
  init(canvas.value!, overlay.value!, wrapper.value!)
  getScene().controls.addEventListener('change', syncCameraView)
  nextTick(() => emit('scene-ready'))
})
onBeforeUnmount(() => {
  getScene().controls.removeEventListener('change', syncCameraView)
  dispose()
})
</script>

<style scoped>
.scene-wrap   { width: 100%; height: 100%; position: relative; overflow: hidden; }
canvas        { width: 100%; height: 100%; display: block; }
.camera-tools {
  position: absolute; top: 16px; right: 16px; z-index: 130;
  display: grid; gap: 5px; width: 136px; padding: 10px;
  background: rgba(12, 22, 39, .94); border: 1px solid #30445f;
  border-radius: 12px; box-shadow: 0 8px 28px #0005; backdrop-filter: blur(12px);
}
.camera-caption { color: #91a9c6; font-size: 10px; letter-spacing: .14em; padding: 3px 4px 6px; }
.camera-tools button {
  min-height: 34px; border: 1px solid #30445f; border-radius: 7px;
  background: #17263b; color: #e2e8f0; cursor: pointer; font: inherit; font-size: 12px;
}
.camera-tools button:hover:not(:disabled) { background: #254568; border-color: #72b7ed; }
.camera-tools button[aria-pressed='true'] { background: #254568; border-color: #7dd3fc; color: #e0f2fe; }
.camera-tools button:disabled { opacity: .4; cursor: default; }
.camera-tools button:focus-visible { outline: 2px solid #7dd3fc; outline-offset: 2px; }
.zoom-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
.zoom-controls button { font-size: 20px; }
@container (max-height: 560px) {
  .camera-tools { grid-template-columns: 1fr 1fr; width: 240px; }
  .camera-caption { grid-column: 1 / -1; }
  .navigation-help { right: 268px; width: min(290px, calc(100% - 284px)); }
}
.navigation-help {
  position: absolute; top: 16px; right: 164px; z-index: 130;
  width: min(290px, calc(100% - 180px)); padding: 16px;
  background: rgba(12, 22, 39, .97); border: 1px solid #30445f; border-radius: 12px;
  color: #cbd5e1; font-size: 12px; box-shadow: 0 8px 28px #0005;
}
.navigation-help strong { color: #f1f5f9; font-size: 14px; }
.navigation-help dl { display: grid; grid-template-columns: auto 1fr; gap: 10px; }
.navigation-help dt { color: #7dd3fc; }
.navigation-help dd { margin: 0; }
.navigation-help p { margin: 12px 0 0; line-height: 1.6; color: #94a3b8; }
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
  padding: 8px 14px; border-radius: 12px; backdrop-filter: blur(4px);
  max-width: calc(100% - 32px); white-space: normal; text-align: center; line-height: 1.7;
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
