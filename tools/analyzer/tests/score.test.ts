import { describe, expect, it } from "vitest";
import { resolveProject, resolvePoints } from "../src/match";
import {
  checkStartScore,
  computePressure,
  gameScore,
  parseGamePoints,
  parsePair,
  parseSets,
  scoreBefore,
  setsWon,
} from "../src/score";
import { DEFAULT_FORMAT, defaultScoring, type ChartPoint, type MatchFormat, type StartScore, type Who } from "../src/types";

/** "PPOP" = player, player, opponent, player won the points. */
const W = (s: string): { winner: Who }[] => [...s].map((c) => ({ winner: c === "P" ? "player" : "opponent" }));
const run = (s: string, format: Partial<MatchFormat> = {}, first: Who = "player", start?: StartScore) =>
  scoreBefore(W(s), { ...DEFAULT_FORMAT, ...format }, first, start);
/** Game winners as points: "PO" = player wins a game to love, then the opponent does. */
const games = (s: string) => [...s].map((c) => c.repeat(4)).join("");
/** Points won alternately, P first, n points. */
const alt = (n: number) => Array.from({ length: n }, (_, i) => (i % 2 === 0 ? "P" : "O")).join("");

describe("a normal game", () => {
  it("counts 0, 15, 30, 40 and ends at four points, then the games and the server move on", () => {
    const t = run("PPPP");
    expect(t.map((c) => gameScore(c).player + ":" + gameScore(c).opponent)).toEqual(["0:0", "15:0", "30:0", "40:0", "0:0"]);
    expect(t[4].games).toEqual({ player: 1, opponent: 0 });
    expect(t[4].points).toEqual({ player: 0, opponent: 0 });
    expect(t[0].server).toBe("player");
    expect(t[4].server).toBe("opponent");
  });

  it("serves from the deuce side at an even number of points and the ad side at an odd number", () => {
    expect(run("PPPOO").map((c) => c.side)).toEqual(["deuce", "ad", "deuce", "ad", "deuce", "ad"]);
  });

  it("the server alternates every game for the whole set", () => {
    const t = run(games("PPOP"));
    // one entry per point; the first point of each game
    const firsts = [0, 4, 8, 12, 16].map((i) => t[i].server);
    expect(firsts).toEqual(["player", "opponent", "player", "opponent", "player"]);
  });

  it("deuce, advantage and back to deuce, until someone leads by two", () => {
    const t = run("PPPOOOPOPP");
    expect(gameScore(t[6])).toMatchObject({ player: "40", opponent: "40", kind: "deuce" });
    expect(gameScore(t[7])).toMatchObject({ player: "AD", opponent: "40", kind: "advPlayer" });
    expect(gameScore(t[8])).toMatchObject({ kind: "deuce" }); // 4:4
    expect(gameScore(t[9])).toMatchObject({ kind: "advPlayer" }); // 5:4
    expect(t[10].games).toEqual({ player: 1, opponent: 0 });
  });

  it("with no-ad scoring the point at deuce decides the game", () => {
    const noAd = run("PPPOOOP", { noAd: true });
    expect(noAd[6].points).toEqual({ player: 3, opponent: 3 });
    expect(noAd[7].games).toEqual({ player: 1, opponent: 0 });
    const withAd = run("PPPOOOP");
    expect(withAd[7].games).toEqual({ player: 0, opponent: 0 });
  });
});

describe("sets", () => {
  it("a set ends at 6:4 and the next set starts at 0:0", () => {
    const t = run(games("POPOPOPOPP"));
    const last = t[t.length - 1];
    expect(last.sets).toEqual([{ player: 6, opponent: 4 }]);
    expect(last.games).toEqual({ player: 0, opponent: 0 });
    expect(last.setNumber).toBe(2);
    expect(last.over).toBe(false);
  });

  it("at 6:5 the set goes on, and ends at 7:5", () => {
    const at65 = run(games("POPOPOPOPOP"));
    expect(at65[at65.length - 1].games).toEqual({ player: 6, opponent: 5 });
    const t = run(games("POPOPOPOPOPP"));
    expect(t[t.length - 1].sets).toEqual([{ player: 7, opponent: 5 }]);
  });

  it("the match is over when a player has won two sets in a best of three, and later points are marked", () => {
    const t = run(games("PPPPPP") + games("PPPPPP") + "PP");
    const end = t[t.length - 3];
    expect(end.over).toBe(true);
    expect(end.winner).toBe("player");
    expect(setsWon(end.sets)).toEqual({ player: 2, opponent: 0 });
    expect(t[t.length - 1].over).toBe(true);
    expect(t[t.length - 1].points).toEqual({ player: 0, opponent: 0 });
  });

  it("a best of five needs three sets", () => {
    const sets = (w: string) => w.split("").map((c) => games(c.repeat(6))).join("");
    const oneAll = run(sets("PO"));
    expect(oneAll[oneAll.length - 1].over).toBe(false);
    const bo3 = run(sets("PP"));
    expect(bo3[bo3.length - 1].over).toBe(true);
    const twoAll = run(sets("PO") + sets("PO"), { bestOf: 5 });
    expect(twoAll[twoAll.length - 1].over).toBe(false);
    const bo5 = run(sets("PO") + sets("PO") + sets("P"), { bestOf: 5 });
    expect(bo5[bo5.length - 1].over).toBe(true);
    expect(bo5[bo5.length - 1].winner).toBe("player");
  });
});

