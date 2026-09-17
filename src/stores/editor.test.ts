import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useEditorStore } from "./editor";

describe("editor store security boundaries", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("enforces permissionResolver on mutating commands", () => {
    const editor = useEditorStore();
    const denied: string[] = [];
    editor.configureSecurity({
      mode: "edit",
      permissionResolver: () => false,
      onPermissionDenied: (ctx) => denied.push(ctx.action),
    });

    editor.addSpace({
      id: "space-1",
      name: "Space",
      kind: "physical",
      type: "site",
      source: "manual",
    });

    expect(editor.spaces.has("space-1")).toBe(false);
    expect(denied).toEqual(["space:create"]);
  });

  it("returns RawDevice through a readonly API", () => {
    const editor = useEditorStore();
    editor.replaceData({
      devices: [
        {
          id: "dev-1",
          source: "cmdb",
          externalId: "dev-1",
          hostname: "core-1",
        },
      ],
    });

    const device = editor.getDevice("dev-1");

    expect(device?.hostname).toBe("core-1");
    expect(() => {
      (device as { hostname: string }).hostname = "mutated";
    }).toThrow(/read-only/);
    expect(editor.devices.get("dev-1")?.hostname).toBe("core-1");
  });

  it("acknowledgeDevice records operatorState without touching device.status", () => {
    const editor = useEditorStore();
    editor.setEditorMode("edit");
    editor.replaceData({
      devices: [
        {
          id: "dev-1",
          source: "cmdb",
          externalId: "dev-1",
          hostname: "core-1",
          status: "critical",
        },
      ],
      deviceMappings: [
        { id: "map-1", rawDeviceId: "dev-1", mappingStatus: "mapped" },
      ],
    });

    editor.acknowledgeDevice("dev-1", "alice");

    expect(editor.devices.get("dev-1")?.status).toBe("critical");
    const mapping = editor.getMappingByDeviceId("dev-1");
    expect(mapping?.operatorState?.acknowledged).toBe(true);
    expect(mapping?.operatorState?.acknowledgedBy).toBe("alice");
    expect(mapping?.operatorState?.acknowledgedAt).toBeTruthy();

    editor.unacknowledgeDevice("dev-1");
    expect(editor.devices.get("dev-1")?.status).toBe("critical");
    expect(
      editor.getMappingByDeviceId("dev-1")?.operatorState?.acknowledged,
    ).toBe(false);
  });

  it("scopedCriticalCount/scopedWarningCount only count the requested floor", () => {
    const editor = useEditorStore();
    editor.replaceData({
      spaces: [
        {
          id: "floor-a",
          name: "Floor A",
          kind: "physical",
          type: "floor",
          source: "manual",
        },
        {
          id: "floor-b",
          name: "Floor B",
          kind: "physical",
          type: "floor",
          source: "manual",
        },
      ],
      devices: [
        {
          id: "dev-a",
          source: "cmdb",
          externalId: "dev-a",
          hostname: "a",
          status: "critical",
        },
        {
          id: "dev-b",
          source: "cmdb",
          externalId: "dev-b",
          hostname: "b",
          status: "critical",
        },
      ],
      deviceMappings: [
        {
          id: "map-a",
          rawDeviceId: "dev-a",
          primarySpaceId: "floor-a",
          mappingStatus: "mapped",
        },
        {
          id: "map-b",
          rawDeviceId: "dev-b",
          primarySpaceId: "floor-b",
          mappingStatus: "mapped",
        },
      ],
    });

    expect(editor.scopedCriticalCount("floor-a")).toBe(1);
    expect(editor.criticalCount).toBe(2);
  });

  it("assignDevice records and clears an assignee without a status/permission side effect", () => {
    const editor = useEditorStore();
    editor.setEditorMode("edit");
    editor.replaceData({
      devices: [
        {
          id: "dev-1",
          source: "cmdb",
          externalId: "dev-1",
          hostname: "core-1",
          status: "warning",
        },
      ],
      deviceMappings: [
        { id: "map-1", rawDeviceId: "dev-1", mappingStatus: "mapped" },
      ],
    });

    editor.assignDevice("dev-1", "bob");
    let mapping = editor.getMappingByDeviceId("dev-1");
    expect(mapping?.operatorState?.assignedTo).toBe("bob");
    expect(mapping?.operatorState?.assignedAt).toBeTruthy();
    expect(editor.devices.get("dev-1")?.status).toBe("warning");

    editor.assignDevice("dev-1", "");
    mapping = editor.getMappingByDeviceId("dev-1");
    expect(mapping?.operatorState?.assignedTo).toBeUndefined();
  });
});

