import { describe, expect, it } from "vitest";
import { fileName, fromFile, newProject, toFile } from "../src/project";
import type { ChartPoint, Project } from "../src/types";
// The website's own reader: a project file must be a valid import for the report editor.
import { parseAnalysisImport } from "../../../src/lib/analysisImport";

function sample(): Project {
  const p = newProject({ player: "Alex Morgan", opponent: "Club rival", date: "2026-10-20", surface: "clay" }, "pl");
  p.video = { fileName: "set2.mp4", durationSec: 2410, fps: 25 };
  p.notes = [
    { id: "b", time: 33, type: "tactical", title: "", text: "Most second serves land in the middle.", shapes: [] },
    {
      id: "a", time: 9.456, type: "issue", title: "Toss drifts", text: "Behind the head.",
      shapes: [{ tool: "arrow", color: "#c6f24e", points: [{ x: 0.1, y: 0.2 }, { x: 0.5, y: 0.6 }] }],
      drawing: "data:image/png;base64,iVBORw0KGgo=",
    },
  ];
  const pt: ChartPoint = { id: "p1", server: "player", side: "deuce", serves: [{ x: 10, y: 28, in: true }], rally: [], outcome: "ace", winner: "player" };
  p.points = [pt];
  p.summary = { strengths: ["Balanced"], issues: [{ title: "Toss", detail: "Behind" }], tactical: ["Mix it up"], priorities: ["1", "2", "3"], drills: [{ name: "Toss and catch", detail: "3x10" }] };
  return p;
}

describe("project file", () => {
  it("round trips everything the tool needs to reopen the work", () => {
    const back = fromFile(JSON.parse(JSON.stringify(toFile(sample()))));
    const orig = sample();
    expect(back.meta).toEqual(orig.meta);
    expect(back.video).toEqual(orig.video);
    expect(back.lang).toBe("pl");
    expect(back.points).toEqual(orig.points);
    expect(back.summary).toEqual(orig.summary);
    // Notes come back sorted by time, with their shapes and drawing.
    expect(back.notes.map((n) => n.id)).toEqual(["a", "b"]);
    expect(back.notes[0].shapes).toHaveLength(1);
    expect(back.notes[0].drawing).toBe("data:image/png;base64,iVBORw0KGgo=");
    expect(back.notes[0].time).toBe(9.46);
  });

  it("is readable by the website's analysis import, including drawings and charting", () => {
    const r = parseAnalysisImport(JSON.parse(JSON.stringify(toFile(sample()))));
    if (!r.ok) throw new Error(r.error);
    expect(r.warnings).toEqual([]);
    expect(r.data.observations.map((o) => o.t)).toEqual([9.46, 33]);
    expect(r.data.observations[0]).toMatchObject({ kind: "issue", title: "Toss drifts", drawing: "data:image/png;base64,iVBORw0KGgo=" });
    // A note without a title gets the first sentence as the title.
    expect(r.data.observations[1].title).toBe("Most second serves land in the middle.");
    expect(r.data.summary.priorities).toEqual(["1", "2", "3"]);
    expect(r.data.charting?.serve?.first).toEqual({ in: 1, total: 1, pointsWon: 1, pointsPlayed: 1 });
    expect(r.data.videoDurationSec).toBe(2410);
    expect(r.data.player).toBe("Alex Morgan");
  });

  it("rejects files that are not projects", () => {
    expect(() => fromFile({ hello: 1 })).toThrow(/not a TTL analysis/);
    expect(() => fromFile({ format: "tactical-tennis-lab/analysis", version: 9 })).toThrow(/Unsupported/);
    expect(() => fromFile("nope")).toThrow();
  });

  it("names the file from the player and date", () => {
    expect(fileName(sample())).toBe("alex-morgan-2026-10-20.analysis.json");
    expect(fileName(newProject({ player: "", date: "" }))).toBe("player-undated.analysis.json");
  });
});