describe("tiebreak at 6:6", () => {
  const to66 = games("POPOPOPOPOPO"); // 12 games, the server of the 12th game is the opponent
  it("starts at 6:6 with the player who is next to serve, then each player serves two points", () => {
    const t = run(to66 + alt(9));
    const tb = t.slice(to66.length);
    expect(tb[0].mode).toBe("tiebreak");
    // game 13 would have been the player's, so the player begins: P, O O, P P, O O, P P
    expect(tb.slice(0, 9).map((c) => c.server)).toEqual(["player", "opponent", "opponent", "player", "player", "opponent", "opponent", "player", "player"]);
  });

  it("serves the first point from the deuce side and starts every later pair of points from the deuce side", () => {
    const t = run(to66 + alt(9)).slice(to66.length);
    expect(t.slice(0, 9).map((c) => c.side)).toEqual(["deuce", "deuce", "ad", "deuce", "ad", "deuce", "ad", "deuce", "ad"]);
  });

  it("is played to seven with a lead of two, and the set is recorded as 7:6", () => {
    // 12 points alternating = 6:6; then P (7:6, not finished), O (7:7), P (8:7), P (9:7)
    const t = run(to66 + alt(12) + "POPP");
    const end = t[t.length - 1];
    expect(end.sets).toEqual([{ player: 7, opponent: 6 }]);
    expect(t[to66.length + 12].points).toEqual({ player: 6, opponent: 6 });
    expect(t[to66.length + 13].points).toEqual({ player: 7, opponent: 6 }); // not finished: no lead of two
    expect(t[to66.length + 14].points).toEqual({ player: 7, opponent: 7 });
  });

  it("after the tiebreak the opponent of the player who began it serves first in the next set", () => {
    const t = run(to66 + "PPPPPPP"); // player begins and wins 7:0
    expect(t[t.length - 1].setNumber).toBe(2);
    expect(t[t.length - 1].server).toBe("opponent");
    const other = run(to66 + "OOOOOOO");
    expect(other[other.length - 1].server).toBe("opponent");
  });

  it("without a tiebreak the set goes on until a lead of two games", () => {
    const t = run(to66 + games("P"), { tiebreak: false });
    expect(t[t.length - 1].games).toEqual({ player: 7, opponent: 6 });
    expect(t[t.length - 1].mode).toBe("game");
    const done = run(to66 + games("PP"), { tiebreak: false });
    expect(done[done.length - 1].sets).toEqual([{ player: 8, opponent: 6 }]);
  });
});

describe("match tiebreak to 10 as the deciding set", () => {
  const oneSetAll = games("PPPPPP") + games("OOOOOO"); // 12 games
  const fmt = { matchTiebreak: true };

  it("replaces the third set, begun by the player next to serve", () => {
    const t = run(oneSetAll + alt(9), fmt);
    const tb = t.slice(oneSetAll.length);
    expect(tb[0].mode).toBe("matchTiebreak");
    expect(tb.slice(0, 9).map((c) => c.server)).toEqual(["player", "opponent", "opponent", "player", "player", "opponent", "opponent", "player", "player"]);
    expect(tb.slice(0, 5).map((c) => c.side)).toEqual(["deuce", "deuce", "ad", "deuce", "ad"]);
  });

  it("ends at ten points with a lead of two and decides the match", () => {
    const quick = run(oneSetAll + "P".repeat(10), fmt);
    const end = quick[quick.length - 1];
    expect(end.over).toBe(true);
    expect(end.winner).toBe("player");
    expect(end.sets[2]).toEqual({ player: 10, opponent: 0, matchTiebreak: true });
    const long = run(oneSetAll + alt(18) + "POPP", fmt); // 9:9, then 10:9, 10:10, 11:10, 12:10
    expect(long[long.length - 1].over).toBe(true);
    expect(long[long.length - 1].sets[2]).toMatchObject({ player: 12, opponent: 10 });
    expect(long[long.length - 5].over).toBe(false);
  });

  it("is not used when the format has no match tiebreak: the deciding set is a normal set", () => {
    expect(run(oneSetAll)[oneSetAll.length].mode).toBe("game");
  });
});

