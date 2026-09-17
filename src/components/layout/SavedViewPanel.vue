<template>
  <div class="sv-panel">
    <div class="sv-head">
      <span>Saved Views</span>
      <button
        class="sv-save"
        title="Save current view"
        @click="saveCurrentView"
      >
        Save Current
      </button>
      <button class="icon-btn" @click="ui.showSavedViews = false">Close</button>
    </div>

    <div v-if="!editor.savedViews.length" class="sv-empty">No saved views</div>

    <div class="sv-list">
      <div v-for="view in editor.savedViews" :key="view.id" class="sv-row">
        <div class="sv-info" @click="loadView(view)">
          <img
            v-if="view.thumbnail"
            :src="view.thumbnail"
            class="sv-thumb"
            alt=""
          />
          <div v-else class="sv-thumb sv-thumb--empty" aria-hidden="true" />
          <div class="sv-text">
            <div class="sv-name">{{ view.name }}</div>
            <div class="sv-time">{{ view.createdAt }}</div>
          </div>
        </div>
        <button class="del-btn" @click="editor.removeSavedView(view.id)">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/stores/editor";
import { useUIStore } from "@/stores/ui";
import type { SavedView } from "@/types";

const editor = useEditorStore();
const ui = useUIStore();

const emit = defineEmits<{
  (e: "load-view", view: SavedView): void;
  (e: "save-view", name: string): void;
}>();

function saveCurrentView() {
  const name =
    prompt("Enter a view name:", `View-${editor.savedViews.length + 1}`) ?? "";
  if (!name) return;
  emit("save-view", name);
}

function loadView(view: SavedView) {
  emit("load-view", view);
}
</script>

<style scoped>
.sv-panel {
  width: 100%;
  flex-shrink: 0;
  background: rgba(9, 13, 24, 0.5);
  border-bottom: 1px solid #1a2a4a;
  overflow: hidden;
}
.sv-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-bottom: 1px solid #1a2a4a;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
}
.sv-save {
  background: #1e3a5f;
  border: 1px solid #2a4a8a;
  color: #93c5fd;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 10px;
  cursor: pointer;
}
.icon-btn {
  background: none;
  border: none;
  color: #475569;
  cursor: pointer;
  margin-left: auto;
}
.sv-empty {
  padding: 12px 10px;
  color: #475569;
  font-size: 11px;
  text-align: center;
}
.sv-list {
  max-height: 220px;
  overflow-y: auto;
}
.sv-row {
  display: flex;
  align-items: center;
  padding: 7px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}
.sv-info {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.sv-thumb {
  width: 48px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #23334a;
  object-fit: cover;
  background: #050a14;
}
.sv-thumb--empty {
  background: linear-gradient(135deg, #0f172a, #182338);
}
.sv-text {
  min-width: 0;
  flex: 1;
}
.sv-name,
.sv-time {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sv-info:hover .sv-name {
  color: #60a5fa;
}
.sv-name {
  color: #cbd5e1;
  font-size: 11px;
}
.sv-time {
  color: #475569;
  font-size: 10px;
}
.del-btn {
  background: none;
  border: none;
  color: #334155;
  cursor: pointer;
  font-size: 10px;
}
.del-btn:hover {
  color: #ef4444;
}
</style>
