import * as THREE from "three";
import {
  inject,
  watch,
  nextTick,
  type InjectionKey,
  type WatchStopHandle,
} from "vue";
import { SceneManager } from "@/renderers/SceneManager";
import { DeviceRenderer } from "@/renderers/DeviceRenderer";
import { SpaceRenderer } from "@/renderers/SpaceRenderer";
import { LinkRenderer } from "@/renderers/LinkRenderer";
import { ParticleRenderer } from "@/renderers/ParticleRenderer";
import { BlastRadiusRenderer } from "@/renderers/BlastRadiusRenderer";
import { VirtualNodeRenderer } from "@/renderers/VirtualNodeRenderer";
import { FlashEffectRenderer } from "@/renderers/FlashEffectRenderer";
import { BackgroundRenderer } from "@/renderers/BackgroundRenderer";
import { RaycastManager } from "@/interaction/RaycastManager";
import { LinkDragManager } from "@/interaction/LinkDragManager";
import { DragMoveManager } from "@/interaction/DragMoveManager";
import { CameraController } from "@/interaction/CameraController";
import { ArrowGizmo } from "@/interaction/ArrowGizmo";
import type { GizmoAxis } from "@/interaction/ArrowGizmo";
import { TimelineManager } from "@/core/TimelineManager";
import { useEditorStore } from "@/stores/editor";
import { useUIStore } from "@/stores/ui";
import { syncCustomTypes, applyColorMode } from "@/utils/colorUtils";
import {
  syncCustomGeometries,
  preloadCustomModels,
} from "@/utils/geometryFactory";
import { useDeviceTypesStore } from "@/stores/deviceTypes";
import { startProductTour } from "@/composables/useProductTour";
import type { DeviceType, EdgeType, EditorOptions, SavedView } from "@/types";
import type { BlastInfo } from "@/renderers/BlastRadiusRenderer";

export const NMS_EDITOR_OPTIONS_KEY: InjectionKey<EditorOptions> = Symbol(
  "topospace-editor-options",
);

type EditorStore = ReturnType<typeof useEditorStore>;
type UIStore = ReturnType<typeof useUIStore>;

const runtimes = new WeakMap<
  EditorStore,
  ReturnType<typeof createNmsEditorRuntime>
>();
let _options: EditorOptions = {};

export function configureNmsEditor(options: EditorOptions = {}) {
  _options = options;
}

export function useNmsEditor() {
  const editor = useEditorStore();
  const ui = useUIStore();
  const options = inject(NMS_EDITOR_OPTIONS_KEY, _options);
  let runtime = runtimes.get(editor);
  if (!runtime) {
    runtime = createNmsEditorRuntime(editor, ui, options);
    runtimes.set(editor, runtime);
  } else {
    runtime.configure(options);
  }
  return runtime;
}

