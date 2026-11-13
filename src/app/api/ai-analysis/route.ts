import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/auth";
import { AnalysisError, analyseFrames, validateRequest } from "@/lib/aiAnalysis";

// Reading many frames takes a while; ask the platform for the longest it allows on this plan.
export const maxDuration = 120;
export const dynamic = "force-dynamic";

/** Admin only: sample frames in, suggestions and a draft summary out. Nothing is stored. */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  // Only the owner (role admin). Coaches of academies and players never get this tool.
  if (session.user.role !== "admin") return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY is not set on the server." }, { status: 503 });

  const parsed = validateRequest(await request.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  try {
    const result = await analyseFrames(new Anthropic({ apiKey }), parsed.value);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof AnalysisError) return NextResponse.json({ error: error.message }, { status: 502 });
    if (error instanceof Anthropic.APIError) {
      console.error("AI analysis error:", error.status, error.message);
      // The most likely first problem: the API account has no balance yet.
      if (/credit balance|billing/i.test(error.message)) {
        return NextResponse.json({ error: "The Anthropic API account has no balance. Add funds in the Anthropic console, then try again." }, { status: 402 });
      }
      if (error.status === 401) return NextResponse.json({ error: "The Anthropic API key was rejected. Check ANTHROPIC_API_KEY." }, { status: 502 });
      if (error.status === 413) return NextResponse.json({ error: "The frames are too large for the model. Use fewer or smaller frames." }, { status: 413 });
      if (error.status === 429) return NextResponse.json({ error: "Anthropic is rate limiting this key. Wait a minute and try again." }, { status: 429 });
      return NextResponse.json({ error: "The AI service returned an error. Try again in a moment." }, { status: 502 });
    }
    console.error("AI analysis failed:", error);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
