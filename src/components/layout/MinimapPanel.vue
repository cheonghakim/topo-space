<template>
  <div v-if="ui.showMinimap" class="mm-wrap">
    <canvas
      ref="canvas"
      :width="W"
      :height="H"
      class="mm-canvas"
      title="Click to navigate"
      @click="onClick"
    />
    <button
      class="mm-close"
      title="Close minimap"
      @click="ui.showMinimap = false"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { MinimapRenderer } from "@/renderers/MinimapRenderer";
import { useEditorStore } from "@/stores/editor";
import { useUIStore } from "@/stores/ui";
import { useNmsEditor } from "@/composables/useNmsEditor";
import * as THREE from "three";

const props = defineProps<{
  camera: THREE.Camera;
  controls: { target: THREE.Vector3 };
}>();

const W = 180,
  H = 130;
const canvas = ref<HTMLCanvasElement | null>(null);
const editor = useEditorStore();
const ui = useUIStore();
const { flyToWorldPoint } = useNmsEditor();
let renderer: MinimapRenderer | null = null;
let rafId: number | null = null;

function onClick(e: MouseEvent) {
  if (!renderer || !canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const { x, z } = renderer.toWorld(
    e.clientX - rect.left,
    e.clientY - rect.top,
  );
  flyToWorldPoint(x, z);
}

onMounted(() => {
  if (!canvas.value) return;
  renderer = new MinimapRenderer(canvas.value);
  renderer.updateBounds(editor.scopedSpaces(ui.activeRootSpaceId));
  startLoop();
});

function startLoop() {
  const draw = () => {
    rafId = requestAnimationFrame(draw);
    if (!renderer || !ui.showMinimap) return;
    const camPos = props.camera.position;
    const tgt = props.controls.target;
    renderer.render(
      editor.scopedSpaces(ui.activeRootSpaceId),
      editor.scopedDevices(ui.activeRootSpaceId),
      editor.mappings,
      { x: camPos.x, z: camPos.z },
      { x: tgt.x, z: tgt.z },
      (id) => editor.getMappingByDeviceId(id),
    );
  };
  draw();
}

watch(
  () => [editor.spaces.size, ui.activeRootSpaceId] as const,
  () => {
    renderer?.updateBounds(editor.scopedSpaces(ui.activeRootSpaceId));
  },
);

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.mm-wrap {
  position: absolute;
  bottom: 14px;
  left: 14px;
  border: 1px solid #2a4a8a;
  border-radius: 6px;
  overflow: hidden;
  z-index: 150;
  pointer-events: none;
}
.mm-canvas {
  display: block;
  pointer-events: all;
  cursor: pointer;
}
.mm-close {
  position: absolute;
  top: 3px;
  right: 3px;
  background: rgba(8, 12, 24, 0.8);
  border: none;
  color: #475569;
  font-size: 9px;
  cursor: pointer;
  border-radius: 3px;
  pointer-events: all;
  padding: 1px 4px;
}
</style>
