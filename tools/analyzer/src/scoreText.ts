import type { ScoreUi } from "./i18n";
import { gameScore, type PointScore, type SetResult } from "./score";
import type { Pair, Who } from "./types";

type Names = Record<Who, string>;

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? "");

/** The game as it is said: 30:15, Deuce, Ad Alex, or the points of a tiebreak. */
export function describeGame(ctx: Pick<PointScore, "mode" | "points">, ui: ScoreUi, names: Names): string {
  const g = gameScore(ctx);
  if (g.kind === "deuce") return ui.deuceWord;
  if (g.kind === "advPlayer") return fill(ui.advantage, { name: names.player });
  if (g.kind === "advOpponent") return fill(ui.advantage, { name: names.opponent });
  return `${g.player}:${g.opponent}`;
}

/** Finished sets as "6:4 3:6"; a match tiebreak shows as "[10:7]". */
export function setsText(sets: readonly SetResult[]): string {
  return sets.map((s) => (s.matchTiebreak ? `[${s.player}:${s.opponent}]` : `${s.player}:${s.opponent}`)).join(" ");
}

/** One line for the list of charted points: "Set 2 · 3:2 · 30:15", "Set 1 · Tiebreak 5:3", "Match tiebreak 4:4". */
export function scoreSummary(ctx: PointScore, ui: ScoreUi, names: Names): string {
  if (ctx.mode === "matchTiebreak") return `${ui.matchTiebreakWord} ${ctx.points.player}:${ctx.points.opponent}`;
  if (ctx.mode === "tiebreak") return `${ui.setWord} ${ctx.setNumber} · ${ui.tiebreakWord} ${ctx.points.player}:${ctx.points.opponent}`;
  return `${ui.setWord} ${ctx.setNumber} · ${ctx.games.player}:${ctx.games.opponent} · ${describeGame(ctx, ui, names)}`;
}

/** The score in digits only, for the AI prompt: "6:4 3:2, 30:15". */
export function plainScore(ctx: PointScore): string {
  const sets = setsText(ctx.sets);
  const g = gameScore(ctx);
  const game = `${g.player}:${g.opponent}`;
  const games = ctx.mode === "game" ? `${ctx.games.player}:${ctx.games.opponent}` : ctx.mode === "tiebreak" ? "6:6" : "";
  return [sets, games, game].filter(Boolean).join(", ");
}

/** Raw point counts as the coach would type them: "30:15", "40:AD", or "5:3" in a tiebreak. */
export function pointsText(points: Pair, tiebreak: boolean): string {
  if (tiebreak) return `${points.player}:${points.opponent}`;
  const g = gameScore({ mode: "game", points });
  return `${g.player}:${g.opponent}`;
}

export function setsInput(sets: readonly SetResult[]): string {
  return sets.map((s) => `${s.player}:${s.opponent}`).join(", ");
}
