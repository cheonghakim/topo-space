<template>
  <aside class="panel">
    <div class="panel-head">
      <span>Spaces</span>
      <div class="head-actions">
        <button
          v-if="ui.mode === 'edit'"
          class="text-btn"
          title="Add space"
          @click="showAdd = true"
        >
          Add
        </button>
        <button class="text-btn" title="Close" @click="ui.closeLeftDock()">
          Close
        </button>
      </div>
    </div>

    <div class="tree-body">
      <SpaceTreeNode
        v-for="root in editor.rootSpaces"
        :key="root.id"
        :space="root"
        :depth="0"
        :open-nodes="openNodes"
        @toggle="toggleOpen"
        @focus="focusSpace"
        @edit="startEdit"
        @archive="archiveSpace"
        @add-child="openAddChild"
      />

      <div v-if="customGroups.length" class="site-node">
        <div class="tree-row site">
          <span class="kind-tag">GRP</span>
          <span class="node-name" style="color: #94a3b8">Logical Groups</span>
        </div>
        <div
          v-for="g in customGroups"
          :key="g.id"
          class="tree-row zone"
          @click="focusSpace(g)"
        >
          <span class="arrow-spacer" />
          <span class="kind-tag">GRP</span>
          <span class="node-name">{{ g.name }}</span>
          <button
            v-if="ui.mode === 'edit'"
            class="row-btn del"
            @click.stop="archiveSpace(g.id)"
          >
            Del
          </button>
        </div>
      </div>

      <div
        v-if="ui.mode === 'edit'"
        class="add-child-btn root"
        @click="showAdd = true"
      >
        + Add building / site / group
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="ui.mode === 'edit' && (showAdd || addChildParentId)"
        class="add-modal"
      >
        <div class="add-title">Add Space</div>
        <select v-model="newType" class="add-sel">
          <option value="building">Building</option>
          <option value="floor">Floor</option>
          <option value="site">Site</option>
          <option value="zone">Zone</option>
          <option value="rack">Rack</option>
          <option value="custom_group">Custom Group</option>
          <option value="security_zone">Security Zone</option>
          <option value="service">Service Group</option>
          <option value="external">External</option>
          <option value="cloud">Cloud</option>
        </select>
        <input
          v-model="newName"
          class="add-input"
          placeholder="Name"
          @keydown.enter="confirmAdd"
        />
        <div class="add-btns">
          <button class="add-ok" @click="confirmAdd">Add</button>
          <button class="add-cancel" @click="cancelAdd">Cancel</button>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="ui.mode === 'edit' && editingSpace" class="add-modal">
        <div class="add-title">Rename</div>
        <input
          v-model="editName"
          class="add-input"
          @keydown.enter="confirmEdit"
        />
        <div class="add-btns">
          <button class="add-ok" @click="confirmEdit">Save</button>
          <button class="add-cancel" @click="editingSpace = null">
            Cancel
          </button>
        </div>
      </div>
    </Transition>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useEditorStore } from "@/stores/editor";
import { useUIStore } from "@/stores/ui";
import { useNmsEditor } from "@/composables/useNmsEditor";
import SpaceTreeNode from "@/components/layout/SpaceTreeNode.vue";
import type { Space, SpaceType } from "@/types";

const editor = useEditorStore();
const ui = useUIStore();
const { refreshSpace, focusSpace: switchToSpace } = useNmsEditor();

const openNodes = ref(new Set<string>());
const showAdd = ref(false);
const addChildParentId = ref<string | null>(null);
const addChildType = ref<SpaceType>("zone");
const newType = ref<SpaceType>("site");
const newName = ref("");
const editingSpace = ref<Space | null>(null);
const editName = ref("");

const customGroups = computed(() =>
  [...editor.spaces.values()].filter(
    (s) =>
      [
        "custom_group",
        "security_zone",
        "service",
        "external",
        "cloud",
      ].includes(s.type) && !s.archived,
  ),
);

function toggleOpen(id: string) {
  if (openNodes.value.has(id)) openNodes.value.delete(id);
  else openNodes.value.add(id);
}

function focusSpace(space: Space) {
  ui.select({ type: "space", id: space.id });
  switchToSpace(space.id);
}

function openAddChild(parentId: string, type: SpaceType) {
  if (ui.mode !== "edit") return;
  addChildParentId.value = parentId;
  addChildType.value = type;
  newType.value = type;
  newName.value = "";
  showAdd.value = true;
}