describe("backend push actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // These actions represent a host's own backend pushing data it already
  // owns/trusts — a different trust boundary than a UI user editing the
  // topology by hand, so a locked-down permissionResolver must not block them.
  function lockDown(editor: ReturnType<typeof useEditorStore>) {
    editor.configureSecurity({ mode: "view", permissionResolver: () => false });
  }

  it("upsertLinks/removeLinks bypass the permission guard and merge in place", () => {
    const editor = useEditorStore();
    lockDown(editor);

    editor.upsertLinks([
      {
        id: "link-1",
        sourceDeviceId: "a",
        targetDeviceId: "b",
        type: "physical",
        source: "discovered",
        status: "up",
      },
    ]);
    expect(editor.links.get("link-1")?.status).toBe("up");

    editor.upsertLinks([
      {
        id: "link-1",
        sourceDeviceId: "a",
        targetDeviceId: "b",
        type: "physical",
        source: "discovered",
        status: "down",
      },
    ]);
    expect(editor.links.size).toBe(1);
    expect(editor.links.get("link-1")?.status).toBe("down");

    editor.removeLinks(["link-1"]);
    expect(editor.links.has("link-1")).toBe(false);
  });

  it("linksRevision bumps on an in-place update, not just add/remove", () => {
    const editor = useEditorStore();
    lockDown(editor);

    editor.upsertLinks([
      {
        id: "link-1",
        sourceDeviceId: "a",
        targetDeviceId: "b",
        type: "physical",
        source: "discovered",
        status: "up",
      },
    ]);
    const afterAdd = editor.linksRevision;
    expect(editor.links.size).toBe(1);

    // Same id, same count — this used to be invisible to a `links.size` watcher.
    editor.upsertLinks([
      {
        id: "link-1",
        sourceDeviceId: "a",
        targetDeviceId: "b",
        type: "physical",
        source: "discovered",
        status: "down",
      },
    ]);
    expect(editor.links.size).toBe(1);
    expect(editor.linksRevision).toBeGreaterThan(afterAdd);

    const afterUpdate = editor.linksRevision;
    editor.updateLinkStatus("link-1", "up");
    expect(editor.linksRevision).toBeGreaterThan(afterUpdate);
  });

  it("upsertSpaces bypasses the guard; removeSpaces soft-deletes (archives) instead of removing", () => {
    const editor = useEditorStore();
    lockDown(editor);

    editor.upsertSpaces([
      {
        id: "space-1",
        name: "Site A",
        kind: "physical",
        type: "site",
        source: "api",
      },
    ]);
    expect(editor.spaces.get("space-1")?.archived).toBeFalsy();

    editor.removeSpaces(["space-1"]);
    expect(editor.spaces.has("space-1")).toBe(true);
    expect(editor.spaces.get("space-1")?.archived).toBe(true);
  });

  it("upsertInterfaces bypasses the guard and merges by id", () => {
    const editor = useEditorStore();
    lockDown(editor);

    editor.upsertInterfaces([
      { id: "if-1", rawDeviceId: "dev-1", name: "eth0", status: "up" },
    ]);
    expect(editor.interfaces.get("if-1")?.status).toBe("up");

    editor.upsertInterfaces([
      { id: "if-1", rawDeviceId: "dev-1", name: "eth0", status: "down" },
    ]);
    expect(editor.interfaces.size).toBe(1);
    expect(editor.interfaces.get("if-1")?.status).toBe("down");
  });

  it("upsertVirtualNodes/removeVirtualNodes bypass the permission guard", () => {
    const editor = useEditorStore();
    lockDown(editor);

    editor.upsertVirtualNodes([
      { id: "vn-1", label: "Internet", type: "internet" },
    ]);
    expect(editor.virtualNodes.has("vn-1")).toBe(true);

    editor.removeVirtualNodes(["vn-1"]);
    expect(editor.virtualNodes.has("vn-1")).toBe(false);
  });

  it("setOperatorState partially merges without clobbering unrelated fields, and bypasses the guard", () => {
    const editor = useEditorStore();
    editor.replaceData({
      devices: [
        {
          id: "dev-1",
          source: "cmdb",
          externalId: "dev-1",
          hostname: "core-1",
        },
      ],
      deviceMappings: [
        { id: "map-1", rawDeviceId: "dev-1", mappingStatus: "mapped" },
      ],
    });
    lockDown(editor);

    editor.setOperatorState("dev-1", { assignedTo: "bob" });
    editor.setOperatorState("dev-1", {
      maintenanceMode: true,
      maintenanceUntil: "2026-01-01",
    });

    const state = editor.getMappingByDeviceId("dev-1")?.operatorState;
    expect(state?.assignedTo).toBe("bob");
    expect(state?.maintenanceMode).toBe(true);
    expect(state?.maintenanceUntil).toBe("2026-01-01");

    editor.setOperatorState("dev-1", { suppressed: true });
    const state2 = editor.getMappingByDeviceId("dev-1")?.operatorState;
    expect(state2?.assignedTo).toBe("bob");
    expect(state2?.suppressed).toBe(true);
  });

  it("removeDevices deletes the device, its mapping, and any link referencing it — but leaves unrelated links alone", () => {
    const editor = useEditorStore();
    editor.replaceData({
      devices: [
        { id: "dev-1", source: "cmdb", externalId: "dev-1", hostname: "a" },
        { id: "dev-2", source: "cmdb", externalId: "dev-2", hostname: "b" },
        { id: "dev-3", source: "cmdb", externalId: "dev-3", hostname: "c" },
      ],
      deviceMappings: [
        { id: "map-1", rawDeviceId: "dev-1", mappingStatus: "mapped" },
      ],
      links: [
        {
          id: "link-1",
          sourceDeviceId: "dev-1",
          targetDeviceId: "dev-2",
          type: "physical",
          source: "discovered",
        },
        {
          id: "link-2",
          sourceDeviceId: "dev-3",
          targetDeviceId: "dev-2",
          type: "physical",
          source: "discovered",
        },
        {
          id: "link-3",
          sourceDeviceId: "dev-2",
          targetDeviceId: "dev-1",
          type: "physical",
          source: "discovered",
        },
      ],
    });
    lockDown(editor);

    editor.removeDevices(["dev-1"]);

    expect(editor.devices.has("dev-1")).toBe(false);
    expect(editor.getMappingByDeviceId("dev-1")).toBeUndefined();
    expect(editor.links.has("link-1")).toBe(false);
    expect(editor.links.has("link-3")).toBe(false);
    expect(editor.links.has("link-2")).toBe(true);
  });

  it('emitChange tags user-driven actions as "user" and backend-push actions as "api"', () => {
    const editor = useEditorStore();
    const events: string[] = [];
    editor.configureSecurity({
      mode: "edit",
      permissionResolver: () => true,
      onChange: (e) => events.push(e.source),
    });

    editor.addSpace({
      id: "space-1",
      name: "Site",
      kind: "physical",
      type: "site",
      source: "manual",
    });
    editor.upsertLinks([
      {
        id: "link-1",
        sourceDeviceId: "a",
        targetDeviceId: "b",
        type: "physical",
        source: "discovered",
      },
    ]);

    expect(events).toEqual(["user", "api"]);
  });
});

