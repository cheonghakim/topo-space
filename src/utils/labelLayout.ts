export interface LabelRect { x: number; y: number; width: number; height: number }
export interface LabelCandidate extends LabelRect { id: string; priority: number }

/** Deterministic screen-space culling. A grid keeps dense scenes near O(n). */
export function layoutLabels(
  candidates: LabelCandidate[], width: number, height: number, obstacles: LabelRect[] = [],
): Set<string> {
  const accepted = new Set<string>()
  const cells = new Map<string, LabelRect[]>()
  const cellSize = 80
  const padding = 4
  const keys = (r: LabelRect) => {
    const result: string[] = []
    for (let x = Math.floor(r.x / cellSize); x <= Math.floor((r.x + r.width) / cellSize); x++) {
      for (let y = Math.floor(r.y / cellSize); y <= Math.floor((r.y + r.height) / cellSize); y++) result.push(`${x}:${y}`)
    }
    return result
  }
  const insert = (r: LabelRect) => {
    for (const key of keys(r)) {
      const bucket = cells.get(key) ?? []
      bucket.push(r)
      cells.set(key, bucket)
    }
  }
  // Off-screen obstacles cannot affect a label and must not fill the grid.
  for (const r of obstacles) {
    const left = Math.max(0, r.x), top = Math.max(0, r.y)
    const right = Math.min(width, r.x + r.width), bottom = Math.min(height, r.y + r.height)
    if (right > left && bottom > top) insert({ x: left, y: top, width: right - left, height: bottom - top })
  }
  const sorted = [...candidates].sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id))
  for (const label of sorted) {
    const rect = { x: label.x - padding, y: label.y - padding, width: label.width + padding * 2, height: label.height + padding * 2 }
    if (rect.x < 0 || rect.y < 0 || rect.x + rect.width > width || rect.y + rect.height > height) continue
    const overlap = keys(rect).some(key => (cells.get(key) ?? []).some(other =>
      rect.x < other.x + other.width && rect.x + rect.width > other.x &&
      rect.y < other.y + other.height && rect.y + rect.height > other.y))
    if (overlap) continue
    accepted.add(label.id)
    insert(rect)
  }
  return accepted
}
