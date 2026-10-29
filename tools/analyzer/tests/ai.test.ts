import { describe, expect, it } from "vitest";
import { DraftSchema, draftSummary, systemPrompt, userPrompt } from "../src/ai";
import { newProject } from "../src/project";
import type { Project } from "../src/types";

function project(): Project {
  const p = newProject({ player: "Alex Morgan", opponent: "Club rival", surface: "clay" }, "pl");
  p.notes = [
    { id: "a", time: 65, type: "issue", title: "Toss", text: "Behind the head.", shapes: [{ tool: "arrow", color: "#fff", points: [{ x: 0, y: 0 }, { x: 1, y: 1 }] }], drawing: "data:image/png;base64,SECRETPNG" },
  ];
  p.points = [{ id: "1", server: "player", side: "deuce", serves: [{ x: 10, y: 28, in: true }], rally: [], outcome: "ace", winner: "player" }];
  return p;
}

describe("AI draft input", () => {
  it("sends the notes and charting numbers as text, never drawings", () => {
    const text = userPrompt(project());
    expect(text).toContain("Alex Morgan");
    expect(text).toContain("01:05 | issue | Toss | Behind the head.");
    expect(text).toContain("Asy: 1"); // Polish labels for a Polish report
    expect(text).not.toContain("SECRETPNG");
    expect(text).not.toContain("data:image");
  });

  it("asks for the report's language and for exactly 3 priorities", () => {
    expect(systemPrompt("pl")).toContain("Polish");
    expect(systemPrompt("en")).toContain("English");
    expect(systemPrompt("en")).toContain("exactly 3 priorities");
    expect(systemPrompt("en")).toMatch(/Use only those facts/);
  });

  it("needs an API key and something to summarise before it calls anything", async () => {
    await expect(draftSummary(project(), { apiKey: "", model: "m", lang: "en" })).rejects.toThrow(/API key/);
    await expect(draftSummary(newProject(), { apiKey: "k", model: "m", lang: "en" })).rejects.toThrow(/notes or chart/);
  });

  it("the draft schema accepts a summary and rejects a wrong shape", () => {
    expect(DraftSchema.safeParse({ strengths: [], issues: [{ title: "a", detail: "b" }], tactical: [], priorities: ["1"], drills: [] }).success).toBe(true);
    expect(DraftSchema.safeParse({ strengths: "no" }).success).toBe(false);
  });
});
