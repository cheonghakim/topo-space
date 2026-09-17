<template>
  <div class="app">
    <AppMenuBar />
    <TopToolbar />

    <div class="workspace">
      <!-- Left dock: device / space sources -->
      <aside class="left-dock" v-if="hasLeftPanel">
        <AlertPanel          v-if="ui.showAlertPanel" />
        <CustomTypePanel     v-else-if="ui.showCustomTypes" />
        <BackgroundPanel     v-else-if="ui.showBackgroundPanel" />
        <RackServerListPanel v-else-if="ui.showRackServerList" />
        <SpaceTreePanel      v-else-if="ui.showSpaceTree" />
        <UnmappedPanel       v-else-if="ui.showUnmapped" />
      </aside>

      <div class="canvas-wrap" ref="canvasWrap">
        <OverviewCanvas
          v-if="ui.viewMode === '2d'"
          @enter-floor="onEnterFloor"
        />
        <SceneCanvas
          v-else
          ref="sceneRef"
          @scene-ready="onSceneReady"
        />

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
      <aside class="right-dock" v-if="hasRightPanel">
        <DeviceDetailPanel  v-if="ui.selectedDeviceId" />
        <LinkPropertyPanel  v-else-if="ui.selectedLinkId" />
        <SpacePropertyPanel v-else-if="ui.selectedSpaceId" />

        <SavedViewPanel
          v-if="ui.showSavedViews"
          @save-view="onSaveView"
          @load-view="onLoadView"
        />
        <ChangeLogPanel   v-if="ui.showChangeLog" />
        <VirtualNodePanel v-if="ui.showVirtualNodes" @select-node="onSelectVNode" />
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

    <Transition name="fade">
      <div v-if="ui.blastSourceId" class="blast-banner">
        Impact radius
        <span class="blast-id">{{ blastDeviceName }}</span>
        <span class="blast-legend">
          <span class="blast-legend-item"><span class="blast-dot blast-dot--hop1" />1 hop</span>
          <span class="blast-legend-item"><span class="blast-dot blast-dot--hop2" />2 hop</span>
        </span>
        <button class="blast-close" @click="ui.blastSourceId = null; ui.select(null)">Close</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import AppMenuBar          from '@/components/layout/AppMenuBar.vue'
import TopToolbar          from '@/components/layout/TopToolbar.vue'
import AlertPanel          from '@/components/layout/AlertPanel.vue'
import CustomTypePanel     from '@/components/layout/CustomTypePanel.vue'
import BackgroundPanel     from '@/components/layout/BackgroundPanel.vue'
import RackServerListPanel from '@/components/layout/RackServerListPanel.vue'
import SpaceTreePanel    from '@/components/layout/SpaceTreePanel.vue'
import UnmappedPanel     from '@/components/layout/UnmappedPanel.vue'
import DeviceDetailPanel from '@/components/layout/DeviceDetailPanel.vue'
import LinkPropertyPanel from '@/components/layout/LinkPropertyPanel.vue'
import SpacePropertyPanel from '@/components/layout/SpacePropertyPanel.vue'
import SavedViewPanel    from '@/components/layout/SavedViewPanel.vue'
import ChangeLogPanel    from '@/components/layout/ChangeLogPanel.vue'
import VirtualNodePanel  from '@/components/layout/VirtualNodePanel.vue'
import TimelinePanel     from '@/components/layout/TimelinePanel.vue'
import MinimapPanel      from '@/components/layout/MinimapPanel.vue'
import SceneCanvas       from '@/components/scene/SceneCanvas.vue'
import OverviewCanvas    from '@/components/scene/OverviewCanvas.vue'
import OffscreenAlertOverlay from '@/components/scene/OffscreenAlertOverlay.vue'
import ContextMenu       from '@/components/ui/ContextMenu.vue'
import ToastPanel        from '@/components/ui/ToastPanel.vue'
import HelpPanel         from '@/components/ui/HelpPanel.vue'
import ImportPanel       from '@/components/ui/ImportPanel.vue'
import ViewSwitcher      from '@/components/ui/ViewSwitcher.vue'
import StatusLegend      from '@/components/ui/StatusLegend.vue'
import { useUIStore }    from '@/stores/ui'
import { useEditorStore } from '@/stores/editor'
import { useNmsEditor } from '@/composables/useNmsEditor'
import type { SavedView } from '@/types'
import type * as THREE from 'three'

