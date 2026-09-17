import { afterEach, expect, it, vi } from "vitest";
import * as THREE from "three";
import { SceneManager } from "./SceneManager";

afterEach(() => vi.unstubAllGlobals());

it("cancels the first scheduled frame when disposed immediately after startup", () => {
  const schedule = vi.fn(() => 42);
  const cancel = vi.fn();
  vi.stubGlobal("requestAnimationFrame", schedule);
  vi.stubGlobal("cancelAnimationFrame", cancel);
  const manager = new SceneManager();
  manager.scene = new THREE.Scene();
  manager.startLoop(vi.fn());
  manager.dispose();
  expect(cancel).toHaveBeenCalledWith(42);
});
