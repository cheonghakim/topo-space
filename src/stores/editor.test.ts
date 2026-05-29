import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useEditorStore } from './editor'

describe('editor store security boundaries', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('enforces permissionResolver on mutating commands', () => {
    const editor = useEditorStore()
    const denied: string[] = []
    editor.configureSecurity({
      mode: 'edit',
      permissionResolver: () => false,
      onPermissionDenied: (ctx) => denied.push(ctx.action),
    })

    editor.addSpace({
      id: 'space-1',
      name: 'Space',
      kind: 'physical',
      type: 'site',
      source: 'manual',
    })

    expect(editor.spaces.has('space-1')).toBe(false)
    expect(denied).toEqual(['space:create'])
  })

  it('returns RawDevice through a readonly API', () => {
    const editor = useEditorStore()
    editor.replaceData({
      devices: [{
        id: 'dev-1',
        source: 'cmdb',
        externalId: 'dev-1',
        hostname: 'core-1',
      }],
    })

    const device = editor.getDevice('dev-1')

    expect(device?.hostname).toBe('core-1')
    expect(() => {
      ;(device as { hostname: string }).hostname = 'mutated'
    }).toThrow(/read-only/)
    expect(editor.devices.get('dev-1')?.hostname).toBe('core-1')
  })
})
