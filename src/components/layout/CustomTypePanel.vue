<template>
  <aside class="ct-panel">
    <div class="ct-head">
      <span class="ct-title">Device Types</span>
      <button class="ct-close" @click="ui.closeLeftDock()" title="Close">
        ✕
      </button>
    </div>

    <!-- View-mode notice -->
    <div v-if="ui.mode !== 'edit'" class="ct-mode-notice">
      Switch to Edit mode to customize types.
    </div>

    <!-- ── Built-in Type Overrides ──────────────────────────── -->
    <div class="ct-section-label">Built-in Types</div>
    <div class="ct-section-hint">
      Override the shape or model for all devices of a type.
    </div>
    <div class="ct-list">
      <div v-for="bt in BUILTIN_LIST" :key="bt.id" class="ct-row">
        <span class="ct-dot" :style="{ background: overrideColor(bt.id) }" />
        <span
          class="ct-abbr-badge"
          :style="{
            borderColor: overrideColor(bt.id),
            color: overrideColor(bt.id),
          }"
        >
          {{ overrideAbbr(bt.id) }}
        </span>
        <span class="ct-name">{{ bt.label }}</span>
        <span v-if="hasOverride(bt.id)" class="ct-override-tag">custom</span>
        <template v-if="ui.mode === 'edit'">
          <button class="ct-btn" @click="openOverride(bt)">
            {{ hasOverride(bt.id) ? "Edit" : "Override" }}
          </button>
          <button
            v-if="hasOverride(bt.id)"
            class="ct-btn del"
            @click="resetOverride(bt.id)"
          >
            Reset
          </button>
        </template>
      </div>
    </div>

    <!-- ── New Custom Types ─────────────────────────────────── -->
    <div class="ct-section-label ct-section-label--new">
      New Types
      <button v-if="ui.mode === 'edit'" class="ct-add-inline" @click="openAdd">
        + Add
      </button>
    </div>
    <div class="ct-section-hint">
      New types appear in the device's "Visual Shape" selector.
    </div>
    <div v-if="!customList.length" class="ct-empty-sm">No custom types yet</div>
    <div class="ct-list">
      <div v-for="t in customList" :key="t.id" class="ct-row">
        <span class="ct-dot" :style="{ background: t.color }" />
        <span
          class="ct-abbr-badge"
          :style="{ borderColor: t.color, color: t.color }"
          >{{ t.abbr }}</span
        >
        <span class="ct-name">{{ t.label }}</span>
        <span class="ct-shape-tag">{{ t.hasModel ? "3D" : t.shape }}</span>
        <template v-if="ui.mode === 'edit'">
          <button class="ct-btn" @click="openEdit(t)">Edit</button>
          <button class="ct-btn del" @click="remove(t.id)">Del</button>
        </template>
      </div>
    </div>

    <!-- ── Form ────────────────────────────────────────────── -->
    <Transition name="ct-slide">
      <div v-if="editing" class="ct-form">
        <div class="ct-form-title">
          {{
            formMode === "override"
              ? `Override: ${form.label}`
              : isNew
                ? "New Type"
                : "Edit Type"
          }}
        </div>

        <template v-if="formMode !== 'override'">
          <label class="ct-label"
            >Name
            <input
              v-model="form.label"
              class="ct-input"
              @input="autoAbbr"
              placeholder="Core Router"
            />
          </label>
          <label class="ct-label"
            >Abbr (≤4)
            <input
              v-model="form.abbr"
              class="ct-input ct-input-sm"
              maxlength="4"
              placeholder="CR"
            />
          </label>
        </template>

        <div class="ct-label">
          Color
          <div class="ct-swatches">
            <button
              v-for="c in COLORS"
              :key="c"
              class="ct-swatch"
              :class="{ active: form.color === c }"
              :style="{ background: c }"
              @click="form.color = c"
            />
          </div>
        </div>

        <div class="ct-label">
          Shape
          <div class="ct-radios">
            <label v-for="s in SHAPES" :key="s" class="ct-radio">
              <input type="radio" :value="s" v-model="form.shape" />
              {{ s }}
            </label>
          </div>
        </div>

        <label class="ct-label"
          >Width <span class="ct-val">{{ form.w.toFixed(1) }}</span>
          <input
            type="range"
            min="0.3"
            max="2.0"
            step="0.1"
            v-model.number="form.w"
            class="ct-slider"
          />
        </label>
        <label class="ct-label"
          >Height <span class="ct-val">{{ form.h.toFixed(2) }}</span>
          <input
            type="range"
            min="0.05"
            max="2.0"
            step="0.05"
            v-model.number="form.h"
            class="ct-slider"
          />
        </label>
        <label v-if="form.shape === 'box'" class="ct-label"
          >Depth <span class="ct-val">{{ form.d.toFixed(1) }}</span>
          <input
            type="range"
            min="0.3"
            max="2.0"
            step="0.1"
            v-model.number="form.d"
            class="ct-slider"
          />
        </label>

        <div class="ct-label">
          3D Model (.glb / .gltf)
          <div class="ct-model-row">
            <span v-if="pendingModelName" class="ct-model-name pending">{{
              pendingModelName
            }}</span>
            <span v-else-if="form.hasModel" class="ct-model-name stored"
              >Model stored</span
            >
            <span v-else class="ct-model-hint"
              >Using geometric shape above</span
            >
            <input
              ref="fileInputEl"
              type="file"
              accept=".glb,.gltf"
              style="display: none"
              @change="onModelFile"
            />
            <button class="ct-model-btn" @click="fileInputEl?.click()">
              {{ form.hasModel || pendingModelName ? "Replace" : "Import" }}
            </button>
            <button
              v-if="form.hasModel || pendingModelName"
              class="ct-model-btn ct-model-rm"
              @click="clearModel"
            >
              Remove
            </button>
          </div>
          <div v-if="modelError" class="ct-model-error">{{ modelError }}</div>
          <div v-if="modelLoading" class="ct-model-hint">Loading model…</div>
        </div>

        <div class="ct-form-btns">
          <button class="ct-save" :disabled="saving" @click="save">
            {{ saving ? "Saving…" : "Save" }}
          </button>
          <button class="ct-cancel" :disabled="saving" @click="cancelEdit">
            Cancel
          </button>
        </div>
      </div>
    </Transition>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUIStore } from "@/stores/ui";
