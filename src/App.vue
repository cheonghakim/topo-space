<template>
  <div class="app">
    <AppMenuBar />
    <TopToolbar />

    <div class="workspace">
      <!-- Left dock: device / space sources -->
      <aside
        v-if="hasLeftPanel"
        class="left-dock"
        :style="{ width: leftDockWidth + 'px' }"
      >
        <AlertPanel v-if="ui.showAlertPanel" />
        <CustomTypePanel v-else-if="ui.showCustomTypes" />
        <BackgroundPanel v-else-if="ui.showBackgroundPanel" />
        <RackServerListPanel v-else-if="ui.showRackServerList" />
        <SpaceTreePanel v-else-if="ui.showSpaceTree" />
        <UnmappedPanel v-else-if="ui.showUnmapped" />
        <div
          class="dock-resizer dock-resizer--left"
          :class="{ 'dock-resizer--active': resizingSide === 'left' }"
          @pointerdown="startDockResize('left', $event)"
        />
      </aside>

      <div ref="canvasWrap" class="canvas-wrap">
        <OverviewCanvas
          v-if="ui.viewMode === '2d'"
          @enter-floor="onEnterFloor"
        />
        <SceneCanvas v-else ref="sceneRef" @scene-ready="onSceneReady" />

        <ViewSwitcher v-if="ui.viewMode === '3d'" />
        <StatusLegend />

        <MinimapPanel
          v-if="ui.viewMode === '3d' && sceneReady && ui.showMinimap"
          :camera="currentCamera"
          :controls="currentControls"
        />

        <OffscreenAlertOverlay v-if="ui.viewMode === '3d' && sceneReady" />
      </div>

      <!-- Right dock: contextual detail + tool panels, stacked -->
      <aside
        v-if="hasRightPanel"
        class="right-dock"
        :style="{ width: rightDockWidth + 'px' }"
      >
        <div
          class="dock-resizer dock-resizer--right"
          :class="{ 'dock-resizer--active': resizingSide === 'right' }"
          @pointerdown="startDockResize('right', $event)"
        />
        <DeviceDetailPanel v-if="ui.selectedDeviceId" />
        <LinkPropertyPanel v-else-if="ui.selectedLinkId" />
        <SpacePropertyPanel v-else-if="ui.selectedSpaceId" />

        <SavedViewPanel
          v-if="ui.showSavedViews"
          @save-view="onSaveView"
          @load-view="onLoadView"
        />
        <ChangeLogPanel v-if="ui.showChangeLog" />
        <VirtualNodePanel
          v-if="ui.showVirtualNodes"
          @select-node="onSelectVNode"
        />
      </aside>
    </div>

    <TimelinePanel
      v-if="ui.showTimeline"
      :timeline="timeline"
      @scrub="onTimelineScrub"
      @live="ui.timelineFrameIdx = -1"
    />

    <ContextMenu />

    <ToastPanel />

    <HelpPanel />

    <ImportPanel />

    <ConfirmDialog />

    <Transition name="fade">
      <div v-if="ui.blastSourceId" class="blast-banner">
        Impact radius
        <span class="blast-id">{{ blastDeviceName }}</span>
        <span class="blast-legend">
          <span class="blast-legend-item"
            ><span class="blast-dot blast-dot--hop1" />1 hop</span
          >
          <span class="blast-legend-item"
            ><span class="blast-dot blast-dot--hop2" />2 hop</span
          >
        </span>
        <button
          class="blast-close"
          @click="
            ui.blastSourceId = null;
            ui.select(null);
          "
        >
          Close
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import AppMenuBar from "@/components/layout/AppMenuBar.vue";
import TopToolbar from "@/components/layout/TopToolbar.vue";
import AlertPanel from "@/components/layout/AlertPanel.vue";
import CustomTypePanel from "@/components/layout/CustomTypePanel.vue";
import BackgroundPanel from "@/components/layout/BackgroundPanel.vue";
import RackServerListPanel from "@/components/layout/RackServerListPanel.vue";
import SpaceTreePanel from "@/components/layout/SpaceTreePanel.vue";
import UnmappedPanel from "@/components/layout/UnmappedPanel.vue";
import DeviceDetailPanel from "@/components/layout/DeviceDetailPanel.vue";
import LinkPropertyPanel from "@/components/layout/LinkPropertyPanel.vue";
import SpacePropertyPanel from "@/components/layout/SpacePropertyPanel.vue";
import SavedViewPanel from "@/components/layout/SavedViewPanel.vue";
import ChangeLogPanel from "@/components/layout/ChangeLogPanel.vue";
import VirtualNodePanel from "@/components/layout/VirtualNodePanel.vue";
import TimelinePanel from "@/components/layout/TimelinePanel.vue";
import MinimapPanel from "@/components/layout/MinimapPanel.vue";
import SceneCanvas from "@/components/scene/SceneCanvas.vue";
import OverviewCanvas from "@/components/scene/OverviewCanvas.vue";
import OffscreenAlertOverlay from "@/components/scene/OffscreenAlertOverlay.vue";
import ContextMenu from "@/components/ui/ContextMenu.vue";
import ToastPanel from "@/components/ui/ToastPanel.vue";
import HelpPanel from "@/components/ui/HelpPanel.vue";
import ImportPanel from "@/components/ui/ImportPanel.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";
import ViewSwitcher from "@/components/ui/ViewSwitcher.vue";
import StatusLegend from "@/components/ui/StatusLegend.vue";
import { useUIStore } from "@/stores/ui";
import { useEditorStore } from "@/stores/editor";
import { useNmsEditor } from "@/composables/useNmsEditor";
import type { SavedView } from "@/types";

