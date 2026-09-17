import * as THREE from "three";
import type { BackgroundObject } from "@/types";
import { loadAsset } from "@/utils/backgroundStorage";
import { loadGltfObject } from "@/utils/modelLoader";

const DASHBOARD_OPACITY_DEFAULT = 0.3;
const EDIT_OPACITY = 0.85;

interface BgObj {
  root: THREE.Object3D;
  materials: THREE.Material[];
  obj: BackgroundObject;
}

// User-placed reference geometry (floor-plan images, building models) — a
// per-floor tracing guide. Translucent + click-through in normal view;
// callers only raycast against getPickMeshes() while a dedicated "edit
// positions" toggle is on (see ui.backgroundEditActive), mirroring how
// RaycastManager only ever hit-tests explicit candidate lists it's handed.
export class BackgroundRenderer {
  private scene: THREE.Scene;
  private objects = new Map<string, BgObj>();
  private editMode = false;
  private pending = new Map<string, symbol>();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  async loadObjects(objs: BackgroundObject[]) {
    await Promise.all(objs.map((o) => this.addObject(o)));
  }

  async addObject(obj: BackgroundObject) {
    if (this.objects.has(obj.id)) return;
    const token = Symbol(obj.id);
    this.pending.set(obj.id, token);
    try {
      const data = await loadAsset(obj.assetId);
      if (!data || this.pending.get(obj.id) !== token) return;

      let root: THREE.Object3D;
      const materials: THREE.Material[] = [];

      if (obj.kind === "image") {
        const url = URL.createObjectURL(new Blob([data]));
        let texture: THREE.Texture;
        try {
          texture = await new THREE.TextureLoader().loadAsync(url);
        } finally {
          URL.revokeObjectURL(url);
        }
        const w = obj.width ?? 10,
          d = obj.depth ?? 10;
        const mat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
        mesh.rotation.x = -Math.PI / 2;
        materials.push(mat);
        root = mesh;
      } else {
        const modelObj = await loadGltfObject(data);
        if (!modelObj) return;
        root = modelObj;
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const mats = Array.isArray(child.material)
              ? child.material
              : [child.material];
            mats.forEach((m) => {
              m.transparent = true;
              materials.push(m);
            });
          }
        });
        root.scale.setScalar(obj.scale ?? 1);
      }

      root.position.set(obj.position.x, obj.position.y, obj.position.z);
      root.rotation.y = THREE.MathUtils.degToRad(obj.rotationY ?? 0);
      root.traverse((child) => {
        child.userData.backgroundId = obj.id;
      });

      const opacity = this.editMode
        ? EDIT_OPACITY
        : (obj.opacity ?? DASHBOARD_OPACITY_DEFAULT);
      materials.forEach((m) => {
        m.opacity = opacity;
      });

      if (this.pending.get(obj.id) !== token) {
        this._dispose({ root, materials, obj });
        return;
      }
      this.scene.add(root);
      this.objects.set(obj.id, { root, materials, obj });
    } finally {
      if (this.pending.get(obj.id) === token) this.pending.delete(obj.id);
    }
  }

  removeObject(id: string) {
    this.pending.delete(id);
    const o = this.objects.get(id);
    if (!o) return;
    this._dispose(o);
    this.objects.delete(id);
  }

  // Toggled by ui.backgroundEditActive — dims/brightens every background
  // object and gates whether getPickMeshes() returns anything at all.
  setEditMode(active: boolean) {
    this.editMode = active;
    this.objects.forEach(({ materials, obj }) => {
      const opacity = active
        ? EDIT_OPACITY
        : (obj.opacity ?? DASHBOARD_OPACITY_DEFAULT);
      materials.forEach((m) => {
        m.opacity = opacity;
      });
    });
  }

  getPickMeshes(): THREE.Object3D[] {
    if (!this.editMode) return [];
    return [...this.objects.values()].map((o) => o.root);
  }

  getBackgroundIdFromObject(obj: THREE.Object3D): string | null {
    let cur: THREE.Object3D | null = obj;
    while (cur) {
      if (cur.userData.backgroundId) return cur.userData.backgroundId as string;
      cur = cur.parent;
    }
    return null;
  }

  getWorldPos(id: string): THREE.Vector3 | null {
    const o = this.objects.get(id);
    return o ? o.root.position.clone() : null;
  }

  setPosition(id: string, pos: THREE.Vector3) {
    const o = this.objects.get(id);
    if (o) o.root.position.copy(pos);
  }

  dispose() {
    this.pending.clear();
    this.objects.forEach((o) => this._dispose(o));
    this.objects.clear();
  }

  private _dispose(o: BgObj) {
    this.scene.remove(o.root);
    o.root.traverse((child) => {
      if (child instanceof THREE.Mesh) child.geometry?.dispose();
    });
    o.materials.forEach((m) => {
      const map = (m as THREE.MeshBasicMaterial).map;
      map?.dispose();
      m.dispose();
    });
  }
}
