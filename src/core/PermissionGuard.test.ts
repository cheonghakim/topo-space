import { describe, expect, it, vi } from 'vitest'
import { PermissionGuard } from './PermissionGuard'

describe('PermissionGuard', () => {
  it('blocks mutating actions in view mode before calling the host resolver', () => {
    const resolver = vi.fn(() => true)
    const guard = new PermissionGuard(
      { topologyEdit: true, layoutEdit: true, spaceEdit: true, annotationEdit: true, import: true },
      resolver,
    )

    guard.setMode('view')

    expect(guard.can('device:map', { id: 'dev-1' })).toBe(false)
    expect(guard.can('topology:createLink', { id: 'link-1' })).toBe(false)
    expect(guard.can('import')).toBe(false)
    expect(resolver).not.toHaveBeenCalled()
  })

  it('delegates allowed edit mode actions to the host resolver', () => {
    const resolver = vi.fn(() => false)
    const guard = new PermissionGuard(
      { topologyEdit: true, layoutEdit: true, spaceEdit: true, annotationEdit: true, import: true },
      resolver,
    )

    guard.setMode('edit')

    expect(guard.can('space:update', { spaceId: 'space-1' })).toBe(false)
    expect(resolver).toHaveBeenCalledWith({
      action: 'space:update',
      target: { spaceId: 'space-1' },
      currentMode: 'edit',
    })
  })
})