import { useDeviceTypesStore } from "@/stores/deviceTypes";
import { useNmsEditor } from "@/composables/useNmsEditor";
import { syncCustomTypes } from "@/utils/colorUtils";
import {
  syncCustomGeometries,
  preloadCustomModels,
} from "@/utils/geometryFactory";
import { storeModel, deleteModel } from "@/utils/modelStorage";
import { DEVICE_TYPE_COLOR, DEVICE_TYPE_ABBR } from "@/utils/colorUtils";
import type { CustomDeviceType, CustomShape } from "@/types";

const ui = useUIStore();
const deviceTypes = useDeviceTypesStore();
const { rebuildAll } = useNmsEditor();

const emit = defineEmits<{ (e: "types-changed"): void }>();

const COLORS: string[] = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#84cc16",
];
const SHAPES: CustomShape[] = ["box", "cylinder", "sphere", "octahedron"];

// ── Built-in type definitions (source of truth for overrides) ──────────────
const BUILTIN_LIST = [
  {
    id: "server",
    label: "Server",
    abbr: "SRV",
    color: "#3b82f6",
    shape: "box" as CustomShape,
    w: 0.8,
    h: 0.12,
    d: 0.5,
  },
  {
    id: "switch",
    label: "Switch",
    abbr: "SW",
    color: "#10b981",
    shape: "box" as CustomShape,
    w: 1.0,
    h: 0.06,
    d: 0.5,
  },
  {
    id: "router",
    label: "Router",
    abbr: "RTR",
    color: "#f59e0b",
    shape: "cylinder" as CustomShape,
    w: 0.56,
    h: 0.12,
    d: 0.56,
  },
  {
    id: "firewall",
    label: "Firewall",
    abbr: "FW",
    color: "#ef4444",
    shape: "box" as CustomShape,
    w: 0.8,
    h: 0.2,
    d: 0.5,
  },
  {
    id: "database",
    label: "Database",
    abbr: "DB",
    color: "#8b5cf6",
    shape: "cylinder" as CustomShape,
    w: 0.56,
    h: 0.5,
    d: 0.56,
  },
  {
    id: "storage",
    label: "Storage",
    abbr: "STG",
    color: "#06b6d4",
    shape: "box" as CustomShape,
    w: 1.2,
    h: 0.3,
    d: 0.55,
  },
  {
    id: "vm",
    label: "VM",
    abbr: "VM",
    color: "#64748b",
    shape: "box" as CustomShape,
    w: 0.6,
    h: 0.07,
    d: 0.38,
  },
  {
    id: "container",
    label: "Container",
    abbr: "CTR",
    color: "#475569",
    shape: "box" as CustomShape,
    w: 0.45,
    h: 0.06,
    d: 0.3,
  },
  {
    id: "load_balancer",
    label: "Load Balancer",
    abbr: "LB",
    color: "#f97316",
    shape: "octahedron" as CustomShape,
    w: 0.48,
    h: 0.48,
    d: 0.48,
  },
  {
    id: "access_point",
    label: "Access Point",
    abbr: "AP",
    color: "#84cc16",
    shape: "sphere" as CustomShape,
    w: 0.4,
    h: 0.4,
    d: 0.4,
  },
  {
    id: "cloud_service",
    label: "Cloud",
    abbr: "CLD",
    color: "#a78bfa",
    shape: "sphere" as CustomShape,
    w: 0.6,
    h: 0.6,
    d: 0.6,
  },
  {
    id: "unknown",
    label: "Unknown",
    abbr: "UNK",
    color: "#6b7280",
    shape: "box" as CustomShape,
    w: 0.6,
    h: 0.1,
    d: 0.4,
  },
];
const BUILTIN_IDS = new Set(BUILTIN_LIST.map((b) => b.id));

