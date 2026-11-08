import { describe, expect, it } from "vitest";
import { userPrompt } from "../src/ai";
import { statRows } from "../src/i18n";
import { resolveProject } from "../src/match";
import { fromFile, newProject, readScoring, toFile } from "../src/project";
import { scoreBefore } from "../src/score";
import { toCharting } from "../src/stats";
import type { ChartPoint, Project, Who } from "../src/types";
// The website's own reader: the file must stay a valid import for the report editor.
import { parseAnalysisImport } from "../../../src/lib/analysisImport";

let n = 0;
const pt = (winner: Who, extra: Partial<ChartPoint> = {}): ChartPoint => ({
  id: `p${n++}`,
  server: "player",
  side: "deuce",
  serves: [{ x: 10, y: 28, in: true }],
  rally: [],
  outcome: "winner",
  winner,
  ...extra,
});
const winners = (s: string) => [...s].map((c) => pt(c === "P" ? "player" : "opponent"));

function project(): Project {
  const p = newProject({ player: "Alex Morgan", opponent: "Club rival", date: "2026-11-01", surface: "clay" }, "en", {
    format: { bestOf: 5, tiebreak: false, matchTiebreak: true, noAd: true },
    firstServer: "opponent",
    startScore: { sets: [{ player: 6, opponent: 4 }], games: { player: 3, opponent: 2 }, points: { player: 2, opponent: 1 } },
  });
  p.points = winners("OOOPOP");
  return p;
}

describe("the match setup in the project file", () => {
  it("round trips the format, the first server and the starting score", () => {
    const back = fromFile(JSON.parse(JSON.stringify(toFile(project()))));
    expect(back.scoring).toEqual(project().scoring);
    expect(back.points.map((p) => p.winner)).toEqual(project().points.map((p) => p.winner));
  });

  it("only adds fields: the old top level keys are all still there, and the new data lives under project", () => {
    const file = toFile(project()) as unknown as Record<string, unknown>;
    for (const key of ["format", "version", "exportedAt", "player", "match", "video", "notes", "charting", "summary", "project"]) expect(file).toHaveProperty(key);
    expect(Object.keys(file.match as object).sort()).toEqual(["date", "opponent", "surface"]);
    expect((file.project as Record<string, unknown>).scoring).toBeDefined();
  });

  it("the website still reads it, with no warnings, and ignores the pressure numbers", () => {
    const p = project();
    p.points = winners("OOOP");
    const file = JSON.parse(JSON.stringify(toFile(p)));
    expect(file.charting.pressure).toBeDefined();
    const r = parseAnalysisImport(file);
    if (!r.ok) throw new Error(r.error);
    expect(r.warnings).toEqual([]);
    expect(r.data.charting?.points).toBe(4);
  });

  it("exports break points and points at 30:30 or deuce for the analysed player", () => {
    const p = newProject({ player: "A" });
    p.points = winners("OOOPO"); // the player serves, faces two break points, saves one
    const c = JSON.parse(JSON.stringify(toFile(p))).charting;
    expect(c.pressure).toEqual({
      breakPointsFaced: 2,
      breakPointsSaved: 1,
      breakPointChances: 0,
      breakPointsWon: 0,
      pointsAt3030OrDeuce: { played: 0, won: 0 },
    });
    expect(toCharting([])).toBeUndefined();
  });
});

