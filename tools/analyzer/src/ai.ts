import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { LABELS, statRows } from "./i18n";
import { clock } from "./project";
import { computeStats, placement } from "./stats";
import type { Project, Summary } from "./types";
import type { Settings } from "./settings";

/**
 * The AI draft. What is sent: the coach's written notes and the charting numbers. Never the video, the
 * frames or the drawings. The result only fills the editable summary: the coach reviews it before export.
 */

export const DraftSchema = z.object({
  strengths: z.array(z.string()),
  issues: z.array(z.object({ title: z.string(), detail: z.string() })),
  tactical: z.array(z.string()),
  priorities: z.array(z.string()),
  drills: z.array(z.object({ name: z.string(), detail: z.string() })),
});

export function systemPrompt(lang: "en" | "pl"): string {
  return [
    "You help a tennis coach write the summary of a video analysis of one player.",
    "You get the coach's own timestamped notes and, when available, match charting statistics. Use only those facts.",
    "Do not invent statistics, shots, scores or events that are not in the input. If the input is thin, write less.",
    "Write plain, concrete coaching language that a club player understands: what is happening, why it matters, what to do.",
    "Give exactly 3 priorities, in order of importance, each one a single clear action.",
    "Drills must be practical and specific (what, how many, what to feel). Match drills to the issues found.",
    "Do not use dashes as punctuation and do not use hyphens to join words where a plain phrase works.",
    `Write the whole answer in ${lang === "pl" ? "Polish" : "English"}.`,
  ].join("\n");
}

export function userPrompt(p: Project): string {
  const lang = p.lang;
  const stats = computeStats(p.points);
  const lines: string[] = [];
  lines.push(`Player: ${p.meta.player || "unknown"}`);
  if (p.meta.opponent) lines.push(`Opponent: ${p.meta.opponent}`);
  if (p.meta.surface) lines.push(`Surface: ${p.meta.surface}`);
  lines.push("", "Coach notes (time, type, title, text):");
  const notes = [...p.notes].sort((a, b) => a.time - b.time);
  if (notes.length === 0) lines.push("(none)");
  for (const n of notes) lines.push(`- ${clock(n.time)} | ${n.type} | ${n.title || "(no title)"} | ${n.text || "(no text)"}`);
  const rows = statRows(stats, lang);
  lines.push("", "Match charting for the player (numbers from the coach's charting):");
  if (rows.length === 0) lines.push("(none)");
  for (const r of rows) lines.push(`- ${r.label}: ${r.value}`);
  if (stats.total > 0) {
    const pl = placement(p.points, "player");
    const l = LABELS[lang];
    for (const side of ["deuce", "ad"] as const) {
      const z = pl[side];
      if (z.wide + z.body + z.t > 0) lines.push(`- ${l[side]} serve placement: ${z.wide} ${l.wide}, ${z.body} ${l.body}, ${z.t} ${l.t}`);
    }
  }
  lines.push("", "Write the draft summary now.");
  return lines.join("\n");
}

export async function draftSummary(p: Project, settings: Settings, signal?: AbortSignal): Promise<Summary> {
  if (!settings.apiKey.trim()) throw new Error("Add your Anthropic API key in Settings first.");
  if (p.notes.length === 0 && p.points.length === 0) throw new Error("Add some notes or chart some points first.");
  // The key stays on this computer and goes straight to Anthropic, so the browser build of the SDK is used on purpose.
  const client = new Anthropic({ apiKey: settings.apiKey.trim(), dangerouslyAllowBrowser: true });
  const response = await client.messages.parse(
    {
      model: settings.model,
      max_tokens: 8000,
      system: systemPrompt(p.lang),
      messages: [{ role: "user", content: userPrompt(p) }],
      output_config: { format: zodOutputFormat(DraftSchema) },
    },
    { signal }
  );
  const out = response.parsed_output;
  if (!out) throw new Error("The model did not return a usable draft. Try again.");
  return { ...out, priorities: out.priorities.slice(0, 3) };
}
