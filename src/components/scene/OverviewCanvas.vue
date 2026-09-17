<template>
  <div ref="wrapper" class="ov-wrap">
    <canvas
      ref="canvas"
      class="ov-canvas"
      @click="onClick"
      @mousemove="onMove"
      @mouseleave="onLeave"
    />
    <div v-if="!cards.length" class="ov-empty">No spaces yet</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { OverviewRenderer } from "@/renderers/OverviewRenderer";
import type { OverviewCard } from "@/renderers/OverviewRenderer";
import { useEditorStore } from "@/stores/editor";
import type { SpaceType } from "@/types";
import { STATUS_COLOR_HEX } from "@/utils/colorUtils";

const emit = defineEmits<{ (e: "enter-floor", id: string): void }>();

const editor = useEditorStore();
const wrapper = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
let renderer: OverviewRenderer | null = null;
let ro: ResizeObserver | null = null;

// Spaces of these types represent a navigable scope (a building's floors, a
// bare top-level site) rather than in-floor content (zone/rack/etc).
const CONTAINER_TYPES = new Set<SpaceType>(["building", "floor", "site"]);

function statusCounts(id: string) {
  const devices = editor.scopedDevices(id);
  let critical = 0,
    warning = 0;
  devices.forEach((d) => {
    if (d.status === "critical") critical++;
    else if (d.status === "warning") warning++;
  });
  return { critical, warning, total: devices.length };
}

const cards = computed<OverviewCard[]>(() =>
  editor.rootSpaces.map((root) => {
    const containerChildren = editor
      .childSpaces(root.id)
      .filter((c) => CONTAINER_TYPES.has(c.type));
    const counts = statusCounts(root.id);
    return {
      id: root.id,
      name: root.name,
      type: root.type,
      critical: counts.critical,
      warning: counts.warning,
      total: counts.total,
      drillable: containerChildren.length > 0,
      children: containerChildren.map((c) => {
        const cc = statusCounts(c.id);
        return {
          id: c.id,
          name: c.name,
          critical: cc.critical,
          warning: cc.warning,
        };
      }),
    };
  }),
);

function resize() {
  if (!canvas.value || !wrapper.value) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = wrapper.value.getBoundingClientRect();
  canvas.value.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.value.height = Math.max(1, Math.round(rect.height * dpr));
  canvas.value.style.width = `${rect.width}px`;
  canvas.value.style.height = `${rect.height}px`;
  draw();
}

function draw() {
  renderer?.render(cards.value);
}

function onClick(e: MouseEvent) {
  if (!canvas.value || !renderer) return;
  const rect = canvas.value.getBoundingClientRect();
  const hit = renderer.hitTest(e.clientX - rect.left, e.clientY - rect.top);
  if (hit && !hit.drillable) emit("enter-floor", hit.id);
}

function onMove(e: MouseEvent) {
  if (!canvas.value || !renderer) return;
  const rect = canvas.value.getBoundingClientRect();
  const hit = renderer.hitTest(e.clientX - rect.left, e.clientY - rect.top);
  renderer.setHover(hit ? hit.id : null);
  canvas.value.style.cursor = hit && !hit.drillable ? "pointer" : "default";
  draw();
}

function onLeave() {
  renderer?.setHover(null);
  draw();
}

onMounted(() => {
  if (!canvas.value) return;
  renderer = new OverviewRenderer(canvas.value);
  ro = new ResizeObserver(() => resize());
  if (wrapper.value) ro.observe(wrapper.value);
  resize();
});

watch(cards, () => draw(), { deep: true });
watch(STATUS_COLOR_HEX, () => draw());

onBeforeUnmount(() => {
  ro?.disconnect();
});
</script>

<style scoped>
.ov-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background: #080c18;
}
.ov-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.ov-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #475569;
  font-size: 13px;
  font-family: monospace;
  pointer-events: none;
}
</style>
