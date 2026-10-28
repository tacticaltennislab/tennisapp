import type { Drill, ObservationKind } from "@/lib/analysisTypes";

/**
 * Reads a project file exported by the separate local analysis tool and turns it into what the report
 * editor needs. The format is documented in docs/analysis-import.md. Pure and dependency free, so the
 * editor (browser) and the tests use the same code.
 */

export const IMPORT_FORMAT = "tactical-tennis-lab/analysis";
export const IMPORT_VERSION = 1;

const MAX_NOTES = 200;
/** Longest accepted PNG, as the length of its base64 text (about 750 KB of image). */
export const MAX_DRAWING_CHARS = 1_000_000;

export interface DraftObservation {
  t: number;
  kind: ObservationKind;
  title: string;
  text: string;
  pin?: { x: number; y: number };
  /** PNG data URL */
  drawing?: string;
}

export interface DraftSummary {
  strengths: string[];
  issues: { title: string; detail: string }[];
  tactical: string[];
  priorities: string[];
  drills: Drill[];
}

export interface Charting {
  points?: number;
  serve?: {
    first?: { in?: number; total?: number; pointsWon?: number; pointsPlayed?: number };
    second?: { in?: number; total?: number; pointsWon?: number; pointsPlayed?: number };
    placement?: Partial<Record<"deuce" | "ad", Partial<Record<"wide" | "body" | "t", number>>>>;
  };
  rally?: { averageLength?: number };
  errors?: { unforced?: number; forced?: number; doubleFaults?: number; winners?: number; aces?: number };
}

export interface ImportedAnalysis {
  observations: DraftObservation[];
  summary: DraftSummary;
  charting?: Charting;
  videoDurationSec?: number;
  player?: string;
}

export type ImportResult = { ok: true; data: ImportedAnalysis; warnings: string[] } | { ok: false; error: string };

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const num = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const strList = (v: unknown): string[] => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);

function kindOf(v: unknown): ObservationKind | null {
  const k = str(v).toLowerCase();
  return k === "strength" || k === "issue" || k === "tactical" ? k : null;
}

/** First sentence, shortened: a title for a note that only has text. */
export function titleFromText(text: string): string {
  const first = text.split(/(?<=[.!?])\s|\n/)[0].trim();
  return first.length > 60 ? `${first.slice(0, 57).trimEnd()}...` : first;
}

function drawingOf(v: unknown): string | undefined {
  const s = str(v);
  if (!s) return undefined;
  const dataUrl = s.startsWith("data:") ? s : `data:image/png;base64,${s}`;
  if (!/^data:image\/png;base64,[A-Za-z0-9+/=\s]+$/.test(dataUrl)) return undefined;
  return dataUrl.length <= MAX_DRAWING_CHARS ? dataUrl : undefined;
}

function pctOf(part?: number, whole?: number): string | null {
  return part != null && whole != null && whole > 0 ? `${Math.round((part / whole) * 100)}%` : null;
}

function cleanCharting(raw: unknown): Charting | undefined {
  if (!isObj(raw)) return undefined;
  const serveSide = (v: unknown) =>
    isObj(v) ? { in: num(v.in), total: num(v.total), pointsWon: num(v.pointsWon), pointsPlayed: num(v.pointsPlayed) } : undefined;
  const zone = (v: unknown) => (isObj(v) ? { wide: num(v.wide), body: num(v.body), t: num(v.t) } : undefined);
  const serve = isObj(raw.serve) ? raw.serve : {};
  const placement = isObj(serve.placement) ? serve.placement : {};
  const errors = isObj(raw.errors) ? raw.errors : {};
  return {
    points: num(raw.points),
    serve: {
      first: serveSide(serve.first),
      second: serveSide(serve.second),
      placement: { deuce: zone(placement.deuce), ad: zone(placement.ad) },
    },
    rally: isObj(raw.rally) ? { averageLength: num(raw.rally.averageLength) } : undefined,
    errors: {
      unforced: num(errors.unforced),
      forced: num(errors.forced),
      doubleFaults: num(errors.doubleFaults),
      winners: num(errors.winners),
      aces: num(errors.aces),
    },
  };
}

