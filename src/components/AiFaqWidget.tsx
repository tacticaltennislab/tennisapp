"use client";

import { useState } from "react";
import { IconChat, IconClose, IconSpark } from "@/components/icons";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = ["What do the academy packages include?", "How do academy accounts work?", "What's included in Match IQ?"];

export default function AiFaqWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send(content: string) {
    if (!content.trim() || sending) return;
    setError(null);
    const next: ChatMessage[] = [...messages, { role: "user", content: content.trim() }];
    setMessages(next);
    setText("");
    setSending(true);

    const res = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });

    setSending(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  }

  return (
    <div className="print:hidden fixed bottom-5 left-5 z-30">
      {open && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] max-w-sm animate-fade-up">
          <div className="rounded-2xl border border-line bg-surface shadow-xl overflow-hidden flex flex-col max-h-[70vh]">
            <div className="flex items-center justify-between bg-onyx text-white px-4 py-3 shrink-0">
              <div>
                <p className="font-semibold text-sm flex items-center gap-1.5">
                  <IconSpark className="w-4 h-4 text-lime-300" />
                  Quick questions
                </p>
                <p className="text-xs text-white/60 mt-0.5">
                  AI assistant: pricing &amp; plans only, not a coach.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-white/80 hover:text-white shrink-0"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted">
                    Ask about pricing, plans, or how it works. For coaching questions,
                    send your video to a real coach instead.
                  </p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="block w-full text-left text-sm rounded-lg border border-line px-3 py-2 hover:border-brand-600 hover:text-brand-600 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                        m.role === "user" ? "bg-brand-600 text-white" : "bg-chip text-ink"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                ))
              )}
              {sending && <p className="text-sm text-muted">Thinking...</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(text);
              }}
              className="border-t border-line p-3 flex gap-2 shrink-0"
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask a question..."
                maxLength={500}
                className="flex-1 rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
              />
              <button
                type="submit"
                disabled={sending || !text.trim()}
                className="rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-4 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick questions" : "Ask a quick question"}
        className="w-14 h-14 rounded-full bg-onyx hover:bg-onyx/90 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center"
      >
        {open ? <IconClose className="w-6 h-6" /> : <IconChat className="w-6 h-6 text-lime-300" />}
      </button>
    </div>
  );
}
