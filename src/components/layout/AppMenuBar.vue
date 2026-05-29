<template>
  <div class="menubar" @keydown.escape="close">
    <span class="brand">topospace</span>

    <div
      v-for="m in menus"
      :key="m.label"
      class="menu-root"
      :class="{ open: openMenu === m.label }"
      @mouseenter="onMenuEnter(m.label)"
      @click="onMenuClick(m.label)"
    >
      <span class="menu-label">{{ m.label }}</span>
      <Transition name="menu-fade">
        <div v-if="openMenu === m.label" class="menu-dropdown" @click.stop>
          <template v-for="(it, i) in m.items" :key="i">
            <div v-if="it.separator" class="menu-sep" />
            <div v-else-if="it.header" class="menu-header">{{ it.label }}</div>
            <button
              v-else
              class="menu-item"
              :class="{ checked: it.checked?.(), disabled: it.disabled?.() }"
              :disabled="it.disabled?.()"
              @click.stop="invoke(it)"
            >
              <span class="check-cell">{{ it.checked?.() ? '✓' : '' }}</span>
              <span class="item-label">{{ it.label }}</span>
              <span class="shortcut">{{ it.shortcut ?? '' }}</span>
            </button>
          </template>
        </div>
      </Transition>
    </div>

    <div class="spacer" />
    <span v-if="liveStatus" class="status-pill on">Live</span>
    <span v-else class="status-pill off">Offline</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useUIStore }     from '@/stores/ui'
import { useEditorStore } from '@/stores/editor'
import { useWebSocketSim } from '@/composables/useWebSocketSim'
import type { EdgeType }  from '@/types'

const ui     = useUIStore()
const editor = useEditorStore()
const ws     = useWebSocketSim()

interface Item {
  label?:    string
  checked?:  () => boolean
  disabled?: () => boolean
  action?:   () => void
  shortcut?: string
  separator?: boolean
  header?:    boolean
}
interface Menu { label: string; items: Item[] }

const openMenu = ref<string | null>(null)
const liveStatus = computed(() => ui.wsConnected)

const PANELS: { label: string; key: keyof typeof ui }[] = [
  { label: 'Devices',      key: 'showUnmapped' },
  { label: 'Spaces',       key: 'showSpaceTree' },
  { label: 'Saved Views',  key: 'showSavedViews' },
  { label: 'Change Log',   key: 'showChangeLog' },
  { label: 'Virtual Nodes',key: 'showVirtualNodes' },
  { label: 'Minimap',      key: 'showMinimap' },
  { label: 'Timeline',     key: 'showTimeline' },
]

const LAYERS: { type: EdgeType; label: string }[] = [
  { type: 'physical',           label: 'Physical' },
  { type: 'logical',            label: 'Logical' },
  { type: 'service_dependency', label: 'Service Dependency' },
  { type: 'traffic_flow',       label: 'Traffic Flow' },
  { type: 'security_path',      label: 'Security Path' },
  { type: 'manual',             label: 'Manual' },
]

function toggleLayer(t: EdgeType) { ui.toggleLinkType(t) }

function toggleWs() {
  if (ws.connected.value) { ws.disconnect(); ui.wsConnected = false }
  else { ws.connect(); ui.wsConnected = true }
}

let simTimer: ReturnType<typeof setInterval> | null = null
const simActive = ref(false)
function toggleSim() {
  if (simActive.value) {
    if (simTimer) clearInterval(simTimer)
    simTimer = null; simActive.value = false; return
  }
  simActive.value = true
  const POOL: any[] = ['normal','normal','normal','warning','critical','offline','maintenance']
  simTimer = setInterval(() => {
    const ids = [...editor.devices.keys()]
    for (let i = 0; i < 3; i++) {
      const id = ids[Math.floor(Math.random() * ids.length)]
      editor.updateDeviceStatus(id, POOL[Math.floor(Math.random() * POOL.length)])
    }
  }, 1400)
}

