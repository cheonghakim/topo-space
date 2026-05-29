import type { EditorChange, EditorChangeType, EditorSnapshot } from '@/types'

type OnChangeCb = (c: EditorChange) => void
type OnSaveCb   = (s: EditorSnapshot) => void | Promise<void>

export class ChangeManager {
  private changes: EditorChange[] = []
  private undoStack: EditorChange[][] = []
  private redoStack: EditorChange[][] = []
  private _dirty = false
  private onChangeCb?: OnChangeCb
  private onSaveCb?: OnSaveCb
  private snapshotFn?: () => EditorSnapshot

  constructor(opts: { onChange?: OnChangeCb; onSave?: OnSaveCb }) {
    this.onChangeCb = opts.onChange
    this.onSaveCb   = opts.onSave
  }

  setSnapshotFn(fn: () => EditorSnapshot) { this.snapshotFn = fn }

  record(type: EditorChangeType, targetType: EditorChange['targetType'], targetId: string, before?: unknown, after?: unknown) {
    const change: EditorChange = {
      id: Math.random().toString(36).slice(2),
      type, targetType, targetId,
      before, after,
      source: 'user',
      timestamp: new Date().toISOString(),
    }
    this.changes.push(change)
    this.undoStack.push([change])
    if (this.undoStack.length > 50) this.undoStack.shift()
    this.redoStack = []
    this._dirty = true
    this.onChangeCb?.(change)
    return change
  }

  undo(): EditorChange[] | null {
    const batch = this.undoStack.pop()
    if (!batch) return null
    this.redoStack.push(batch)
    return batch
  }

  redo(): EditorChange[] | null {
    const batch = this.redoStack.pop()
    if (!batch) return null
    this.undoStack.push(batch)
    return batch
  }

  canUndo() { return this.undoStack.length > 0 }
  canRedo() { return this.redoStack.length > 0 }
  isDirty() { return this._dirty }
  getChanges() { return [...this.changes] }

  async save() {
    if (!this.snapshotFn || !this.onSaveCb) return
    await this.onSaveCb(this.snapshotFn())
    this._dirty = false
  }

  clearDirty() { this._dirty = false }
}
