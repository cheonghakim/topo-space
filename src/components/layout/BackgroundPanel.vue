<template>
  <aside class="bg-panel">
    <div class="bg-head">
      <span class="bg-title">Background</span>
      <button class="bg-close" @click="ui.closeLeftDock()" title="Close">
        ✕
      </button>
    </div>

    <div v-if="ui.mode !== 'edit'" class="bg-mode-notice">
      Switch to Edit mode to manage backgrounds.
    </div>

    <template v-else>
      <label class="bg-toggle-row">
        <input
          type="checkbox"
          :checked="ui.backgroundEditActive"
          @change="ui.toggleBackgroundEdit()"
        />
        <span>Edit positions</span>
        <span class="bg-toggle-hint">
          {{
            ui.backgroundEditActive
              ? "Click a background object in the scene to move it"
              : "Backgrounds are dimmed and click-through"
          }}
        </span>
      </label>

      <div class="bg-section-label">
        This floor
        <button class="bg-add-inline" @click="openAdd">+ Add</button>
      </div>

      <div v-if="!list.length" class="bg-empty-sm">
        No background objects yet
      </div>
      <div class="bg-list">
        <div
          v-for="b in list"
          :key="b.id"
          class="bg-row"
          :class="{ active: editingId === b.id }"
        >
          <span class="bg-kind-tag">{{
            b.kind === "image" ? "IMG" : "3D"
          }}</span>
          <span class="bg-name" @click="toggleEdit(b)">{{ b.name }}</span>
          <button class="bg-btn" @click="toggleEdit(b)">
            {{ editingId === b.id ? "Close" : "Edit" }}
          </button>
          <button class="bg-btn del" @click="remove(b.id)">Del</button>
        </div>
      </div>

      <!-- ── Properties for the selected object ─────────────────── -->
      <div v-if="editingObj" class="bg-form">
        <div class="bg-form-title">{{ editingObj.name }}</div>

        <div class="bg-grid3">
          <label class="bg-label"
            >X
            <input
              type="number"
              step="0.5"
              v-model.number="posX"
              class="bg-input"
              @change="commitPosition"
            />
          </label>
          <label class="bg-label"
            >Y
            <input
              type="number"
              step="0.1"
              v-model.number="posY"
              class="bg-input"
              @change="commitPosition"
            />
          </label>
          <label class="bg-label"
            >Z
            <input
              type="number"
              step="0.5"
              v-model.number="posZ"
              class="bg-input"
              @change="commitPosition"
            />
          </label>
        </div>

        <label class="bg-label"
          >Rotation Y (°)
          <input
            type="number"
            step="5"
            v-model.number="rotationY"
            class="bg-input"
            @change="commitField('rotationY', rotationY)"
          />
        </label>

        <template v-if="editingObj.kind === 'model'">
          <label class="bg-label"
            >Scale
            <input
              type="number"
              step="0.1"
              min="0.01"
              v-model.number="scale"
              class="bg-input"
              @change="commitField('scale', scale)"
            />
          </label>
        </template>
        <template v-else>
          <div class="bg-grid2">
            <label class="bg-label"
              >Width
              <input
                type="number"
                step="0.5"
                min="0.1"
                v-model.number="imgWidth"
                class="bg-input"
                @change="commitField('width', imgWidth)"
              />
            </label>
            <label class="bg-label"
              >Depth
              <input
                type="number"
                step="0.5"
                min="0.1"
                v-model.number="imgDepth"
                class="bg-input"
                @change="commitField('depth', imgDepth)"
              />
            </label>
          </div>
        </template>

        <label class="bg-label"
          >Opacity (dashboard view)
          <span class="bg-val">{{ opacity.toFixed(2) }}</span>
          <input
            type="range"
            min="0.05"
            max="0.9"
            step="0.05"
            v-model.number="opacity"
            class="bg-slider"
            @change="commitField('opacity', opacity)"
          />
        </label>
      </div>

      <!-- ── Add form ────────────────────────────────────────────── -->
      <Transition name="bg-slide">
        <div v-if="adding" class="bg-form">
          <div class="bg-form-title">New Background</div>
          <label class="bg-label"
            >Name
            <input
              v-model="newName"
              class="bg-input"
              placeholder="1F floor plan"
            />
          </label>
          <label class="bg-label"
            >File (image or .glb/.gltf)
            <input
              ref="fileInputEl"
              type="file"
              accept="image/*,.glb,.gltf"
              style="display: none"
              @change="onFile"
            />
            <div class="bg-file-row">
              <span v-if="pendingFileName" class="bg-file-name">{{
                pendingFileName
              }}</span>
              <span v-else class="bg-file-hint">No file chosen</span>
              <button class="bg-model-btn" @click="fileInputEl?.click()">
                Choose
              </button>
            </div>
            <div v-if="fileError" class="bg-file-error">{{ fileError }}</div>
          </label>

          <div class="bg-form-btns">
            <button
              class="bg-save"
              :disabled="!canSave || saving"
              @click="save"
            >
              {{ saving ? "Adding…" : "Add" }}
            </button>
            <button class="bg-cancel" :disabled="saving" @click="cancelAdd">
              Cancel
            </button>
          </div>
        </div>
      </Transition>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useUIStore } from "@/stores/ui";
