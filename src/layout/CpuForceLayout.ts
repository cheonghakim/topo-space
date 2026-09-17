import type { LayoutEngine, LayoutNode, LayoutEdge, LayoutParams, LayoutProgress, LayoutPosition, LayoutRun } from './types'
import { stepForceLayout, DEFAULT_LAYOUT_PARAMS, type ForceBody } from './forceLayout'

// Iterations per macrotask slice. Small enough that each slice stays well
// under a frame budget even for a few thousand nodes, so the UI (and the
// rest of the render loop) never visibly stalls — this is what stands in
// for "runs off the main thread" until a real Worker/GPU backend lands.
const CHUNK_SIZE = 4

function scheduleYield(fn: () => void) {
  if (typeof requestAnimationFrame === 'function') requestAnimationFrame(fn)
  else setTimeout(fn, 0)
}

// Main-thread, chunked-execution force-directed layout. This is the
// baseline/fallback engine: correct at any graph size, but its pairwise
// repulsion is O(n^2) per iteration, so it's only practical up to roughly a
// couple thousand nodes in real time. A GPU compute backend (e.g. built on
// oria-webgpu) is the path to real-time layout at 10k+ and can be swapped in
// behind the same `LayoutEngine` interface without touching call sites.
export class CpuForceLayout implements LayoutEngine {
  run(
    nodes: LayoutNode[],
    edges: LayoutEdge[],
    params: LayoutParams,
    onProgress?: (progress: LayoutProgress) => void,
  ): LayoutRun {
    const resolved = { ...DEFAULT_LAYOUT_PARAMS, ...params }
    const bodies: ForceBody[] = nodes.map(n => ({
      id: n.id, x: n.x, z: n.z, vx: 0, vz: 0, pinned: n.pinned, clusterId: n.clusterId,
    }))
    const byId = new Map(bodies.map(b => [b.id, b]))
    let cancelled = false

    const snapshot = (): Map<string, LayoutPosition> =>
      new Map(bodies.map(b => [b.id, { x: b.x, z: b.z }]))

    const promise = new Promise<Map<string, LayoutPosition>>((resolve) => {
      if (!bodies.length || resolved.iterations <= 0) { resolve(snapshot()); return }

      let iteration = 0
      const tick = () => {
        if (cancelled) { resolve(snapshot()); return }
        const end = Math.min(iteration + CHUNK_SIZE, resolved.iterations)
        for (; iteration < end; iteration++) {
          stepForceLayout(bodies, byId, edges, resolved)
        }
        onProgress?.({ iteration, iterations: resolved.iterations, positions: snapshot() })
        if (iteration >= resolved.iterations) { resolve(snapshot()); return }
        scheduleYield(tick)
      }
      scheduleYield(tick)
    })

    return { promise, cancel: () => { cancelled = true } }
  }
}
