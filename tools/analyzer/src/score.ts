import { other } from "./court";
import type { ChartPoint, MatchFormat, Pair, Scoring, Side, StartScore, Who } from "./types";

/**
 * Tennis scoring, worked out from the list of charted points. Nothing about the score, the server or the
 * side is stored with a point: it is all derived here from who won each point, so deleting or undoing a point
 * anywhere in the list leaves every later point correct.
 *
 * Rules: a game goes to 4 points with a lead of 2 (no-ad: the point at deuce decides). A set goes to 6 games with a
 * lead of 2, with a tiebreak to 7 at 6:6 if the format has one (without it the set goes on until a lead of 2). The
 * deciding set can be a match tiebreak to 10. Servers alternate each game; a tiebreak starts with the player due to
 * serve and then each player serves two points; the first point of a tiebreak is served from the deuce side and each
 * later pair of points starts from the deuce side.
 */

export type GameMode = "game" | "tiebreak" | "matchTiebreak";

export interface SetResult extends Pair {
  /** A match tiebreak: `player` and `opponent` are its points, not games. */
  matchTiebreak?: boolean;
}

/** The situation just before one point is played. */
export interface PointScore {
  server: Who;
  side: Side;
  mode: GameMode;
  /** Finished sets. */
  sets: SetResult[];
  /** Games in the current set. */
  games: Pair;
  /** Points in the current game (raw counts; a tiebreak counts every point). */
  points: Pair;
  /** 1 for the first set. */
  setNumber: number;
  /** The returner who would win the game by winning this point, if any (never in a tiebreak). */
  breakPoint: Who | null;
  /** The game stands at 30:30 or deuce. */
  pressure: boolean;
  /** The match was already decided before this point. */
  over: boolean;
  winner: Who | null;
}

interface State {
  sets: SetResult[];
  games: Pair;
  points: Pair;
  mode: GameMode;
  /** Server of the game in progress (not used in a tiebreak). */
  gameServer: Who;
  /** Who served the first point of the tiebreak in progress. */
  tbStarter: Who;
  over: boolean;
  winner: Who | null;
}

const zero = (): Pair => ({ player: 0, opponent: 0 });
export const setsToWin = (f: MatchFormat): number => (f.bestOf === 5 ? 3 : 2);

export function setsWon(sets: readonly SetResult[]): Pair {
  const w = zero();
  for (const s of sets) {
    if (s.player > s.opponent) w.player++;
    else if (s.opponent > s.player) w.opponent++;
  }
  return w;
}

/** Is this the set that decides the match (both players one set short)? */
function isDeciding(sets: readonly SetResult[], f: MatchFormat): boolean {
  const w = setsWon(sets);
  return w.player === setsToWin(f) - 1 && w.opponent === setsToWin(f) - 1;
}

/** Is the game that starts from this set score a normal game, a tiebreak or a match tiebreak? */
export function modeFor(s: { sets: readonly SetResult[]; games: Pair }, f: MatchFormat): GameMode {
  if (f.matchTiebreak && isDeciding(s.sets, f)) return "matchTiebreak";
  if (f.tiebreak && s.games.player === 6 && s.games.opponent === 6) return "tiebreak";
  return "game";
}

/** Who serves point number `t` (counted from 0) of a tiebreak that `starter` began. */
function tiebreakServer(starter: Who, t: number): Who {
  return ((t + 1) >> 1) % 2 === 0 ? starter : other(starter);
}

function initialState(scoring: Scoring): State {
  const f = scoring.format;
  const start: StartScore | undefined = scoring.startScore;
  const s: State = {
    sets: start ? start.sets.map((x) => ({ ...x })) : [],
    games: start ? { ...start.games } : zero(),
    points: start ? { ...start.points } : zero(),
    mode: "game",
    gameServer: scoring.firstServer,
    tbStarter: scoring.firstServer,
    over: false,
    winner: null,
  };
  s.mode = modeFor(s, f);
  if (s.mode !== "game") {
    // The first charted point is served by `firstServer`; work back to the player who began the tiebreak.
    const t = s.points.player + s.points.opponent;
    s.tbStarter = tiebreakServer(scoring.firstServer, t) === scoring.firstServer ? scoring.firstServer : other(scoring.firstServer);
  }
  const w = setsWon(s.sets);
  if (w.player >= setsToWin(f) || w.opponent >= setsToWin(f)) {
    s.over = true;
    s.winner = w.player >= setsToWin(f) ? "player" : "opponent";
  }
  return s;
}

