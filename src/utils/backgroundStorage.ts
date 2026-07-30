// IndexedDB store for background-reference asset bytes (floor-plan images,
// GLTF building models). Separate database from modelStorage.ts's custom
// device-type models so asset ids never collide between the two features.

const DB_NAME = 'topospace-backgrounds'
const STORE   = 'assets'
const VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

export async function storeAsset(id: string, data: ArrayBuffer): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).put(data, id)
    req.onsuccess = () => resolve()
    req.onerror   = () => reject(req.error)
    tx.oncomplete = () => db.close()
  })
}

export async function loadAsset(id: string): Promise<ArrayBuffer | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).get(id)
    req.onsuccess = () => { resolve((req.result as ArrayBuffer) ?? null); db.close() }
    req.onerror   = () => reject(req.error)
  })
}

export async function deleteAsset(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite')
    const req = tx.objectStore(STORE).delete(id)
    req.onsuccess = () => resolve()
    req.onerror   = () => reject(req.error)
    tx.oncomplete = () => db.close()
  })
}