const ui = useUIStore();
const editor = useEditorStore();
const nmsEditor = useNmsEditor();
const {
  saveCurrentView,
  loadSavedView,
  focusVirtualNode,
  onTimelineScrub,
  getScene,
  timeline,
} = nmsEditor;

const sceneRef = ref<InstanceType<typeof SceneCanvas> | null>(null);
const sceneReady = ref(false);
const currentCamera = ref<any>(null);
const currentControls = ref<any>(null);

function onSceneReady() {
  const s = getScene();
  currentCamera.value = s.camera;
  currentControls.value = s.controls;
  sceneReady.value = true;
}

function onEnterFloor(id: string) {
  ui.enterScope(id);
}

function onSaveView(name: string) {
  saveCurrentView(name);
}
function onLoadView(view: SavedView) {
  loadSavedView(view);
}
function onSelectVNode(id: string) {
  focusVirtualNode(id);
}

const blastDeviceName = computed(() => {
  const dev = editor.devices.get(ui.blastSourceId ?? "");
  return dev?.hostname ?? ui.blastSourceId;
});

const hasLeftPanel = computed(
  () =>
    ui.showAlertPanel ||
    ui.showCustomTypes ||
    ui.showBackgroundPanel ||
    ui.showRackServerList ||
    ui.showSpaceTree ||
    ui.showUnmapped,
);

const hasRightPanel = computed(
  () =>
    !!ui.selectedDeviceId ||
    !!ui.selectedLinkId ||
    !!ui.selectedSpaceId ||
    ui.showSavedViews ||
    ui.showChangeLog ||
    ui.showVirtualNodes,
);

// ── Resizable docks ─────────────────────────────────────────────────────────
// Left-dock children (AlertPanel, CustomTypePanel, ...) each hard-code their
// own width; the dock's bound width + the global ":deep"-free override below
// (`.left-dock > *`) makes whichever one is currently mounted stretch to fill
// it instead, so one resize handle works no matter which panel is showing.
const DOCK_LIMITS = {
  left: { min: 220, max: 560, default: 280 },
  right: { min: 260, max: 560, default: 290 },
} as const;

function loadDockWidth(side: "left" | "right"): number {
  const { min, max, default: def } = DOCK_LIMITS[side];
  const v = parseFloat(
    localStorage.getItem(`topospace.dockWidth.${side}`) ?? "",
  );
  return Number.isFinite(v) && v >= min && v <= max ? v : def;
}

const leftDockWidth = ref(loadDockWidth("left"));
const rightDockWidth = ref(loadDockWidth("right"));
const resizingSide = ref<"left" | "right" | null>(null);

