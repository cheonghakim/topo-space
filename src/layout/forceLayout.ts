import type { LayoutEdge, LayoutParams } from "./types";

export interface ForceBody {
  id: string;
  x: number;
  z: number;
  vx: number;
  vz: number;
  pinned: boolean;
  clusterId?: string;
}

export type ResolvedLayoutParams = Required<LayoutParams>;

export const DEFAULT_LAYOUT_PARAMS: ResolvedLayoutParams = {
  iterations: 200,
  idealDistance: 3,
  clusterStrength: 2.5,
  bounds: 60,
};

// One Fruchterman-Reingold-style simulation step, in place on `bodies`.
// - Repulsion is pairwise over every unordered pair of bodies: O(n^2) per
//   step (each pair visited once — the force on a from b is the negation of
//   the force on b from a, so it's computed once and applied to both). That's
//   fine up to roughly a couple thousand nodes; beyond that a GPU compute
//   backend (not yet implemented — see the SDK's scale plan) is the path to
//   real-time layout at 10k+. Pinned nodes still repel others (and are still
//   visited as either side of a pair), they just never move themselves.
// - Attraction runs once per edge, pulled toward `idealDistance / weight`.
// - Same-cluster nodes (shared rack/space) get an extra attractive term so
//   auto-layout doesn't scatter a rack's devices across the whole graph.
// - A mild centering force keeps disconnected components from drifting to
//   infinity instead of settling near the origin.
export function stepForceLayout(
  bodies: ForceBody[],
  byId: Map<string, ForceBody>,
  edges: LayoutEdge[],
  params: ResolvedLayoutParams,
) {
  const { idealDistance: k, clusterStrength, bounds } = params;
  const n = bodies.length;
  const kSq = k * k;
  const fx = new Array<number>(n).fill(0);
  const fz = new Array<number>(n).fill(0);

  for (let i = 0; i < n; i++) {
    const a = bodies[i];
    for (let j = i + 1; j < n; j++) {
      const b = bodies[j];
      let dx = a.x - b.x;
      let dz = a.z - b.z;
      let distSq = dx * dx + dz * dz;
      if (distSq < 1e-4) {
        dx = (Math.random() - 0.5) * 0.1;
        dz = (Math.random() - 0.5) * 0.1;
        distSq = dx * dx + dz * dz;
      }
      const dist = Math.sqrt(distSq);
      const repulsion = kSq / dist;
      let px = (dx / dist) * repulsion;
      let pz = (dz / dist) * repulsion;
      if (a.clusterId && a.clusterId === b.clusterId) {
        const pull = clusterStrength * (dist / k);
        px -= (dx / dist) * pull;
        pz -= (dz / dist) * pull;
      }
      // Force on a from b is (px, pz); force on b from a is its negation.
      fx[i] += px;
      fz[i] += pz;
      fx[j] -= px;
      fz[j] -= pz;
    }
  }

  for (let i = 0; i < n; i++) {
    const a = bodies[i];
    if (a.pinned) continue;
    a.vx = (a.vx + fx[i] - a.x / bounds) * 0.15;
    a.vz = (a.vz + fz[i] - a.z / bounds) * 0.15;
  }

  for (const edge of edges) {
    const a = byId.get(edge.sourceId);
    const b = byId.get(edge.targetId);
    if (!a || !b) continue;
    let dx = b.x - a.x;
    let dz = b.z - a.z;
    let dist = Math.hypot(dx, dz);
    if (dist < 1e-4) {
      dx = 0.1;
      dz = 0;
      dist = 0.1;
    }
    const rest = k / Math.max(edge.weight, 0.1);
    const pull = (dist - rest) * 0.05;
    const fx = (dx / dist) * pull;
    const fz = (dz / dist) * pull;
    if (!a.pinned) {
      a.vx += fx;
      a.vz += fz;
    }
    if (!b.pinned) {
      b.vx -= fx;
      b.vz -= fz;
    }
  }

  for (const body of bodies) {
    if (body.pinned) continue;
    // Cap per-step displacement so a stiff spring/repulsion spike can't
    // fling a node arbitrarily far in one iteration.
    const speed = Math.hypot(body.vx, body.vz);
    const maxStep = k * 0.5;
    if (speed > maxStep) {
      body.vx = (body.vx / speed) * maxStep;
      body.vz = (body.vz / speed) * maxStep;
    }
    body.x += body.vx;
    body.z += body.vz;
    body.vx *= 0.9;
    body.vz *= 0.9;
  }
}