const menus = computed<Menu[]>(() => [
  {
    label: 'File',
    items: [
      { label: 'Import devices…', action: () => { ui.showImport = true } },
      { separator: true },
      { label: 'Live updates', checked: () => ui.wsConnected, action: toggleWs },
      { label: 'Random simulator', checked: () => simActive.value, action: toggleSim },
    ],
  },
  {
    label: 'View',
    items: [
      { header: true, label: 'Panels' },
      ...PANELS.map(p => ({
        label:   p.label,
        checked: () => Boolean((ui as any)[p.key]),
        action:  () => { (ui as any)[p.key] = !(ui as any)[p.key] },
      })),
      { separator: true },
      { header: true, label: 'Link layers' },
      ...LAYERS.map(l => ({
        label:   l.label,
        checked: () => ui.visibleLinkTypes.has(l.type),
        action:  () => toggleLayer(l.type),
      })),
      { separator: true },
      { label: 'Particles', checked: () => ui.showParticles, action: () => { ui.showParticles = !ui.showParticles } },
      { label: 'Impact radius', checked: () => ui.showBlastRadius, action: () => { ui.showBlastRadius = !ui.showBlastRadius } },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'Connect (link tool)', shortcut: 'L', checked: () => ui.linkToolActive, action: () => ui.toggleLinkTool() },
      { separator: true },
      { label: 'Mode: View', checked: () => ui.mode === 'view', action: () => ui.setMode('view') },
      { label: 'Mode: Edit', checked: () => ui.mode === 'edit', action: () => ui.setMode('edit') },
    ],
  },
  {
    label: 'Preferences',
    items: [
      { label: 'Text size −', action: () => ui.setFontScale(ui.fontScale - 0.05) },
      { label: 'Text size +', action: () => ui.setFontScale(ui.fontScale + 0.05) },
      { label: 'Reset text size', action: () => ui.setFontScale(1.1) },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'Show help', shortcut: '?', action: () => { ui.showHelp = true } },
    ],
  },
])

function onMenuClick(label: string) {
  openMenu.value = openMenu.value === label ? null : label
}
function onMenuEnter(label: string) {
  if (openMenu.value !== null) openMenu.value = label
}
function invoke(it: Item) {
  if (it.disabled?.()) return
  it.action?.()
  // 체크 토글류는 메뉴 유지가 편하지만, VS Code식으로 닫는 게 깔끔
  close()
}
function close() { openMenu.value = null }

function onDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.menu-root')) close()
}

onMounted(() => document.addEventListener('mousedown', onDocClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocClick))
</script>

<style scoped>
.menubar {
  display: flex; align-items: center; gap: 2px;
  height: 26px; background: #1e1e1e; border-bottom: 1px solid #1a2a4a;
  padding: 0 8px; flex-shrink: 0; z-index: 1000;
  font-size: 11px; user-select: none;
}
.brand {
  color: #60a5fa; font-weight: 700; font-size: 12px;
  margin-right: 12px; padding: 0 6px;
}
.menu-root {
  position: relative; padding: 0 8px; height: 100%;
  display: flex; align-items: center; cursor: pointer;
  color: #cbd5e1;
}
.menu-root:hover, .menu-root.open { background: rgba(255,255,255,0.08); }
.menu-label { font-size: 11px; }

.menu-dropdown {
  position: absolute; top: 100%; left: 0;
  min-width: 210px; background: #1f1f1f;
  border: 1px solid #333; border-radius: 4px;
  padding: 3px 0;
  box-shadow: 0 6px 20px rgba(0,0,0,.5);
  z-index: 1100;
}
.menu-item {
  display: grid; grid-template-columns: 16px 1fr auto;
  align-items: center; gap: 6px;
  width: 100%; background: none; border: none; color: #cbd5e1;
  padding: 4px 11px; font-size: 11px; cursor: pointer; text-align: left;
}
.menu-item:hover { background: #094771; color: #fff; }
.menu-item.disabled { color: #555; cursor: default; }
.menu-item.disabled:hover { background: transparent; }
.check-cell { font-size: 10px; color: #4ade80; text-align: center; }
.item-label { white-space: nowrap; }
.shortcut { color: #888; font-size: 9px; font-family: monospace; }

.menu-sep { height: 1px; background: #333; margin: 3px 0; }
.menu-header {
  color: #6b7280; font-size: 9px; text-transform: uppercase;
  letter-spacing: 0.06em; padding: 3px 11px 2px;
}

.spacer { flex: 1; }
.status-pill {
  font-size: 10px; padding: 2px 8px; border-radius: 9px;
  border: 1px solid; font-weight: 600;
}
.status-pill.on  { color: #4ade80; border-color: #166534; background: rgba(34,197,94,.1); }
.status-pill.off { color: #6b7280; border-color: #374151; }

.menu-fade-enter-active, .menu-fade-leave-active { transition: opacity .08s; }
.menu-fade-enter-from, .menu-fade-leave-to { opacity: 0; }
</style>