// Separate built-in overrides from truly new types
const customList = computed(() =>
  [...deviceTypes.customTypes.values()].filter((t) => !BUILTIN_IDS.has(t.id)),
);

function hasOverride(id: string): boolean {
  return deviceTypes.customTypes.has(id);
}
function overrideColor(id: string): string {
  return (
    deviceTypes.customTypes.get(id)?.color ??
    (DEVICE_TYPE_COLOR as Record<string, string>)[id] ??
    "#6b7280"
  );
}
function overrideAbbr(id: string): string {
  return (
    deviceTypes.customTypes.get(id)?.abbr ??
    (DEVICE_TYPE_ABBR as Record<string, string>)[id] ??
    id.slice(0, 4).toUpperCase()
  );
}

// ── Form state ─────────────────────────────────────────────────────────────
const editing = ref(false);
const isNew = ref(true);
const formMode = ref<"override" | "custom">("custom");
const saving = ref(false);
const form = ref<CustomDeviceType>({
  id: "",
  label: "",
  abbr: "",
  color: COLORS[0],
  shape: "box",
  w: 0.6,
  h: 0.1,
  d: 0.4,
});

const fileInputEl = ref<HTMLInputElement | null>(null);
const pendingModelData = ref<ArrayBuffer | null>(null);
const pendingModelName = ref("");
const modelError = ref("");
const modelLoading = ref(false);

function resetModelState() {
  pendingModelData.value = null;
  pendingModelName.value = "";
  modelError.value = "";
  modelLoading.value = false;
  if (fileInputEl.value) fileInputEl.value.value = "";
}

function openAdd() {
  if (ui.mode !== "edit") return;
  formMode.value = "custom";
  isNew.value = true;
  form.value = {
    id: `ct-${Date.now()}`,
    label: "",
    abbr: "",
    color: COLORS[0],
    shape: "box",
    w: 0.6,
    h: 0.1,
    d: 0.4,
  };
  resetModelState();
  editing.value = true;
}

function openEdit(t: CustomDeviceType) {
  if (ui.mode !== "edit") return;
  formMode.value = "custom";
  isNew.value = false;
  form.value = { ...t };
  resetModelState();
  editing.value = true;
}

