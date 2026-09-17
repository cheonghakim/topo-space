const DB_NAME = "topospace-models";
const STORE = "models";
const VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function storeModel(
  typeId: string,
  data: ArrayBuffer,
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const req = tx.objectStore(STORE).put(data, typeId);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => db.close();
  });
}

export async function loadModel(typeId: string): Promise<ArrayBuffer | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(typeId);
    req.onsuccess = () => {
      resolve((req.result as ArrayBuffer) ?? null);
      db.close();
    };
    req.onerror = () => reject(req.error);
  });
}

export async function deleteModel(typeId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const req = tx.objectStore(STORE).delete(typeId);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => db.close();
  });
}
