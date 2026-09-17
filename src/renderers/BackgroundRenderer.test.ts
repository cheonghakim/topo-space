import { beforeEach, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import * as THREE from 'three'
import { BackgroundRenderer } from './BackgroundRenderer'
import { loadAsset } from '@/utils/backgroundStorage'
import { loadGltfObject } from '@/utils/modelLoader'
import type { BackgroundObject } from '@/types'

vi.mock('@/utils/backgroundStorage', () => ({ loadAsset: vi.fn() }))
vi.mock('@/utils/modelLoader', () => ({ loadGltfObject: vi.fn() }))
beforeEach(() => vi.resetAllMocks())

const background: BackgroundObject = { id: 'bg', name: 'Floor plan', kind: 'model', assetId: 'asset', spaceId: 'site', position: { x: 0, y: 0, z: 0 } }

it('does not resurrect a background removed while its asset is loading', async () => {
  let resolve!: (data: ArrayBuffer) => void
  vi.mocked(loadAsset).mockReturnValue(new Promise(done => { resolve = done }))
  const scene = new THREE.Scene()
  const renderer = new BackgroundRenderer(scene)
  const loading = renderer.addObject(background)
  renderer.removeObject('bg')
  resolve(new ArrayBuffer(1))
  await loading
  expect(loadGltfObject).not.toHaveBeenCalled()
  expect(scene.children).toHaveLength(0)
})

it('disposes a model that finishes decoding after the renderer was destroyed', async () => {
  vi.mocked(loadAsset).mockResolvedValue(new ArrayBuffer(1))
  let resolve!: (object: THREE.Object3D) => void
  vi.mocked(loadGltfObject).mockReturnValue(new Promise(done => { resolve = done }))
  const scene = new THREE.Scene()
  const renderer = new BackgroundRenderer(scene)
  const loading = renderer.addObject(background)
  await flushPromises()
  renderer.dispose()
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())
  const disposed = vi.spyOn(mesh.geometry, 'dispose')
  resolve(mesh)
  await loading
  expect(scene.children).toHaveLength(0)
  expect(disposed).toHaveBeenCalledOnce()
})
