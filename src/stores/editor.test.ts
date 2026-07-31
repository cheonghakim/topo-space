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

  it('acknowledgeDevice records operatorState without touching device.status', () => {
    const editor = useEditorStore()
    editor.setEditorMode('edit')
    editor.replaceData({
      devices: [{ id: 'dev-1', source: 'cmdb', externalId: 'dev-1', hostname: 'core-1', status: 'critical' }],
      deviceMappings: [{ id: 'map-1', rawDeviceId: 'dev-1', mappingStatus: 'mapped' }],
    })

    editor.acknowledgeDevice('dev-1', 'alice')

    expect(editor.devices.get('dev-1')?.status).toBe('critical')
    const mapping = editor.getMappingByDeviceId('dev-1')
    expect(mapping?.operatorState?.acknowledged).toBe(true)
    expect(mapping?.operatorState?.acknowledgedBy).toBe('alice')
    expect(mapping?.operatorState?.acknowledgedAt).toBeTruthy()

    editor.unacknowledgeDevice('dev-1')
    expect(editor.devices.get('dev-1')?.status).toBe('critical')
    expect(editor.getMappingByDeviceId('dev-1')?.operatorState?.acknowledged).toBe(false)
  })

  it('scopedCriticalCount/scopedWarningCount only count the requested floor', () => {
    const editor = useEditorStore()
    editor.replaceData({
      spaces: [
        { id: 'floor-a', name: 'Floor A', kind: 'physical', type: 'floor', source: 'manual' },
        { id: 'floor-b', name: 'Floor B', kind: 'physical', type: 'floor', source: 'manual' },
      ],
      devices: [
        { id: 'dev-a', source: 'cmdb', externalId: 'dev-a', hostname: 'a', status: 'critical' },
        { id: 'dev-b', source: 'cmdb', externalId: 'dev-b', hostname: 'b', status: 'critical' },
      ],
      deviceMappings: [
        { id: 'map-a', rawDeviceId: 'dev-a', primarySpaceId: 'floor-a', mappingStatus: 'mapped' },
        { id: 'map-b', rawDeviceId: 'dev-b', primarySpaceId: 'floor-b', mappingStatus: 'mapped' },
      ],
    })

    expect(editor.scopedCriticalCount('floor-a')).toBe(1)
    expect(editor.criticalCount).toBe(2)
  })

  it('assignDevice records and clears an assignee without a status/permission side effect', () => {
    const editor = useEditorStore()
    editor.setEditorMode('edit')
    editor.replaceData({
      devices: [{ id: 'dev-1', source: 'cmdb', externalId: 'dev-1', hostname: 'core-1', status: 'warning' }],
      deviceMappings: [{ id: 'map-1', rawDeviceId: 'dev-1', mappingStatus: 'mapped' }],
    })

    editor.assignDevice('dev-1', 'bob')
    let mapping = editor.getMappingByDeviceId('dev-1')
    expect(mapping?.operatorState?.assignedTo).toBe('bob')
    expect(mapping?.operatorState?.assignedAt).toBeTruthy()
    expect(editor.devices.get('dev-1')?.status).toBe('warning')

    editor.assignDevice('dev-1', '')
    mapping = editor.getMappingByDeviceId('dev-1')
    expect(mapping?.operatorState?.assignedTo).toBeUndefined()
  })
})
