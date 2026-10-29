import { toCharting, type Charting } from "./stats";
import { emptySummary, type ChartPoint, type Lang, type Note, type Project, type Summary } from "./types";

/**
 * A project file is one JSON file that is also a valid "analysis import" for the website's report editor
 * (docs/analysis-import.md): the website reads `notes`, `charting`, `summary`, `video`, `player`, `match`
 * and ignores `project`, which carries what this tool needs to reopen the work (drawings as shapes, the raw
 * charted points). Drawings are already PNG frames in `notes[].drawing`.
 */
export const FORMAT = "tactical-tennis-lab/analysis";
export const VERSION = 1;

export const uid = (): string => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

/** The summary without blank lines and empty rows: what is exported, printed and sent to the AI. */
export function cleanSummary(s: Summary): Summary {
  const t = (v: string) => v.trim();
  return {
    strengths: s.strengths.map(t).filter(Boolean),
    issues: s.issues.filter((i) => t(i.title)).map((i) => ({ title: t(i.title), detail: t(i.detail) })),
    tactical: s.tactical.map(t).filter(Boolean),
    priorities: s.priorities.map(t).filter(Boolean).slice(0, 3),
    drills: s.drills.filter((d) => t(d.name)).map((d) => ({ name: t(d.name), detail: t(d.detail) })),
  };
}

export function newProject(meta: Partial<Project["meta"]> = {}, lang: Lang = "en"): Project {
  return {
    id: uid(),
    meta: { player: "", opponent: "", date: new Date().toISOString().slice(0, 10), surface: "hard", ...meta },
    video: { fileName: "", durationSec: 0, fps: 30 },
    notes: [],
    points: [],
    summary: emptySummary(),
    lang,
    updatedAt: new Date().toISOString(),
  };
}

export interface ProjectFile {
  format: typeof FORMAT;
  version: typeof VERSION;
  exportedAt: string;
  player: string;
  match: { opponent: string; date: string; surface: string };
  video: { fileName: string; durationSec: number; fps: number };
  notes: {
    id: string;
    time: number;
    type: Note["type"];
    title: string;
    text: string;
    drawing?: string;
  }[];
  charting?: Charting;
  summary: Summary;
  project: { id: string; lang: Lang; shapes: Record<string, Note["shapes"]>; points: ChartPoint[]; updatedAt: string };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function toFile(p: Project, now = new Date()): ProjectFile {
  const notes = [...p.notes].sort((a, b) => a.time - b.time);
  return {
    format: FORMAT,
    version: VERSION,
    exportedAt: now.toISOString(),
    player: p.meta.player,
    match: { opponent: p.meta.opponent, date: p.meta.date, surface: p.meta.surface },
    video: { ...p.video },
    notes: notes.map((n) => ({
      id: n.id,
      time: round2(n.time),
      type: n.type,
      title: n.title,
      text: n.text,
      ...(n.drawing ? { drawing: n.drawing } : {}),
    })),
    charting: toCharting(p.points),
    summary: cleanSummary(p.summary),
    project: {
      id: p.id,
      lang: p.lang,
      shapes: Object.fromEntries(notes.filter((n) => n.shapes.length > 0).map((n) => [n.id, n.shapes])),
      points: p.points,
      updatedAt: p.updatedAt,
    },
  };
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

/** Reads a project file back. Throws a readable Error for anything that is not one of ours. */
export function fromFile(raw: unknown): Project {
  if (!isObj(raw) || raw.format !== FORMAT) throw new Error("This is not a TTL analysis project file.");
  if (raw.version !== VERSION) throw new Error(`Unsupported project version ${String(raw.version)}.`);
  const extra = isObj(raw.project) ? raw.project : {};
  const shapes = isObj(extra.shapes) ? extra.shapes : {};
  const match = isObj(raw.match) ? raw.match : {};
  const video = isObj(raw.video) ? raw.video : {};
  const str = (v: unknown, d = "") => (typeof v === "string" ? v : d);
  const num = (v: unknown, d = 0) => (typeof v === "number" && Number.isFinite(v) ? v : d);
  const list = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  const summary = isObj(raw.summary) ? raw.summary : {};

  const notes: Note[] = list<Record<string, unknown>>(raw.notes).flatMap((n) => {
    if (!isObj(n) || typeof n.time !== "number") return [];
    const type = n.type === "strength" || n.type === "issue" || n.type === "tactical" ? n.type : "issue";
    const id = str(n.id) || uid();
    return [
      {
        id,
        time: n.time,
        type,
        title: str(n.title),
        text: str(n.text),
        shapes: list<Note["shapes"][number]>(shapes[id]),
        drawing: typeof n.drawing === "string" ? n.drawing : undefined,
      } as Note,
    ];
  });

  return {
    id: str(extra.id) || uid(),
    meta: { player: str(raw.player), opponent: str(match.opponent), date: str(match.date), surface: str(match.surface, "hard") },
    video: { fileName: str(video.fileName), durationSec: num(video.durationSec), fps: num(video.fps, 30) },
    notes,
    points: list<ChartPoint>(extra.points),
    summary: {
      strengths: list<string>(summary.strengths),
      issues: list<{ title: string; detail: string }>(summary.issues),
      tactical: list<string>(summary.tactical),
      priorities: list<string>(summary.priorities),
      drills: list<{ name: string; detail: string }>(summary.drills),
    },
    lang: extra.lang === "pl" ? "pl" : "en",
    updatedAt: str(extra.updatedAt, new Date().toISOString()),
  };
}

export function fileName(p: Project): string {
  const slug = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const base = [slug(p.meta.player) || "player", p.meta.date || "undated"].join("-");
  return `${base}.analysis.json`;
}

export const clock = (sec: number): string => {
  const s = Math.max(0, sec);
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};
