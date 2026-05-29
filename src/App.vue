<template>
  <div class="app">
    <AppMenuBar />
    <TopToolbar />

    <div class="workspace">
      <!-- Left dock: device / space sources -->
      <aside class="left-dock" v-if="hasLeftPanel">
        <RackServerListPanel v-if="ui.showRackServerList" />
        <SpaceTreePanel      v-else-if="ui.showSpaceTree" />
        <UnmappedPanel       v-else-if="ui.showUnmapped" />
      </aside>

      <div class="canvas-wrap" ref="canvasWrap">
        <SceneCanvas
          ref="sceneRef"
          @scene-ready="onSceneReady"
        />

        <MinimapPanel
          v-if="sceneReady && ui.showMinimap"
          :camera="currentCamera"
          :controls="currentControls"
        />
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
        <button class="blast-close" @click="ui.blastSourceId = null; ui.select(null)">Close</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import AppMenuBar          from '@/components/layout/AppMenuBar.vue'
import TopToolbar          from '@/components/layout/TopToolbar.vue'
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
import ContextMenu       from '@/components/ui/ContextMenu.vue'
import ToastPanel        from '@/components/ui/ToastPanel.vue'
import HelpPanel         from '@/components/ui/HelpPanel.vue'
import ImportPanel       from '@/components/ui/ImportPanel.vue'
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

function onSaveView(name: string) { saveCurrentView(name) }
function onLoadView(view: SavedView) { loadSavedView(view) }
function onSelectVNode(id: string) { focusVirtualNode(id) }

const blastDeviceName = computed(() => {
  const dev = editor.devices.get(ui.blastSourceId ?? '')
  return dev?.hostname ?? ui.blastSourceId
})

const hasLeftPanel = computed(() =>
  ui.showRackServerList || ui.showSpaceTree || ui.showUnmapped)

const hasRightPanel = computed(() =>
  !!ui.selectedDeviceId || !!ui.selectedLinkId || !!ui.selectedSpaceId ||
  ui.showSavedViews || ui.showChangeLog || ui.showVirtualNodes)

watch(() => ui.fontScale, (v) => {
  document.documentElement.style.setProperty('--ui-fs', String(v))
}, { immediate: true })
</script>

<style>
.app, .app * { box-sizing: border-box; }
.app ::-webkit-scrollbar { width: 5px; height: 5px; }
.app ::-webkit-scrollbar-track { background: transparent; }
.app ::-webkit-scrollbar-thumb { background: #1e3a5a; border-radius: 3px; }
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
  display: flex; flex-direction: column; height: 100vh;
  background: #080c18; color: #e2e8f0;
  font-family: -apple-system, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
}
.workspace { display: flex; flex: 1; overflow: hidden; position: relative; }
.canvas-wrap { flex: 1; position: relative; min-width: 0; }

.left-dock {
  flex: 0 0 auto;
  display: flex;
  border-right: 1px solid #1a2a4a;
  background: rgba(8, 12, 24, 0.96);
}
/* Right dock floats over the canvas and only takes the height of its content.
   When its panels are short, the canvas behind it stays visible — no awkward
   empty space below. */
.right-dock {
  position: absolute; top: 0; right: 0;
  width: 290px; max-height: 100%;
  display: flex; flex-direction: column;
  overflow-y: auto; overflow-x: hidden;
  border-left: 1px solid #1a2a4a;
  background: rgba(8, 12, 24, 0.96);
  z-index: 80;
}
.right-dock::-webkit-scrollbar { width: 5px; }

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
</style>
