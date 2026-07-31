<template>
  <header class="toolbar">
    <div class="search-wrap">
      <input
        v-model="ui.filter.search"
        placeholder="Search name / IP"
        class="search"
        @keydown.escape="ui.resetFilter()"
      />
      <span v-if="ui.filter.search" class="clr" @click="ui.filter.search = ''"
        >Clear</span
      >
    </div>

    <select v-model="statusFilter" class="sel">
      <option value="">All status</option>
      <option value="critical">Critical</option>
      <option value="warning">Warning</option>
      <option value="normal">Normal</option>
      <option value="offline">Offline</option>
      <option value="maintenance">Maintenance</option>
    </select>

    <div class="type-filter" ref="typeFilterEl">
      <button
        class="btn"
        :class="{ 'btn-on': ui.filter.type.length > 0 }"
        @click="typeFilterOpen = !typeFilterOpen"
      >
        Type{{ ui.filter.type.length ? ` (${ui.filter.type.length})` : "" }}
      </button>
      <div v-if="typeFilterOpen" class="type-dropdown">
        <label v-for="t in deviceTypeOptions" :key="t" class="type-opt">
          <input
            type="checkbox"
            :checked="ui.filter.type.includes(t)"
            @change="toggleType(t)"
          />
          {{ DEVICE_TYPE_LABEL[t] }}
        </label>
        <button
          class="type-clear"
          v-if="ui.filter.type.length"
          @click="ui.setFilter({ type: [] })"
        >
          Clear
        </button>
      </div>
    </div>

    <label
      class="alerts-only"
      title="Show only devices that aren't normal — everything else dims"
    >
      <input type="checkbox" v-model="ui.alertsOnly" /> 🔔 Alerts only
    </label>

    <div class="chip critical" :title="scopeLabel">
      Critical <b>{{ floorCritical }}</b
      ><span v-if="showTotals" class="chip-total">
        ({{ editor.criticalCount }} total)</span
      >
    </div>
    <div class="chip warning" :title="scopeLabel">
      Warning <b>{{ floorWarning }}</b
      ><span v-if="showTotals" class="chip-total">
        ({{ editor.warningCount }} total)</span
      >
    </div>
    <div class="chip total">
      Total <b>{{ editor.devices.size }}</b>
    </div>

    <div class="spacer" />

    <div class="mode-switch">
      <button
        :class="['mode-btn', ui.mode === 'view' ? 'active' : '']"
        @click="ui.setMode('view')"
      >
        View
      </button>
      <button
        :class="['mode-btn', ui.mode === 'edit' ? 'active' : '']"
        @click="ui.setMode('edit')"
      >
        Edit
      </button>
    </div>

    <button
      :class="['btn', ui.linkToolActive ? 'btn-accent-on' : 'btn-accent']"
      :disabled="ui.mode !== 'edit'"
      @click="ui.toggleLinkTool()"
      title="Connect devices (L)"
    >
      Connect
    </button>

    <button
      :class="['btn', ui.showBackgroundPanel ? 'btn-on' : '']"
      :disabled="ui.mode !== 'edit'"
      @click="toggleBackgroundPanel"
      title="Place a floor-plan image or building model"
    >
      Background
    </button>

    <button class="btn" title="Reset view (F)" @click="resetCamera">
      ⌂ Home
    </button>

    <button
      :class="['btn', ui.showHelp ? 'btn-on' : '']"
      @click="ui.showHelp = !ui.showHelp"
    >
      Help
    </button>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useEditorStore } from "@/stores/editor";
import { useUIStore } from "@/stores/ui";
import { useNmsEditor } from "@/composables/useNmsEditor";
import { DEVICE_TYPE_LABEL } from "@/utils/colorUtils";
import type { DeviceStatus, DeviceType } from "@/types";

const editor = useEditorStore();
const ui = useUIStore();
const { resetCamera } = useNmsEditor();

const statusFilter = computed({
  get: () => ui.filter.status[0] ?? "",
  set: (v) => ui.setFilter({ status: v ? [v as DeviceStatus] : [] }),
});

const deviceTypeOptions = Object.keys(DEVICE_TYPE_LABEL) as DeviceType[];
const typeFilterOpen = ref(false);
const typeFilterEl = ref<HTMLElement | null>(null);

function toggleType(t: DeviceType) {
  const next = ui.filter.type.includes(t)
    ? ui.filter.type.filter((x) => x !== t)
    : [...ui.filter.type, t];
  ui.setFilter({ type: next });
}