function startDockResize(side: "left" | "right", e: PointerEvent) {
  e.preventDefault();
  resizingSide.value = side;
  const startX = e.clientX;
  const startWidth = side === "left" ? leftDockWidth.value : rightDockWidth.value;
  const { min, max } = DOCK_LIMITS[side];

  function onMove(ev: PointerEvent) {
    const delta = side === "left" ? ev.clientX - startX : startX - ev.clientX;
    const next = Math.min(max, Math.max(min, Math.round(startWidth + delta)));
    if (side === "left") leftDockWidth.value = next;
    else rightDockWidth.value = next;
  }
  function onUp() {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    resizingSide.value = null;
    localStorage.setItem(
      `topospace.dockWidth.${side}`,
      String(side === "left" ? leftDockWidth.value : rightDockWidth.value),
    );
  }
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp, { once: true });
}

watch(
  () => ui.fontScale,
  (v) => {
    document.documentElement.style.setProperty("--ui-fs", String(v));
  },
  { immediate: true },
);
</script>

<style>
.app,
.app * {
  box-sizing: border-box;
}
.app ::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
.app ::-webkit-scrollbar-track {
  background: transparent;
}
.app ::-webkit-scrollbar-thumb {
  background: #1a2a4a;
  border-radius: 2px;
}
.app ::-webkit-scrollbar-thumb:hover {
  background: #243656;
}
.app select option {
  background: #0f172a;
  color: #e2e8f0;
}

/* User-adjustable UI text scale (canvas and pointer-anchored overlays excluded). */
.menubar,
.toolbar,
.menu-dropdown,
.left-dock,
.right-dock,
.tl-panel,
.help-modal,
.imp-modal {
  zoom: var(--ui-fs, 1.1);
}
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: #080c18;
  color: #e2e8f0;
  font-family: -apple-system, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.workspace {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.canvas-wrap {
  flex: 1;
  position: relative;
  min-width: 0;
  container-type: size;
}

.left-dock {
  position: relative;
  flex: 0 0 auto;
  flex-shrink: 0;
  display: flex;
  border-right: 1px solid #1a2a4a;
  background: rgba(8, 12, 24, 0.96);
}
/* Reserve space for details so they never cover navigation or selected devices. */
.right-dock {
  position: relative;
  flex: 0 0 auto;
  flex-shrink: 0;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  border-left: 1px solid #1a2a4a;
  background: rgba(8, 12, 24, 0.96);
  z-index: 80;
}
.right-dock::-webkit-scrollbar {
  width: 3px;
}

/* Each left-dock panel (AlertPanel, CustomTypePanel, ...) hard-codes its own
   width so it also works stand-alone; here the dock itself is the resizable
   unit, so stretch whichever one is mounted to fill it. Vue tags a child
   component's root node with the parent's scope id too, so this reaches it
   without :deep() — !important guards against that specificity tie. */
.left-dock > :first-child {
  width: 100% !important;
  flex: 1 1 auto;
  min-width: 0;
}

.dock-resizer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  cursor: col-resize;
  z-index: 60;
  touch-action: none;
}
.dock-resizer::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 2px;
  width: 2px;
  background: transparent;
  transition: background-color 0.15s;
}
.dock-resizer:hover::after,
.dock-resizer--active::after {
  background: #3b82f6;
}
.dock-resizer--left {
  right: -3px;
}
.dock-resizer--right {
  left: -3px;
}

/* Below tablet width the docks can no longer share the row with a usable 3D
   viewport (the canvas was being squeezed to a sliver) — float them over the
   canvas instead so it always keeps the full width underneath. */
@media (max-width: 900px) {
  .left-dock,
  .right-dock {
    position: absolute;
    top: 0;
    bottom: 0;
    max-width: 85vw;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.5);
  }
  .left-dock {
    left: 0;
    z-index: 220;
  }
  .right-dock {
    right: 0;
    z-index: 220;
  }
  .dock-resizer {
    display: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.blast-banner {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid #7f1d1d;
  color: #fca5a5;
  padding: 5px 16px;
  border-radius: 20px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 400;
}
.blast-id {
  color: #f87171;
  font-family: monospace;
}
.blast-close {
  background: none;
  border: none;
  color: #f87171;
  cursor: pointer;
}

.blast-legend {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 4px;
  border-left: 1px solid #7f1d1d;
}
.blast-legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #cbd5e1;
}
.blast-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.blast-dot--hop1 {
  background: #ff6b00;
}
.blast-dot--hop2 {
  background: #ffdd00;
}
</style>
