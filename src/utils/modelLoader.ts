import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export async function loadGltfGeometry(
  data: ArrayBuffer,
): Promise<THREE.BufferGeometry | null> {
  const loader = new GLTFLoader();
  return new Promise((resolve) => {
    loader.parse(
      data,
      "",
      (gltf) => {
        // Collect all mesh geometries, applying world transforms
        const geos: THREE.BufferGeometry[] = [];
        gltf.scene.updateMatrixWorld(true);
        gltf.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.geometry) {
            const geo = obj.geometry.clone() as THREE.BufferGeometry;
            geo.applyMatrix4(obj.matrixWorld);
            geos.push(geo);
          }
        });

        if (!geos.length) {
          resolve(null);
          return;
        }

        const merged =
          geos.length === 1
            ? geos[0]
            : (mergeGeometries(geos, false) ?? geos[0]);

        // Free cloned geometries
        if (geos.length > 1) geos.forEach((g) => g.dispose());

        // Center on XZ, fit in 0.8-unit bounding box, sit on Y=0
        merged.computeBoundingBox();
        const box = merged.boundingBox!;
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = maxDim > 0 ? 0.8 / maxDim : 1;

        merged.translate(-center.x, -box.min.y, -center.z);
        merged.scale(scale, scale, scale);

        resolve(merged);
      },
      (err) => {
        console.warn("[modelLoader] GLTF parse error:", err);
        resolve(null);
      },
    );
  });
}

// Unlike loadGltfGeometry (used for device-type icons), this keeps the full
// scene graph — materials, textures, hierarchy — and applies no auto-fit
// rescale, since background models need their real proportions with scale
// left to the user. Used for background building/room models only.
export async function loadGltfObject(
  data: ArrayBuffer,
): Promise<THREE.Object3D | null> {
  const loader = new GLTFLoader();
  return new Promise((resolve) => {
    loader.parse(
      data,
      "",
      (gltf) => {
        resolve(gltf.scene ?? null);
      },
      (err) => {
        console.warn("[modelLoader] GLTF parse error:", err);
        resolve(null);
      },
    );
  });
}