/** Plain sentences from the charting statistics, offered as tactical notes. */
export function chartingLines(c: Charting | undefined): string[] {
  if (!c) return [];
  const lines: string[] = [];
  const first = c.serve?.first;
  const second = c.serve?.second;
  const firstIn = pctOf(first?.in, first?.total);
  const firstWon = pctOf(first?.pointsWon, first?.pointsPlayed);
  if (firstIn || firstWon) {
    lines.push(
      `First serve: ${[firstIn && `${firstIn} in`, firstWon && `${firstWon} of points won`].filter(Boolean).join(", ")}.`
    );
  }
  const secondWon = pctOf(second?.pointsWon, second?.pointsPlayed);
  if (secondWon) lines.push(`Second serve: ${secondWon} of points won.`);
  for (const side of ["deuce", "ad"] as const) {
    const z = c.serve?.placement?.[side];
    const total = (z?.wide ?? 0) + (z?.body ?? 0) + (z?.t ?? 0);
    if (z && total > 0) {
      lines.push(
        `Serve placement on the ${side} side: ${z.wide ?? 0} wide, ${z.body ?? 0} to the body, ${z.t ?? 0} down the T.`
      );
    }
  }
  if (c.rally?.averageLength != null) lines.push(`Average rally length: ${c.rally.averageLength.toFixed(1)} shots.`);
  const e = c.errors;
  if (e && (e.unforced != null || e.forced != null || e.doubleFaults != null)) {
    lines.push(
      `Errors: ${e.unforced ?? 0} unforced, ${e.forced ?? 0} forced, ${e.doubleFaults ?? 0} double faults.`
    );
  }
  return lines;
}

export function parseAnalysisImport(raw: unknown): ImportResult {
  if (!isObj(raw)) return { ok: false, error: "This file is not a JSON object." };
  if (raw.format !== IMPORT_FORMAT) {
    return { ok: false, error: `This is not an analysis file (expected format "${IMPORT_FORMAT}").` };
  }
  if (num(raw.version) !== IMPORT_VERSION) {
    return { ok: false, error: `Unsupported version ${String(raw.version)}; this editor reads version ${IMPORT_VERSION}.` };
  }
  if (!Array.isArray(raw.notes) && !isObj(raw.summary) && !isObj(raw.charting)) {
    return { ok: false, error: "The file has no notes, summary or charting data." };
  }

  const warnings: string[] = [];
  const notes = Array.isArray(raw.notes) ? raw.notes : [];
  if (notes.length > MAX_NOTES) warnings.push(`Only the first ${MAX_NOTES} of ${notes.length} notes were read.`);

  const observations: DraftObservation[] = [];
  notes.slice(0, MAX_NOTES).forEach((n, i) => {
    if (!isObj(n)) return warnings.push(`Note ${i + 1} was skipped: not an object.`);
    const t = num(n.time);
    const kind = kindOf(n.type);
    const text = str(n.text);
    if (t == null || t < 0) return warnings.push(`Note ${i + 1} was skipped: it needs a time in seconds.`);
    if (!kind) return warnings.push(`Note ${i + 1} was skipped: type must be strength, issue or tactical.`);
    if (!text && !str(n.title)) return warnings.push(`Note ${i + 1} was skipped: it has no text.`);
    const pin =
      isObj(n.pin) && num(n.pin.x) != null && num(n.pin.y) != null
        ? { x: Math.min(100, Math.max(0, n.pin.x as number)), y: Math.min(100, Math.max(0, n.pin.y as number)) }
        : undefined;
    const drawing = drawingOf(n.drawing);
    if (n.drawing && !drawing) warnings.push(`The drawing of note ${i + 1} was skipped: it must be a PNG of at most 750 KB.`);
    observations.push({
      t: Math.round(t * 100) / 100,
      kind,
      title: str(n.title) || titleFromText(text),
      text: text || str(n.title),
      pin,
      drawing,
    });
  });
  observations.sort((a, b) => a.t - b.t);

  const charting = cleanCharting(raw.charting);

  const s = isObj(raw.summary) ? raw.summary : null;
  const summary: DraftSummary = s
    ? {
        strengths: strList(s.strengths),
        issues: Array.isArray(s.issues)
          ? s.issues.flatMap((x) => (isObj(x) && str(x.title) ? [{ title: str(x.title), detail: str(x.detail) }] : []))
          : [],
        tactical: strList(s.tactical),
        priorities: strList(s.priorities).slice(0, 3),
        drills: Array.isArray(s.drills)
          ? s.drills.flatMap((x) => (isObj(x) && str(x.name) ? [{ name: str(x.name), detail: str(x.detail) }] : []))
          : [],
      }
    : {
        // No summary in the file: build a first draft from the notes and the charting statistics.
        strengths: observations.filter((o) => o.kind === "strength").map((o) => o.title),
        issues: observations.filter((o) => o.kind === "issue").map((o) => ({ title: o.title, detail: o.text })),
        tactical: [...observations.filter((o) => o.kind === "tactical").map((o) => o.text), ...chartingLines(charting)],
        priorities: [],
        drills: [],
      };

  const video = isObj(raw.video) ? raw.video : {};
  return {
    ok: true,
    warnings,
    data: {
      observations,
      summary,
      charting,
      videoDurationSec: num(video.durationSec),
      player: str(raw.player) || undefined,
    },
  };
}