function openOverride(bt: (typeof BUILTIN_LIST)[0]) {
  if (ui.mode !== "edit") return;
  formMode.value = "override";
  isNew.value = false;
  // Start from existing override or built-in defaults
  const existing = deviceTypes.customTypes.get(bt.id);
  form.value = existing ? { ...existing } : { ...bt };
  resetModelState();
  editing.value = true;
}

function cancelEdit() {
  resetModelState();
  editing.value = false;
}

function autoAbbr() {
  if (!isNew.value) return;
  form.value.abbr = form.value.label
    .slice(0, 4)
    .toUpperCase()
    .replace(/\s+/g, "");
}

function onModelFile(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    modelError.value = `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB — max 10 MB)`;
    return;
  }
  modelError.value = "";
  modelLoading.value = true;
  const reader = new FileReader();
  reader.onload = (ev) => {
    pendingModelData.value = ev.target?.result as ArrayBuffer;
    pendingModelName.value = file.name;
    modelLoading.value = false;
  };
  reader.onerror = () => {
    modelError.value = "Failed to read file";
    modelLoading.value = false;
  };
  reader.readAsArrayBuffer(file);
}

function clearModel() {
  form.value.hasModel = false;
  resetModelState();
}

async function save() {
  if (
    formMode.value === "custom" &&
    (!form.value.label.trim() || !form.value.abbr.trim())
  )
    return;
  saving.value = true;
  try {
    if (pendingModelData.value) {
      await storeModel(form.value.id, pendingModelData.value);
      form.value.hasModel = true;
    } else if (!form.value.hasModel) {
      await deleteModel(form.value.id).catch(() => {});
    }

    deviceTypes.upsert({ ...form.value });
    syncCustomTypes(deviceTypes.customTypes);
    syncCustomGeometries(deviceTypes.customTypes);

    if (form.value.hasModel) {
      await preloadCustomModels(deviceTypes.customTypes);
    }

    editing.value = false;
    resetModelState();
    await rebuildAll();
    emit("types-changed");
  } finally {
    saving.value = false;
  }
}

async function remove(id: string) {
  if (!confirm("Remove this custom type?")) return;
  deviceTypes.remove(id);
  await deleteModel(id).catch(() => {});
  syncCustomTypes(deviceTypes.customTypes);
  syncCustomGeometries(deviceTypes.customTypes);
  await rebuildAll();
  emit("types-changed");
}

async function resetOverride(id: string) {
  if (!confirm("Reset to default shape?")) return;
  deviceTypes.remove(id);
  await deleteModel(id).catch(() => {});
  syncCustomTypes(deviceTypes.customTypes);
  syncCustomGeometries(deviceTypes.customTypes);
  await rebuildAll();
  emit("types-changed");
}
</script>

<style scoped>
.ct-panel {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: rgba(8, 12, 24, 0.97);
  border-right: 1px solid #1a2a4a;
  font-size: 11px;
  color: #cbd5e1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #1a2a4a transparent;
}
.ct-panel::-webkit-scrollbar {
  width: 3px;
}
.ct-panel::-webkit-scrollbar-thumb {
  background: #1a2a4a;
  border-radius: 2px;
}

.ct-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px 6px;
  border-bottom: 1px solid #1a2a4a;
  flex-shrink: 0;
}
.ct-title {
  font-weight: 700;
  font-size: 11px;
  color: #e2e8f0;
  flex: 1;
}
.ct-close {
  background: none;
  border: none;
  color: #4b5563;
  cursor: pointer;
  font-size: 11px;
}
.ct-close:hover {
  color: #e2e8f0;
}

.ct-mode-notice {
  padding: 6px 10px;
  background: rgba(30, 58, 95, 0.2);
  color: #475569;
  font-size: 10px;
  border-bottom: 1px solid #1a2a4a;
}

