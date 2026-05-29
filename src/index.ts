import { createApp, type App as VueApp } from 'vue'
import { createPinia, type Pinia } from 'pinia'
import App from './App.vue'
import './style.css'
import { configureNmsEditor, NMS_EDITOR_OPTIONS_KEY } from '@/composables/useNmsEditor'
import { useEditorStore } from '@/stores/editor'
import { useUIStore } from '@/stores/ui'
import type { EditorMode, EditorOptions, FilterState, RawDevice } from '@/types'

export type * from '@/types'

export interface NmsEditor {
  destroy: () => void
  upsertDevices: (devices: RawDevice[]) => void
  removeDevices: (ids: string[]) => void
  selectDevice: (id: string | null) => void
  applyFilter: (filter: Partial<FilterState>) => void
  setMode: (mode: EditorMode) => void
  save: () => Promise<void>
  exportSnapshot: ReturnType<typeof useEditorStore>['exportSnapshot']
  importSnapshot: ReturnType<typeof useEditorStore>['importSnapshot']
  getDevice: ReturnType<typeof useEditorStore>['getDevice']
}

export function createNmsEditor(options: EditorOptions): NmsEditor {
  if (!options.container) {
    throw new Error('createNmsEditor requires a container HTMLElement.')
  }
  const container = options.container

  configureNmsEditor(options)

  const mountTarget = resolveMountTarget(options)
  const app: VueApp = createApp(App)
  const pinia: Pinia = createPinia()
  app.provide(NMS_EDITOR_OPTIONS_KEY, options)
  app.use(pinia)
  app.config.errorHandler = (err) => {
    const error = err instanceof Error ? err : new Error(String(err))
    options.onError?.(error, { phase: 'vue' })
  }
  app.mount(mountTarget)

  const editor = useEditorStore(pinia)
  const ui = useUIStore(pinia)

  return {
    destroy() {
      app.unmount()
      if (options.shadowDom) container.shadowRoot?.replaceChildren()
      configureNmsEditor({})
    },
    upsertDevices(devices) {
      editor.upsertDevices(devices)
    },
    removeDevices(ids) {
      ids.forEach((id) => {
        editor.devices.delete(id)
        editor.unmappedDevices.splice(0, editor.unmappedDevices.length, ...editor.unmappedDevices.filter(d => d.id !== id))
      })
    },
    selectDevice(id) {
      ui.select(id ? { type: 'device', id } : null)
    },
    applyFilter(filter) {
      ui.setFilter(filter)
    },
    setMode(mode) {
      ui.setMode(mode)
    },
    async save() {
      await options.onSave?.(editor.exportSnapshot())
    },
    exportSnapshot: editor.exportSnapshot,
    importSnapshot: editor.importSnapshot,
    getDevice: editor.getDevice,
  }
}

function resolveMountTarget(options: EditorOptions): Element | ShadowRoot {
  const container = options.container!
  if (!options.shadowDom) return container

  const shadow = container.shadowRoot ?? container.attachShadow({ mode: 'open' })
  shadow.replaceChildren()
  if (options.stylesheetUrl) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = options.stylesheetUrl
    if (options.styleNonce) link.nonce = options.styleNonce
    shadow.appendChild(link)
  }

  const mount = document.createElement('div')
  mount.id = 'topospace-shadow-root'
  mount.style.width = '100%'
  mount.style.height = '100%'
  shadow.appendChild(mount)
  return mount
}