import { useEditorStore } from "@/stores/editor";
import { useNmsEditor } from "@/composables/useNmsEditor";
import { storeAsset, deleteAsset } from "@/utils/backgroundStorage";
import type { BackgroundObject } from "@/types";

const ui = useUIStore();
const editor = useEditorStore();
const { rebuildAll } = useNmsEditor();

const list = computed(() =>
  editor.scopedBackgroundObjects(ui.activeRootSpaceId),
);

// ── Add form ──────────────────────────────────────────────────────────────
const adding = ref(false);
const newName = ref("");
const fileInputEl = ref<HTMLInputElement | null>(null);
const pendingFileData = ref<ArrayBuffer | null>(null);
const pendingFileName = ref("");
const pendingKind = ref<"image" | "model">("image");
const fileError = ref("");
const saving = ref(false);

const canSave = computed(() => newName.value.trim() && pendingFileData.value);

function openAdd() {
  adding.value = true;
  newName.value = "";
  pendingFileData.value = null;
  pendingFileName.value = "";
  fileError.value = "";
  editingId.value = null;
}

function cancelAdd() {
  adding.value = false;
  if (fileInputEl.value) fileInputEl.value.value = "";
}

function onFile(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    fileError.value = `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB — max 10 MB)`;
    return;
  }
  pendingKind.value = /\.(glb|gltf)$/i.test(file.name) ? "model" : "image";
  fileError.value = "";
  const reader = new FileReader();
  reader.onload = (ev) => {
    pendingFileData.value = ev.target?.result as ArrayBuffer;
    pendingFileName.value = file.name;
  };
  reader.onerror = () => {
    fileError.value = "Failed to read file";
  };
  reader.readAsArrayBuffer(file);
}

async function save() {
  if (!canSave.value || !pendingFileData.value) return;
  const spaceId = ui.activeRootSpaceId;
  if (!spaceId) return;
  saving.value = true;
  try {
    const id = `bg-${Date.now()}`;
    await storeAsset(id, pendingFileData.value);
    const floor = editor.spaces.get(spaceId);
    const obj: BackgroundObject = {
      id,
      name: newName.value.trim(),
      kind: pendingKind.value,
      spaceId,
      assetId: id,
      position: { x: 0, y: pendingKind.value === "image" ? -0.18 : 0, z: 0 },
      rotationY: 0,
      scale: 1,
      width: floor?.size?.width ?? 10,
      depth: floor?.size?.depth ?? 10,
      opacity: 0.3,
    };
    editor.addBackgroundObject(obj);
    editor.logChange("background.create", `Background added: ${obj.name}`);
    adding.value = false;
    await rebuildAll();
  } finally {
    saving.value = false;
  }
}

async function remove(id: string) {
  if (!confirm("Remove this background object?")) return;
  editor.removeBackgroundObject(id);
  await deleteAsset(id).catch(() => {});
  if (editingId.value === id) editingId.value = null;
  editor.logChange("background.delete", `Background removed: ${id}`);
  await rebuildAll();
}

// ── Properties editor ────────────────────────────────────────────────────
const editingId = ref<string | null>(null);
const editingObj = computed(() =>
  editingId.value
    ? (editor.backgroundObjects.get(editingId.value) ?? null)
    : null,
);

const posX = ref(0),
  posY = ref(0),
  posZ = ref(0);
const rotationY = ref(0);
const scale = ref(1);
const imgWidth = ref(10);
const imgDepth = ref(10);
const opacity = ref(0.3);

watch(
  editingObj,
  (obj) => {
    if (!obj) return;
    posX.value = obj.position.x;
    posY.value = obj.position.y;
    posZ.value = obj.position.z;
    rotationY.value = obj.rotationY ?? 0;
    scale.value = obj.scale ?? 1;
    imgWidth.value = obj.width ?? 10;
    imgDepth.value = obj.depth ?? 10;
    opacity.value = obj.opacity ?? 0.3;
  },
  { immediate: true },
);

function toggleEdit(b: BackgroundObject) {
  editingId.value = editingId.value === b.id ? null : b.id;
  adding.value = false;
  if (editingId.value && ui.backgroundEditActive) {
    ui.select({ type: "background", id: b.id });
  }
}

