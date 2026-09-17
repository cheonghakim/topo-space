<template>
  <section ref="root" class="status-legend" aria-label="Status legend">
    <button
      class="legend-heading"
      :aria-expanded="isExpanded"
      @click="expanded = !isExpanded"
    >
      <span
        >Status legend
        <small>{{
          ui.viewMode === "3d" ? "Current floor" : "All sites"
        }}</small></span
      >
      <span aria-hidden="true">{{ isExpanded ? "−" : "+" }}</span>
    </button>
    <div v-if="isExpanded" class="legend-body">
      <ul>
        <li v-for="status in statuses" :key="status" :data-status="status">
          <span
            class="legend-icon"
            :style="{ color: STATUS_COLOR_HEX[status] }"
            aria-hidden="true"
            >{{ STATUS_ICON[status] || "●" }}</span
          >
          <span>{{ STATUS_LABEL[status] }}</span
          ><b>{{ counts[status] }}</b>
        </li>
      </ul>
      <p class="legend-note">Names adapt to zoom. Select a rack to inspect.</p>
    </div>
    <button
      class="palette-toggle"
      :aria-pressed="ui.colorblindMode"
      @click="toggleColorblindMode"
    >
      <span class="palette-swatches" aria-hidden="true"
        ><i
          v-for="status in ['normal', 'warning', 'critical'] as const"
          :key="status"
          :style="{ background: STATUS_COLOR_HEX[status] }"
      /></span>
      {{ ui.colorblindMode ? "Colorblind palette on" : "Standard palette" }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useUIStore } from "@/stores/ui";
import { useEditorStore } from "@/stores/editor";
import { useNmsEditor } from "@/composables/useNmsEditor";
import {
  STATUS_COLOR_HEX,
  STATUS_ICON,
  STATUS_LABEL,
} from "@/utils/colorUtils";
import type { DeviceStatus } from "@/types";

const ui = useUIStore();
const editor = useEditorStore();
const { toggleColorblindMode } = useNmsEditor();
const root = ref<HTMLElement | null>(null);
const expanded = ref<boolean | null>(null);
const compact = ref(false);
const isExpanded = computed(() => expanded.value ?? !compact.value);
let observer: ResizeObserver | undefined;
onMounted(() => {
  const parent = root.value?.parentElement;
  if (!parent) return;
  compact.value = parent.clientHeight < 560;
  observer = new ResizeObserver(() => {
    compact.value = parent.clientHeight < 560;
  });
  observer.observe(parent);
});
onBeforeUnmount(() => observer?.disconnect());
const statuses: DeviceStatus[] = [
  "critical",
  "warning",
  "normal",
  "offline",
  "unknown",
  "maintenance",
  "acknowledged",
  "stale",
];
const counts = computed(() => {
  const result = Object.fromEntries(
    statuses.map((status) => [status, 0]),
  ) as Record<DeviceStatus, number>;
  for (const device of editor.scopedDevices(
    ui.viewMode === "3d" ? ui.activeRootSpaceId : null,
  ))
    result[device.status ?? "unknown"]++;
  return result;
});
</script>

<style scoped>
.status-legend {
  position: absolute;
  right: 16px;
  bottom: 64px;
  z-index: 120;
  width: 238px;
  border: 1px solid #30445f;
  border-radius: 10px;
  background: #0c1627f2;
  box-shadow: 0 6px 24px #0004;
  color: #cbd5e1;
  font-size: 11px;
}
.legend-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 12px;
  background: none;
  border: 0;
  color: #e2e8f0;
  text-align: left;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.legend-heading small {
  display: block;
  color: #94a3b8;
  margin-top: 3px;
  font-size: 10px;
  font-weight: 400;
}
.legend-body {
  padding: 0 12px 8px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
}
li {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
}
li b {
  margin-left: auto;
  color: #cbd5e1;
  font-variant-numeric: tabular-nums;
}
.legend-icon {
  font-size: 13px;
  font-weight: 700;
  width: 15px;
  text-align: center;
}
.legend-note {
  color: #94a3b8;
  font-size: 10px;
  line-height: 1.5;
  margin: 10px 0 0;
}
.palette-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 6px;
  border: 0;
  border-top: 1px solid #30445f;
  background: #17263b;
  color: #cbd5e1;
  font: inherit;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
}
.palette-toggle[aria-pressed="true"] {
  color: #f0e442;
  background: #22334a;
}
.palette-swatches {
  display: flex;
  gap: 3px;
}
.palette-swatches i {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
button:focus-visible {
  outline: 2px solid #7dd3fc;
  outline-offset: 2px;
}
</style>
