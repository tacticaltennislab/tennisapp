import { beforeEach, describe, expect, it, vi } from "vitest";

// The route reads the session and talks to Anthropic; both are replaced here so no key or network is used.
const session = vi.hoisted(() => ({ current: null as null | { user: { id: string; role: string } } }));
const created = vi.hoisted(() => ({ calls: [] as unknown[], reply: "" as string, fail: null as null | Error }));

vi.mock("@/auth", () => ({ auth: async () => session.current }));
vi.mock("@anthropic-ai/sdk", () => {
  class APIError extends Error {
    status: number;
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
    }
  }
  class Anthropic {
    static APIError = APIError;
    messages = {
      create: async (req: unknown) => {
        created.calls.push(req);
        if (created.fail) throw created.fail;
        return { stop_reason: "end_turn", content: [{ type: "text", text: created.reply }] };
      },
    };
  }
  return { default: Anthropic };
});

import Anthropic from "@anthropic-ai/sdk";
import { POST } from "@/app/api/ai-analysis/route";
import { MAX_FRAMES, analyseFrames, buildImportFile, parseResult, systemPrompt, validateRequest } from "@/lib/aiAnalysis";
import { parseAnalysisImport } from "@/lib/analysisImport";

const JPEG = "/9j/4AAQSkZJRgABAQAA"; // starts like a JPEG in base64
const frame = (t: number) => ({ t, data: JPEG });
const answer = {
  suggestions: [
    { time: 11, kind: "issue", title: "Late contact", text: "Ball is beside the hip.", confidence: "medium" },
    { time: 3, kind: "strength", title: "Balanced", text: "Stable base.", confidence: "high" },
    { time: 7, kind: "tactical", title: "", text: "no title is dropped", confidence: "low" },
  ],
  summary: { strengths: ["Stable"], issues: [{ title: "Contact", detail: "late" }], tactical: ["Check the return position"], priorities: ["1", "2", "3", "4"], drills: [{ name: "Shadow swings", detail: "20 slow" }] },
  limits: "Cannot see where the ball lands.",
};

function request(body: unknown) {
  return new Request("http://localhost/api/ai-analysis", { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
}

beforeEach(() => {
  session.current = { user: { id: "u1", role: "admin" } };
  created.calls = [];
  created.reply = JSON.stringify(answer);
  created.fail = null;
  process.env.ANTHROPIC_API_KEY = "test-key";
});

describe("who can use the AI analysis", () => {
  const body = { frames: [frame(5), frame(10)], meta: { player: "Alex" } };

  it("is admin only: signed out, a player and an academy coach are all refused before anything is sent", async () => {
    session.current = null;
    expect((await POST(request(body))).status).toBe(401);
    for (const role of ["customer", "coach", "player"]) {
      session.current = { user: { id: "u2", role } };
      expect((await POST(request(body))).status).toBe(403);
    }
    expect(created.calls).toHaveLength(0);
  });

  it("an admin gets the cleaned result", async () => {
    const res = await POST(request(body));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.suggestions.map((s: { time: number }) => s.time)).toEqual([5, 10]); // snapped to real frames, sorted, untitled one dropped
    expect(json.summary.priorities).toEqual(["1", "2", "3"]);
    expect(json.limits).toMatch(/ball lands/);
  });

  it("says so when the server has no key", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const res = await POST(request(body));
    expect(res.status).toBe(503);
  });

  it("tells the admin when the API account has no credit, and does not leak anything else", async () => {
    created.fail = new (Anthropic as unknown as { APIError: new (s: number, m: string) => Error }).APIError(400, "Your credit balance is too low to access the Anthropic API");
    const res = await POST(request(body));
    expect(res.status).toBe(402);
    expect((await res.json()).error).toMatch(/no credit/);
  });

  it("refuses a request that is not usable", async () => {
    expect((await POST(request({ frames: [] }))).status).toBe(400);
    expect((await POST(request("nope"))).status).toBe(400);
  });
});