describe("starting from the middle of a match", () => {
  it("takes the score, the set number and the server from the starting score", () => {
    const start: StartScore = { sets: [{ player: 6, opponent: 4 }], games: { player: 3, opponent: 2 }, points: { player: 2, opponent: 1 } };
    const t = run("P", {}, "opponent", start);
    expect(t[0]).toMatchObject({ server: "opponent", side: "ad", mode: "game", setNumber: 2 });
    expect(gameScore(t[0])).toMatchObject({ player: "30", opponent: "15" });
    expect(gameScore(t[1])).toMatchObject({ player: "40", opponent: "15" });
  });

  it("continues the game order from there", () => {
    const start: StartScore = { sets: [], games: { player: 2, opponent: 2 }, points: { player: 0, opponent: 0 } };
    const t = run("PPPPPPPP", {}, "player", start);
    expect(t[0].server).toBe("player");
    expect(t[4].server).toBe("opponent");
    expect(t[8].games).toEqual({ player: 4, opponent: 2 });
  });

  it("starting inside a tiebreak works back to who began it", () => {
    const start: StartScore = { sets: [], games: { player: 6, opponent: 6 }, points: { player: 3, opponent: 2 } };
    const t = run("PP", {}, "player", start);
    expect(t[0]).toMatchObject({ mode: "tiebreak", server: "player", side: "deuce" }); // point 6 of the tiebreak: first of a pair
    expect(t[1]).toMatchObject({ server: "player", side: "ad" }); // 7th point: second of the pair
    expect(t[2].server).toBe("opponent");
  });

  it("starting inside a match tiebreak", () => {
    const start: StartScore = { sets: [{ player: 6, opponent: 0 }, { player: 0, opponent: 6 }], games: { player: 0, opponent: 0 }, points: { player: 4, opponent: 4 } };
    const t = run("PP", { matchTiebreak: true }, "opponent", start);
    expect(t[0].mode).toBe("matchTiebreak");
    expect(t[0].server).toBe("opponent");
    expect(t[2].points).toEqual({ player: 6, opponent: 4 });
  });

  it("checks that a starting score is possible", () => {
    const ok: StartScore = { sets: [{ player: 6, opponent: 4 }], games: { player: 3, opponent: 2 }, points: { player: 2, opponent: 1 } };
    expect(checkStartScore(DEFAULT_FORMAT, ok)).toBeNull();
    expect(checkStartScore(DEFAULT_FORMAT, { ...ok, sets: [{ player: 6, opponent: 5 }] })).toBe("sets");
    expect(checkStartScore(DEFAULT_FORMAT, { ...ok, sets: [{ player: 6, opponent: 0 }, { player: 6, opponent: 0 }] })).toBe("over");
    expect(checkStartScore(DEFAULT_FORMAT, { ...ok, games: { player: 6, opponent: 2 } })).toBe("games");
    expect(checkStartScore(DEFAULT_FORMAT, { ...ok, points: { player: 4, opponent: 1 } })).toBe("points");
    expect(checkStartScore({ ...DEFAULT_FORMAT, noAd: true }, { ...ok, points: { player: 4, opponent: 3 } })).toBe("points");
  });

  it("reads what the coach types", () => {
    expect(parsePair("6:4")).toEqual({ player: 6, opponent: 4 });
    expect(parsePair("3-2")).toEqual({ player: 3, opponent: 2 });
    expect(parsePair("six")).toBeNull();
    expect(parseSets("6:4, 3-6")).toEqual([{ player: 6, opponent: 4 }, { player: 3, opponent: 6 }]);
    expect(parseSets("")).toEqual([]);
    expect(parseSets("6:4; x")).toBeNull();
    expect(parseGamePoints("30:15", false)).toEqual({ player: 2, opponent: 1 });
    expect(parseGamePoints("40:ad", false)).toEqual({ player: 3, opponent: 4 });
    expect(parseGamePoints("AD:40", false)).toEqual({ player: 4, opponent: 3 });
    expect(parseGamePoints("AD:30", false)).toBeNull();
    expect(parseGamePoints("40:40", false)).toEqual({ player: 3, opponent: 3 });
    expect(parseGamePoints("5:3", true)).toEqual({ player: 5, opponent: 3 });
    expect(parseGamePoints("", false)).toEqual({ player: 0, opponent: 0 });
  });
});