function contextOf(s: State, f: MatchFormat): PointScore {
  const total = s.points.player + s.points.opponent;
  let server: Who;
  let side: Side;
  if (s.mode === "game") {
    server = s.gameServer;
    side = total % 2 === 0 ? "deuce" : "ad";
  } else {
    server = tiebreakServer(s.tbStarter, total);
    // First point from the deuce side, then every pair of points starts from the deuce side.
    side = total === 0 || total % 2 === 1 ? "deuce" : "ad";
  }
  let breakPoint: Who | null = null;
  let pressure = false;
  if (s.mode === "game") {
    const returner = other(server);
    const r = s.points[returner];
    const sv = s.points[server];
    if (f.noAd ? r === 3 : r >= 3 && r > sv) breakPoint = returner;
    pressure = s.points.player === s.points.opponent && s.points.player >= 2;
  }
  return {
    server,
    side,
    mode: s.mode,
    sets: s.sets,
    games: s.games,
    points: s.points,
    setNumber: s.sets.length + 1,
    breakPoint,
    pressure,
    over: s.over,
    winner: s.winner,
  };
}

/** A set is finished: record it, and see whether the match is over or the next set is a match tiebreak. */
function finishSet(s: State, w: Who, f: MatchFormat): State {
  s.sets = [...s.sets, { ...s.games }];
  s.games = zero();
  s.points = zero();
  if (setsWon(s.sets)[w] >= setsToWin(f)) {
    s.over = true;
    s.winner = w;
    s.mode = "game";
    return s;
  }
  s.mode = modeFor(s, f);
  // The next game, or a match tiebreak, is served by whoever is next in the order.
  s.tbStarter = s.gameServer;
  return s;
}

function step(prev: State, w: Who, f: MatchFormat): State {
  if (prev.over) return prev;
  const o = other(w);
  const s: State = { ...prev, games: { ...prev.games }, points: { ...prev.points } };
  s.points[w]++;
  const pw = s.points[w];
  const po = s.points[o];

  if (s.mode === "game") {
    const won = f.noAd ? pw >= 4 : pw >= 4 && pw - po >= 2;
    if (!won) return s;
    s.points = zero();
    s.games[w]++;
    s.gameServer = other(s.gameServer);
    const gw = s.games[w];
    const go = s.games[o];
    if (gw >= 6 && gw - go >= 2) return finishSet(s, w, f);
    if (f.tiebreak && gw === 6 && go === 6) {
      s.mode = "tiebreak";
      s.tbStarter = s.gameServer;
    }
    return s;
  }

  if (s.mode === "tiebreak") {
    if (!(pw >= 7 && pw - po >= 2)) return s;
    s.games[w]++; // 7:6
    s.gameServer = other(s.tbStarter);
    return finishSet(s, w, f);
  }

  // match tiebreak to 10
  if (!(pw >= 10 && pw - po >= 2)) return s;
  s.sets = [...s.sets, { player: s.points.player, opponent: s.points.opponent, matchTiebreak: true }];
  s.points = zero();
  s.over = true;
  s.winner = w;
  s.mode = "game";
  return s;
}

/**
 * The situation before each point, and (as the last entry) before the next point to be charted.
 * `result[i]` is the score, server and side for `points[i]`; `result[points.length]` is for the next point.
 */
export function scoreBefore(
  points: readonly Pick<ChartPoint, "winner">[],
  format: MatchFormat,
  firstServer: Who,
  startScore?: StartScore
): PointScore[] {
  let state = initialState({ format, firstServer, startScore });
  const out: PointScore[] = [];
  for (const p of points) {
    out.push(contextOf(state, format));
    state = step(state, p.winner, format);
  }
  out.push(contextOf(state, format));
  return out;
}

// ---- Pressure ------------------------------------------------------------------------------------------

export interface PressureSide {
  /** Break points this person faced on their own serve. */
  breakPointsFaced: number;
  breakPointsSaved: number;
  /** Break points this person had on the other's serve. */
  breakPointChances: number;
  breakPointsWon: number;
  /** Points played at 30:30 or deuce, and how many this person won. */
  pressurePlayed: number;
  pressureWon: number;
}

export interface Pressure {
  player: PressureSide;
  opponent: PressureSide;
}

const blankSide = (): PressureSide => ({
  breakPointsFaced: 0,
  breakPointsSaved: 0,
  breakPointChances: 0,
  breakPointsWon: 0,
  pressurePlayed: 0,
  pressureWon: 0,
});

/** Break points and points at 30:30 or deuce. Tiebreaks have no break points; points after the match ended are left out. */
export function computePressure(points: readonly Pick<ChartPoint, "winner">[], timeline: readonly PointScore[]): Pressure {
  const out: Pressure = { player: blankSide(), opponent: blankSide() };
  points.forEach((p, i) => {
    const ctx = timeline[i];
    if (!ctx || ctx.over) return;
    if (ctx.breakPoint) {
      const returner = ctx.breakPoint;
      const server = other(returner);
      out[server].breakPointsFaced++;
      out[returner].breakPointChances++;
      if (p.winner === server) out[server].breakPointsSaved++;
      else out[returner].breakPointsWon++;
    }
    if (ctx.pressure) {
      out.player.pressurePlayed++;
      out.opponent.pressurePlayed++;
      out[p.winner].pressureWon++;
    }
  });
  return out;
}

