import { describe, expect, it } from "vitest";
import { inBox, serveZone, serviceBox } from "../src/court";
import { computeStats, heatGrid, placement, rallyLength, serveIsIn, toCharting } from "../src/stats";
import type { ChartPoint } from "../src/types";

let n = 0;
function point(over: Partial<ChartPoint> & Pick<ChartPoint, "outcome" | "winner">): ChartPoint {
  return { id: `p${n++}`, server: "player", side: "deuce", serves: [{ x: 10, y: 28, in: true }], rally: [], ...over };
}

describe("court geometry", () => {
  it("a deuce serve must land in the box diagonally across, left of the centre line", () => {
    const box = serviceBox("deuce");
    expect(box).toEqual({ x1: 4.5, x2: 18, y1: 18, y2: 39 });
    expect(serveIsIn({ x: 10, y: 28 }, "deuce")).toBe(true);
    expect(serveIsIn({ x: 25, y: 28 }, "deuce")).toBe(false); // the wrong box
    expect(serveIsIn({ x: 10, y: 10 }, "deuce")).toBe(false); // long
    expect(serveIsIn({ x: 10, y: 45 }, "deuce")).toBe(false); // in the net side
  });
  it("an ad serve lands to the right of the centre line", () => {
    expect(serveIsIn({ x: 25, y: 28 }, "ad")).toBe(true);
    expect(serveIsIn({ x: 10, y: 28 }, "ad")).toBe(false);
    expect(inBox({ x: 18, y: 30 }, serviceBox("ad"))).toBe(true); // on the centre line counts
  });
  it("splits the box into T, body and wide thirds, the T beside the centre line", () => {
    expect(serveZone({ x: 17, y: 25 }, "deuce")).toBe("t");
    expect(serveZone({ x: 12, y: 25 }, "deuce")).toBe("body");
    expect(serveZone({ x: 5, y: 25 }, "deuce")).toBe("wide");
    expect(serveZone({ x: 19, y: 25 }, "ad")).toBe("t");
    expect(serveZone({ x: 24, y: 25 }, "ad")).toBe("body");
    expect(serveZone({ x: 30, y: 25 }, "ad")).toBe("wide");
  });
});

describe("computeStats", () => {
  const points: ChartPoint[] = [
    // Player serves: first serve in, ace.
    point({ outcome: "ace", winner: "player", rally: [] }),
    // First serve fault, second in, player wins with a winner after 3 more shots.
    point({ serves: [{ x: 10, y: 14, in: false }, { x: 6, y: 25, in: true }], rally: [{ x: 5, y: 60 }, { x: 20, y: 20 }, { x: 8, y: 8 }], outcome: "winner", winner: "player" }),
    // Double fault.
    point({ serves: [{ x: 10, y: 14, in: false }, { x: 10, y: 12, in: false }], outcome: "double_fault", winner: "opponent" }),
    // First serve in, player loses on an unforced error.
    point({ side: "ad", serves: [{ x: 28, y: 30, in: true }], rally: [{ x: 10, y: 60 }], outcome: "unforced_error", winner: "opponent" }),
    // Opponent serves, the player makes a forced error.
    point({ server: "opponent", serves: [{ x: 10, y: 25, in: true }], rally: [], outcome: "forced_error", winner: "opponent" }),
    // Opponent serves, the player hits a return winner.
    point({ server: "opponent", serves: [{ x: 10, y: 25, in: true }], rally: [{ x: 4, y: 70 }], outcome: "winner", winner: "player" }),
  ];
  const s = computeStats(points);

  it("counts the points and the average number of shots per point", () => {
    expect(s.total).toBe(6);
    // shots: 1, 1+3, 0, 1+1, 1, 1+1 = 10 over 6 points
    expect(s.averageRally).toBeCloseTo(10 / 6, 5);
    expect(rallyLength(points[2])).toBe(0);
  });
  it("splits first and second serve numbers for the server", () => {
    expect(s.player).toMatchObject({
      servePoints: 4,
      firstTotal: 4, firstIn: 2, firstPlayed: 2, firstWon: 1, // ace won; the unforced error point lost
      secondTotal: 2, secondIn: 1, secondPlayed: 1, secondWon: 1,
    });
  });
  it("gives winners and aces to the point's winner, errors and double faults to the other person", () => {
    expect(s.player).toMatchObject({ winners: 2, aces: 1, doubleFaults: 1, unforcedErrors: 1, forcedErrors: 1 });
    expect(s.player.pointsWon).toBe(3);
    expect(s.opponent.pointsWon).toBe(3);
  });
  it("counts serve placement by zone for in serves only, per side", () => {
    expect(placement(points, "player")).toEqual({ deuce: { wide: 1, body: 1, t: 0 }, ad: { wide: 1, body: 0, t: 0 } });
  });
  it("produces the numbers the website reads", () => {
    const c = toCharting(points)!;
    expect(c.points).toBe(6);
    expect(c.serve?.first).toEqual({ in: 2, total: 4, pointsWon: 1, pointsPlayed: 2 });
    expect(c.errors).toEqual({ unforced: 1, forced: 1, doubleFaults: 1, winners: 2, aces: 1 });
    expect(c.rally?.averageLength).toBe(1.7);
  });
  it("is undefined when nothing is charted", () => {
    expect(toCharting([])).toBeUndefined();
    expect(computeStats([]).averageRally).toBe(0);
  });
});

describe("heatGrid", () => {
  const pts = [point({ outcome: "ace", winner: "player", serves: [{ x: 1, y: 1, in: true }], rally: [{ x: 35, y: 77 }, { x: -3, y: 10 }] })];
  it("bins serve landings, and with all shots the rally too; ignores spots off the court", () => {
    const serve = heatGrid(pts, "serve", 9, 13);
    expect(serve[0][0]).toBe(1);
    expect(serve.flat().reduce((a, b) => a + b, 0)).toBe(1);
    const all = heatGrid(pts, "all", 9, 13);
    expect(all[12][8]).toBe(1);
    expect(all.flat().reduce((a, b) => a + b, 0)).toBe(2);
  });
});
