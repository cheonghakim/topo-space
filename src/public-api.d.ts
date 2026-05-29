import type { EditorMode, EditorOptions, EditorSnapshot, FilterState, RawDevice } from './types'

export * from './types'

export interface NmsEditor {
  destroy: () => void
  upsertDevices: (devices: RawDevice[]) => void
  removeDevices: (ids: string[]) => void
  selectDevice: (id: string | null) => void
  applyFilter: (filter: Partial<FilterState>) => void
  setMode: (mode: EditorMode) => void
  save: () => Promise<void>
  exportSnapshot: () => EditorSnapshot
  importSnapshot: (snapshot: EditorSnapshot) => void
  getDevice: (id: string) => Readonly<RawDevice> | undefined
}

export function createNmsEditor(options: EditorOptions): NmsEditor