// ---- Showing a score -----------------------------------------------------------------------------------

export type GameKind = "points" | "deuce" | "advPlayer" | "advOpponent" | "tiebreak";

/** The game score as it is said: 0, 15, 30, 40, deuce, advantage; a tiebreak shows its raw points. */
export function gameScore(ctx: Pick<PointScore, "mode" | "points">): { player: string; opponent: string; kind: GameKind } {
  const { player: p, opponent: o } = ctx.points;
  if (ctx.mode !== "game") return { player: String(p), opponent: String(o), kind: "tiebreak" };
  const say = (n: number) => ["0", "15", "30", "40"][Math.min(n, 3)];
  if (p >= 3 && o >= 3) {
    if (p === o) return { player: "40", opponent: "40", kind: "deuce" };
    return p > o ? { player: "AD", opponent: "40", kind: "advPlayer" } : { player: "40", opponent: "AD", kind: "advOpponent" };
  }
  return { player: say(p), opponent: say(o), kind: "points" };
}

// ---- Starting score: reading and checking what the coach types ----------------------------------------

/** "6:4", "6-4" or "6 4" as a pair of whole numbers, or null. */
export function parsePair(text: string): Pair | null {
  const m = text.trim().match(/^(\d{1,2})\s*[:\-/ ]\s*(\d{1,2})$/);
  return m ? { player: Number(m[1]), opponent: Number(m[2]) } : null;
}

/** "6:4, 3:6" (separated by commas or semicolons) as finished sets. Empty text is no sets. */
export function parseSets(text: string): SetResult[] | null {
  const parts = text.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  const out: SetResult[] = [];
  for (const part of parts) {
    const pair = parsePair(part);
    if (!pair) return null;
    out.push(pair);
  }
  return out;
}

/** "30:15", "40:AD" or "40:40" as raw point counts; in a tiebreak, plain numbers like "5:3". */
export function parseGamePoints(text: string, tiebreak: boolean): Pair | null {
  const t = text.trim().toUpperCase();
  if (t === "") return { player: 0, opponent: 0 };
  if (tiebreak) return parsePair(t);
  const m = t.match(/^(0|15|30|40|AD|A)\s*[:\-/ ]\s*(0|15|30|40|AD|A)$/);
  if (!m) return null;
  const raw = (v: string) => ({ "0": 0, "15": 1, "30": 2, "40": 3, AD: 4, A: 4 })[v] as number;
  const a = raw(m[1]);
  const b = raw(m[2]);
  if (a === 4 && b === 4) return null;
  if (a === 4) return b === 3 ? { player: 4, opponent: 3 } : null;
  if (b === 4) return a === 3 ? { player: 3, opponent: 4 } : null;
  return { player: a, opponent: b };
}

export type ScoringError = "sets" | "games" | "points" | "over";

/** Is a starting score possible? Returns what is wrong, or null. */
export function checkStartScore(format: MatchFormat, start: StartScore): ScoringError | null {
  const finishedSet = (s: SetResult) => {
    const hi = Math.max(s.player, s.opponent);
    const lo = Math.min(s.player, s.opponent);
    if (hi === 6) return lo <= 4;
    if (hi === 7) return lo === 5 || (lo === 6 && format.tiebreak);
    return !format.tiebreak && hi > 7 && hi - lo === 2;
  };
  if (start.sets.length > format.bestOf - 1 || start.sets.some((x) => !finishedSet(x))) return "sets";
  const won = setsWon(start.sets);
  if (won.player >= setsToWin(format) || won.opponent >= setsToWin(format)) return "over";

  const g = start.games;
  const hi = Math.max(g.player, g.opponent);
  const lo = Math.min(g.player, g.opponent);
  const inProgress = !(hi >= 6 && hi - lo >= 2) && (format.tiebreak ? hi <= 6 : hi <= 30);
  if (!inProgress) return "games";

  const mode = modeFor({ sets: start.sets, games: g }, format);
  const p = start.points;
  if (mode === "game") {
    const top = Math.max(p.player, p.opponent);
    const low = Math.min(p.player, p.opponent);
    // 0 to 40 each, or advantage (4:3 / 3:4), which does not exist in no-ad scoring.
    if (top > 4 || (top === 4 && (low !== 3 || format.noAd))) return "points";
  } else {
    const target = mode === "tiebreak" ? 7 : 10;
    if (Math.max(p.player, p.opponent) >= target && Math.abs(p.player - p.opponent) >= 2) return "points";
  }
  return null;
}
