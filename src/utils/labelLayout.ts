export interface LabelRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface LabelCandidate extends LabelRect {
  id: string;
  priority: number;
}

export interface MeasuredLabel {
  text: string | null;
  width: number;
  height: number;
}

// A hidden/not-yet-laid-out CSS2DObject element still reports its real
// offsetWidth/offsetHeight (unlike display:none), but a brand-new one hasn't
// been laid out by the browser yet — the length-based estimate covers that
// first frame so a label isn't treated as zero-size before it can collide
// with anything. Cached per-element so repeat calls (every frame, for every
// on-screen label) don't force a synchronous layout read each time.
export function measureLabel(
  element: HTMLElement,
  cache: WeakMap<HTMLElement, MeasuredLabel>,
): MeasuredLabel {
  const cached = cache.get(element);
  if (cached && cached.text === element.textContent) return cached;
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  const measured: MeasuredLabel = {
    text: element.textContent,
    width: width || (element.textContent?.length ?? 0) * 6.5 + 16,
    height: height || 20,
  };
  if (width && height) cache.set(element, measured);
  return measured;
}

/** Deterministic screen-space culling. A grid keeps dense scenes near O(n). */
export function layoutLabels(
  candidates: LabelCandidate[],
  width: number,
  height: number,
  obstacles: LabelRect[] = [],
): Set<string> {
  const accepted = new Set<string>();
  const cells = new Map<string, LabelRect[]>();
  const cellSize = 80;
  const padding = 4;
  const keys = (r: LabelRect) => {
    const result: string[] = [];
    for (
      let x = Math.floor(r.x / cellSize);
      x <= Math.floor((r.x + r.width) / cellSize);
      x++
    ) {
      for (
        let y = Math.floor(r.y / cellSize);
        y <= Math.floor((r.y + r.height) / cellSize);
        y++
      )
        result.push(`${x}:${y}`);
    }
    return result;
  };
  const insert = (r: LabelRect) => {
    for (const key of keys(r)) {
      const bucket = cells.get(key) ?? [];
      bucket.push(r);
      cells.set(key, bucket);
    }
  };
  // Off-screen obstacles cannot affect a label and must not fill the grid.
  for (const r of obstacles) {
    const left = Math.max(0, r.x),
      top = Math.max(0, r.y);
    const right = Math.min(width, r.x + r.width),
      bottom = Math.min(height, r.y + r.height);
    if (right > left && bottom > top)
      insert({ x: left, y: top, width: right - left, height: bottom - top });
  }
  const sorted = [...candidates].sort(
    (a, b) => b.priority - a.priority || a.id.localeCompare(b.id),
  );
  for (const label of sorted) {
    const rect = {
      x: label.x - padding,
      y: label.y - padding,
      width: label.width + padding * 2,
      height: label.height + padding * 2,
    };
    if (
      rect.x < 0 ||
      rect.y < 0 ||
      rect.x + rect.width > width ||
      rect.y + rect.height > height
    )
      continue;
    const overlap = keys(rect).some((key) =>
      (cells.get(key) ?? []).some(
        (other) =>
          rect.x < other.x + other.width &&
          rect.x + rect.width > other.x &&
          rect.y < other.y + other.height &&
          rect.y + rect.height > other.y,
      ),
    );
    if (overlap) continue;
    accepted.add(label.id);
    insert(rect);
  }
  return accepted;
}
