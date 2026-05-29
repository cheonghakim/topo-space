import type { EditorAction, FeatureFlags, PermissionResolver, PermissionContext, EditorMode } from '@/types'
import { DEFAULT_FEATURES } from '@/types'

export class PermissionGuard {
  private features: Required<FeatureFlags>
  private resolver: PermissionResolver
  private mode: EditorMode = 'view'

  constructor(features: FeatureFlags = {}, resolver?: PermissionResolver) {
    this.features = { ...DEFAULT_FEATURES, ...features }
    this.resolver = resolver ?? (() => true)
  }

  setMode(mode: EditorMode) { this.mode = mode }
  setFeatures(features: FeatureFlags) { this.features = { ...DEFAULT_FEATURES, ...features } }

  can(action: EditorAction, target?: PermissionContext['target']): boolean {
    if (action === 'rawDevice:update') return false

    if (action === 'layout:update' && !this.features.layoutEdit) return false
    if (action.startsWith('space:') && !this.features.spaceEdit) return false
    if (action.startsWith('annotation:') && !this.features.annotationEdit) return false
    if (action.startsWith('topology:') && !this.features.topologyEdit) return false
    if (action === 'device:map' && !this.features.layoutEdit) return false

    if (this.mode === 'view') {
      const editActions: EditorAction[] = [
        'layout:update','space:create','space:update','space:delete',
        'device:map','device:unmap','annotation:create','annotation:update','annotation:delete',
        'topology:createLink','topology:updateLink','topology:deleteLink',
        'virtualNode:create',
      ]
      if (editActions.includes(action)) return false
    }

    return this.resolver({ action, target, currentMode: this.mode })
  }
}
