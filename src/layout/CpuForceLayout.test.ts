import { describe, expect, it } from 'vitest'
import { CpuForceLayout } from './CpuForceLayout'
import type { LayoutEdge, LayoutNode } from './types'

function dist(a: { x: number; z: number }, b: { x: number; z: number }) {
  return Math.hypot(a.x - b.x, a.z - b.z)
}

describe('CpuForceLayout', () => {
  it('pulls edge-connected nodes closer together', async () => {
    const nodes: LayoutNode[] = [
      { id: 'a', x: -40, z: 0, pinned: false },
      { id: 'b', x: 40, z: 0, pinned: false },
    ]
    const edges: LayoutEdge[] = [{ sourceId: 'a', targetId: 'b', weight: 1 }]
    const before = dist(nodes[0], nodes[1])

    const { promise } = new CpuForceLayout().run(nodes, edges, { iterations: 80 })
    const positions = await promise
    const after = dist(positions.get('a')!, positions.get('b')!)

    expect(after).toBeLessThan(before)
  })

  it('pushes unconnected overlapping nodes apart', async () => {
    const nodes: LayoutNode[] = [
      { id: 'a', x: 0, z: 0, pinned: false },
      { id: 'b', x: 0.01, z: 0, pinned: false },
    ]
    const { promise } = new CpuForceLayout().run(nodes, [], { iterations: 40 })
    const positions = await promise

    expect(dist(positions.get('a')!, positions.get('b')!)).toBeGreaterThan(0.5)
  })

  it('never moves a pinned node', async () => {
    const nodes: LayoutNode[] = [
      { id: 'fixed', x: 5, z: -5, pinned: true },
      { id: 'free', x: 5.5, z: -5, pinned: false },
    ]
    const edges: LayoutEdge[] = [{ sourceId: 'fixed', targetId: 'free', weight: 1 }]
    const { promise } = new CpuForceLayout().run(nodes, edges, { iterations: 60 })
    const positions = await promise

    expect(positions.get('fixed')).toEqual({ x: 5, z: -5 })
  })

  it('groups same-cluster nodes closer than an unrelated node', async () => {
    const nodes: LayoutNode[] = [
      { id: 'rack1-a', x: -20, z: 0, pinned: false, clusterId: 'rack1' },
      { id: 'rack1-b', x: 20, z: 0, pinned: false, clusterId: 'rack1' },
      { id: 'other', x: 0, z: 30, pinned: false, clusterId: 'rack2' },
    ]
    const { promise } = new CpuForceLayout().run(nodes, [], { iterations: 150 })
    const positions = await promise

    const withinCluster = dist(positions.get('rack1-a')!, positions.get('rack1-b')!)
    const acrossCluster = dist(positions.get('rack1-a')!, positions.get('other')!)
    expect(withinCluster).toBeLessThan(acrossCluster)
  })

  it('cancel resolves early with a partial layout', async () => {
    const nodes: LayoutNode[] = Array.from({ length: 20 }, (_, i) => ({
      id: `n${i}`, x: Math.cos(i) * 10, z: Math.sin(i) * 10, pinned: false,
    }))
    const run = new CpuForceLayout().run(nodes, [], { iterations: 100_000 })
    run.cancel()
    const positions = await run.promise
    expect(positions.size).toBe(20)
  })

  it('resolves immediately for an empty graph', async () => {
    const { promise } = new CpuForceLayout().run([], [], { iterations: 50 })
    const positions = await promise
    expect(positions.size).toBe(0)
  })
})