.ct-section-label {
  display: flex;
  align-items: center;
  padding: 5px 10px 3px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #475569;
  border-bottom: 1px solid #0f1827;
  background: rgba(15, 24, 40, 0.4);
}
.ct-section-label--new {
  margin-top: 4px;
}
.ct-section-hint {
  padding: 3px 10px 4px;
  font-size: 9px;
  color: #334155;
  border-bottom: 1px solid #0a1220;
}
.ct-add-inline {
  margin-left: auto;
  background: #1e3a5f;
  border: 1px solid #2a4a8a;
  color: #93c5fd;
  font-size: 9px;
  padding: 1px 7px;
  border-radius: 3px;
  cursor: pointer;
}
.ct-add-inline:hover {
  background: #2a4a8a;
}

.ct-empty-sm {
  padding: 8px 10px;
  color: #334155;
  font-size: 10px;
}

.ct-list {
  flex-shrink: 0;
}
.ct-row {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-bottom: 1px solid #0d1a2d;
}
.ct-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ct-abbr-badge {
  font-family: monospace;
  font-size: 9px;
  border: 1px solid;
  border-radius: 3px;
  padding: 1px 4px;
  flex-shrink: 0;
}
.ct-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
}
.ct-override-tag {
  font-size: 9px;
  color: #f59e0b;
  border: 1px solid #78350f;
  border-radius: 3px;
  padding: 1px 4px;
  flex-shrink: 0;
}
.ct-shape-tag {
  font-size: 9px;
  color: #475569;
  flex-shrink: 0;
}
.ct-btn {
  background: none;
  border: none;
  color: #334155;
  cursor: pointer;
  font-size: 10px;
  flex-shrink: 0;
}
.ct-btn:hover {
  color: #94a3b8;
}
.ct-btn.del:hover {
  color: #ef4444;
}

/* ── Form ── */
.ct-form {
  padding: 10px 12px;
  border-top: 1px solid #1a2a4a;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ct-form-title {
  font-weight: 700;
  color: #e2e8f0;
  font-size: 11px;
}
.ct-label {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: #64748b;
  font-size: 10px;
}
.ct-input {
  background: #0f172a;
  border: 1px solid #1e3a5a;
  color: #e2e8f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  outline: none;
}
.ct-input:focus {
  border-color: #3b82f6;
}
.ct-input-sm {
  width: 80px;
}
.ct-val {
  color: #94a3b8;
  font-family: monospace;
  margin-left: auto;
}
.ct-swatches {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
.ct-swatch {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
}
.ct-swatch.active {
  border-color: #fff;
}
.ct-radios {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.ct-radio {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #94a3b8;
  cursor: pointer;
}
.ct-slider {
  width: 100%;
  accent-color: #3b82f6;
}
.ct-model-row {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 2px;
}
.ct-model-name {
  font-family: monospace;
  font-size: 10px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ct-model-name.pending {
  color: #fbbf24;
}
.ct-model-name.stored {
  color: #4ade80;
}
.ct-model-hint {
  font-size: 10px;
  color: #334155;
  flex: 1;
}
.ct-model-btn {
  background: #0f172a;
  border: 1px solid #1e3a5a;
  color: #64748b;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 3px;
  cursor: pointer;
  white-space: nowrap;
}
.ct-model-btn:hover {
  border-color: #3b82f6;
  color: #93c5fd;
}
.ct-model-rm:hover {
  border-color: #ef4444 !important;
  color: #f87171 !important;
}
.ct-model-error {
  color: #f87171;
  font-size: 10px;
  margin-top: 2px;
}
.ct-form-btns {
  display: flex;
  gap: 6px;
}
.ct-save {
  flex: 1;
  background: #1e3a5f;
  border: 1px solid #2a4a8a;
  color: #93c5fd;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 11px;
}
.ct-save:hover {
  background: #2a4a8a;
}
.ct-cancel {
  flex: 1;
  background: transparent;
  border: 1px solid #334155;
  color: #64748b;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 11px;
}
.ct-save:disabled,
.ct-cancel:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ct-slide-enter-active,
.ct-slide-leave-active {
  transition:
    opacity 0.15s,
    max-height 0.2s;
  max-height: 900px;
  overflow: hidden;
}
.ct-slide-enter-from,
.ct-slide-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