async function commitField(key: keyof BackgroundObject, value: number) {
  if (!editingId.value) return;
  editor.updateBackgroundObject(editingId.value, {
    [key]: value,
  } as Partial<BackgroundObject>);
  await rebuildAll();
}

async function commitPosition() {
  if (!editingId.value) return;
  editor.updateBackgroundObject(editingId.value, {
    position: { x: posX.value, y: posY.value, z: posZ.value },
  });
  await rebuildAll();
}
</script>

<style scoped>
.bg-panel {
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
.bg-panel::-webkit-scrollbar {
  width: 3px;
}
.bg-panel::-webkit-scrollbar-thumb {
  background: #1a2a4a;
  border-radius: 2px;
}

.bg-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px 6px;
  border-bottom: 1px solid #1a2a4a;
  flex-shrink: 0;
}
.bg-title {
  font-weight: 700;
  font-size: 11px;
  color: #e2e8f0;
  flex: 1;
}
.bg-close {
  background: none;
  border: none;
  color: #4b5563;
  cursor: pointer;
  font-size: 11px;
}
.bg-close:hover {
  color: #e2e8f0;
}

.bg-mode-notice {
  padding: 6px 10px;
  background: rgba(30, 58, 95, 0.2);
  color: #475569;
  font-size: 10px;
  border-bottom: 1px solid #1a2a4a;
}

.bg-toggle-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 7px 10px;
  border-bottom: 1px solid #1a2a4a;
  cursor: pointer;
  background: rgba(30, 58, 95, 0.15);
}
.bg-toggle-hint {
  flex-basis: 100%;
  color: #475569;
  font-size: 9px;
}

.bg-section-label {
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
.bg-add-inline {
  margin-left: auto;
  background: #1e3a5f;
  border: 1px solid #2a4a8a;
  color: #93c5fd;
  font-size: 9px;
  padding: 1px 7px;
  border-radius: 3px;
  cursor: pointer;
}
.bg-add-inline:hover {
  background: #2a4a8a;
}

.bg-empty-sm {
  padding: 8px 10px;
  color: #334155;
  font-size: 10px;
}

.bg-list {
  flex-shrink: 0;
}
.bg-row {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-bottom: 1px solid #0d1a2d;
}
.bg-row.active {
  background: rgba(59, 130, 246, 0.08);
}
.bg-kind-tag {
  font-size: 8px;
  font-weight: 700;
  font-family: monospace;
  color: #64748b;
  border: 1px solid #334155;
  border-radius: 3px;
  padding: 1px 3px;
  flex-shrink: 0;
}
.bg-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  cursor: pointer;
}
.bg-btn {
  background: none;
  border: none;
  color: #334155;
  cursor: pointer;
  font-size: 10px;
  flex-shrink: 0;
}
.bg-btn:hover {
  color: #94a3b8;
}
.bg-btn.del:hover {
  color: #ef4444;
}

.bg-form {
  padding: 10px 12px;
  border-top: 1px solid #1a2a4a;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bg-form-title {
  font-weight: 700;
  color: #e2e8f0;
  font-size: 11px;
}
.bg-label {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: #64748b;
  font-size: 10px;
}
.bg-input {
  background: #0f172a;
  border: 1px solid #1e3a5a;
  color: #e2e8f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  outline: none;
}
.bg-input:focus {
  border-color: #3b82f6;
}
.bg-val {
  color: #94a3b8;
  font-family: monospace;
  margin-left: auto;
}
.bg-slider {
  width: 100%;
  accent-color: #3b82f6;
}
.bg-grid3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.bg-grid2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}
.bg-file-row {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 2px;
}
.bg-file-name {
  font-family: monospace;
  font-size: 10px;
  color: #4ade80;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bg-file-hint {
  font-size: 10px;
  color: #334155;
  flex: 1;
}
.bg-model-btn {
  background: #0f172a;
  border: 1px solid #1e3a5a;
  color: #64748b;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 3px;
  cursor: pointer;
  white-space: nowrap;
}
.bg-model-btn:hover {
  border-color: #3b82f6;
  color: #93c5fd;
}
.bg-file-error {
  color: #f87171;
  font-size: 10px;
  margin-top: 2px;
}
.bg-form-btns {
  display: flex;
  gap: 6px;
}
.bg-save {
  flex: 1;
  background: #1e3a5f;
  border: 1px solid #2a4a8a;
  color: #93c5fd;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 11px;
}
.bg-save:hover {
  background: #2a4a8a;
}
.bg-cancel {
  flex: 1;
  background: transparent;
  border: 1px solid #334155;
  color: #64748b;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 11px;
}
.bg-save:disabled,
.bg-cancel:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.bg-slide-enter-active,
.bg-slide-leave-active {
  transition:
    opacity 0.15s,
    max-height 0.2s;
  max-height: 900px;
  overflow: hidden;
}
.bg-slide-enter-from,
.bg-slide-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
