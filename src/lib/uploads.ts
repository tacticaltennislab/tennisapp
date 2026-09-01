import path from "node:path";
import { mkdir } from "node:fs/promises";

export const UPLOADS_DIR = path.join(process.cwd(), "uploads", "videos");

export async function ensureUploadsDir() {
  await mkdir(UPLOADS_DIR, { recursive: true });
}

export function uploadFilePath(storedFileName: string) {
  return path.join(UPLOADS_DIR, storedFileName);
}
