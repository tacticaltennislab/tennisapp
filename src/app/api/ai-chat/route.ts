import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { AI_FAQ_SYSTEM_PROMPT } from "@/lib/aiFaqPrompt";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 500;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI assistant is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const messages = Array.isArray(body?.messages) ? body.messages : null;

  if (!messages || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: "Conversation is too long." }, { status: 400 });
  }

  const cleaned: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of messages) {
    if ((m?.role !== "user" && m?.role !== "assistant") || typeof m?.content !== "string") {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }
    if (m.content.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }
    cleaned.push({ role: m.role, content: m.content });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 500,
      system: AI_FAQ_SYSTEM_PROMPT,
      messages: cleaned,
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: text || "Sorry, I couldn't come up with an answer to that." });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json({ error: "Something went wrong. Try again in a moment." }, { status: 500 });
  }
}
