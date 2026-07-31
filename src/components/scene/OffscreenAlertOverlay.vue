<template>
  <div class="offscreen-alerts">
    <button
      v-for="a in ui.offscreenAlerts"
      :key="a.id"
      class="oa-arrow"
      :class="a.status"
      :style="{ left: a.edgeX + 'px', top: a.edgeY + 'px', transform: `translate(-50%, -50%) rotate(${a.angle}deg)` }"
      :title="labelFor(a.id)"
      @click="onClick(a.id)"
    >▲</button>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/ui'
import { useEditorStore } from '@/stores/editor'
import { useNmsEditor } from '@/composables/useNmsEditor'

const ui     = useUIStore()
const editor = useEditorStore()
const { focusDevice } = useNmsEditor()

function labelFor(id: string) {
  const d = editor.devices.get(id)
  const name = d?.hostname ?? d?.ip ?? id
  return `${name} — off-screen or hidden, click to jump to it`
}

function onClick(id: string) {
  ui.select({ type: 'device', id })
  focusDevice(id)
}
</script>

<style scoped>
.offscreen-alerts {
  position: absolute; inset: 0; pointer-events: none; z-index: 140;
}
.oa-arrow {
  position: absolute;
  width: 22px; height: 22px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.4);
  cursor: pointer; pointer-events: all;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; line-height: 1; color: #0b0f1a; font-weight: 700;
  animation: oa-pulse 1.4s ease-in-out infinite;
}
.oa-arrow.critical { background: #ef4444; box-shadow: 0 0 10px rgba(239,68,68,.85); }
.oa-arrow.warning  { background: #eab308; box-shadow: 0 0 10px rgba(234,179,8,.85); }

@keyframes oa-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: .6; }
}

@media (prefers-reduced-motion: reduce) {
  .oa-arrow { animation: none; }
}
</style>
