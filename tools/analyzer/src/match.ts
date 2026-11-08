import { computePressure, scoreBefore, type Pressure, type PointScore } from "./score";
import { computeStats, type Stats } from "./stats";
import type { ChartPoint, Scoring } from "./types";

/** Everything worked out from the charted points and the match setup, in one place. */
export interface Resolved {
  /** The points with the server and side as they apply: derived from the score unless the coach overrode them. */
  points: ChartPoint[];
  /** The score before each point; the last entry is the state before the next point to chart. */
  timeline: PointScore[];
  stats: Stats;
  pressure: Pressure;
}

export function resolvePoints(points: ChartPoint[], scoring: Scoring): { points: ChartPoint[]; timeline: PointScore[] } {
  const timeline = scoreBefore(points, scoring.format, scoring.firstServer, scoring.startScore);
  return {
    timeline,
    points: points.map((p, i) => ({
      ...p,
      server: p.manualServer ? p.server : timeline[i].server,
      side: p.manualSide ? p.side : timeline[i].side,
    })),
  };
}

export function resolveProject(p: { points: ChartPoint[]; scoring: Scoring }): Resolved {
  const { points, timeline } = resolvePoints(p.points, p.scoring);
  const pressure = computePressure(points, timeline);
  const stats = computeStats(points);
  stats.pressure = pressure;
  return { points, timeline, stats, pressure };
}
