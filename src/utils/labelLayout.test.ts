import { describe, expect, it } from "vitest";
import { layoutLabels, measureLabel, type LabelCandidate } from "./labelLayout";

describe("screen-space label layout", () => {
  const label = (id: string, x: number, priority = 20): LabelCandidate => ({
    id,
    x,
    y: 20,
    width: 80,
    height: 20,
    priority,
  });
  it("gives selected labels priority and removes overlapping names", () => {
    expect([
      ...layoutLabels(
        [label("rack-a", 10), label("selected", 50, 100), label("rack-b", 160)],
        400,
        100,
      ),
    ]).toEqual(["selected", "rack-b"]);
  });
  it("reserves alarm and search badges and rejects partially clipped names", () => {
    const result = layoutLabels(
      [label("alarm-overlap", 20), label("clipped", 260), label("clear", 150)],
      300,
      100,
      [{ x: 40, y: 10, width: 30, height: 30 }],
    );
    expect([...result]).toEqual(["clear"]);
  });
  it("reveals separated names after zoom and is independent of insertion order", () => {
    const dense = [label("a", 10), label("b", 50)];
    expect(layoutLabels(dense, 400, 100).size).toBe(1);
    expect([...layoutLabels([...dense].reverse(), 400, 100)]).toEqual([
      ...layoutLabels(dense, 400, 100),
    ]);
    expect(layoutLabels([label("a", 10), label("b", 110)], 400, 100).size).toBe(
      2,
    );
  });
});

describe("measureLabel", () => {
  it("falls back to a text-length estimate for an unlaid-out element (jsdom reports 0x0)", () => {
    const el = document.createElement("div");
    el.textContent = "rack-01";
    const cache = new WeakMap();
    const measured = measureLabel(el, cache);
    expect(measured).toEqual({
      text: "rack-01",
      width: "rack-01".length * 6.5 + 16,
      height: 20,
    });
  });
  it("reuses the cached measurement while the text is unchanged, and drops it once the text changes", () => {
    // jsdom never lays elements out (offsetWidth/Height are always 0), so a
    // real (non-fallback) measurement — the only kind this function caches —
    // has to be stubbed in directly.
    const el = document.createElement("div");
    el.textContent = "a";
    Object.defineProperty(el, "offsetWidth", { value: 40, configurable: true });
    Object.defineProperty(el, "offsetHeight", { value: 18, configurable: true });
    const cache = new WeakMap();
    const first = measureLabel(el, cache);
    expect(first).toEqual({ text: "a", width: 40, height: 18 });
    expect(measureLabel(el, cache)).toBe(first);

    el.textContent = "a longer label";
    const second = measureLabel(el, cache);
    expect(second).not.toBe(first);
    expect(second.text).toBe("a longer label");
  });
});
