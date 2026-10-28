import { describe, expect, it } from "vitest";
import { IMPORT_FORMAT, IMPORT_VERSION, chartingLines, parseAnalysisImport } from "@/lib/analysisImport";
import { parseReportInput } from "@/lib/reportInput";

const PNG = "data:image/png;base64,iVBORw0KGgo=";
const file = (extra: Record<string, unknown> = {}) => ({ format: IMPORT_FORMAT, version: IMPORT_VERSION, ...extra });

describe("parseAnalysisImport", () => {
  it("reads notes into observations, sorted by time, with pins and drawings", () => {
    const r = parseAnalysisImport(
      file({
        notes: [
          { time: 30, type: "tactical", text: "Stay behind the baseline. Then attack." },
          { time: 5.123, type: "issue", title: "Late contact", text: "Hit it earlier", pin: { x: 120, y: -4 }, drawing: PNG },
        ],
      })
    );
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.observations.map((o) => o.t)).toEqual([5.12, 30]);
    expect(r.data.observations[0]).toMatchObject({ kind: "issue", title: "Late contact", pin: { x: 100, y: 0 }, drawing: PNG });
    // A note without a title gets its first sentence as the title.
    expect(r.data.observations[1].title).toBe("Stay behind the baseline.");
  });

  it("builds a first draft summary from the notes and charting when the file has none", () => {
    const r = parseAnalysisImport(
      file({
        notes: [
          { time: 1, type: "strength", text: "Good split step" },
          { time: 2, type: "issue", title: "Toss", text: "Too far left" },
        ],
        charting: { serve: { first: { in: 30, total: 50, pointsWon: 20, pointsPlayed: 30 } } },
      })
    );
    if (!r.ok) throw new Error(r.error);
    expect(r.data.summary.strengths).toEqual(["Good split step"]);
    expect(r.data.summary.issues).toEqual([{ title: "Toss", detail: "Too far left" }]);
    expect(r.data.summary.tactical[0]).toBe("First serve: 60% in, 67% of points won.");
  });

  it("uses the summary in the file and keeps at most 3 priorities", () => {
    const r = parseAnalysisImport(
      file({ notes: [], summary: { strengths: ["a"], priorities: ["1", "2", "3", "4"], drills: [{ name: "Shadow swings", detail: "x" }] } })
    );
    if (!r.ok) throw new Error(r.error);
    expect(r.data.summary.priorities).toEqual(["1", "2", "3"]);
    expect(r.data.summary.drills).toEqual([{ name: "Shadow swings", detail: "x" }]);
  });

  it("skips bad notes with a warning instead of failing the whole file", () => {
    const r = parseAnalysisImport(
      file({
        notes: [
          { time: -1, type: "issue", text: "negative time" },
          { time: 4, type: "mystery", text: "unknown type" },
          { time: 6, type: "issue", text: "ok" },
          { time: 7, type: "issue", text: "bad drawing", drawing: "data:image/jpeg;base64,AAAA" },
        ],
      })
    );
    if (!r.ok) throw new Error(r.error);
    expect(r.data.observations.map((o) => o.t)).toEqual([6, 7]);
    expect(r.data.observations[1].drawing).toBeUndefined();
    expect(r.warnings).toHaveLength(3);
  });

  it("rejects other formats, other versions and empty files", () => {
    expect(parseAnalysisImport("nope").ok).toBe(false);
    expect(parseAnalysisImport({ format: "something/else", version: 1, notes: [] }).ok).toBe(false);
    expect(parseAnalysisImport({ format: IMPORT_FORMAT, version: 2, notes: [] }).ok).toBe(false);
    expect(parseAnalysisImport(file()).ok).toBe(false);
  });
});

describe("chartingLines", () => {
  it("describes serve placement, rally length and errors in plain sentences", () => {
    const lines = chartingLines({
      serve: { placement: { deuce: { wide: 3, body: 1, t: 6 } } },
      rally: { averageLength: 4.25 },
      errors: { unforced: 12, forced: 5, doubleFaults: 2 },
    });
    expect(lines).toEqual([
      "Serve placement on the deuce side: 3 wide, 1 to the body, 6 down the T.",
      "Average rally length: 4.3 shots.",
      "Errors: 12 unforced, 5 forced, 2 double faults.",
    ]);
  });
  it("is empty without data", () => {
    expect(chartingLines(undefined)).toEqual([]);
  });
});

describe("parseReportInput", () => {
  const good = {
    observations: [
      { t: 20, kind: "tactical", title: "Net", text: "Come in", pin: { x: 50, y: 50 } },
      { t: 3.456, kind: "strength", title: "Footwork", text: "" },
    ],
    summary: { strengths: [" a ", ""], issues: [{ title: "T", detail: "d" }, { title: "", detail: "x" }], tactical: [], priorities: ["1", "2", "3", "4"], drills: [] },
  };

  it("cleans and sorts what the editor sends", () => {
    const r = parseReportInput(good);
    if (!r.ok) throw new Error(r.error);
    expect(r.value.observations.map((o) => o.t)).toEqual([3.46, 20]);
    expect(r.value.summary.strengths).toEqual(["a"]);
    expect(r.value.summary.issues).toEqual([{ title: "T", detail: "d" }]);
    expect(r.value.summary.priorities).toEqual(["1", "2", "3"]);
  });

  it("rejects an observation without a title, a time or a known kind", () => {
    expect(parseReportInput({ observations: [{ t: 1, kind: "issue", title: " ", text: "" }] }).ok).toBe(false);
    expect(parseReportInput({ observations: [{ kind: "issue", title: "x", text: "" }] }).ok).toBe(false);
    expect(parseReportInput({ observations: [{ t: 1, kind: "nope", title: "x", text: "" }] }).ok).toBe(false);
    expect(parseReportInput("text").ok).toBe(false);
  });

  it("rejects a drawing that is not a PNG data URL", () => {
    const bad = { observations: [{ t: 1, kind: "issue", title: "x", text: "", drawing: "https://evil.example/x.png" }] };
    expect(parseReportInput(bad).ok).toBe(false);
  });
});