describe("old project files still open", () => {
  /** What a file from before scoring existed looks like: no scoring block, points without the new flags. */
  function oldFile() {
    const file = JSON.parse(JSON.stringify(toFile(newProject({ player: "Old Project" }))));
    delete file.project.scoring;
    file.project.points = [
      { id: "a", server: "opponent", side: "ad", serves: [{ x: 10, y: 28, in: true }], rally: [], outcome: "ace", winner: "opponent" },
      { id: "b", server: "player", side: "deuce", serves: [{ x: 25, y: 28, in: true }], rally: [], outcome: "winner", winner: "player" },
    ];
    return file;
  }

  it("gets the default setup: best of 3, tiebreak on, match tiebreak off, no-ad off, the player serves first", () => {
    const p = fromFile(oldFile());
    expect(p.scoring).toEqual({ format: { bestOf: 3, tiebreak: true, matchTiebreak: false, noAd: false }, firstServer: "player" });
  });

  it("keeps the server and side exactly as they were charted", () => {
    const p = fromFile(oldFile());
    expect(p.points.every((x) => x.manualServer && x.manualSide)).toBe(true);
    const r = resolveProject(p);
    expect(r.points.map((x) => [x.server, x.side])).toEqual([["opponent", "ad"], ["player", "deuce"]]);
  });

  it("opens a file whose scoring block is partly missing or unreadable, with defaults for the rest", () => {
    expect(readScoring({ format: { bestOf: 5 } }).scoring).toEqual({ format: { bestOf: 5, tiebreak: true, matchTiebreak: false, noAd: false }, firstServer: "player" });
    expect(readScoring({ firstServer: "opponent", format: { bestOf: 7, tiebreak: "yes" } }).scoring).toEqual({
      format: { bestOf: 3, tiebreak: true, matchTiebreak: false, noAd: false },
      firstServer: "opponent",
    });
    expect(readScoring("nonsense").legacy).toBe(true);
    // a starting score that cannot happen is dropped instead of breaking every score after it
    const impossible = readScoring({ startScore: { sets: [{ player: 6, opponent: 5 }], games: { player: 0, opponent: 0 }, points: { player: 0, opponent: 0 } } });
    expect(impossible.scoring.startScore).toBeUndefined();
  });

  it("a new file does not mark its points as manual", () => {
    const p = project();
    const back = fromFile(JSON.parse(JSON.stringify(toFile(p))));
    expect(back.points.every((x) => !x.manualServer && !x.manualSide)).toBe(true);
  });
});

describe("pressure statistics in the report and the AI draft", () => {
  const p = newProject({ player: "Alex", opponent: "Rival" }, "en");
  p.points = winners("OOOPOPPOOPPPOO");

  it("are rows of the key statistics (PDF) in English and Polish", () => {
    const stats = resolveProject(p).stats;
    const en = statRows(stats, "en").map((r) => r.label);
    expect(en).toEqual(expect.arrayContaining(["Break points faced", "Break points saved", "Points won at 30:30 or deuce"]));
    const pl = statRows(stats, "pl").map((r) => r.label);
    expect(pl).toEqual(expect.arrayContaining(["Obronione break pointy", "Wygrane punkty przy 30:30 lub deuce"]));
  });

  it("are in the text sent to the AI, with the match format and the score", () => {
    const text = userPrompt(p);
    expect(text).toContain("Break points faced");
    expect(text).toContain("Points won at 30:30 or deuce");
    expect(text).toContain("Match format: best of 3, tiebreak at 6:6");
    expect(text).toMatch(/Score at the end of the charted points \(Alex first\): /);
    expect(text).not.toContain("data:image");
  });

  it("leave out a statistic with nothing behind it", () => {
    const q = newProject({ player: "A" });
    q.points = winners("PPPP");
    const labels = statRows(resolveProject(q).stats, "en").map((r) => r.label);
    expect(labels).not.toContain("Break points faced");
    expect(labels).not.toContain("Points won at 30:30 or deuce");
  });
});

describe("the score follows the list of points", () => {
  it("scoreBefore on the project gives the same answer after a middle point is deleted", () => {
    const p = newProject({ player: "A" });
    p.points = winners("PPPPOOO");
    const before = scoreBefore(p.points, p.scoring.format, p.scoring.firstServer);
    expect(before[7].points).toEqual({ player: 0, opponent: 3 });
    const cut = scoreBefore(p.points.filter((_, i) => i !== 5), p.scoring.format, p.scoring.firstServer);
    expect(cut[6].points).toEqual({ player: 0, opponent: 2 });
  });
});
