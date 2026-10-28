import { COURT, inBox, other, serveZone, serviceBox, type Zone } from "./court";
import type { ChartPoint, Pt, Who } from "./types";

/** Charting numbers in the shape the website's editor reads (docs/analysis-import.md). */
export interface Charting {
  points?: number;
  serve?: {
    first?: { in?: number; total?: number; pointsWon?: number; pointsPlayed?: number };
    second?: { in?: number; total?: number; pointsWon?: number; pointsPlayed?: number };
    placement?: Partial<Record<"deuce" | "ad", Partial<Record<Zone, number>>>>;
  };
  rally?: { averageLength?: number };
  errors?: { unforced?: number; forced?: number; doubleFaults?: number; winners?: number; aces?: number };
}

/** Did the serve land in the right box? Decided from where it landed, and stored with the point. */
export function serveIsIn(p: Pt, side: "deuce" | "ad"): boolean {
  return inBox(p, serviceBox(side));
}

/** Shots in the point: the serve if it was in, plus every shot that followed. */
export function rallyLength(p: ChartPoint): number {
  const serveIn = p.serves.some((s) => s.in);
  return (serveIn ? 1 : 0) + p.rally.length;
}

export interface PlayerStats {
  pointsWon: number;
  winners: number;
  aces: number;
  doubleFaults: number;
  forcedErrors: number;
  unforcedErrors: number;
  /** Serve numbers of this person's own service points. */
  servePoints: number;
  firstTotal: number;
  firstIn: number;
  firstPlayed: number;
  firstWon: number;
  secondTotal: number;
  secondIn: number;
  secondPlayed: number;
  secondWon: number;
}

const blank = (): PlayerStats => ({
  pointsWon: 0, winners: 0, aces: 0, doubleFaults: 0, forcedErrors: 0, unforcedErrors: 0, servePoints: 0,
  firstTotal: 0, firstIn: 0, firstPlayed: 0, firstWon: 0, secondTotal: 0, secondIn: 0, secondPlayed: 0, secondWon: 0,
});

export interface Stats {
  total: number;
  averageRally: number;
  player: PlayerStats;
  opponent: PlayerStats;
}

/**
 * Per person. A point's outcome belongs to whoever hit the final shot: winners and aces to the point's
 * winner, errors and double faults to the other person. Serve numbers count the person's own service points.
 */
export function computeStats(points: ChartPoint[]): Stats {
  const s: Record<Who, PlayerStats> = { player: blank(), opponent: blank() };
  let shots = 0;
  for (const p of points) {
    const winner = s[p.winner];
    const loser = s[other(p.winner)];
    winner.pointsWon++;
    if (p.outcome === "winner") winner.winners++;
    else if (p.outcome === "ace") winner.aces++;
    else if (p.outcome === "double_fault") loser.doubleFaults++;
    else if (p.outcome === "forced_error") loser.forcedErrors++;
    else if (p.outcome === "unforced_error") loser.unforcedErrors++;
    shots += rallyLength(p);

    const server = s[p.server];
    server.servePoints++;
    const [first, second] = p.serves;
    if (first) {
      server.firstTotal++;
      if (first.in) {
        server.firstIn++;
        server.firstPlayed++;
        if (p.winner === p.server) server.firstWon++;
      }
    }
    if (second) {
      server.secondTotal++;
      if (second.in) {
        server.secondIn++;
        server.secondPlayed++;
        if (p.winner === p.server) server.secondWon++;
      }
    }
  }
  return { total: points.length, averageRally: points.length ? shots / points.length : 0, player: s.player, opponent: s.opponent };
}

/** How many of this person's serves landed in each zone, by side (first and second serves that were in). */
export function placement(points: ChartPoint[], who: Who): Record<"deuce" | "ad", Record<Zone, number>> {
  const out = { deuce: { wide: 0, body: 0, t: 0 }, ad: { wide: 0, body: 0, t: 0 } };
  for (const p of points) {
    if (p.server !== who) continue;
    const landed = p.serves.find((x) => x.in);
    if (landed) out[p.side][serveZone(landed, p.side)]++;
  }
  return out;
}

/** The numbers the website editor reads, for the analysed player. Left out entirely when nothing is charted. */
export function toCharting(points: ChartPoint[]): Charting | undefined {
  if (points.length === 0) return undefined;
  const st = computeStats(points);
  const me = st.player;
  const hasServe = me.servePoints > 0;
  return {
    points: st.total,
    serve: hasServe
      ? {
          first: { in: me.firstIn, total: me.firstTotal, pointsWon: me.firstWon, pointsPlayed: me.firstPlayed },
          second: { in: me.secondIn, total: me.secondTotal, pointsWon: me.secondWon, pointsPlayed: me.secondPlayed },
          placement: placement(points, "player"),
        }
      : undefined,
    rally: { averageLength: Math.round(st.averageRally * 10) / 10 },
    errors: {
      unforced: me.unforcedErrors,
      forced: me.forcedErrors,
      doubleFaults: me.doubleFaults,
      winners: me.winners,
      aces: me.aces,
    },
  };
}

export type HeatKind = "serve" | "all";

/** Counts of landing spots in a grid over the court (cols across, rows along), for the heat map. */
export function heatGrid(points: ChartPoint[], kind: HeatKind, cols = 9, rows = 13): number[][] {
  const grid = Array.from({ length: rows }, () => Array<number>(cols).fill(0));
  const add = (p: Pt) => {
    if (p.x < 0 || p.x > COURT.width || p.y < 0 || p.y > COURT.length) return;
    const c = Math.min(cols - 1, Math.floor((p.x / COURT.width) * cols));
    const r = Math.min(rows - 1, Math.floor((p.y / COURT.length) * rows));
    grid[r][c]++;
  };
  for (const p of points) {
    for (const sv of p.serves) add(sv);
    if (kind === "all") p.rally.forEach(add);
  }
  return grid;
}

export const pct = (part: number, whole: number): string => (whole > 0 ? `${Math.round((part / whole) * 100)}%` : "n/a");