const ui     = useUIStore()
const editor = useEditorStore()
const nmsEditor = useNmsEditor()
const { saveCurrentView, loadSavedView, focusVirtualNode, onTimelineScrub, getScene, timeline } = nmsEditor

const sceneRef    = ref<InstanceType<typeof SceneCanvas> | null>(null)
const sceneReady  = ref(false)
const currentCamera   = ref<any>(null)
const currentControls = ref<any>(null)

function onSceneReady() {
  const s = getScene()
  currentCamera.value   = s.camera
  currentControls.value = s.controls
  sceneReady.value = true
}

function onEnterFloor(id: string) { ui.enterScope(id) }

function onSaveView(name: string) { saveCurrentView(name) }
function onLoadView(view: SavedView) { loadSavedView(view) }
function onSelectVNode(id: string) { focusVirtualNode(id) }

const blastDeviceName = computed(() => {
  const dev = editor.devices.get(ui.blastSourceId ?? '')
  return dev?.hostname ?? ui.blastSourceId
})

const hasLeftPanel = computed(() =>
  ui.showAlertPanel || ui.showCustomTypes || ui.showBackgroundPanel || ui.showRackServerList || ui.showSpaceTree || ui.showUnmapped)

const hasRightPanel = computed(() =>
  !!ui.selectedDeviceId || !!ui.selectedLinkId || !!ui.selectedSpaceId ||
  ui.showSavedViews || ui.showChangeLog || ui.showVirtualNodes)

watch(() => ui.fontScale, (v) => {
  document.documentElement.style.setProperty('--ui-fs', String(v))
}, { immediate: true })
</script>

<style>
.app, .app * { box-sizing: border-box; }
.app ::-webkit-scrollbar { width: 3px; height: 3px; }
.app ::-webkit-scrollbar-track { background: transparent; }
.app ::-webkit-scrollbar-thumb { background: #1a2a4a; border-radius: 2px; }
.app ::-webkit-scrollbar-thumb:hover { background: #243656; }
.app select option { background: #0f172a; color: #e2e8f0; }

/* User-adjustable UI text scale (canvas and pointer-anchored overlays excluded). */
.menubar,
.toolbar,
.menu-dropdown,
.left-dock,
.right-dock,
.tl-panel,
.help-modal,
.imp-modal { zoom: var(--ui-fs, 1.1); }
</style>

<style scoped>
.app {
  display: flex; flex-direction: column; width: 100%; height: 100%; min-height: 0; overflow: hidden;
  background: #080c18; color: #e2e8f0;
  font-family: -apple-system, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
}
.workspace { display: flex; flex: 1; overflow: hidden; position: relative; }
.canvas-wrap { flex: 1; position: relative; min-width: 0; container-type: size; }

.left-dock {
  flex: 0 0 auto;
  display: flex;
  border-right: 1px solid #1a2a4a;
  background: rgba(8, 12, 24, 0.96);
}
/* Reserve space for details so they never cover navigation or selected devices. */
.right-dock {
  position: relative;
  flex: 0 0 290px; width: 290px; max-height: 100%;
  display: flex; flex-direction: column;
  overflow-y: auto; overflow-x: hidden;
  border-left: 1px solid #1a2a4a;
  background: rgba(8, 12, 24, 0.96);
  z-index: 80;
}
.right-dock::-webkit-scrollbar { width: 3px; }

.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.blast-banner {
  position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%);
  background: rgba(239,68,68,.15); border: 1px solid #7f1d1d;
  color: #fca5a5; padding: 5px 16px; border-radius: 20px;
  font-size: 11px; display: flex; align-items: center; gap: 8px; z-index: 400;
}
.blast-id    { color: #f87171; font-family: monospace; }
.blast-close { background: none; border: none; color: #f87171; cursor: pointer; }

.blast-legend      { display: flex; align-items: center; gap: 10px; padding-left: 4px; border-left: 1px solid #7f1d1d; }
.blast-legend-item { display: flex; align-items: center; gap: 4px; color: #cbd5e1; }
.blast-dot         { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.blast-dot--hop1   { background: #ff6b00; }
.blast-dot--hop2   { background: #ffdd00; }
</style>