describe("validateRequest", () => {
  it("accepts frames with or without a data URL prefix and sorts them by time", () => {
    const r = validateRequest({ frames: [{ t: 9, data: `data:image/jpeg;base64,${JPEG}` }, frame(2.456)], meta: { lang: "pl", focus: " second serve " } });
    if (!r.ok) throw new Error(r.error);
    expect(r.value.frames.map((f) => f.t)).toEqual([2.46, 9]);
    expect(r.value.frames[1].data).toBe(JPEG);
    expect(r.value.meta).toMatchObject({ lang: "pl", focus: "second serve" });
  });

  it("rejects too many frames, non JPEG data, bad times and oversize input", () => {
    expect(validateRequest({ frames: Array.from({ length: MAX_FRAMES + 1 }, (_, i) => frame(i)) }).ok).toBe(false);
    expect(validateRequest({ frames: [{ t: 1, data: "iVBORw0KGgo=" }] }).ok).toBe(false); // PNG
    expect(validateRequest({ frames: [{ t: -1, data: JPEG }] }).ok).toBe(false);
    expect(validateRequest({ frames: [{ t: 1, data: "not base64 !!" }] }).ok).toBe(false);
    expect(validateRequest({ frames: [{ t: 1, data: "/9j/" + "A".repeat(400_001) }] }).ok).toBe(false);
    const big = "/9j/" + "A".repeat(390_000);
    expect(validateRequest({ frames: Array.from({ length: 12 }, (_, i) => ({ t: i, data: big })) }).ok).toBe(false); // over the total
  });
});

describe("analyseFrames and parseResult", () => {
  it("labels every frame with its time, sends images as JPEG and asks for structured output", async () => {
    const client = new (Anthropic as unknown as new () => Anthropic)();
    await analyseFrames(client, { frames: [frame(5), frame(65)], meta: { player: "Alex", opponent: "", surface: "clay", focus: "second serve", lang: "pl" } }, "test-model");
    const req = created.calls[0] as { model: string; system: string; messages: { content: { type: string; text?: string }[] }[]; output_config: { format: { type: string } } };
    expect(req.model).toBe("test-model");
    expect(req.output_config.format.type).toBe("json_schema");
    expect(req.system).toContain("Polish");
    const parts = req.messages[0].content;
    expect(parts.filter((p) => p.type === "image")).toHaveLength(2);
    expect(parts.map((p) => p.text).join("\n")).toContain("Frame 2 of 2, time 01:05");
    expect(parts[0].text).toContain("second serve");
  });

  it("the prompt forbids statistics and asks for what the frames could not show", () => {
    const p = systemPrompt("en");
    expect(p).toMatch(/Never state statistics/);
    expect(p).toMatch(/cannot follow the ball/);
    expect(p).toMatch(/limits/);
  });

  it("moves a made up time to the nearest real frame and rejects an unreadable answer", () => {
    const r = parseResult({ suggestions: [{ time: 41.7, kind: "issue", title: "x", text: "", confidence: "weird" }], summary: {}, limits: "" }, [frame(5), frame(40)]);
    expect(r?.suggestions[0]).toMatchObject({ time: 40, confidence: "low" });
    expect(parseResult("nope", [frame(1)])).toBeNull();
    expect(parseResult({ suggestions: [] }, [frame(1)])).toBeNull();
  });
});

describe("the exported file", () => {
  it("is a valid import for the report editor, with every title marked [AI]", () => {
    const result = parseResult(answer, [frame(3), frame(11)])!;
    const file = buildImportFile(result, { player: "Alex", opponent: "Rival", surface: "clay", focus: "", lang: "en" }, { fileName: "m.mp4", durationSec: 1234.567 });
    const r = parseAnalysisImport(JSON.parse(JSON.stringify(file)));
    if (!r.ok) throw new Error(r.error);
    expect(r.warnings).toEqual([]);
    expect(r.data.observations.map((o) => [o.t, o.kind, o.title])).toEqual([
      [3, "strength", "[AI] Balanced"],
      [11, "issue", "[AI] Late contact"],
    ]);
    expect(r.data.summary.priorities).toEqual(["1", "2", "3"]);
    expect(r.data.videoDurationSec).toBe(1234.57);
    expect(r.data.player).toBe("Alex");
  });
});
