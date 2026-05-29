<template>
  <div class="mm-wrap" v-if="ui.showMinimap">
    <canvas ref="canvas" :width="W" :height="H" class="mm-canvas" />
    <button class="mm-close" @click="ui.showMinimap = false" title="Close minimap">✕</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { MinimapRenderer } from '@/renderers/MinimapRenderer'
import { useEditorStore }  from '@/stores/editor'
import { useUIStore }      from '@/stores/ui'
import * as THREE from 'three'

const props = defineProps<{
  camera: THREE.Camera
  controls: { target: THREE.Vector3 }
}>()

const W = 180, H = 130
const canvas  = ref<HTMLCanvasElement | null>(null)
const editor  = useEditorStore()
const ui      = useUIStore()
let renderer: MinimapRenderer | null = null
let rafId: number | null = null

onMounted(() => {
  if (!canvas.value) return
  renderer = new MinimapRenderer(canvas.value)
  renderer.updateBounds([...editor.spaces.values()])
  startLoop()
})

function startLoop() {
  const draw = () => {
    rafId = requestAnimationFrame(draw)
    if (!renderer || !ui.showMinimap) return
    const camPos = props.camera.position
    const tgt    = props.controls.target
    renderer.render(
      [...editor.spaces.values()],
      [...editor.devices.values()],
      editor.mappings,
      { x: camPos.x, z: camPos.z },
      { x: tgt.x,    z: tgt.z },
      id => editor.getMappingByDeviceId(id),
    )
  }
  draw()
}

watch(() => editor.spaces.size, () => {
  renderer?.updateBounds([...editor.spaces.values()])
})

onBeforeUnmount(() => { if (rafId) cancelAnimationFrame(rafId) })
</script>

<style scoped>
.mm-wrap {
  position: absolute; bottom: 14px; left: 14px;
  border: 1px solid #2a4a8a; border-radius: 6px; overflow: hidden;
  z-index: 150; pointer-events: none;
}
.mm-canvas { display: block; }
.mm-close {
  position: absolute; top: 3px; right: 3px;
  background: rgba(8,12,24,.8); border: none; color: #475569;
  font-size: 9px; cursor: pointer; border-radius: 3px; pointer-events: all; padding: 1px 4px;
}
</style>
