import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { createPinia } from 'pinia'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import { useNmsEditor, NMS_EDITOR_OPTIONS_KEY } from './useNmsEditor'
import { useEditorStore } from '@/stores/editor'
import { useUIStore } from '@/stores/ui'
import type { EditorOptions } from '@/types'
import * as geometryFactory from '@/utils/geometryFactory'

// Exercise real store/renderer lifecycle logic without needing WebGL in jsdom.
vi.mock('@/renderers/SceneManager', async () => {
  const THREE = await import('three')
  return { SceneManager: class {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera()
    controls = { target: new THREE.Vector3(), enabled: true }
    init() { this.scene = new THREE.Scene() }
    getSize() { return { width: 1000, height: 700 } }
    onResize() {}
    startLoop() {}
    dispose() {}
  } }
})
vi.mock('@/interaction/CameraController')
vi.mock('@/interaction/ArrowGizmo')
vi.mock('@/interaction/LinkDragManager')
vi.mock('@/renderers/LinkRenderer')
vi.mock('@/renderers/ParticleRenderer')
vi.mock('@/renderers/BlastRadiusRenderer')
vi.mock('@/renderers/VirtualNodeRenderer')
vi.mock('@/renderers/FlashEffectRenderer')
vi.mock('@/renderers/BackgroundRenderer')

let wrapper: VueWrapper | undefined
afterEach(() => { wrapper?.unmount(); wrapper = undefined; vi.restoreAllMocks() })

async function setup(waitForScene = true) {
  const pinia = createPinia()
  let runtime!: ReturnType<typeof useNmsEditor>
  const canvas = document.createElement('canvas')
  const overlay = document.createElement('div')
  const host = document.createElement('div')
  const options: EditorOptions = {
    mockData: false, features: { tour: false },
    data: {
      devices: [{ id: 'edge', externalId: 'edge', source: 'test', hostname: 'before', normalizedType: 'router', status: 'normal' }],
      spaces: [{ id: 'site-a', name: 'Site A', type: 'site', kind: 'physical', source: 'api', position: { x: 0, y: 0, z: 0 }, size: { width: 20, height: 1, depth: 20 } }],
      deviceMappings: [{ id: 'm', rawDeviceId: 'edge', mappingStatus: 'mapped', primarySpaceId: 'site-a', position: { x: 0, y: 1, z: 0 } }],
    },
  }
  wrapper = mount(defineComponent({
    setup() {
      runtime = useNmsEditor()
      onMounted(() => runtime.init(canvas, overlay, host))
      onBeforeUnmount(() => runtime.dispose())
      return () => null
    },
  }), { global: { plugins: [pinia], provide: { [NMS_EDITOR_OPTIONS_KEY as symbol]: options } } })
  if (waitForScene) await flushPromises()
  const labels = () => runtime.getScene().scene.children.filter(object => object instanceof CSS2DObject && object.element.className === 'device-search-label')
  return { runtime, editor: useEditorStore(pinia), ui: useUIStore(pinia), labels, remount: () => { runtime.dispose(); runtime.init(canvas, overlay, host) } }
}

describe('3D scene lifecycle', () => {
  it('does not add geometry after being disposed during model loading', async () => {
    let release!: () => void
    const pending = new Promise<void>(resolve => { release = resolve })
    vi.spyOn(geometryFactory, 'preloadCustomModels').mockReturnValueOnce(pending)
    const { runtime } = await setup(false)
    runtime.dispose()
    release()
    await flushPromises()
    expect(runtime.getScene().scene.children).toHaveLength(0)
  })

  it('keeps only one device batch when rebuild requests overlap', async () => {
    const { runtime } = await setup()
    await Promise.all([runtime.rebuildAll(), runtime.rebuildAll()])
    const batches = runtime.getScene().scene.children.filter(object => object.type === 'Mesh')
    // Space meshes belong to groups; only the device instance batch is a root mesh.
    expect(batches).toHaveLength(1)
  })
  it('preserves live backend state when the 3D view remounts', async () => {
    const { editor, remount } = await setup()
    editor.upsertDevices([{ ...editor.getDevice('edge')!, hostname: 'updated', status: 'critical' }])
    await flushPromises()
    remount()
    await flushPromises()
    expect(editor.getDevice('edge')?.hostname).toBe('updated')
    expect(editor.getDevice('edge')?.status).toBe('critical')
  })

  it('restores active search labels after rebuilding and remounting', async () => {
    const { ui, runtime, remount, labels } = await setup()
    ui.setFilter({ search: 'before' })
    await flushPromises()
    expect(labels()).toHaveLength(1)
    await runtime.rebuildAll()
    expect(labels()).toHaveLength(1)
    remount()
    await flushPromises()
    expect(labels()).toHaveLength(1)
  })
})
