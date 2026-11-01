import type Anthropic from "@anthropic-ai/sdk";
import { IMPORT_FORMAT, IMPORT_VERSION } from "@/lib/analysisImport";

/**
 * The admin only "AI analysis" tool: the coach's browser samples frames from a video that stays on their
 * computer, and Claude suggests moments worth a look and a draft summary. What comes back is a set of
 * suggestions from a few still frames, not statistics: it cannot follow the ball, count points or judge
 * where a serve landed, and the prompt says so. Nothing here is stored, and nothing reaches a client
 * unless the coach copies it into an analysis and publishes it.
 */

export const MAX_FRAMES = 36;
export const MAX_FRAME_CHARS = 400_000;
/** Vercel route handlers accept about 4.5 MB of request body; stay under it and refuse earlier with a clear message. */
export const MAX_TOTAL_CHARS = 4_000_000;
export const DEFAULT_MODEL = "claude-opus-5-5";

export type Kind = "strength" | "issue" | "tactical";
export type Lang = "en" | "pl";

export interface Frame {
  /** Seconds from the start of the video. */
  t: number;
  /** JPEG, base64 text without the data URL prefix. */
  data: string;
}

export interface Meta {
  player: string;
  opponent: string;
  surface: string;
  /** What the coach wants looked at, in their own words. */
  focus: string;
  lang: Lang;
}

export interface AnalysisRequest {
  frames: Frame[];
  meta: Meta;
}

export interface Suggestion {
  time: number;
  kind: Kind;
  title: string;
  text: string;
  confidence: "low" | "medium" | "high";
}

