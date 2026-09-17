import { afterEach, describe, expect, it } from "vitest";
import * as THREE from "three";
import { computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
import { DeviceRenderer } from "./DeviceRenderer";
import { applyColorMode, STATUS_COLOR_THREE } from "@/utils/colorUtils";
import {
  getDeviceGeometry,
  disposeGeometryCache,
} from "@/utils/geometryFactory";
import type { DeviceType, RawDevice, DeviceMapping } from "@/types";

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
afterEach(() => {
  applyColorMode("default");
  disposeGeometryCache();
});

describe("NMS device rendering", () => {
  it("keeps moved and newly added instances pickable outside the original bounds", () => {
    const renderer = new DeviceRenderer(new THREE.Scene());
    const device: RawDevice = {
      id: "r1",
      source: "test",
      externalId: "r1",
      normalizedType: "router",
      status: "normal",
    };
    const mapping: DeviceMapping = {
      id: "m1",
      rawDeviceId: "r1",
      mappingStatus: "mapped",
      position: { x: 0, y: 1, z: 0 },
    };
    renderer.loadInstanced([device], new Map([["m1", mapping]]), () => mapping);
    const mesh = renderer.getInstancedMeshes()[0]!;
    const hitsAt = (x: number) =>
      new THREE.Raycaster(
        new THREE.Vector3(x, 1, 5),
        new THREE.Vector3(0, 0, -1),
      ).intersectObject(mesh);
    expect(hitsAt(0).length).toBeGreaterThan(0);
    renderer.setPosition("r1", new THREE.Vector3(100, 1, 0));
    expect(hitsAt(100).length).toBeGreaterThan(0);
    renderer.addDevice(
      { ...device, id: "r2" },
      {
        ...mapping,
        id: "m2",
        rawDeviceId: "r2",
        position: { x: -100, y: 1, z: 0 },
      },
    );
    expect(hitsAt(-100).length).toBeGreaterThan(0);
    renderer.dispose();
  });

  it("moves search labels with their devices", () => {
    const scene = new THREE.Scene();
    const renderer = new DeviceRenderer(scene);
    const device: RawDevice = {
      id: "r1",
      source: "test",
      externalId: "r1",
      normalizedType: "router",
    };
    const mapping: DeviceMapping = {
      id: "m1",
      rawDeviceId: "r1",
      mappingStatus: "mapped",
      position: { x: 0, y: 1, z: 0 },
    };
    renderer.loadInstanced([device], new Map([["m1", mapping]]), () => mapping);
    renderer.setSearchFocus(new Set(["r1"]), () => "router");
    renderer.setPosition("r1", new THREE.Vector3(8, 2, 3));
    renderer.tick();
    const label = renderer
      .getLabelObstacles()
      .find((object) => object.element.className === "device-search-label")!;
    expect(label.position.toArray()).toEqual([8, 3.7, 3]);
    renderer.dispose();
  });
  it("keeps status colors independent of device type and preserves empty search dimming on recolor", () => {
    const renderer = new DeviceRenderer(new THREE.Scene());
    const device: RawDevice = {
      id: "r1",
      source: "test",
      externalId: "r1",
      normalizedType: "router",
      status: "critical",
    };
    const mapping: DeviceMapping = {
      id: "m1",
      rawDeviceId: "r1",
      mappingStatus: "mapped",
      position: { x: 0, y: 1, z: 0 },
    };
    renderer.loadInstanced([device], new Map([["m1", mapping]]), () => mapping);
    const mesh = renderer.getInstancedMeshes()[0]!;
    expect((mesh.material as THREE.MeshStandardMaterial).color.getHex()).toBe(
      0xffffff,
    );
    const before = new THREE.Color();
    mesh.getColorAt(0, before);
    applyColorMode("colorblind");
    renderer.recolorAll();
    const after = new THREE.Color();
    mesh.getColorAt(0, after);
    expect(after.equals(before)).toBe(false);
    expect(after.r).toBeCloseTo(STATUS_COLOR_THREE.critical.r);
    renderer.applySearchFilter(new Set(), true);
    renderer.recolorAll();
    mesh.getColorAt(0, after);
    expect(after.r).toBeCloseTo(STATUS_COLOR_THREE.critical.r * 0.3);
    renderer.updateStatus("r1", "warning");
    mesh.getColorAt(0, after);
    expect(after.g).toBeCloseTo(STATUS_COLOR_THREE.warning.g * 0.3);
    renderer.dispose();
  });
  it("evicts an older badge on a same-severity tie so critical devices past the cap are never starved", () => {
    const renderer = new DeviceRenderer(new THREE.Scene());
    const devices: RawDevice[] = Array.from({ length: 201 }, (_, i) => ({
      id: `d${i}`,
      source: "test",
      externalId: `d${i}`,
      normalizedType: "server",
      status: "critical",
    }));
    const mappings = new Map<string, DeviceMapping>(
      devices.map((d, i) => [
        `m${i}`,
        {
          id: `m${i}`,
          rawDeviceId: d.id,
          mappingStatus: "mapped",
          position: { x: i, y: 0, z: 0 },
        },
      ]),
    );
    const byDeviceId = new Map(
      [...mappings.values()].map((m) => [m.rawDeviceId, m]),
    );
    renderer.loadInstanced(devices, mappings, (id) => byDeviceId.get(id));

    const badges = renderer
      .getLabelObstacles()
      .filter((o) => o.element.className === "device-status-badge");
    // Capped at 200, but the 201st (newest) critical device still got a
    // badge — an older same-severity one was evicted to make room, rather
    // than every critical device past the cap being silently dropped.
    expect(badges.length).toBe(200);
    expect(badges.some((b) => b.position.x === 200)).toBe(true);

    renderer.dispose();
  });

  it("produces valid, cached, pickable geometries for every built-in type", () => {
    const types: DeviceType[] = [
      "server",
      "switch",
      "router",
      "firewall",
      "database",
      "storage",
      "vm",
      "container",
      "load_balancer",
      "access_point",
      "cloud_service",
      "unknown",
    ];
    for (const type of types) {
      const geometry = getDeviceGeometry(type);
      expect(getDeviceGeometry(type)).toBe(geometry);
      expect(geometry.boundsTree).toBeDefined();
      const positions = geometry.getAttribute("position");
      expect(geometry.getAttribute("color").count).toBe(positions.count);
      expect(Array.from(positions.array).every(Number.isFinite)).toBe(true);
      geometry.computeBoundingBox();
      expect(
        geometry.boundingBox!.max.y - geometry.boundingBox!.min.y,
      ).toBeGreaterThan(0.1);
    }
  });
});