function createNmsEditorRuntime(
  editor: EditorStore,
  ui: UIStore,
  initialOptions: EditorOptions = {},
) {
  const scene = new SceneManager();
  const timeline = new TimelineManager();
  const deviceTypes = useDeviceTypesStore();

  let device: DeviceRenderer;
  let space: SpaceRenderer;
  let link: LinkRenderer;
  let particle: ParticleRenderer;
  let blast: BlastRadiusRenderer;
  let vnode: VirtualNodeRenderer;
  let flash: FlashEffectRenderer;
  let background: BackgroundRenderer;
  let raycast: RaycastManager;
  let linkDrag: LinkDragManager;
  let dragMove: DragMoveManager;
  let gizmo: ArrowGizmo;
  let camera: CameraController;
  let _canvas: HTMLCanvasElement | null = null;
  let _mounted = false;
  let _startPointer = { x: 0, y: 0 };
  let _isDragCandidate = false;

  let _gizmoAxis: GizmoAxis | null = null;
  let _gizmoStartDrag: THREE.Vector3 | null = null;
  let _gizmoStartPos: THREE.Vector3 | null = null;
  let _spaceChildren: { id: string; offset: THREE.Vector3 }[] = [];
  let _hoverMissStreak = 0;
  let _pointerOverCanvas = false;
  const _prevStatus = new Map<string, string>();
  // warning/critical device ids, kept in sync by the status watcher below so
  // the per-frame pulse loop doesn't have to walk every device each frame.
  const _alertIds = new Set<string>();
  const _watchStops: WatchStopHandle[] = [];
  let options = initialOptions;
  let _fpsWindowStart = 0;
  let _fpsFrames = 0;
  let _lastPerfWarning = 0;
  let _autoPerfModeApplied = false;
  let _offscreenRaycaster: THREE.Raycaster | null = null;
  let _lastOffscreenCheck = 0;

  interface LayoutSnap {
    mappings: [string, import("@/types").DeviceMapping][];
    links: [string, import("@/types").NetworkLink][];
    spaces: [string, import("@/types").Space][];
    unmappedIds: string[];
  }
  const _undoStack: LayoutSnap[] = [];
  const _redoStack: LayoutSnap[] = [];
  const MAX_UNDO = 30;

  function _snapLayout(): LayoutSnap {
    return {
      mappings: [...editor.mappings.entries()].map(([k, v]) => [k, { ...v }]),
      links: [...editor.links.entries()].map(([k, v]) => [k, { ...v }]),
      spaces: [...editor.spaces.entries()].map(([k, v]) => [k, { ...v }]),
      unmappedIds: editor.unmappedDevices.map((d) => d.id),
    };
  }

  function _saveUndo() {
    _undoStack.push(_snapLayout());
    if (_undoStack.length > MAX_UNDO) _undoStack.shift();
    _redoStack.length = 0;
  }

  async function _restoreSnap(snap: LayoutSnap) {
    editor.mappings.clear();
    snap.mappings.forEach(([k, v]) => editor.mappings.set(k, v));
    editor.links.clear();
    snap.links.forEach(([k, v]) => editor.links.set(k, v));
    editor.spaces.clear();
    snap.spaces.forEach(([k, v]) => editor.spaces.set(k, v));
    const snapIds = new Set(snap.unmappedIds);
    const restored = snap.unmappedIds
      .map((id) => editor.devices.get(id))
      .filter((d): d is NonNullable<typeof d> => d != null);
    editor.unmappedDevices.splice(
      0,
      editor.unmappedDevices.length,
      ...restored,
    );
    // Re-add any device that was mapped at snapshot time but is now in unmapped
    editor.devices.forEach((dev) => {
      if (snapIds.has(dev.id) && !restored.find((d) => d.id === dev.id)) {
        editor.unmappedDevices.push(dev);
      }
    });
    await rebuildAll();
    ui.select(null);
  }

  function configure(nextOptions: EditorOptions = {}) {
    options = nextOptions;
  }

  // Fat lines (Line2/LineMaterial) need the renderer's pixel size to compute
  // a real, configurable on-screen width — re-applied on every resize and
  // whenever `link` is recreated (rebuildLinks/rebuildAll swap the instance).
  function _applyLinkResolution() {
    const { width, height } = scene.getSize();
    link?.setResolution(width, height);
  }

  function init(
    canvas: HTMLCanvasElement,
    overlay: HTMLElement,
    wrapper: HTMLElement,
  ) {
    if (_mounted) return;
    _canvas = canvas;
    _mounted = true;
    editor.configureSecurity({
      mode: options.mode ?? ui.mode,
      features: options.features,
      permissionResolver: options.permissionResolver,
      onPermissionDenied: (ctx) => {
        ui.addToast("Permission denied", "warning");
        options.onPermissionDenied?.(ctx);
      },
      onChange: options.onChange,
    });
    ui.setMode(options.mode ?? ui.mode);
    applyColorMode(ui.colorblindMode ? "colorblind" : "default");

    scene.init(canvas, overlay, wrapper, {
      onError: (error, context) => options.onError?.(error, context),
    });
    device = new DeviceRenderer(scene.scene);
    space = new SpaceRenderer(scene.scene);
    link = new LinkRenderer(scene.scene);
    _applyLinkResolution();
    scene.onResize(_applyLinkResolution);
    particle = new ParticleRenderer(scene.scene);
    blast = new BlastRadiusRenderer(scene.scene);
    vnode = new VirtualNodeRenderer(scene.scene);
    flash = new FlashEffectRenderer(scene.scene);
    background = new BackgroundRenderer(scene.scene);
    camera = new CameraController(scene.camera, scene.controls);

    dragMove = new DragMoveManager();
    raycast = new RaycastManager(scene.camera, device, space, link);
    linkDrag = new LinkDragManager(
      scene.camera,
      link,
      device,
      (srcId, tgtId, mx, my) => ui.showContextMenu(mx, my, srcId, tgtId),
    );

    gizmo = new ArrowGizmo(scene.scene);

    if (options.data) editor.replaceData(options.data);
    else if (options.mockData !== false) editor.loadMockData();
    _ensureActiveRootSpace();
    // Deferred to the same tick as the scene build: DOM elements the tour
    // points at (e.g. the campus-view switcher) only exist once Vue has
    // flushed the reactive state set just above.
    nextTick(() => {
      _buildScene();
      _flyToFitScope();
      _maybeAutoStartTour();
    });

    _bindEvents(canvas);
    _bindWatchers();
    _startLoop();
    options.onReady?.();
  }

  function _maybeAutoStartTour() {
    if (options.features?.tour === false) return;
    if (localStorage.getItem("topospace.tourSeen")) return;
    startProductTour();
  }

  // Always leaves `ui.activeRootSpaceId` pointing at a leaf scope (never a
  // building/site-with-floors), whether it was unset, invalid, or set directly
  // to a container by a caller — that's what keeps floors' reused local
  // coordinates from ever overlapping in the same 3D scene.
  function _ensureActiveRootSpace() {
    let current = ui.activeRootSpaceId;
    if (current) {
      const sp = editor.spaces.get(current);
      if (!sp || sp.archived) current = null;
    }
    if (!current) {
      current =
        options.initialFloorId && editor.spaces.has(options.initialFloorId)
          ? options.initialFloorId
          : (editor.rootSpaces[0]?.id ?? null);
    }
    const normalized = current ? editor.resolveLeafScope(current) : null;
    if (normalized !== ui.activeRootSpaceId) ui.activeRootSpaceId = normalized;
  }

  // Set by focusDevice/focusSpace when the target isn't in the current scope —
  // the activeRootSpaceId watcher below restores the intended focus once the
  // scope switch's rebuild has finished.
  let _pendingFocus: { type: "device" | "space"; id: string } | null = null;

  async function _buildScene() {
    await preloadCustomModels(deviceTypes.customTypes);
    const scope = ui.activeRootSpaceId;
    space.loadSpaces(editor.scopedSpaces(scope));
    device.loadInstanced(editor.scopedDevices(scope), editor.mappings, (id) =>
      editor.getMappingByDeviceId(id),
    );
    link.loadLinks(editor.scopedLinks(scope), (id) =>
      device.getDeviceWorldPos(id),
    );
    _syncParticles();
    vnode.loadNodes([...editor.virtualNodes.values()]);
    await background.loadObjects(editor.scopedBackgroundObjects(scope));
    background.setEditMode(ui.backgroundEditActive);
  }

  function _syncParticles() {
    const activeLinks = editor.scopedLinks(ui.activeRootSpaceId).filter((l) => {
      const src = editor.devices.get(l.sourceDeviceId);
      const tgt = editor.devices.get(l.targetDeviceId);
      return src?.status !== "offline" && tgt?.status !== "offline";
    });
    particle.syncLinks(activeLinks, (id) => link.getLinkPath(id));
  }

  function _bindEvents(canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeaveCanvas);
    canvas.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("keydown", onKeyDown);
  }

  function onPointerLeaveCanvas() {
    raycast.clearPointer();
    _pointerOverCanvas = false;
  }

  function _bindWatchers() {
    _watchStops.push(
      watch(
        () => ui.fontScale,
        (s) => device.setLabelScale(s),
        { immediate: true },
      ),
    );

    editor.devices.forEach((d) => {
      const cur = d.status ?? "unknown";
      _prevStatus.set(d.id, cur);
      if (cur === "warning" || cur === "critical") _alertIds.add(d.id);
    });
    _watchStops.push(
      watch(
        () => {
          let s = "";
          editor.devices.forEach((d) => {
            s += `${d.id}:${d.status};`;
          });
          return s;
        },
        () => {
          let particleDirty = false;
          editor.devices.forEach((d) => {
            const cur = d.status ?? "unknown";
            const prev = _prevStatus.get(d.id);
            device.updateStatus(d.id, cur);

            if (cur === "warning" || cur === "critical") _alertIds.add(d.id);
            else _alertIds.delete(d.id);

            if (prev !== undefined && prev !== cur) {
              const pos = device.getDeviceWorldPos(d.id);
              if (pos) {
                if (cur === "critical" || cur === "offline") {
                  flash.flash(pos, "critical");
                } else if (cur === "warning") {
                  flash.flash(pos, "warning");
                } else if (
                  cur === "normal" &&
                  (prev === "critical" ||
                    prev === "warning" ||
                    prev === "offline")
                ) {
                  flash.flash(pos, "recover");
                }
              }
              if (cur === "offline" || prev === "offline") particleDirty = true;
            }
            _prevStatus.set(d.id, cur);
          });
          // Devices removed from the store entirely never get visited above —
          // prune any alert id that no longer has a backing device so the
          // pulse loop doesn't keep animating a device that's gone.
          if (_alertIds.size) {
            for (const id of [..._alertIds]) {
              if (!editor.devices.has(id)) _alertIds.delete(id);
            }
          }
          if (particleDirty) _syncParticles();
        },
      ),
    );

    _watchStops.push(
      // linksRevision (not links.size) so an in-place edit — status, midX/midZ,
      // type — is reflected too, not just an add/remove that changes the count.
      watch(
        () => editor.linksRevision,
        () => rebuildLinks(),
      ),
    );

    _watchStops.push(
      // autoLayout() only touches the store (editor.mapDevice) — it has no
      // renderer access by design. This is the bridge: sync just the devices
      // that actually moved instead of a full scene reload.
      watch(
        () => editor.lastAutoLayoutDeviceIds,
        (ids) => {
          if (!ids.length) return;
          ids.forEach((id) => {
            const mapping = editor.getMappingByDeviceId(id);
            if (!mapping?.position) return;
            const pos = new THREE.Vector3(
              mapping.position.x,
              mapping.position.y,
              mapping.position.z,
            );
            if (device.getDeviceWorldPos(id)) {
              device.setPosition(id, pos);
            } else {
              const dev = editor.getDevice(id);
              if (dev) device.addDevice(dev, mapping);
            }
          });
          link.refreshPositionsFor(ids, (id) => device.getDeviceWorldPos(id));
          _syncParticles();
        },
      ),
    );

    _watchStops.push(
      watch(
        () => ui.activeRootSpaceId,
        async () => {
          ui.select(null);
          await rebuildAll();
          if (_pendingFocus) {
            const { type, id } = _pendingFocus;
            _pendingFocus = null;
            ui.select({ type, id });
            if (type === "device") focusDevice(id);
            else focusSpace(id);
          }
        },
      ),
    );

    _watchStops.push(
      watch(
        () => [...ui.visibleLinkTypes],
        (types) => {
          const all: EdgeType[] = [
            "physical",
            "logical",
            "service_dependency",
            "traffic_flow",
            "security_path",
            "manual",
            "inferred",
          ];
          all.forEach((t) => link.setVisible(t, types.includes(t)));
        },
      ),
    );

    _watchStops.push(
      watch(
        () => ui.hoveredId,
        (newId, oldId) => {
          if (oldId) {
            device.setHighlight(oldId, false);
            link.setHighlight(null, oldId);
          }
          if (newId) {
            if (ui.selection?.type === "link") link.setHighlight(newId, null);
            else device.setHighlight(newId, true);
          }
        },
      ),
    );

    _watchStops.push(
      watch(
        () => ui.selection,
        (sel, prev) => {
          if (prev?.type === "space") space.setSelected(prev.id, false);
          if (prev?.type === "link") link.setSelected(null);
          device.setSelectedDevice(sel?.type === "device" ? sel.id : null);

          if (
            ui.mode === "edit" &&
            sel &&
            (sel.type === "device" ||
              sel.type === "space" ||
              sel.type === "background")
          ) {
            attachGizmoToSelection(sel);
          } else {
            gizmo?.detach();
          }

          if (!sel) {
            blast.clear();
            ui.blastSourceId = null;
            ui.showRackServerList = false;
            return;
          }

          if (sel.type === "device") {
            const dev = editor.devices.get(sel.id);
            if (
              dev &&
              (dev.status === "critical" || dev.status === "warning") &&
              ui.showBlastRadius
            ) {
              showBlastRadius(sel.id);
            } else blast.clear();

            const m = editor.getMappingByDeviceId(sel.id);
            if (m?.primarySpaceId) {
              ui.selectedRackForList = m.primarySpaceId;
              ui.showRackServerList = true;
            }
          } else if (sel.type === "space") {
            space.setSelected(sel.id, true);
            const sp = editor.spaces.get(sel.id);
            if (sp?.type === "rack") {
              ui.selectedRackForList = sel.id;
              ui.showRackServerList = true;
            } else {
              ui.showRackServerList = false;
            }
          } else if (sel.type === "link") {
            link.setSelected(ui.mode === "edit" ? sel.id : null);
          }
        },
      ),
    );

    _watchStops.push(
      watch(
        () => ui.mode,
        (mode) => {
          editor.setEditorMode(mode);
          if (mode === "view") {
            gizmo?.detach();
            link?.setSelected(null);
            linkDrag?.cancel();
            dragMove?.cancel();
            _gizmoAxis = null;
            _gizmoStartDrag = null;
            _gizmoStartPos = null;
            _spaceChildren = [];
          } else if (
            ui.selection &&
            (ui.selection.type === "device" || ui.selection.type === "space")
          ) {
            attachGizmoToSelection(ui.selection);
          }
        },
        { immediate: true },
      ),
    );

    _watchStops.push(
      watch(
        () => ui.linkToolActive,
        (on) => {
          if (!on) linkDrag.cancel();
          if (_canvas) _canvas.style.cursor = on ? "crosshair" : "";
          if (on)
            ui.addToast(
              "Connect mode on — drag from one device to another",
              "info",
            );
        },
      ),
    );

    _watchStops.push(
      watch(
        () => ui.backgroundEditActive,
        (on) => {
          background?.setEditMode(on);
          if (!on && ui.selection?.type === "background") ui.select(null);
          if (on)
            ui.addToast(
              "Background edit on — click a background object to move it",
              "info",
            );
        },
      ),
    );

    _watchStops.push(
      watch(
        () => ui.showParticles,
        (v) => particle.setVisible(v),
      ),
    );
    _watchStops.push(
      watch(
        () => ui.showBlastRadius,
        (v) => {
          if (!v) blast.clear();
        },
      ),
    );

    _watchStops.push(
      watch(
        () => editor.virtualNodes.size,
        () => {
          vnode.dispose();
          vnode = new VirtualNodeRenderer(scene.scene);
          vnode.loadNodes([...editor.virtualNodes.values()]);
        },
      ),
    );

    _watchStops.push(
      watch(
        () => ui.timelineFrameIdx,
        (idx) => {
          if (idx < 0) return;
          const frame = timeline.getFrame(idx);
          if (!frame) return;
          Object.entries(frame.states).forEach(([id, s]) =>
            editor.updateDeviceStatus(id, s.status, s.metrics),
          );
        },
      ),
    );

    _watchStops.push(
      watch(
        () => editor.spaces.size,
        () => editor.spaces.forEach((s) => space.addSpace(s)),
      ),
    );

    _watchStops.push(
      watch(
        () =>
          `${ui.filter.search}|${ui.filter.status.join(",")}|${ui.filter.type.join(",")}|${ui.alertsOnly}`,
        () => applySearchFilter(),
      ),
    );

    // Re-apply search filter when devices are placed or unmapped so the 3D
    // highlight state stays in sync with the current mapped device set.
    _watchStops.push(
      watch(
        () => editor.mappings.size,
        () => applySearchFilter(),
      ),
    );

    // Sync custom type registry to renderer modules whenever custom types change
    _watchStops.push(
      watch(
        () => deviceTypes.customTypes.size,
        () => {
          syncCustomTypes(deviceTypes.customTypes);
          syncCustomGeometries(deviceTypes.customTypes);
        },
        { immediate: true },
      ),
    );
  }

  // Background objects are deliberately left out of RaycastManager's normal
  // hit-test candidate lists (so they stay click-through in normal view) —
  // this is a separate, small raycast only ever invoked while
  // ui.backgroundEditActive is on.
  function _pickBackground(e: PointerEvent): string | null {
    if (!_canvas) return null;
    const rect = _canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, scene.camera);
    const hits = ray.intersectObjects(background.getPickMeshes(), true);
    if (!hits.length) return null;
    return background.getBackgroundIdFromObject(hits[0].object);
  }

  function _verticalPlanePoint(
    e: PointerEvent,
    anchor: THREE.Vector3,
  ): THREE.Vector3 | null {
    if (!_canvas) return null;
    const rect = _canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, scene.camera);
    const camDir = new THREE.Vector3();
    scene.camera.getWorldDirection(camDir);
    camDir.y = 0;
    if (camDir.lengthSq() < 1e-6) camDir.set(0, 0, 1);
    camDir.normalize();
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      camDir,
      anchor,
    );
    const pt = new THREE.Vector3();
    return ray.ray.intersectPlane(plane, pt) ? pt : null;
  }

  // Freehand device/space placement used to land on whatever fractional
  // coordinate the raycast happened to hit, so two racks meant to line up
  // rarely actually shared an X or Z — nudging them straight required
  // zooming in and eyeballing it. Snapping to a coarse world-unit grid during
  // every drag (gizmo or free-drag alike) makes "line them up" the default
  // outcome instead of a manual fix-up step. Y is left alone: height is set
  // by the vertical gizmo axis specifically, and grid-snapping it too would
  // fight rack-unit-based device stacking.
  const GRID_SNAP = 0.5;
  function _snapXZ(pos: THREE.Vector3): THREE.Vector3 {
    pos.x = Math.round(pos.x / GRID_SNAP) * GRID_SNAP;
    pos.z = Math.round(pos.z / GRID_SNAP) * GRID_SNAP;
    return pos;
  }

  function attachGizmoToSelection(sel: { type: string; id: string }) {
    if (!gizmo) return;
    if (ui.mode !== "edit") {
      gizmo.detach();
      return;
    }
    if (sel.type === "device") {
      const pos = device.getDeviceWorldPos(sel.id);
      if (pos) gizmo.attach({ type: "device", id: sel.id }, pos);
    } else if (sel.type === "space") {
      const sp = editor.spaces.get(sel.id);
      if (sp?.position) {
        gizmo.attach(
          { type: "space", id: sel.id },
          new THREE.Vector3(sp.position.x, 0, sp.position.z),
        );
      } else {
        gizmo.detach();
      }
    } else if (sel.type === "background") {
      const pos = background.getWorldPos(sel.id);
      if (pos) gizmo.attach({ type: "background", id: sel.id }, pos);
      else gizmo.detach();
    } else {
      gizmo.detach();
    }
  }

  function applySearchFilter() {
    const f = ui.filter;
    const q = f.search.toLowerCase().trim();
    const hasFilter =
      !!q || f.status.length > 0 || f.type.length > 0 || ui.alertsOnly;
    if (!hasFilter) {
      device.applySearchFilter(new Set(), false);
      ui.searchMatchCount = null;
      return;
    }
    const matchingIds = new Set<string>();
    editor.devices.forEach((dev) => {
      const matchSearch =
        !q ||
        (dev.hostname ?? "").toLowerCase().includes(q) ||
        (dev.ip ?? "").includes(q);
      const matchStatus =
        !f.status.length || f.status.includes(dev.status ?? "unknown");
      const deviceType = (dev.normalizedType ?? "unknown") as DeviceType;
      const matchType = !f.type.length || f.type.includes(deviceType);
      const matchAlerts = !ui.alertsOnly || dev.status !== "normal";
      if (matchSearch && matchStatus && matchType && matchAlerts)
        matchingIds.add(dev.id);
    });
    device.applySearchFilter(matchingIds, true);
    device.setSearchFocus(matchingIds, (id) => {
      const dev = editor.devices.get(id);
      return dev?.hostname ?? dev?.ip ?? id;
    });
    ui.searchMatchCount = matchingIds.size;
  }

  function _startLoop() {
    scene.startLoop((delta, elapsed) => {
      trackPerformance(delta, elapsed);
      link.update(delta);
      blast.update(delta);
      vnode.update(elapsed);
      flash.update(delta);
      gizmo.update(scene.camera);
      device.tick(scene.camera, scene.getSize());
      space.updateLod(
        scene.camera,
        scene.controls.target,
        scene.getSize(),
        device.getLabelObstacles(),
        scene.getLabelExclusions(),
      );
      if (ui.showParticles) particle.update(delta, ui.visibleLinkTypes);
      _updateOffscreenAlerts(elapsed);

      // warning/critical pulse — walks _alertIds (kept in sync by the status
      // watcher) instead of every device, so cost tracks alarm count, not
      // total device count.
      if (!hasActiveFilter()) {
        _alertIds.forEach((id) => {
          const status = editor.devices.get(id)?.status;
          if (status === "warning")
            device.pulseStatus(
              id,
              "warning",
              0.4 * Math.abs(Math.sin(elapsed * 1.6)),
            );
          else if (status === "critical")
            device.pulseStatus(
              id,
              "critical",
              0.7 * Math.abs(Math.sin(elapsed * 4.0)),
            );
        });
      }

      if (
        _pointerOverCanvas &&
        !_gizmoAxis &&
        !linkDrag.isDrawing &&
        !dragMove.hasPending
      ) {
        const hit = raycast.castHover(32);
        const newHov = hit.deviceId ?? hit.linkId ?? hit.linkHandleId ?? null;
        if (newHov) {
          _hoverMissStreak = 0;
          if (newHov !== ui.hoveredId) ui.hoveredId = newHov;
        } else if (ui.hoveredId) {
          // A single frame with no hit under the pointer is usually raycast
          // noise at the edge of the hit-tested geometry (antialiasing,
          // instanced-mesh bounds, a throttled poll landing mid-move) rather
          // than the pointer actually leaving the device — clearing on every
          // miss made the hover ring blink on and off while sitting still
          // near an edge. Require a short run of misses before clearing.
          _hoverMissStreak += 1;
          if (_hoverMissStreak >= 3) ui.hoveredId = null;
        }
      }
    });
  }

  function hasActiveFilter() {
    return (
      !!ui.filter.search.trim() ||
      ui.filter.status.length > 0 ||
      ui.filter.type.length > 0 ||
      ui.alertsOnly
    );
  }

  // Off-screen / occluded critical-alert radar: a dense rack or a bad camera
  // angle can hide a real alarm indefinitely (the 3D scene has no other way
  // to surface it).
  //
  // Split into two passes with very different costs:
  //   - _offscreenMembers: WHICH devices currently need an arrow. Raycasts
  //     per candidate, so it's throttled to a few times a second.
  //   - the per-frame call below: WHERE on screen each arrow sits. Pure
  //     projection math, no raycasting — runs every frame so arrows track
  //     camera movement smoothly instead of visibly snapping into place
  //     every ~250ms (that snap was reported as stutter/lag while panning).
  let _offscreenMembers: { id: string; status: "critical" | "warning" }[] = [];

  function _refreshOffscreenMembers() {
    const candidates = editor
      .scopedDevices(ui.activeRootSpaceId)
      .filter((d) => d.status === "critical" || d.status === "warning")
      .sort((a) => (a.status === "critical" ? -1 : 1));

    if (!candidates.length) {
      _offscreenMembers = [];
      return;
    }

    _offscreenRaycaster ??= new THREE.Raycaster();
    const cam = scene.camera;
    const camPos = cam.position;
    const meshes = [...device.getInstancedMeshes(), ...space.getHitMeshes()];

    const members: typeof _offscreenMembers = [];
    for (const dev of candidates) {
      if (members.length >= 12) break;
      const pos = device.getDeviceWorldPos(dev.id);
      if (!pos) continue;

      const ndc = pos.clone().project(cam);
      const offscreen =
        Math.abs(ndc.x) > 1 || Math.abs(ndc.y) > 1 || ndc.z > 1 || ndc.z < -1;

      let occluded = false;
      if (!offscreen) {
        const dist = pos.distanceTo(camPos);
        const dir = pos.clone().sub(camPos).normalize();
        _offscreenRaycaster.set(camPos, dir);
        _offscreenRaycaster.far = Math.max(dist - 0.15, 0);
        occluded =
          _offscreenRaycaster.intersectObjects(meshes, false).length > 0;
      }
      if (!offscreen && !occluded) continue;

      members.push({
        id: dev.id,
        status: dev.status as "critical" | "warning",
      });
    }
    _offscreenMembers = members;
  }

  function _updateOffscreenAlerts(elapsed: number) {
    if (!_canvas || !device) {
      if (ui.offscreenAlerts.length) ui.offscreenAlerts = [];
      return;
    }

    if (elapsed - _lastOffscreenCheck >= 0.25) {
      _lastOffscreenCheck = elapsed;
      _refreshOffscreenMembers();
    }

    if (!_offscreenMembers.length) {
      if (ui.offscreenAlerts.length) ui.offscreenAlerts = [];
      return;
    }

    const cam = scene.camera;
    const w = _canvas.clientWidth || 1;
    const h = _canvas.clientHeight || 1;

    const results: typeof ui.offscreenAlerts = [];
    for (const m of _offscreenMembers) {
      const pos = device.getDeviceWorldPos(m.id);
      if (!pos) continue;
      const ndc = pos.clone().project(cam);

      // Direction from screen center toward the (possibly behind-camera) NDC
      // point, clamped to the viewport edge so the arrow always sits on the
      // border pointing the right way.
      let x = ndc.x;
      let y = -ndc.y;
      if (ndc.z > 1 || ndc.z < -1) {
        x = -x;
        y = -y;
      } // behind the camera: flip
      const angle = Math.atan2(y, x);
      const margin = 0.92;
      const scale = Math.min(
        margin / Math.max(Math.abs(x), 1e-6),
        margin / Math.max(Math.abs(y), 1e-6),
        1,
      );
      const cx = x * scale;
      const cy = y * scale;

      results.push({
        id: m.id,
        status: m.status,
        edgeX: (cx * 0.5 + 0.5) * w,
        edgeY: (cy * 0.5 + 0.5) * h,
        angle: (angle * 180) / Math.PI + 90,
      });
    }

    ui.offscreenAlerts = results;
  }

  function trackPerformance(delta: number, elapsed: number) {
    _fpsFrames += 1;
    if (!_fpsWindowStart) _fpsWindowStart = elapsed;
    const windowSeconds = elapsed - _fpsWindowStart;
    if (windowSeconds < 5) return;

    const fps = _fpsFrames / windowSeconds;
    const now = performance.now();
    if (fps < 30 && now - _lastPerfWarning > 15000) {
      _lastPerfWarning = now;
      options.onPerformanceWarning?.({
        type: "low-fps",
        fps: Math.round(fps * 10) / 10,
        frameMs: Math.round(delta * 10000) / 10,
        devices: editor.devices.size,
        links: editor.links.size,
      });

      // Sustained low FPS used to be purely advisory — the host had to react
      // to onPerformanceWarning itself, and nothing changed on screen if it
      // didn't. Now the editor takes one concrete, reversible step on its own
      // (drop the decorative traffic particles, the priciest per-frame cost
      // that isn't load-bearing information) and tells the operator why.
      if (ui.showParticles && !_autoPerfModeApplied) {
        _autoPerfModeApplied = true;
        ui.showParticles = false;
        ui.addToast(
          "Performance mode: link-traffic particles disabled (low frame rate detected)",
          "warning",
        );
      }
    }
    _fpsWindowStart = elapsed;
    _fpsFrames = 0;
  }

  function onPointerDown(e: PointerEvent) {
    if (!_canvas) return;
    _startPointer = { x: e.clientX, y: e.clientY };
    raycast.updatePointer(e, _canvas);
    _pointerOverCanvas = true;
    _isDragCandidate = false;

    if (ui.mode === "edit" && gizmo.isVisible) {
      const axis = gizmo.pickAxis(raycast.currentPointer, scene.camera);
      if (axis) {
        _gizmoAxis = axis;
        _gizmoStartPos = gizmo.position;
        _gizmoStartDrag =
          axis === "y"
            ? _verticalPlanePoint(e, _gizmoStartPos)
            : raycast.getGroundPoint(e, _canvas);

        const t = gizmo.currentTarget;
        _spaceChildren = [];
        if (t?.type === "space") {
          const spacePos = _gizmoStartPos.clone();
          (editor.devicesBySpace.get(t.id) ?? []).forEach((d) => {
            const dp = device.getDeviceWorldPos(d.id);
            if (dp)
              _spaceChildren.push({
                id: d.id,
                offset: dp.clone().sub(spacePos),
              });
          });
        }
        scene.controls.enabled = false;
        return;
      }
    }

    if (ui.mode === "edit" && ui.backgroundEditActive) {
      const bgId = _pickBackground(e);
      if (bgId) {
        ui.select({ type: "background", id: bgId });
        scene.controls.enabled = true;
        return;
      }
    }

    const hit = raycast.castClick(ui.linkToolActive);

    if (ui.mode === "edit" && ui.linkToolActive) {
      const startId = hit.deviceId ?? _nearestDeviceInScreen(e, _canvas, 28);
      if (startId) {
        linkDrag.onMouseDown(startId, e);
        _isDragCandidate = true;
        scene.controls.enabled = false;
        return;
      }
    }

    if (ui.mode === "edit" && hit.linkHandleId) {
      _saveUndo();
      dragMove.onMouseDown(hit.linkHandleId, "linkHandle", e);
      _isDragCandidate = true;
      scene.controls.enabled = false;
      return;
    }

    scene.controls.enabled = true;
  }

  function onPointerMove(e: PointerEvent) {
    if (!_canvas) return;
    raycast.updatePointer(e, _canvas);
    _pointerOverCanvas = true;

    if (ui.mode === "edit" && _gizmoAxis && _gizmoStartDrag && _gizmoStartPos) {
      const cur =
        _gizmoAxis === "y"
          ? _verticalPlanePoint(e, _gizmoStartPos)
          : raycast.getGroundPoint(e, _canvas);
      if (cur) {
        const delta = cur.clone().sub(_gizmoStartDrag);
        const newPos = _gizmoStartPos.clone();
        if (_gizmoAxis === "x" || _gizmoAxis === "xz") newPos.x += delta.x;
        if (_gizmoAxis === "z" || _gizmoAxis === "xz") newPos.z += delta.z;
        if (_gizmoAxis === "y")
          newPos.y = Math.max(0, _gizmoStartPos.y + delta.y);

        const t = gizmo.currentTarget;
        // Background objects (floor plans, building models) are free-form
        // scale/placement, not grid-mounted like racks/devices — leave them off it.
        if (_gizmoAxis !== "y" && t?.type !== "background") _snapXZ(newPos);
        gizmo.setPosition(newPos);

        if (t?.type === "device") {
          device.setPosition(t.id, newPos);
          link.refreshPositionsFor([t.id], (id) =>
            device.getDeviceWorldPos(id),
          );
          _syncParticles();
        } else if (t?.type === "space") {
          space.setPosition(t.id, newPos);
          _spaceChildren.forEach((c) =>
            device.setPosition(c.id, newPos.clone().add(c.offset)),
          );
          link.refreshPositionsFor(
            _spaceChildren.map((c) => c.id),
            (id) => device.getDeviceWorldPos(id),
          );
          _syncParticles();
        } else if (t?.type === "background") {
          background.setPosition(t.id, newPos);
        }
      }
      return;
    }

    if (ui.mode === "edit" && ui.linkToolActive && linkDrag.isDrawing) {
      linkDrag.onMouseMove(e, _canvas);
      return;
    }

    if (ui.mode === "edit" && dragMove.hasPending) {
      const newPos = dragMove.onMouseMove(e, _canvas, scene.camera);
      if (newPos && dragMove.isDragging) {
        const target = dragMove.currentTarget;
        if (target.type === "device") {
          device.setPosition(target.id!, _snapXZ(newPos));
        } else if (target.type === "space") {
          space.setPosition(target.id!, _snapXZ(newPos));
        } else if (target.type === "linkHandle") {
          link.updateMidpoint(target.id!, newPos.x, newPos.z);
          _syncParticles();
        }
        return;
      }
    }

    if (
      ui.mode === "edit" &&
      gizmo.isVisible &&
      gizmo.isHovering(raycast.currentPointer, scene.camera)
    ) {
      ui.hideTooltip();
      _canvas.style.cursor = "move";
      return;
    }

    // hover tooltip — use hoveredId maintained by the render loop to avoid
    // throttle conflicts (a second castHover within the throttle window returns
    // {} and incorrectly hides the tooltip).
    const hov = ui.hoveredId;
    if (hov && editor.devices.has(hov)) {
      ui.showTooltipAt(e.clientX, e.clientY, hov);
      _canvas.style.cursor = ui.linkToolActive ? "crosshair" : "pointer";
    } else if (hov) {
      ui.hideTooltip();
      _canvas.style.cursor = ui.mode === "edit" ? "move" : "pointer";
    } else {
      ui.hideTooltip();
      _canvas.style.cursor = ui.linkToolActive ? "crosshair" : "";
    }
  }

  function onPointerUp(e: PointerEvent) {
    if (!_canvas) return;

    scene.controls.enabled = true;

    if (ui.mode === "edit" && _gizmoAxis) {
      const t = gizmo.currentTarget;
      const pos = gizmo.position;
      _saveUndo();
      let movedDeviceIds: string[] = [];
      if (t?.type === "device") {
        editor.mapDevice(
          t.id,
          editor.getMappingByDeviceId(t.id)?.primarySpaceId ?? "",
          0,
          { x: pos.x, y: pos.y, z: pos.z },
        );
        editor.logChange("layout.update", `Device moved: ${t.id}`);
        ui.addToast("Device moved", "success");
        movedDeviceIds = [t.id];
      } else if (t?.type === "space") {
        editor.updateSpace(t.id, {
          position: { x: pos.x, y: pos.y, z: pos.z },
        });
        _spaceChildren.forEach((c) => {
          const np = pos.clone().add(c.offset);
          editor.mapDevice(
            c.id,
            editor.getMappingByDeviceId(c.id)?.primarySpaceId ?? t.id,
            0,
            { x: np.x, y: np.y, z: np.z },
          );
        });
        editor.logChange(
          "space.update",
          `Space moved: ${t.id} (+${_spaceChildren.length} devices)`,
        );
        ui.addToast("Space moved", "success");
        movedDeviceIds = _spaceChildren.map((c) => c.id);
      } else if (t?.type === "background") {
        editor.updateBackgroundObject(t.id, {
          position: { x: pos.x, y: pos.y, z: pos.z },
        });
        editor.logChange("background.update", `Background moved: ${t.id}`);
        ui.addToast("Background moved", "success");
      }
      // Refresh only the links touching what actually moved (keeps manual
      // routing, and stays cheap at 10k+ links instead of walking every link).
      if (movedDeviceIds.length) {
        link.refreshPositionsFor(movedDeviceIds, (id) =>
          device.getDeviceWorldPos(id),
        );
        _syncParticles();
      }
      _gizmoAxis = null;
      _gizmoStartDrag = null;
      _gizmoStartPos = null;
      _spaceChildren = [];
      return;
    }

    // A background object was already selected in onPointerDown — don't let
    // the normal device/space/link hit-test below immediately overwrite it.
    if (
      ui.mode === "edit" &&
      ui.backgroundEditActive &&
      ui.selection?.type === "background" &&
      _pickBackground(e)
    ) {
      return;
    }

    raycast.updatePointer(e, _canvas);
    const hit = raycast.castClick(ui.linkToolActive);

    if (ui.mode === "edit" && ui.linkToolActive && linkDrag.isDrawing) {
      const targetId = hit.deviceId ?? _nearestDeviceInScreen(e, _canvas, 28);
      const wasDragging = linkDrag.isDragging;
      const result = linkDrag.onMouseUp(targetId ?? null, e);
      if (result === "cancelled" && wasDragging) {
        ui.addToast("Release on a device to create a link", "info");
      }
      _isDragCandidate = false;
      return;
    }

    if (ui.mode === "edit" && dragMove.hasPending) {
      const result = dragMove.onMouseUp(e, _canvas, scene.camera);
      if (result) {
        const { targetId, targetType, newPos } = result;
        if (targetType !== "linkHandle") _snapXZ(newPos);
        // linkHandle undo was saved on pointerdown; device/space save here (after drag)
        if (targetType !== "linkHandle") _saveUndo();
        if (targetType === "device") {
          editor.mapDevice(
            targetId,
            editor.getMappingByDeviceId(targetId)?.primarySpaceId ?? "",
            0,
            { x: newPos.x, y: 0, z: newPos.z },
          );
          editor.logChange("layout.update", `Device moved: ${targetId}`);
          ui.addToast(`Device moved`, "success");
          link.refreshPositionsFor([targetId], (id) =>
            device.getDeviceWorldPos(id),
          );
          _syncParticles();
        } else if (targetType === "space") {
          editor.updateSpace(targetId, {
            position: { x: newPos.x, y: 0, z: newPos.z },
          });
          editor.logChange("space.update", `Space moved: ${targetId}`);
          ui.addToast(`Space moved`, "success");
        } else if (targetType === "linkHandle") {
          editor.updateLink(targetId, { midX: newPos.x, midZ: newPos.z });
          editor.logChange("topology.link.update", `Link routing changed`);
        }
        _isDragCandidate = false;
        return;
      }
    }

    const dx = e.clientX - _startPointer.x;
    const dy = e.clientY - _startPointer.y;
    if (Math.sqrt(dx * dx + dy * dy) > 8) {
      _isDragCandidate = false;
      return;
    }
    _isDragCandidate = false;

    if (hit.deviceId) {
      if (e.ctrlKey || e.metaKey) {
        // Ctrl+Click: toggle multi-select
        if (ui.multiSelectedDeviceIds.has(hit.deviceId)) {
          ui.multiSelectedDeviceIds.delete(hit.deviceId);
        } else {
          ui.multiSelectedDeviceIds.add(hit.deviceId);
          if (ui.multiSelectedDeviceIds.size === 1)
            ui.select({ type: "device", id: hit.deviceId });
        }
        device.setMultiHighlight([...ui.multiSelectedDeviceIds]);
      } else {
        ui.multiSelectedDeviceIds.clear();
        device.setMultiHighlight([]);
        ui.select({ type: "device", id: hit.deviceId });
      }
    } else if (hit.spaceId) {
      ui.multiSelectedDeviceIds.clear();
      device.setMultiHighlight([]);
      ui.select({ type: "space", id: hit.spaceId });
      // Clicking a rack directly in the 3D view used to only select it — the
      // camera stayed put, unlike the same rack clicked from the Alerts
      // panel (which already flies via focusSpace). Racks are small/dense
      // enough that flying in is what an operator almost always wants next;
      // zones/floors/sites are big enough that an unrequested fly-to would
      // just be disorienting, so this stays scoped to racks. Edit mode skips
      // it too — the camera needs to hold still while a gizmo attaches.
      if (ui.mode === "view" && editor.spaces.get(hit.spaceId)?.type === "rack") {
        focusSpace(hit.spaceId);
      }
    } else if (hit.linkId) {
      ui.multiSelectedDeviceIds.clear();
      device.setMultiHighlight([]);
      ui.select({ type: "link", id: hit.linkId });
    } else if (!hit.linkHandleId) {
      ui.multiSelectedDeviceIds.clear();
      device.setMultiHighlight([]);
      ui.select(null);
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      ui.select(null);
      ui.hideContextMenu();
      ui.multiSelectedDeviceIds.clear();
      device?.setMultiHighlight([]);
      linkDrag.cancel();
      dragMove.cancel();
      scene.controls.enabled = true;
      blast.clear();
      ui.blastSourceId = null;
      return;
    }
    if (e.key === "f" || e.key === "F") {
      camera.flyToOverview();
      return;
    }
    if ((e.key === "l" || e.key === "L") && !isInputFocused()) {
      if (ui.mode === "edit") ui.toggleLinkTool();
      return;
    }
    if ((e.key === "]" || e.key === "[") && !isInputFocused()) {
      cycleAlarms(e.key === "]" ? 1 : -1);
      return;
    }

    if (
      ui.mode === "edit" &&
      (e.key === "Delete" || e.key === "Backspace") &&
      !isInputFocused()
    ) {
      e.preventDefault();
      // Multi-select bulk delete — confirmed first. A single stray Del with
      // several devices still multi-selected from an earlier Ctrl+Click is
      // easy to not notice immediately, and undoing it means recognizing
      // that it happened; a one-off single delete stays instant (Ctrl+Z
      // right there is enough for that case).
      if (ui.multiSelectedDeviceIds.size > 1) {
        const ids = [...ui.multiSelectedDeviceIds];
        ui.requestConfirm(
          `Delete ${ids.length} selected devices? This also removes their links.`,
          () => {
            _saveUndo();
            ids.forEach((id) => {
              editor.unmapDevice(id);
            });
            editor.logChange("device.unmap", `${ids.length} devices removed`);
            ui.addToast(`${ids.length} devices removed`, "info");
            ui.multiSelectedDeviceIds.clear();
            device.setMultiHighlight([]);
            ui.select(null);
          },
        );
        return;
      }
      const sel = ui.selection;
      if (!sel) return;
      _saveUndo();
      if (sel.type === "device") {
        editor.unmapDevice(sel.id);
        editor.logChange("device.unmap", `Device removed: ${sel.id}`);
        ui.addToast("Device removed", "info");
        ui.select(null);
      } else if (sel.type === "link") {
        editor.removeLink(sel.id);
        editor.logChange("topology.link.delete", `Link deleted: ${sel.id}`);
        ui.addToast("Link deleted", "info");
        ui.select(null);
      } else if (sel.type === "space") {
        editor.archiveSpace(sel.id);
        refreshSpace(sel.id);
        editor.logChange("space.archive", `Space archived: ${sel.id}`);
        ui.addToast("Space archived", "info");
        ui.select(null);
      }
      return;
    }

    if (e.ctrlKey && e.key === "z" && !isInputFocused()) {
      e.preventDefault();
      const snap = _undoStack.pop();
      if (snap) {
        _redoStack.push(_snapLayout());
        _restoreSnap(snap);
        ui.addToast("Undone", "info");
      } else {
        ui.addToast("Nothing to undo", "info");
      }
      return;
    }
    if (e.ctrlKey && e.key === "y" && !isInputFocused()) {
      e.preventDefault();
      const snap = _redoStack.pop();
      if (snap) {
        _undoStack.push(_snapLayout());
        _restoreSnap(snap);
        ui.addToast("Redone", "info");
      } else {
        ui.addToast("Nothing to redo", "info");
      }
      return;
    }
  }

  function _nearestDeviceInScreen(
    e: PointerEvent,
    canvas: HTMLCanvasElement,
    radiusPx: number,
  ): string | null {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let bestId: string | null = null;
    let bestDist = radiusPx * radiusPx;

    editor.mappings.forEach((m) => {
      if (!m.position || m.mappingStatus === "unmapped") return;
      const world = new THREE.Vector3(m.position.x, m.position.y, m.position.z);
      world.project(scene.camera);
      const sx = (world.x * 0.5 + 0.5) * rect.width;
      const sy = (-world.y * 0.5 + 0.5) * rect.height;
      const dx = sx - mx;
      const dy = sy - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < bestDist) {
        bestDist = d2;
        bestId = m.rawDeviceId;
      }
    });
    return bestId;
  }

  function isInputFocused() {
    const el = document.activeElement;
    return (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement
    );
  }

  // ── Blast Radius ─────────────────────────────────────────────────────
  function showBlastRadius(deviceId: string) {
    const links = [...editor.links.values()];

    // Pass 1: collect all direct (hop-1) neighbors using a Set for O(1) lookup.
    const hop1Map = new Map<string, string>(); // neighborId → linkedDeviceId
    links.forEach((l) => {
      if (l.sourceDeviceId === deviceId)
        hop1Map.set(l.targetDeviceId, deviceId);
      if (l.targetDeviceId === deviceId)
        hop1Map.set(l.sourceDeviceId, deviceId);
    });
    hop1Map.delete(deviceId); // guard against self-loop links

    // Pass 2: collect hop-2 neighbors (not already in hop-1, not the source).
    const hop2Map = new Map<string, string>(); // neighborId → linkedDeviceId
    links.forEach((l) => {
      const hop1Id = hop1Map.has(l.sourceDeviceId)
        ? l.sourceDeviceId
        : hop1Map.has(l.targetDeviceId)
          ? l.targetDeviceId
          : null;
      if (!hop1Id) return;
      const hop2Id =
        hop1Id === l.sourceDeviceId ? l.targetDeviceId : l.sourceDeviceId;
      if (hop2Id !== deviceId && !hop1Map.has(hop2Id)) {
        hop2Map.set(hop2Id, hop1Id);
      }
    });

    const affected: BlastInfo[] = [];
    hop1Map.forEach((linkedId, id) =>
      affected.push({ deviceId: id, hop: 1, linkedDeviceId: linkedId }),
    );
    hop2Map.forEach((linkedId, id) =>
      affected.push({ deviceId: id, hop: 2, linkedDeviceId: linkedId }),
    );

    blast.show(affected, (id) => device.getDeviceWorldPos(id));
    ui.blastSourceId = deviceId;
  }

  // Incremental sync instead of a full dispose+reload: at 10k+ links, tearing
  // down and recreating every Line2/geometry/material on any single link
  // change (including in-place edits, now that this also fires off
  // linksRevision) would be the dominant cost in the whole app. Only the
  // ids that actually changed touch the renderer; unrelated links are left
  // alone, and `link`/`raycast`/`linkDrag` never need to be recreated.
  function rebuildLinks() {
    const rendered = link.getRenderedLinkIds();
    const getPos = (id: string) => device.getDeviceWorldPos(id);

    rendered.forEach((id) => {
      if (!editor.links.has(id)) link.removeLink(id);
    });
    editor.links.forEach((l) => {
      if (rendered.has(l.id)) link.updateLink(l, getPos);
      else link.addLink(l, getPos);
    });

    const all: EdgeType[] = [
      "physical",
      "logical",
      "service_dependency",
      "traffic_flow",
      "security_path",
      "manual",
      "inferred",
    ];
    all.forEach((t) => link.setVisible(t, ui.visibleLinkTypes.has(t)));
    _syncParticles();
  }

  function dropDeviceAt(deviceId: string, e: DragEvent) {
    if (!_canvas) return;
    if (ui.mode !== "edit") {
      ui.addToast("Switch to Edit mode to place devices", "warning");
      return;
    }
    const rect = _canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, scene.camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const pt = new THREE.Vector3();

    const target = scene.controls.target;
    let dropPos = pt;
    if (!ray.ray.intersectPlane(plane, pt) || pt.distanceTo(target) > 60) {
      dropPos = target.clone().setY(0);
    }

    _saveUndo();
    editor.mapDevice(deviceId, "", 0, { x: dropPos.x, y: 0.4, z: dropPos.z });
    editor.logChange("device.map", `Device placed: ${deviceId}`);
    ui.addToast("Device placed", "success");
    nextTick(() => {
      const dev = editor.devices.get(deviceId);
      const m = editor.getMappingByDeviceId(deviceId);
      if (dev && m?.position) {
        device.addDevice(dev, m);
        ui.select({ type: "device", id: deviceId });
        applySearchFilter();
        // Fly camera to the newly placed device so the user can see it.
        const worldPos = device.getDeviceWorldPos(deviceId);
        if (worldPos) camera.flyToDevice(worldPos);
      } else {
        ui.addToast("Failed to place device — check Edit mode", "warning");
      }
    });
  }

  function confirmCreateLink(srcId: string, tgtId: string, type: EdgeType) {
    if (ui.mode !== "edit") {
      ui.addToast("Switch to Edit mode to create links", "warning");
      useUIStore().hideContextMenu();
      return;
    }
    _saveUndo();
    const id = `link-${Date.now()}`;
    editor.addLink({
      id,
      sourceDeviceId: srcId,
      targetDeviceId: tgtId,
      type,
      source: "manual",
      status: "up",
    });
    editor.logChange("topology.link.create", `Link created: ${type}`);
    ui.addToast(`${type} link created`, "success");
    useUIStore().hideContextMenu();
  }

  // Re-renders on demand and reads the canvas immediately (rather than
  // relying on the next render-loop frame) so the pixels are still in the
  // drawing buffer — the renderer isn't created with
  // preserveDrawingBuffer:true, so a toDataURL() any later than this would
  // often come back blank.
  function _captureThumbnail(): string | undefined {
    try {
      scene.renderer.render(scene.scene, scene.camera);
      return scene.renderer.domElement.toDataURL("image/jpeg", 0.5);
    } catch {
      return undefined;
    }
  }

  function saveCurrentView(name: string) {
    const view: SavedView = {
      id: `view-${Date.now()}`,
      name,
      cameraPos: {
        x: scene.camera.position.x,
        y: scene.camera.position.y,
        z: scene.camera.position.z,
      },
      cameraTarget: {
        x: scene.controls.target.x,
        y: scene.controls.target.y,
        z: scene.controls.target.z,
      },
      createdAt: new Date().toLocaleString(),
      thumbnail: _captureThumbnail(),
    };
    editor.addSavedView(view);
    ui.addToast(`View saved: ${name}`, "success");
  }

  function loadSavedView(view: SavedView) {
    camera.flyTo(
      new THREE.Vector3(view.cameraPos.x, view.cameraPos.y, view.cameraPos.z),
      new THREE.Vector3(
        view.cameraTarget.x,
        view.cameraTarget.y,
        view.cameraTarget.z,
      ),
    );
  }

  function focusDevice(id: string) {
    const spaceId = editor.getMappingByDeviceId(id)?.primarySpaceId;
    if (spaceId && _switchScopeIfNeeded(spaceId, { type: "device", id }))
      return;
    const pos = device.getDeviceWorldPos(id);
    if (pos) camera.flyToDevice(pos);
  }

  // Same reset the "F" key triggers (see onKeyDown) — exposed so a visible
  // toolbar button can offer the same escape hatch to users who don't know
  // the shortcut or who've lost their bearings in the 3D scene.
  function resetCamera() {
    camera.flyToOverview();
  }

  // Orbiting to inspect a rack from a few angles is normal, but there's no
  // way back to a known, level orientation short of Reset view — which also
  // re-fits the whole scope and loses whatever you'd zoomed into. This keeps
  // distance and elevation, only resetting the horizontal spin, matching
  // OrbitControls' own spherical-coordinate convention (radius, polar around
  // the vertical axis, azimuthal around it too) so the motion reads as a
  // pure rotation rather than a reposition.
  function faceNorth() {
    const controls = scene.controls;
    const offset = scene.camera.position.clone().sub(controls.target);
    const spherical = new THREE.Spherical().setFromVector3(offset);
    spherical.theta = 0;
    const newPos = controls.target
      .clone()
      .add(new THREE.Vector3().setFromSpherical(spherical));
    camera.flyTo(newPos, controls.target.clone());
  }

  function zoomCamera(factor: number) {
    camera.zoom(factor);
  }

  function setCameraView(view: "top" | "perspective") {
    camera.setView(view);
  }

  // Pans to a point picked on the 2D minimap while preserving the current
  // camera-to-target offset (angle/zoom), rather than jumping to a fixed
  // device-framing distance — mirrors how map-click navigation behaves in
  // familiar 2D tools.
  function flyToWorldPoint(x: number, z: number) {
    camera.panToXZ(x, z);
  }

  function setDeviceAcknowledged(id: string, acked: boolean) {
    device.setAcknowledged(id, acked);
  }

  function toggleColorblindMode() {
    ui.setColorblindMode(!ui.colorblindMode);
    applyColorMode(ui.colorblindMode ? "colorblind" : "default");
    device?.recolorAll();
  }

  // Cycles selection through active critical/warning devices on the current
  // floor without touching the mouse — bound to "[" / "]" in onKeyDown.
  // Severity-sorted so the worst alarm is always one keystroke away.
  function _alarmDevices() {
    const rank: Record<string, number> = { critical: 0, warning: 1 };
    return editor
      .scopedDevices(ui.activeRootSpaceId)
      .filter((d) => d.status === "critical" || d.status === "warning")
      .sort(
        (a, b) => (rank[a.status ?? ""] ?? 9) - (rank[b.status ?? ""] ?? 9),
      );
  }

  function cycleAlarms(direction: 1 | -1) {
    const list = _alarmDevices();
    if (!list.length) return;
    const curIdx = list.findIndex((d) => d.id === ui.selectedDeviceId);
    const nextIdx =
      curIdx === -1
        ? direction === 1
          ? 0
          : list.length - 1
        : (curIdx + direction + list.length) % list.length;
    const next = list[nextIdx];
    ui.select({ type: "device", id: next.id });
    focusDevice(next.id);
  }

  function focusSpace(id: string) {
    if (_switchScopeIfNeeded(id, { type: "space", id })) return;
    const sp = editor.spaces.get(id);
    if (!sp?.position) return;
    const pos = new THREE.Vector3(sp.position.x, sp.position.y, sp.position.z);
    const size = sp.size ?? { width: 8, height: 4, depth: 8 };
    camera.flyToSpace(pos, size);
  }

  // A device/space picked from a global panel (alerts, the full space tree)
  // may live on a floor that isn't currently loaded. Switches scope first and
  // defers the actual focus until that scope's rebuild finishes (see the
  // activeRootSpaceId watcher) instead of silently no-oping or flying the
  // camera to empty coordinates in the wrong floor.
  function _switchScopeIfNeeded(
    anchorSpaceId: string,
    focus: { type: "device" | "space"; id: string },
  ): boolean {
    const scope = editor.resolveLeafScope(anchorSpaceId);
    if (!scope || scope === ui.activeRootSpaceId) return false;
    _pendingFocus = focus;
    ui.activeRootSpaceId = scope;
    return true;
  }

  function focusVirtualNode(id: string) {
    const pos = vnode.getNodeWorldPos(id);
    if (pos) camera.flyToDevice(pos);
  }

  function onTimelineScrub(frameIdx: number) {
    if (frameIdx < 0) return;
    const frame = timeline.getFrame(frameIdx);
    if (!frame) return;
    Object.entries(frame.states).forEach(([id, s]) =>
      editor.updateDeviceStatus(id, s.status, s.metrics),
    );
  }

  async function rebuildAll() {
    _ensureActiveRootSpace();
    const scope = ui.activeRootSpaceId;

    space.dispose();
    space = new SpaceRenderer(scene.scene);
    space.loadSpaces(editor.scopedSpaces(scope));

    device.dispose();
    device = new DeviceRenderer(scene.scene);

    await preloadCustomModels(deviceTypes.customTypes);

    device.loadInstanced(editor.scopedDevices(scope), editor.mappings, (id) =>
      editor.getMappingByDeviceId(id),
    );

    link.dispose();
    link = new LinkRenderer(scene.scene);
    _applyLinkResolution();
    link.loadLinks(editor.scopedLinks(scope), (id) =>
      device.getDeviceWorldPos(id),
    );
    const allTypes: EdgeType[] = [
      "physical",
      "logical",
      "service_dependency",
      "traffic_flow",
      "security_path",
      "manual",
      "inferred",
    ];
    allTypes.forEach((t) => link.setVisible(t, ui.visibleLinkTypes.has(t)));

    _syncParticles();

    background.dispose();
    background = new BackgroundRenderer(scene.scene);
    await background.loadObjects(editor.scopedBackgroundObjects(scope));
    background.setEditMode(ui.backgroundEditActive);

    raycast = new RaycastManager(scene.camera, device, space, link);
    linkDrag = new LinkDragManager(
      scene.camera,
      link,
      device,
      (srcId, tgtId, mx, my) =>
        useUIStore().showContextMenu(mx, my, srcId, tgtId),
    );

    _flyToFitScope();
  }

  // Frames the camera around everything currently in scope instead of a fixed
  // distance — a floor's content is much smaller than the old multi-site
  // layout, so a constant fly-to-overview position left it looking tiny.
  function _flyToFitScope() {
    const b = editor.scopedBounds(ui.activeRootSpaceId);
    if (!b) {
      camera.flyToOverview();
      return;
    }
    const center = new THREE.Vector3(
      (b.minX + b.maxX) / 2,
      0,
      (b.minZ + b.maxZ) / 2,
    );
    camera.flyToSpace(center, {
      width: b.maxX - b.minX,
      depth: b.maxZ - b.minZ,
    });
  }

  function refreshSpace(spaceId: string) {
    // The space list/tree spans the whole hierarchy, but the 3D renderer only
    // holds the currently scoped floor's objects — skip spaces outside scope
    // instead of leaking a foreign floor's object into the active scene.
    const scope = ui.activeRootSpaceId;
    if (scope && !editor.descendantSpaceIds(scope).has(spaceId)) return;
    const sp = editor.spaces.get(spaceId);
    space.removeSpace(spaceId);
    if (sp && !sp.archived) {
      space.addSpace(sp);
      if (ui.selection?.type === "space" && ui.selection.id === spaceId) {
        space.setSelected(spaceId, true);
      }
    }
  }

  function dispose() {
    _mounted = false;
    ui.offscreenAlerts = [];
    _watchStops.splice(0).forEach((stop) => stop());
    _canvas?.removeEventListener("pointerdown", onPointerDown);
    _canvas?.removeEventListener("pointermove", onPointerMove);
    _canvas?.removeEventListener("pointerup", onPointerUp);
    _canvas?.removeEventListener("pointerleave", onPointerLeaveCanvas);
    _canvas?.removeEventListener("contextmenu", onContextMenu);
    window.removeEventListener("keydown", onKeyDown);
    gizmo?.dispose();
    device?.dispose();
    space?.dispose();
    link?.dispose();
    particle?.dispose();
    blast?.dispose();
    vnode?.dispose();
    flash?.dispose();
    camera.dispose();
    scene.dispose();
    _canvas = null;
    _prevStatus.clear();
    _alertIds.clear();
  }

  function onContextMenu(e: MouseEvent) {
    e.preventDefault();
  }

  return {
    configure,
    init,
    dispose,
    dropDeviceAt,
    confirmCreateLink,
    saveCurrentView,
    loadSavedView,
    focusDevice,
    focusSpace,
    focusVirtualNode,
    resetCamera,
    faceNorth,
    zoomCamera,
    setCameraView,
    flyToWorldPoint,
    setDeviceAcknowledged,
    toggleColorblindMode,
    cycleAlarms,
    onTimelineScrub,
    refreshSpace,
    rebuildAll,
    timeline,
    getScene: () => scene,
  };
}