describe("break points and pressure points", () => {
  it("a break point is a point the returner wins the game with", () => {
    const t = run("OOOPO");
    // the player serves; 0:30 is not one, 0:40 (index 3) is, 15:40 (index 4) is
    expect(t.map((c) => c.breakPoint)).toEqual([null, null, null, "opponent", "opponent", null]);
  });

  it("with ad scoring deuce is not a break point but advantage for the returner is", () => {
    const t = run("PPPOOOO");
    expect(t[6].breakPoint).toBeNull(); // deuce
    expect(t[7].breakPoint).toBe("opponent"); // advantage out
    const noAd = run("PPPOOO", { noAd: true });
    expect(noAd[6].breakPoint).toBe("opponent"); // the deciding point
  });

  it("there are no break points in a tiebreak", () => {
    const t = run(games("POPOPOPOPOPO") + alt(14));
    expect(t.slice(48).every((c) => c.breakPoint === null)).toBe(true);
  });

  it("counts break points faced, saved, won, and points at 30:30 or deuce", () => {
    const pts = W("OOOPO"); // the player serves; faces two break points, saves one, loses one
    const p = computePressure(pts, run("OOOPO"));
    expect(p.player).toMatchObject({ breakPointsFaced: 2, breakPointsSaved: 1 });
    expect(p.opponent).toMatchObject({ breakPointChances: 2, breakPointsWon: 1 });

    const level = W("PPOOPOOO");
    const q = computePressure(level, run("PPOOPOOO"));
    // 30:30 before index 4 (the player won it) and deuce before index 6 (the opponent won it)
    expect(q.player).toMatchObject({ pressurePlayed: 2, pressureWon: 1 });
    expect(q.opponent).toMatchObject({ pressurePlayed: 2, pressureWon: 1 });
  });

  it("leaves out points played after the match was decided", () => {
    const played = games("PPPPPP") + games("PPPPPP");
    const before = computePressure(W(played), scoreBefore(W(played), DEFAULT_FORMAT, "player"));
    // four more points after the match: the opponent leads 0:40 and the game would be a break point
    const after = computePressure(W(played + "OOOP"), scoreBefore(W(played + "OOOP"), DEFAULT_FORMAT, "player"));
    expect(after).toEqual(before);
  });
});

describe("derived from the points, so undo and delete stay correct", () => {
  const point = (winner: Who, extra: Partial<ChartPoint> = {}): ChartPoint => ({
    id: Math.random().toString(36).slice(2),
    server: "player",
    side: "deuce",
    serves: [{ x: 10, y: 28, in: true }],
    rally: [],
    outcome: "winner",
    winner,
    ...extra,
  });

  it("deleting a point in the middle moves every later server and side", () => {
    const sc = defaultScoring();
    const pts = ["P", "P", "P", "P", "O"].map((c) => point(c === "P" ? "player" : "opponent"));
    const full = resolvePoints(pts, sc);
    expect(full.points[4].server).toBe("opponent"); // second game
    expect(full.points[4].side).toBe("deuce");
    const cut = resolvePoints(pts.filter((_, i) => i !== 1), sc); // P, P, P, O: still the first game
    expect(cut.points[3].server).toBe("player");
    expect(cut.points[3].side).toBe("ad");
  });

  it("a manual override keeps its own server and side and does not change the score", () => {
    const sc = defaultScoring();
    const pts = [point("player"), point("player", { server: "opponent", side: "ad", manualServer: true, manualSide: true }), point("opponent")];
    const r = resolvePoints(pts, sc);
    expect(r.points[1]).toMatchObject({ server: "opponent", side: "ad" });
    expect(r.points[2]).toMatchObject({ server: "player", side: "deuce" }); // derived again: 2 points played, even
    expect(r.timeline[3].points).toEqual({ player: 2, opponent: 1 });
  });

  it("resolveProject gives the stats the effective server", () => {
    const sc = defaultScoring();
    // charted with the wrong server on purpose; the score says the opponent serves the second game
    const pts = [point("player"), point("player"), point("player"), point("player"), point("opponent", { server: "player" })];
    const r = resolveProject({ points: pts, scoring: sc });
    expect(r.points[4].server).toBe("opponent");
    expect(r.stats.opponent.servePoints).toBe(1);
    expect(r.stats.pressure).toBeDefined();
  });
});