describe("autoLayout", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("is denied outside edit mode and touches nothing", async () => {
    const editor = useEditorStore();
    editor.replaceData({
      devices: [
        { id: "dev-1", source: "cmdb", externalId: "dev-1", hostname: "a" },
      ],
    });

    await editor.autoLayout();

    expect(editor.getMappingByDeviceId("dev-1")).toBeUndefined();
  });

  it("places a mapped-but-unpositioned device while leaving an already-positioned one pinned", async () => {
    const editor = useEditorStore();
    editor.setEditorMode("edit");
    editor.replaceData({
      devices: [
        { id: "fixed", source: "cmdb", externalId: "fixed", hostname: "fixed" },
        { id: "loose", source: "cmdb", externalId: "loose", hostname: "loose" },
      ],
      deviceMappings: [
        {
          id: "map-fixed",
          rawDeviceId: "fixed",
          mappingStatus: "mapped",
          position: { x: 10, y: 0, z: 10 },
        },
        { id: "map-loose", rawDeviceId: "loose", mappingStatus: "auto_mapped" },
      ],
      links: [
        {
          id: "link-1",
          sourceDeviceId: "fixed",
          targetDeviceId: "loose",
          type: "physical",
          source: "discovered",
        },
      ],
    });

    await editor.autoLayout({ iterations: 20 });

    // Pinned device never moves.
    expect(editor.getMappingByDeviceId("fixed")?.position).toEqual({
      x: 10,
      y: 0,
      z: 10,
    });
    // The mapped-but-unpositioned device is now placed somewhere.
    const loose = editor.getMappingByDeviceId("loose");
    expect(loose?.position).toBeDefined();
    expect(editor.lastAutoLayoutDeviceIds).toEqual(["loose"]);
  });

  it("excludes a device with no DeviceMapping at all by default, but includes it when explicitly requested", async () => {
    const editor = useEditorStore();
    editor.setEditorMode("edit");
    editor.replaceData({
      devices: [
        {
          id: "mapped",
          source: "cmdb",
          externalId: "mapped",
          hostname: "mapped",
        },
        {
          id: "never-mapped",
          source: "cmdb",
          externalId: "never-mapped",
          hostname: "never-mapped",
        },
      ],
      deviceMappings: [
        {
          id: "map-1",
          rawDeviceId: "mapped",
          mappingStatus: "mapped",
          position: { x: 1, y: 0, z: 1 },
        },
      ],
    });

    // Default scope: a device with no mapping record is never silently
    // claimed — it has no space/rack context to place it in.
    await editor.autoLayout({ iterations: 5, includeMapped: true });
    expect(editor.getMappingByDeviceId("never-mapped")).toBeUndefined();

    // Explicit opt-in still works.
    await editor.autoLayout({
      deviceIds: ["mapped", "never-mapped"],
      iterations: 5,
      includeMapped: true,
    });
    expect(editor.getMappingByDeviceId("never-mapped")?.position).toBeDefined();
  });

  it("a superseded run resolves cancelled and does not overwrite the newer run's results", async () => {
    const editor = useEditorStore();
    editor.setEditorMode("edit");
    editor.replaceData({
      devices: [{ id: "a", source: "cmdb", externalId: "a", hostname: "a" }],
      deviceMappings: [
        {
          id: "map-a",
          rawDeviceId: "a",
          mappingStatus: "mapped",
          position: { x: 0, y: 0, z: 0 },
        },
      ],
    });

    const run1 = editor.autoLayout({
      deviceIds: ["a"],
      includeMapped: true,
      iterations: 5,
    });
    const run2 = editor.autoLayout({
      deviceIds: ["a"],
      includeMapped: true,
      iterations: 5,
    });

    const [r1, r2] = await Promise.all([run1, run2]);
    expect(r1.cancelled).toBe(true);
    expect(r2.cancelled).toBe(false);
    // Nothing left mid-way: progress is idle once both have settled.
    expect(editor.autoLayoutProgress).toBeNull();
  });

  it("does not count a permission-denied device as moved", async () => {
    const editor = useEditorStore();
    editor.configureSecurity({
      mode: "edit",
      permissionResolver: (ctx) =>
        !(ctx.action === "device:map" && ctx.target?.id === "blocked"),
    });
    editor.replaceData({
      devices: [
        {
          id: "blocked",
          source: "cmdb",
          externalId: "blocked",
          hostname: "blocked",
        },
        {
          id: "allowed",
          source: "cmdb",
          externalId: "allowed",
          hostname: "allowed",
        },
      ],
    });

    await editor.autoLayout({
      deviceIds: ["blocked", "allowed"],
      iterations: 5,
    });

    expect(editor.lastAutoLayoutDeviceIds).toEqual(["allowed"]);
    expect(editor.getMappingByDeviceId("blocked")).toBeUndefined();
    expect(editor.getMappingByDeviceId("allowed")).toBeDefined();
  });

  it("cancelAutoLayout stops a run early and reports cancelled", async () => {
    const editor = useEditorStore();
    editor.setEditorMode("edit");
    editor.replaceData({
      devices: Array.from({ length: 5 }, (_, i) => ({
        id: `d${i}`,
        source: "cmdb",
        externalId: `d${i}`,
        hostname: `d${i}`,
      })),
      deviceMappings: Array.from({ length: 5 }, (_, i) => ({
        id: `m${i}`,
        rawDeviceId: `d${i}`,
        mappingStatus: "auto_mapped" as const,
      })),
    });

    const run = editor.autoLayout({ iterations: 1_000_000 });
    editor.cancelAutoLayout();
    await expect(run).resolves.toEqual({ cancelled: true });
  });
});
