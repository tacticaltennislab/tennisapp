import { resolveProject } from "./match";
import { checkStartScore } from "./score";
import { toCharting, type Charting } from "./stats";
import { DEFAULT_FORMAT, defaultScoring, emptySummary, type ChartPoint, type Lang, type Note, type Pair, type Project, type Scoring, type Summary } from "./types";

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

export function newProject(meta: Partial<Project["meta"]> = {}, lang: Lang = "en", scoring: Scoring = defaultScoring()): Project {
  return {
    id: uid(),
    meta: { player: "", opponent: "", date: new Date().toISOString().slice(0, 10), surface: "hard", ...meta },
    video: { fileName: "", durationSec: 0, fps: 30 },
    notes: [],
    points: [],
    summary: emptySummary(),
    lang,
    scoring,
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
  project: {
    id: string;
    lang: Lang;
    shapes: Record<string, Note["shapes"]>;
    points: ChartPoint[];
    /** Match format, first server and starting score (added later; older files have none). */
    scoring: Scoring;
    updatedAt: string;
  };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function toFile(p: Project, now = new Date()): ProjectFile {
  const notes = [...p.notes].sort((a, b) => a.time - b.time);
  // The statistics use the server and side as they apply (derived from the score unless overridden).
  const resolved = resolveProject(p);
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
    charting: toCharting(resolved.points, resolved.pressure),
    summary: cleanSummary(p.summary),
    project: {
      id: p.id,
      lang: p.lang,
      shapes: Object.fromEntries(notes.filter((n) => n.shapes.length > 0).map((n) => [n.id, n.shapes])),
      points: p.points,
      scoring: p.scoring,
      updatedAt: p.updatedAt,
    },
  };
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

const readPair = (v: unknown): Pair | null =>
  isObj(v) && typeof v.player === "number" && typeof v.opponent === "number" && Number.isInteger(v.player) && Number.isInteger(v.opponent) && v.player >= 0 && v.opponent >= 0
    ? { player: v.player, opponent: v.opponent }
    : null;

/**
 * The match setup from a project file. Every field is optional: a missing or unreadable one gets its default, and a
 * file without the block at all (made before scoring existed) is reported as `legacy`.
 */
export function readScoring(raw: unknown): { scoring: Scoring; legacy: boolean } {
  if (!isObj(raw)) return { scoring: defaultScoring(), legacy: true };
  const f = isObj(raw.format) ? raw.format : {};
  const flag = (v: unknown, d: boolean) => (typeof v === "boolean" ? v : d);
  const scoring: Scoring = {
    format: {
      bestOf: f.bestOf === 5 ? 5 : DEFAULT_FORMAT.bestOf,
      tiebreak: flag(f.tiebreak, DEFAULT_FORMAT.tiebreak),
      matchTiebreak: flag(f.matchTiebreak, DEFAULT_FORMAT.matchTiebreak),
      noAd: flag(f.noAd, DEFAULT_FORMAT.noAd),
    },
    firstServer: raw.firstServer === "opponent" ? "opponent" : "player",
  };
  const s = raw.startScore;
  if (isObj(s)) {
    const sets = Array.isArray(s.sets) ? s.sets.map(readPair) : [];
    const games = readPair(s.games);
    const points = readPair(s.points);
    if (games && points && sets.every((x): x is Pair => x !== null)) {
      const start = { sets, games, points };
      // A starting score that cannot happen would break every score after it: ignore it.
      if (checkStartScore(scoring.format, start) === null) scoring.startScore = start;
    }
  }
  return { scoring, legacy: false };
}

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

  // Points from files made before scoring existed keep the server and side they were charted with.
  const { scoring, legacy } = readScoring(extra.scoring);
  const points = list<ChartPoint>(extra.points).map((p) => (legacy ? { ...p, manualServer: true, manualSide: true } : p));

  return {
    id: str(extra.id) || uid(),
    meta: { player: str(raw.player), opponent: str(match.opponent), date: str(match.date), surface: str(match.surface, "hard") },
    video: { fileName: str(video.fileName), durationSec: num(video.durationSec), fps: num(video.fps, 30) },
    notes,
    points,
    summary: {
      strengths: list<string>(summary.strengths),
      issues: list<{ title: string; detail: string }>(summary.issues),
      tactical: list<string>(summary.tactical),
      priorities: list<string>(summary.priorities),
      drills: list<{ name: string; detail: string }>(summary.drills),
    },
    lang: extra.lang === "pl" ? "pl" : "en",
    scoring,
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
