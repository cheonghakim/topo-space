import type {
  ConnectionStatus, EditorMode, EditorOptions, EditorSnapshot, FilterState,
  NetworkInterface, NetworkLink, OperatorState, RawDevice, Space, Toast, VirtualNode,
} from './types'

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

  // ── Backend push ──────────────────────────────────────────────────────────
  // Feed data from your own SNMP/syslog/NetFlow/whatever backend in. These
  // never go through the UI permission guard — they're system-sourced facts,
  // not user edits — and fire onChange with `source: 'api'` so you can tell
  // backend-driven changes apart from user-driven ones.
  upsertLinks: (links: NetworkLink[]) => void
  removeLinks: (ids: string[]) => void
  upsertSpaces: (spaces: Space[]) => void
  /** Soft delete — archives the space rather than removing it outright. */
  removeSpaces: (ids: string[]) => void
  upsertInterfaces: (interfaces: NetworkInterface[]) => void
  upsertVirtualNodes: (nodes: VirtualNode[]) => void
  removeVirtualNodes: (ids: string[]) => void
  /** Partial merge into a device's ack/maintenance/suppression state. */
  setOperatorState: (deviceId: string, patch: Partial<OperatorState>) => void
  /** Report your backend transport's health (drives the connection indicator). */
  setConnectionStatus: (status: ConnectionStatus, detail?: { message?: string }) => void
  /** Surface a toast to the user, e.g. for a backend-detected alarm. */
  notify: (message: string, type?: Toast['type']) => void
}

export function createNmsEditor(options: EditorOptions): NmsEditor
