import type { MeshBVH } from 'three-mesh-bvh'

declare module 'three' {
  interface BufferGeometry {
    computeBoundsTree(): MeshBVH
    disposeBoundsTree(): void
    boundsTree?: MeshBVH
  }
}
