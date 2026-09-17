import { describe, expect, it } from 'vitest'
import * as THREE from 'three'
import { LinkRenderer } from './LinkRenderer'
import type { NetworkLink } from '@/types'

function pos(x: number, z: number) { return new THREE.Vector3(x, 0, z) }

function makeLink(id: string, sourceDeviceId: string, targetDeviceId: string, patch: Partial<NetworkLink> = {}): NetworkLink {
  return { id, sourceDeviceId, targetDeviceId, type: 'physical', source: 'manual', ...patch }
}

describe('LinkRenderer', () => {
  it('refreshPositionsFor only touches links attached to the given device', () => {
    const renderer = new LinkRenderer(new THREE.Scene())
    const positions: Record<string, THREE.Vector3> = { a: pos(0, 0), b: pos(10, 0), c: pos(0, 10), d: pos(10, 10) }
    const getPos = (id: string) => positions[id] ?? null

    renderer.addLink(makeLink('l-ab', 'a', 'b'), getPos)
    renderer.addLink(makeLink('l-cd', 'c', 'd'), getPos)

    const pathBefore = renderer.getLinkPath('l-cd')!.map(p => p.clone())

    positions.a = pos(50, 50)
    renderer.refreshPositionsFor(['a'], getPos)

    const pathAfterAB = renderer.getLinkPath('l-ab')!
    expect(pathAfterAB[0].x).toBe(50)
    const pathAfterCD = renderer.getLinkPath('l-cd')!
    expect(pathAfterCD).toEqual(pathBefore)

    renderer.dispose()
  })

  it('spreads parallel links between the same device pair apart by default', () => {
    const renderer = new LinkRenderer(new THREE.Scene())
    const positions: Record<string, THREE.Vector3> = { a: pos(0, 0), b: pos(20, 0) }
    const getPos = (id: string) => positions[id] ?? null

    renderer.addLink(makeLink('l1', 'a', 'b'), getPos)
    renderer.addLink(makeLink('l2', 'a', 'b'), getPos)
    renderer.addLink(makeLink('l3', 'a', 'b'), getPos)

    const mid = (id: string) => renderer.getLinkPath(id)![2] // the shared middle point in buildPath's 5-point path
    const m1 = mid('l1'), m2 = mid('l2'), m3 = mid('l3')

    // At least one pair must differ, or every parallel link would render as
    // one indistinguishable overlapping line.
    const allSame = m1.equals(m2) && m2.equals(m3)
    expect(allSame).toBe(false)

    renderer.dispose()
  })

  it('honors an explicit midX/midZ instead of auto-spreading', () => {
    const renderer = new LinkRenderer(new THREE.Scene())
    const positions: Record<string, THREE.Vector3> = { a: pos(0, 0), b: pos(20, 0) }
    const getPos = (id: string) => positions[id] ?? null

    renderer.addLink(makeLink('manual', 'a', 'b', { midX: 5, midZ: 5 }), getPos)
    const path = renderer.getLinkPath('manual')!
    expect(path[2].x).toBe(5)
    expect(path[2].z).toBe(5)

    renderer.dispose()
  })

  it('updateLink refreshes status color and path in place, without a full remove/add', () => {
    const renderer = new LinkRenderer(new THREE.Scene())
    const positions: Record<string, THREE.Vector3> = { a: pos(0, 0), b: pos(20, 0) }
    const getPos = (id: string) => positions[id] ?? null

    const link = makeLink('l1', 'a', 'b')
    renderer.addLink(link, getPos)
    expect(renderer.getRenderedLinkIds().has('l1')).toBe(true)

    const updated: NetworkLink = { ...link, status: 'down' }
    renderer.updateLink(updated, getPos)

    expect(renderer.getRenderedLinkIds().size).toBe(1)
    expect(renderer.getVisibleLinks()[0].status).toBe('down')

    renderer.dispose()
  })

  it('getRenderedLinkIds reflects add/remove', () => {
    const renderer = new LinkRenderer(new THREE.Scene())
    const positions: Record<string, THREE.Vector3> = { a: pos(0, 0), b: pos(20, 0) }
    const getPos = (id: string) => positions[id] ?? null

    renderer.addLink(makeLink('l1', 'a', 'b'), getPos)
    expect(renderer.getRenderedLinkIds()).toEqual(new Set(['l1']))
    renderer.removeLink('l1')
    expect(renderer.getRenderedLinkIds().size).toBe(0)

    renderer.dispose()
  })
})
