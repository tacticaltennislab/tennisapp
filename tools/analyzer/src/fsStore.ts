import { fileName, fromFile, toFile } from "./project";
import type { Project } from "./types";

/**
 * Saving. A project is one JSON file in a folder the coach chooses (File System Access API, Chrome or
 * Edge). Every save also keeps a copy in this browser's IndexedDB: that powers the recent projects list
 * and is the fallback where the API is missing (the file is then downloaded when the coach asks).
 */

export const canUseFolders = typeof window !== "undefined" && typeof window.showDirectoryPicker === "function";

export interface RecentEntry {
  id: string;
  player: string;
  opponent: string;
  date: string;
  updatedAt: string;
  fileName: string;
  /** The project file in the chosen folder, if the browser supports folders. */
  file?: FileSystemFileHandle;
  /** The whole project as JSON text, saved with every autosave. */
  snapshot: string;
}

const DB = "ttl-analyzer";
const STORE = "recent";

function db(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const d = await db();
  return new Promise((resolve, reject) => {
    const req = run(d.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function listRecent(): Promise<RecentEntry[]> {
  try {
    const all = await tx<RecentEntry[]>("readonly", (s) => s.getAll());
    return all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 12);
  } catch {
    return [];
  }
}

export const removeRecent = (id: string) => tx("readwrite", (s) => s.delete(id)).catch(() => undefined);

async function putRecent(entry: RecentEntry): Promise<void> {
  try {
    await tx("readwrite", (s) => s.put(entry));
  } catch {
    // A file handle that cannot be stored must not lose the snapshot: keep the copy without the handle.
    await tx("readwrite", (s) => s.put({ ...entry, file: undefined }));
  }
}

/** Ask the coach for a folder and create the project file in it. Null if they cancel. */
export async function createProjectFile(project: Project): Promise<FileSystemFileHandle | null> {
  if (!canUseFolders) return null;
  try {
    const dir = await window.showDirectoryPicker!({ mode: "readwrite" });
    return await dir.getFileHandle(fileName(project), { create: true });
  } catch {
    return null; // cancelled
  }
}

async function writable(file: FileSystemFileHandle): Promise<boolean> {
  if (!file.queryPermission || !file.requestPermission) return true;
  if ((await file.queryPermission({ mode: "readwrite" })) === "granted") return true;
  return (await file.requestPermission({ mode: "readwrite" })) === "granted";
}

export type SaveResult = { ok: true; where: "folder" | "browser" } | { ok: false; error: string };

/** Writes the project: to its file if there is one, and always to the browser copy. */
export async function saveProject(project: Project, file?: FileSystemFileHandle): Promise<SaveResult> {
  const text = JSON.stringify(toFile(project));
  let where: "folder" | "browser" = "browser";
  try {
    if (file) {
      if (!(await writable(file))) return { ok: false, error: "Permission to write to the project folder was refused." };
      const w = await file.createWritable();
      await w.write(text);
      await w.close();
      where = "folder";
    }
    await putRecent({
      id: project.id,
      player: project.meta.player,
      opponent: project.meta.opponent,
      date: project.meta.date,
      updatedAt: project.updatedAt,
      fileName: file?.name ?? fileName(project),
      file,
      snapshot: text,
    });
    return { ok: true, where };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Saving failed." };
  }
}

export async function openRecent(entry: RecentEntry): Promise<{ project: Project; file?: FileSystemFileHandle }> {
  if (entry.file) {
    try {
      if (entry.file.queryPermission && (await entry.file.queryPermission({ mode: "readwrite" })) !== "granted") {
        await entry.file.requestPermission?.({ mode: "readwrite" });
      }
      const text = await (await entry.file.getFile()).text();
      return { project: fromFile(JSON.parse(text)), file: entry.file };
    } catch {
      // The file moved or permission was refused: use the copy kept in the browser.
    }
  }
  return { project: fromFile(JSON.parse(entry.snapshot)), file: entry.file };
}

/** Pick a project file from disk. Uses the file picker where available, so saving writes back to it. */
export async function pickProjectFile(): Promise<{ project: Project; file?: FileSystemFileHandle } | null> {
  if (typeof window.showOpenFilePicker === "function") {
    try {
      const [file] = await window.showOpenFilePicker({
        types: [{ description: "TTL analysis project", accept: { "application/json": [".json"] } }],
      });
      return { project: fromFile(JSON.parse(await (await file.getFile()).text())), file };
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return null;
      throw e;
    }
  }
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.onchange = async () => {
      const f = input.files?.[0];
      if (!f) return resolve(null);
      try {
        resolve({ project: fromFile(JSON.parse(await f.text())) });
      } catch (e) {
        reject(e);
      }
    };
    input.click();
  });
}

export function downloadText(name: string, text: string, mime = "application/json"): void {
  downloadBlob(name, new Blob([text], { type: mime }));
}

export function downloadBlob(name: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
