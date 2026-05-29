<template>
  <aside class="panel">
    <div class="panel-head">
      <span>Spaces</span>
      <div class="head-actions">
        <button v-if="ui.mode === 'edit'" class="text-btn" title="Add space" @click="showAdd = true">
          Add
        </button>
        <button class="text-btn" @click="ui.showSpaceTree = false">
          Close
        </button>
      </div>
    </div>

    <div class="tree-body">
      <div v-for="site in siteTree" :key="site.id" class="site-node">
        <div class="tree-row site" @click="focusSpace(site)">
          <span class="arrow" @click.stop="toggleOpen(site.id)">{{
            openNodes.has(site.id) ? "▾" : "▸"
          }}</span>
          <span class="kind-tag">SITE</span>
          <span class="node-name">{{ site.name }}</span>
          <span class="node-badge" :class="siteStatus(site.id)">{{
            siteStatusLabel(site.id)
          }}</span>
          <button v-if="ui.mode === 'edit'" class="row-btn" @click.stop="startEdit(site)" title="Rename">
            Edit
          </button>
          <button
            v-if="ui.mode === 'edit'"
            class="row-btn del"
            @click.stop="archiveSpace(site.id)"
            title="Archive"
          >
            Del
          </button>
        </div>

        <template v-if="openNodes.has(site.id)">
          <div
            v-for="zone in getChildren(site.id, 'zone')"
            :key="zone.id"
            class="zone-node"
          >
            <div class="tree-row zone" @click="focusSpace(zone)">
              <span class="arrow" @click.stop="toggleOpen(zone.id)">{{
                openNodes.has(zone.id) ? "▾" : "▸"
              }}</span>
              <span class="kind-tag">ZONE</span>
              <span class="node-name">{{ zone.name }}</span>
              <span class="dev-count">{{ getDeviceCount(zone.id) }}</span>
              <button v-if="ui.mode === 'edit'" class="row-btn" @click.stop="startEdit(zone)">
                Edit
              </button>
              <button v-if="ui.mode === 'edit'" class="row-btn del" @click.stop="archiveSpace(zone.id)">
                Del
              </button>
            </div>

            <template v-if="openNodes.has(zone.id)">
              <div v-for="rack in getChildren(zone.id, 'rack')" :key="rack.id">
                <div
                  class="tree-row rack"
                  @click="focusSpace(rack)"
                  :class="{ 'has-issue': rackHasIssue(rack.id) }"
                >
                  <span class="arrow-spacer" />
                  <span class="kind-tag">RACK</span>
                  <span class="node-name">{{ rack.name }}</span>
                  <span class="dev-count">{{ getDeviceCount(rack.id) }}</span>
                  <button v-if="ui.mode === 'edit'" class="row-btn" @click.stop="startEdit(rack)">
                    Edit
                  </button>
                  <button
                    v-if="ui.mode === 'edit'"
                    class="row-btn del"
                    @click.stop="archiveSpace(rack.id)"
                  >
                    Del
                  </button>
                </div>
              </div>
              <div v-if="ui.mode === 'edit'" class="add-child-btn" @click="openAddChild(zone.id, 'rack')">
                + Add rack
              </div>
            </template>
          </div>

          <div v-if="ui.mode === 'edit'" class="add-child-btn" @click="openAddChild(site.id, 'zone')">
            + Add zone
          </div>
        </template>
      </div>

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
          <button v-if="ui.mode === 'edit'" class="row-btn del" @click.stop="archiveSpace(g.id)">
            Del
          </button>
        </div>
      </div>

      <div v-if="ui.mode === 'edit'" class="add-child-btn root" @click="showAdd = true">
        + Add site / group
      </div>
    </div>

    <Transition name="fade">
      <div v-if="ui.mode === 'edit' && (showAdd || addChildParentId)" class="add-modal">
        <div class="add-title">Add Space</div>
        <select v-model="newType" class="add-sel">
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
import type { Space, SpaceType } from "@/types";

const editor = useEditorStore();
const ui = useUIStore();

const openNodes = ref(new Set<string>());
const showAdd = ref(false);
const addChildParentId = ref<string | null>(null);
const addChildType = ref<SpaceType>("zone");
const newType = ref<SpaceType>("site");
const newName = ref("");
const editingSpace = ref<Space | null>(null);
const editName = ref("");

const siteTree = computed(() =>
  [...editor.spaces.values()].filter((s) => s.type === "site" && !s.archived),
);
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

function getChildren(parentId: string, type: SpaceType) {
  return [...editor.spaces.values()].filter(
    (s) => s.parentId === parentId && s.type === type && !s.archived,
  );
}

function getDeviceCount(spaceId: string) {
  return editor.devicesBySpace.get(spaceId)?.length ?? 0;
}

function rackHasIssue(rackId: string) {
  return (editor.devicesBySpace.get(rackId) ?? []).some(
    (d) => d.status === "critical" || d.status === "warning",
  );
}

function siteStatus(siteId: string) {
  const zones = getChildren(siteId, "zone");
  const racks = zones.flatMap((z) => getChildren(z.id, "rack"));
  const allDevs = racks.flatMap((r) => editor.devicesBySpace.get(r.id) ?? []);
  if (allDevs.some((d) => d.status === "critical")) return "critical";
  if (allDevs.some((d) => d.status === "warning")) return "warning";
  return "normal";
}

function siteStatusLabel(siteId: string) {
  const s = siteStatus(siteId);
  return s === "critical" ? "CRIT" : s === "warning" ? "WARN" : "OK";
}

function toggleOpen(id: string) {
  if (openNodes.value.has(id)) openNodes.value.delete(id);
  else openNodes.value.add(id);
}

function focusSpace(space: Space) {
  ui.select({ type: "space", id: space.id });
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
    kind: ["site", "zone", "rack"].includes(newType.value)
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
  editor.updateSpace(editingSpace.value.id, { name: editName.value });
  editor.logChange("space.update", `Space renamed: ${editName.value}`);
  editingSpace.value = null;
}

function archiveSpace(id: string) {
  if (ui.mode !== "edit") return;
  if (!confirm("Archive this space?")) return;
  editor.archiveSpace(id);
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
  scrollbar-color: #1e3a5a transparent;
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
