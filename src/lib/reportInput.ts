import { MAX_DRAWING_CHARS, type Charting, type DraftObservation, type DraftSummary } from "@/lib/analysisImport";
import type { ObservationKind } from "@/lib/analysisTypes";

/** Validates what the coach report editor sends when saving, so the server never trusts the browser. */

export interface ReportInput {
  observations: DraftObservation[];
  summary: DraftSummary;
  charting?: Charting;
}

const MAX_OBSERVATIONS = 200;
const KINDS: ObservationKind[] = ["strength", "issue", "tactical"];

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const text = (v: unknown, max: number): string => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown, max: number, maxLen: number): string[] =>
  Array.isArray(v) ? v.map((x) => text(x, maxLen)).filter(Boolean).slice(0, max) : [];

export function parseReportInput(body: unknown): { ok: true; value: ReportInput } | { ok: false; error: string } {
  if (!isObj(body)) return { ok: false, error: "Send the report as a JSON object." };
  if (body.observations !== undefined && !Array.isArray(body.observations)) {
    return { ok: false, error: "observations must be a list." };
  }
  const rawObs = (body.observations as unknown[] | undefined) ?? [];
  if (rawObs.length > MAX_OBSERVATIONS) return { ok: false, error: `At most ${MAX_OBSERVATIONS} observations.` };

  const observations: DraftObservation[] = [];
  for (const [i, o] of rawObs.entries()) {
    if (!isObj(o)) return { ok: false, error: `Observation ${i + 1} is not an object.` };
    const t = typeof o.t === "number" && Number.isFinite(o.t) ? o.t : NaN;
    const kind = KINDS.find((k) => k === o.kind);
    const title = text(o.title, 200);
    const body = text(o.text, 4000);
    if (!(t >= 0) || t > 60 * 60 * 6) return { ok: false, error: `Observation ${i + 1} needs a time in seconds.` };
    if (!kind) return { ok: false, error: `Observation ${i + 1} has an unknown kind.` };
    if (!title) return { ok: false, error: `Observation ${i + 1} needs a title.` };
    const pin =
      isObj(o.pin) && typeof o.pin.x === "number" && typeof o.pin.y === "number"
        ? { x: Math.min(100, Math.max(0, o.pin.x)), y: Math.min(100, Math.max(0, o.pin.y)) }
        : undefined;
    let drawing: string | undefined;
    if (typeof o.drawing === "string" && o.drawing) {
      if (!/^data:image\/png;base64,[A-Za-z0-9+/=\s]+$/.test(o.drawing) || o.drawing.length > MAX_DRAWING_CHARS) {
        return { ok: false, error: `The drawing of observation ${i + 1} must be a PNG of at most 750 KB.` };
      }
      drawing = o.drawing;
    }
    observations.push({ t: Math.round(t * 100) / 100, kind, title, text: body, pin, drawing });
  }
  observations.sort((a, b) => a.t - b.t);

  const s = isObj(body.summary) ? body.summary : {};
  const summary: DraftSummary = {
    strengths: list(s.strengths, 30, 600),
    issues: Array.isArray(s.issues)
      ? s.issues
          .flatMap((x) => (isObj(x) && text(x.title, 200) ? [{ title: text(x.title, 200), detail: text(x.detail, 2000) }] : []))
          .slice(0, 30)
      : [],
    tactical: list(s.tactical, 30, 1000),
    priorities: list(s.priorities, 3, 600),
    drills: Array.isArray(s.drills)
      ? s.drills
          .flatMap((x) => (isObj(x) && text(x.name, 200) ? [{ name: text(x.name, 200), detail: text(x.detail, 2000) }] : []))
          .slice(0, 30)
      : [],
  };

  return { ok: true, value: { observations, summary, charting: isObj(body.charting) ? (body.charting as Charting) : undefined } };
}
