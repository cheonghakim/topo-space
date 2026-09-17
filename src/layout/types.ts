// Force-directed auto-layout — framework/renderer-agnostic graph types.
// A `LayoutEngine` only knows about node ids and XZ positions; mapping those
// back onto `DeviceMapping.position` is the caller's job (see
// useNmsEditor's `autoLayout`).

export interface LayoutNode {
  id: string
  x: number
  z: number
  /** Pinned nodes (already manually placed) exert force but never move. */
  pinned: boolean
  /** Devices sharing a clusterId (e.g. the same rack/space) attract more strongly. */
  clusterId?: string
}

export interface LayoutEdge {
  sourceId: string
  targetId: string
  /** Relative spring strength — higher pulls the pair closer. Defaults to 1. */
  weight: number
}

export interface LayoutParams {
  iterations: number
  /** Target rest length for an edge with weight 1. */
  idealDistance?: number
  /** Multiplier applied to the attraction between same-cluster nodes. */
  clusterStrength?: number
  /** Soft radius pulling the whole graph back toward the origin. */
  bounds?: number
}

export interface LayoutPosition { x: number; z: number }

export interface LayoutProgress {
  iteration: number
  iterations: number
  positions: Map<string, LayoutPosition>
}

export interface LayoutRun {
  promise: Promise<Map<string, LayoutPosition>>
  cancel: () => void
}

export interface LayoutEngine {
  run(
    nodes: LayoutNode[],
    edges: LayoutEdge[],
    params: LayoutParams,
    onProgress?: (progress: LayoutProgress) => void,
  ): LayoutRun
}
