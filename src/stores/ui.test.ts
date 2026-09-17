import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useUIStore } from "./ui";

describe("ui store: confirm dialog", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("runs onConfirm only when resolved true, and clears the dialog either way", () => {
    const ui = useUIStore();
    const onConfirm = vi.fn();

    ui.requestConfirm("Delete 3 selected devices?", onConfirm);
    expect(ui.confirmDialog).toEqual({
      message: "Delete 3 selected devices?",
      confirmLabel: "Delete",
      onConfirm,
    });

    ui.resolveConfirm(false);
    expect(onConfirm).not.toHaveBeenCalled();
    expect(ui.confirmDialog).toBeNull();

    ui.requestConfirm("Delete 3 selected devices?", onConfirm);
    ui.resolveConfirm(true);
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(ui.confirmDialog).toBeNull();
  });

  it("resolving with nothing pending is a harmless no-op", () => {
    const ui = useUIStore();
    expect(() => ui.resolveConfirm(true)).not.toThrow();
    expect(ui.confirmDialog).toBeNull();
  });
});

describe("ui store: filter reset", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("resetFilter also turns off alertsOnly, which lives outside FilterState", () => {
    const ui = useUIStore();
    ui.setFilter({ search: "srv", status: ["critical"] });
    ui.alertsOnly = true;

    ui.resetFilter();

    expect(ui.filter.search).toBe("");
    expect(ui.filter.status).toEqual([]);
    expect(ui.alertsOnly).toBe(false);
  });
});
