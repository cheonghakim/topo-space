import { describe, expect, it } from 'vitest'
import { layoutLabels, type LabelCandidate } from './labelLayout'

describe('screen-space label layout', () => {
  const label = (id: string, x: number, priority = 20): LabelCandidate => ({ id, x, y: 20, width: 80, height: 20, priority })
  it('gives selected labels priority and removes overlapping names', () => {
    expect([...layoutLabels([label('rack-a', 10), label('selected', 50, 100), label('rack-b', 160)], 400, 100)])
      .toEqual(['selected', 'rack-b'])
  })
  it('reserves alarm and search badges and rejects partially clipped names', () => {
    const result = layoutLabels([label('alarm-overlap', 20), label('clipped', 260), label('clear', 150)], 300, 100,
      [{ x: 40, y: 10, width: 30, height: 30 }])
    expect([...result]).toEqual(['clear'])
  })
  it('reveals separated names after zoom and is independent of insertion order', () => {
    const dense = [label('a', 10), label('b', 50)]
    expect(layoutLabels(dense, 400, 100).size).toBe(1)
    expect([...layoutLabels([...dense].reverse(), 400, 100)]).toEqual([...layoutLabels(dense, 400, 100)])
    expect(layoutLabels([label('a', 10), label('b', 110)], 400, 100).size).toBe(2)
  })
})
