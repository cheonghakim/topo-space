<template>
  <div>
    <div
      class="tree-row"
      :class="{ 'has-issue': depth > 0 && hasIssue }"
      :style="{ paddingLeft: `${6 + depth * 12}px` }"
      @click="$emit('focus', space)"
    >
      <span v-if="children.length" class="arrow" @click.stop="$emit('toggle', space.id)">
        {{ isOpen ? "▾" : "▸" }}
      </span>
      <span v-else class="arrow-spacer" />
      <span class="kind-tag">{{ kindLabel }}</span>
      <span class="node-name">{{ space.name }}</span>
      <span v-if="depth === 0" class="node-badge" :class="status">{{ statusLabel }}</span>
      <span v-else class="dev-count">{{ deviceCount }}</span>
      <button
        v-if="ui.mode === 'edit'"
        class="row-btn"
        title="Rename"
        @click.stop="$emit('edit', space)"
      >
        Edit
      </button>
      <button
        v-if="ui.mode === 'edit'"
        class="row-btn del"
        title="Archive"
        @click.stop="$emit('archive', space.id)"
      >
        Del
      </button>
    </div>

    <template v-if="isOpen">
      <SpaceTreeNode
        v-for="child in children"
        :key="child.id"
        :space="child"
        :depth="depth + 1"
        :open-nodes="openNodes"
        @toggle="(id) => $emit('toggle', id)"
        @focus="(s) => $emit('focus', s)"
        @edit="(s) => $emit('edit', s)"
        @archive="(id) => $emit('archive', id)"
        @add-child="(pid, t) => $emit('add-child', pid, t)"
      />
      <div
        v-if="ui.mode === 'edit' && space.type !== 'rack'"
        class="add-child-btn"
        :style="{ paddingLeft: `${32 + depth * 12}px` }"
        @click="$emit('add-child', space.id, childType)"
      >
        + Add {{ childType }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEditorStore } from "@/stores/editor";
import { useUIStore } from "@/stores/ui";
import type { Space, SpaceType } from "@/types";

const props = defineProps<{
  space: Space;
  depth: number;
  openNodes: Set<string>;
}>();

defineEmits<{
  (e: "toggle", id: string): void;
  (e: "focus", space: Space): void;
  (e: "edit", space: Space): void;
  (e: "archive", id: string): void;
  (e: "add-child", parentId: string, childType: SpaceType): void;
}>();

const editor = useEditorStore();
const ui = useUIStore();

const KIND_LABELS: Record<string, string> = {
  building: "BLDG", floor: "FLR", site: "SITE", zone: "ZONE", rack: "RACK",
  custom_group: "GRP", security_zone: "SEC", service: "SVC", external: "EXT", cloud: "CLD",
};
// What kind of child a "+ Add …" button under this node should create.
const NEXT_TYPE: Record<string, SpaceType> = {
  building: "floor", floor: "zone", site: "zone", zone: "rack",
};

const children = computed(() => editor.childSpaces(props.space.id));
const isOpen = computed(() => props.openNodes.has(props.space.id));
const kindLabel = computed(() => KIND_LABELS[props.space.type] ?? props.space.type.slice(0, 4).toUpperCase());
const childType = computed(() => NEXT_TYPE[props.space.type] ?? "zone");

const deviceCount = computed(() => editor.scopedDevices(props.space.id).length);

const hasIssue = computed(() =>
  editor.scopedDevices(props.space.id).some((d) => d.status === "critical" || d.status === "warning"));

const status = computed(() => {
  const devs = editor.scopedDevices(props.space.id);
  if (devs.some((d) => d.status === "critical")) return "critical";
  if (devs.some((d) => d.status === "warning")) return "warning";
  return "normal";
});
const statusLabel = computed(() =>
  status.value === "critical" ? "CRIT" : status.value === "warning" ? "WARN" : "OK");
</script>

<style scoped>
.tree-row {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 8px;
  cursor: pointer;
  font-size: 11px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  transition: background 0.1s;
}
.tree-row:hover {
  background: rgba(59, 130, 246, 0.08);
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
  flex-shrink: 0;
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
  padding-top: 4px;
  padding-bottom: 4px;
  padding-right: 8px;
  color: #334155;
  font-size: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}
.add-child-btn:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.06);
}
</style>