function confirmAdd() {
  if (ui.mode !== "edit") return;
  if (!newName.value.trim()) return;
  const id = `space-${Date.now()}`;
  const parentSpace = addChildParentId.value
    ? editor.spaces.get(addChildParentId.value)
    : null;
  const basePos = parentSpace?.position ?? { x: 0, y: 0, z: 0 };

  editor.addSpace({
    id,
    name: newName.value.trim(),
    kind: ["building", "floor", "site", "zone", "rack"].includes(newType.value)
      ? "physical"
      : "logical",
    type: newType.value,
    parentId: addChildParentId.value ?? undefined,
    source: "manual",
    position: {
      x: basePos.x + Math.random() * 10 - 5,
      y: 0,
      z: basePos.z + Math.random() * 10 - 5,
    },
    size:
      newType.value === "rack"
        ? { width: 1, height: 3, depth: 0.6 }
        : newType.value === "zone"
          ? { width: 20, height: 0.1, depth: 18 }
          : { width: 50, height: 0.1, depth: 40 },
    createdAt: new Date().toISOString(),
  });
  editor.logChange(
    "space.create",
    `Space added: ${newName.value} (${newType.value})`,
  );
  cancelAdd();
}

function cancelAdd() {
  showAdd.value = false;
  addChildParentId.value = null;
  newName.value = "";
}

function startEdit(space: Space) {
  if (ui.mode !== "edit") return;
  editingSpace.value = space;
  editName.value = space.name;
}

function confirmEdit() {
  if (ui.mode !== "edit") return;
  if (!editingSpace.value) return;
  const id = editingSpace.value.id;
  editor.updateSpace(id, { name: editName.value });
  editor.logChange("space.update", `Space renamed: ${editName.value}`);
  refreshSpace(id);
  editingSpace.value = null;
}

function archiveSpace(id: string) {
  if (ui.mode !== "edit") return;
  if (!confirm("Archive this space?")) return;
  editor.archiveSpace(id);
  refreshSpace(id);
  editor.logChange("space.archive", `Space archived: ${id}`);
}
</script>

<style scoped>
.panel {
  width: 220px;
  flex-shrink: 0;
  background: rgba(8, 12, 24, 0.96);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
  position: relative;
}
.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  border-bottom: 1px solid #1a2a4a;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
}
.head-actions {
  display: flex;
  gap: 6px;
}
.text-btn {
  background: none;
  border: 1px solid #1e3a5a;
  color: #64748b;
  cursor: pointer;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 4px;
}
.text-btn:hover {
  color: #e2e8f0;
  border-color: #3b82f6;
}
.tree-body {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #1a2a4a transparent;
}
.tree-row {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 8px;
  cursor: pointer;
  font-size: 11px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  transition: background 0.1s;
}
.tree-row:hover {
  background: rgba(59, 130, 246, 0.08);
}
.tree-row.site {
  padding-left: 6px;
}
.tree-row.zone {
  padding-left: 18px;
  background: rgba(255, 255, 255, 0.02);
}
.tree-row.rack {
  padding-left: 30px;
}
.tree-row.has-issue {
  background: rgba(239, 68, 68, 0.06);
}
.arrow {
  color: #475569;
  font-size: 12px;
  width: 12px;
  cursor: pointer;
  margin: 0px;
}
.arrow-spacer {
  width: 12px;
  flex-shrink: 0;
}
.kind-tag {
  font-size: 8px;
  font-weight: 700;
  font-family: monospace;
  color: #64748b;
  border: 1px solid #334155;
  border-radius: 3px;
  padding: 1px 3px;
  flex-shrink: 0;
}
.node-name {
  color: #cbd5e1;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.node-badge {
  font-size: 9px;
  font-weight: 700;
}
.node-badge.critical {
  color: #f87171;
}
.node-badge.warning {
  color: #fbbf24;
}
.node-badge.normal {
  color: #22c55e;
}
.dev-count {
  color: #475569;
  font-size: 10px;
  flex-shrink: 0;
}
.row-btn {
  background: none;
  border: none;
  color: #334155;
  cursor: pointer;
  font-size: 10px;
  opacity: 0;
}
.tree-row:hover .row-btn {
  opacity: 1;
}
.row-btn:hover {
  color: #94a3b8;
}
.row-btn.del:hover {
  color: #ef4444;
}
.add-child-btn {
  padding: 4px 8px 4px 32px;
  color: #334155;
  font-size: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}
.add-child-btn:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.06);
}
.add-child-btn.root {
  padding-left: 8px;
  border-top: 1px solid #1a2a4a;
}

.add-modal {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(9, 13, 24, 0.98);
  border-top: 1px solid #2a4a8a;
  padding: 12px;
  z-index: 200;
}
.add-title {
  color: #94a3b8;
  font-size: 11px;
  margin-bottom: 8px;
}
.add-sel,
.add-input {
  width: 100%;
  background: #0f172a;
  border: 1px solid #1e3a5a;
  color: #e2e8f0;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 11px;
  outline: none;
  margin-bottom: 6px;
}
.add-btns {
  display: flex;
  gap: 6px;
}
.add-ok {
  flex: 1;
  background: #1e3a5f;
  border: 1px solid #2a4a8a;
  color: #93c5fd;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 11px;
}
.add-cancel {
  flex: 1;
  background: transparent;
  border: 1px solid #334155;
  color: #64748b;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 11px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