function onDocClick(e: MouseEvent) {
  if (typeFilterOpen.value && !typeFilterEl.value?.contains(e.target as Node)) {
    typeFilterOpen.value = false;
  }
}
onMounted(() => document.addEventListener("mousedown", onDocClick));
onBeforeUnmount(() => document.removeEventListener("mousedown", onDocClick));

// Unscoped counts used to silently disagree with what's on screen (e.g. "3
// critical" while every visible device on the current floor was green,
// because the count included other floors). Scope to the active floor/site
// and only show the dataset-wide total as secondary context when it differs.
const floorCritical = computed(() =>
  editor.scopedCriticalCount(ui.activeRootSpaceId),
);
const floorWarning = computed(() =>
  editor.scopedWarningCount(ui.activeRootSpaceId),
);
const showTotals = computed(
  () =>
    ui.activeRootSpaceId !== null &&
    (floorCritical.value !== editor.criticalCount ||
      floorWarning.value !== editor.warningCount),
);
const scopeLabel = computed(() =>
  ui.activeRootSpaceId
    ? "Count for the current floor/site"
    : "Count across all devices",
);

// Left-dock panels are mutually exclusive (App.vue renders the first truthy
// one) — explicitly close the others so the button visibly does something
// even when a higher-priority panel (Alerts, shown by default) is open.
function toggleBackgroundPanel() {
  if (ui.showBackgroundPanel) {
    ui.showBackgroundPanel = false;
    return;
  }
  ui.closeLeftDock();
  ui.showBackgroundPanel = true;
}
</script>

<style scoped>
.toolbar {
  height: 42px;
  background: rgba(8, 12, 24, 0.97);
  border-bottom: 1px solid #1a2a4a;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
  flex-shrink: 0;
  z-index: 200;
}
.spacer {
  flex: 1;
  min-width: 8px;
}
.search-wrap {
  position: relative;
  flex-shrink: 0;
}
.search {
  background: #0f172a;
  border: 1px solid #1e3a5a;
  color: #e2e8f0;
  padding: 5px 48px 5px 9px;
  border-radius: 6px;
  font-size: 12px;
  width: 200px;
  outline: none;
}
.search:focus {
  border-color: #3b82f6;
}
.clr {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  cursor: pointer;
  font-size: 10px;
}
.clr:hover {
  color: #cbd5e1;
}
.sel {
  background: #0f172a;
  border: 1px solid #1e3a5a;
  color: #cbd5e1;
  padding: 5px 7px;
  border-radius: 6px;
  font-size: 12px;
  outline: none;
  flex-shrink: 0;
}
.chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.04);
  flex-shrink: 0;
  white-space: nowrap;
  border: 1px solid transparent;
}
.chip.critical {
  border-color: #450a0a;
  color: #f87171;
}
.chip.warning {
  border-color: #422006;
  color: #fbbf24;
}
.chip.total {
  color: #94a3b8;
}
.chip b {
  font-weight: 700;
}
.chip-total {
  opacity: 0.65;
  font-size: 10px;
}
.btn {
  background: #0f172a;
  border: 1px solid #1e3a5a;
  color: #94a3b8;
  padding: 5px 11px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.12s;
}
.btn:hover {
  border-color: #3b82f6;
  color: #e2e8f0;
}
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
  border-color: #1e3a5a;
  color: #64748b;
  background: #0f172a;
}
.btn-on {
  border-color: #22c55e;
  color: #4ade80;
}
.btn-accent {
  border-color: #4338ca;
  color: #a5b4fc;
  background: #1e1b4b;
}
.btn-accent-on {
  border-color: #6366f1;
  color: #c7d2fe;
  background: #3730a3;
}
.type-filter {
  position: relative;
  flex-shrink: 0;
}
.type-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 300;
  background: #0f172a;
  border: 1px solid #1e3a5a;
  border-radius: 6px;
  padding: 6px;
  min-width: 150px;
  max-height: 220px;
  overflow-y: auto;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.type-opt {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #cbd5e1;
  cursor: pointer;
  padding: 2px 3px;
}
.type-opt:hover {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}
.type-clear {
  margin-top: 3px;
  background: transparent;
  border: 1px solid #334155;
  color: #64748b;
  padding: 3px;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
}
.alerts-only {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #94a3b8;
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
}
.mode-switch {
  display: flex;
  border: 1px solid #1e3a5a;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}
.mode-btn {
  background: transparent;
  border: none;
  color: #64748b;
  padding: 5px 12px;
  font-size: 11px;
  cursor: pointer;
}
.mode-btn.active {
  background: #1e3a5f;
  color: #93c5fd;
}
</style>
