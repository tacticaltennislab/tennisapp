import type { Lang } from "./types";

export interface Settings {
  /** Stored only in this browser on this computer (localStorage). Never part of a project file. */
  apiKey: string;
  model: string;
  lang: Lang;
}

export const DEFAULT_MODEL = "claude-opus-5-5";
const KEY = "ttl-analyzer-settings";

export function loadSettings(): Settings {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {
      apiKey: typeof raw.apiKey === "string" ? raw.apiKey : "",
      model: typeof raw.model === "string" && raw.model.trim() ? raw.model.trim() : DEFAULT_MODEL,
      lang: raw.lang === "pl" ? "pl" : "en",
    };
  } catch {
    return { apiKey: "", model: DEFAULT_MODEL, lang: "en" };
  }
}

export function saveSettings(s: Settings): void {
  localStorage.setItem(KEY, JSON.stringify(s));
}