export interface AnalysisResult {
  suggestions: Suggestion[];
  summary: {
    strengths: string[];
    issues: { title: string; detail: string }[];
    tactical: string[];
    priorities: string[];
    drills: { name: string; detail: string }[];
  };
  /** What these frames could not show, in the model's own words. */
  limits: string;
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const text = (v: unknown, max: number): string => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Checks what the browser sent. Returns a message for the coach if it cannot be used. */
export function validateRequest(body: unknown): { ok: true; value: AnalysisRequest } | { ok: false; error: string } {
  if (!isObj(body)) return { ok: false, error: "Send the frames as a JSON object." };
  if (!Array.isArray(body.frames) || body.frames.length === 0) return { ok: false, error: "No frames were sent." };
  if (body.frames.length > MAX_FRAMES) return { ok: false, error: `At most ${MAX_FRAMES} frames per analysis.` };

  const frames: Frame[] = [];
  let total = 0;
  for (const [i, f] of body.frames.entries()) {
    if (!isObj(f)) return { ok: false, error: `Frame ${i + 1} is not an object.` };
    const t = typeof f.t === "number" && Number.isFinite(f.t) ? f.t : NaN;
    if (!(t >= 0) || t > 60 * 60 * 12) return { ok: false, error: `Frame ${i + 1} needs a time in seconds.` };
    const raw = typeof f.data === "string" ? f.data : "";
    const data = raw.startsWith("data:") ? raw.slice(raw.indexOf(",") + 1) : raw;
    if (!data || !/^[A-Za-z0-9+/=]+$/.test(data)) return { ok: false, error: `Frame ${i + 1} is not a base64 image.` };
    // JPEG files start with /9j/ in base64.
    if (!data.startsWith("/9j/")) return { ok: false, error: `Frame ${i + 1} must be a JPEG.` };
    if (data.length > MAX_FRAME_CHARS) return { ok: false, error: `Frame ${i + 1} is too large. Use smaller frames.` };
    total += data.length;
    frames.push({ t: Math.round(t * 100) / 100, data });
  }
  if (total > MAX_TOTAL_CHARS) return { ok: false, error: "The frames are too large together. Use fewer or smaller frames." };
  frames.sort((a, b) => a.t - b.t);

  const m = isObj(body.meta) ? body.meta : {};
  return {
    ok: true,
    value: {
      frames,
      meta: {
        player: text(m.player, 100),
        opponent: text(m.opponent, 100),
        surface: text(m.surface, 40),
        focus: text(m.focus, 600),
        lang: m.lang === "pl" ? "pl" : "en",
      },
    },
  };
}

export const clock = (sec: number): string => {
  const s = Math.max(0, Math.round(sec));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

export function systemPrompt(lang: Lang): string {
  return [
    "You assist a tennis coach who is reviewing a match or training video. You are given still frames sampled from the video, each labelled with its time.",
    "Suggest moments the coach should look at and draft a summary. The coach checks every suggestion against the video, so be specific about what you see in which frame.",
    "You only see separate still frames, not motion. You cannot follow the ball between frames, count points, know the score, or tell where a serve or a shot landed. Never state statistics, percentages, scores or results.",
    "Only describe what is visible in the frames: body position, balance, stance, racket and contact position where a frame shows it, court position, footwork, which shot is being played. If a frame does not show something, do not guess.",
    "Every suggestion must point to one of the given frame times. Give a confidence: high only when the frame clearly shows it, low when it is a guess worth checking.",
    "Tactical points must be based on positions visible in the frames (for example where players stand), and stated as things to check, not as facts about the whole match.",
    "In `limits`, say plainly what these frames could not show, so the coach knows what still needs the video.",
    "Give at most 3 priorities in order of importance, each one clear action, and drills that match the issues you suggested.",
    "Do not use dashes as punctuation.",
    `Write the whole answer in ${lang === "pl" ? "Polish" : "English"}.`,
  ].join("\n");
}

export function userIntro(meta: Meta, frames: Frame[]): string {
  const lines = [`Player to analyse: ${meta.player || "not named"}`];
  if (meta.opponent) lines.push(`Opponent: ${meta.opponent}`);
  if (meta.surface) lines.push(`Surface: ${meta.surface}`);
  if (meta.focus) lines.push(`The coach wants you to look at: ${meta.focus}`);
  lines.push(`${frames.length} frames follow, sampled from the video. The time of each is given before it.`);
  return lines.join("\n");
}

/** The JSON schema the answer must follow (structured outputs). */
export const RESULT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["suggestions", "summary", "limits"],
  properties: {
    suggestions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["time", "kind", "title", "text", "confidence"],
        properties: {
          time: { type: "number" },
          kind: { type: "string", enum: ["strength", "issue", "tactical"] },
          title: { type: "string" },
          text: { type: "string" },
          confidence: { type: "string", enum: ["low", "medium", "high"] },
        },
      },
    },
    summary: {
      type: "object",
      additionalProperties: false,
      required: ["strengths", "issues", "tactical", "priorities", "drills"],
      properties: {
        strengths: { type: "array", items: { type: "string" } },
        issues: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["title", "detail"],
            properties: { title: { type: "string" }, detail: { type: "string" } },
          },
        },
        tactical: { type: "array", items: { type: "string" } },
        priorities: { type: "array", items: { type: "string" } },
        drills: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name", "detail"],
            properties: { name: { type: "string" }, detail: { type: "string" } },
          },
        },
      },
    },
    limits: { type: "string" },
  },
} as const;

const list = (v: unknown, max: number, len: number): string[] =>
  Array.isArray(v) ? v.map((x) => text(x, len)).filter(Boolean).slice(0, max) : [];

/**
 * Cleans the model's answer. Each suggestion is snapped to the nearest frame time it was given (a time
 * the model made up is moved to a real frame rather than trusted), and lists are capped.
 */
export function parseResult(raw: unknown, frames: Frame[]): AnalysisResult | null {
  if (!isObj(raw) || !Array.isArray(raw.suggestions) || !isObj(raw.summary)) return null;
  const times = frames.map((f) => f.t);
  const snap = (t: number) => times.reduce((best, x) => (Math.abs(x - t) < Math.abs(best - t) ? x : best), times[0] ?? 0);

  const suggestions: Suggestion[] = raw.suggestions.flatMap((s) => {
    if (!isObj(s) || typeof s.time !== "number" || !Number.isFinite(s.time)) return [];
    const kind = s.kind === "strength" || s.kind === "issue" || s.kind === "tactical" ? s.kind : null;
    const title = text(s.title, 200);
    if (!kind || !title) return [];
    const confidence = s.confidence === "high" || s.confidence === "medium" ? s.confidence : "low";
    return [{ time: snap(s.time), kind, title, text: text(s.text, 2000), confidence } as Suggestion];
  });
  suggestions.sort((a, b) => a.time - b.time);

  const sum = raw.summary;
  return {
    suggestions: suggestions.slice(0, 60),
    summary: {
      strengths: list(sum.strengths, 20, 600),
      issues: Array.isArray(sum.issues)
        ? sum.issues.flatMap((x) => (isObj(x) && text(x.title, 200) ? [{ title: text(x.title, 200), detail: text(x.detail, 2000) }] : [])).slice(0, 20)
        : [],
      tactical: list(sum.tactical, 20, 1000),
      priorities: list(sum.priorities, 3, 600),
      drills: Array.isArray(sum.drills)
        ? sum.drills.flatMap((x) => (isObj(x) && text(x.name, 200) ? [{ name: text(x.name, 200), detail: text(x.detail, 2000) }] : [])).slice(0, 20)
        : [],
    },
    limits: text(raw.limits, 2000),
  };
}

export type Client = Pick<Anthropic, "messages">;

/** Asks Claude. The client is passed in so tests can stand in for the API. */
export async function analyseFrames(
  client: Client,
  req: AnalysisRequest,
  model = process.env.AI_ANALYSIS_MODEL || DEFAULT_MODEL
): Promise<AnalysisResult> {
  const content: Anthropic.ContentBlockParam[] = [{ type: "text", text: userIntro(req.meta, req.frames) }];
  req.frames.forEach((f, i) => {
    content.push({ type: "text", text: `Frame ${i + 1} of ${req.frames.length}, time ${clock(f.t)} (${f.t} s):` });
    content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: f.data } });
  });
  content.push({ type: "text", text: "Write the suggestions and the draft summary now." });

  const response = await client.messages.create({
    model,
    max_tokens: 8000,
    system: systemPrompt(req.meta.lang),
    messages: [{ role: "user", content }],
    output_config: { format: { type: "json_schema", schema: RESULT_SCHEMA as unknown as Record<string, unknown> } },
  });
  const block = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
  if (response.stop_reason === "refusal") throw new AnalysisError("The model declined to analyse these frames.");
  let parsed: unknown;
  try {
    parsed = JSON.parse(block?.text ?? "");
  } catch {
    throw new AnalysisError("The model's answer could not be read. Try again.");
  }
  const result = parseResult(parsed, req.frames);
  if (!result) throw new AnalysisError("The model's answer had an unexpected shape. Try again.");
  return result;
}

export class AnalysisError extends Error {}

/**
 * The result as an analysis file the report editor can import (docs/analysis-import.md). Every title starts
 * with [AI] so a suggestion the coach has not yet checked is easy to spot before anything is published.
 */
export function buildImportFile(result: AnalysisResult, meta: Meta, video: { fileName: string; durationSec: number }, now = new Date()) {
  return {
    format: IMPORT_FORMAT,
    version: IMPORT_VERSION,
    exportedAt: now.toISOString(),
    player: meta.player,
    match: { opponent: meta.opponent, surface: meta.surface },
    video: { fileName: video.fileName, durationSec: Math.round(video.durationSec * 100) / 100 },
    notes: result.suggestions.map((s) => ({ time: s.time, type: s.kind, title: `[AI] ${s.title}`, text: s.text })),
    summary: result.summary,
  };
}
