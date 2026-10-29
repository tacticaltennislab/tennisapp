"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DIcons } from "@/components/dashboard/icons";

export interface ChatItem {
  id: string;
  from: "player" | "coach";
  body: string;
  /** ISO timestamp */
  at: string;
}

function when(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

/** The real conversation with the coaches, backed by /api/messages. */
export default function MessagesPanel({ initial, hadUnread }: { initial: ChatItem[]; hadUnread: boolean }) {
  const router = useRouter();
  const [items, setItems] = useState<ChatItem[]>(initial);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Opening the conversation marks the coach's messages as read; refresh so the badge clears.
  useEffect(() => {
    if (!hadUnread) return;
    fetch("/api/messages/mark-read", { method: "POST" })
      .then(() => router.refresh())
      .catch(() => undefined);
  }, [hadUnread, router]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [items.length]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if (!body || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "The message could not be sent. Try again.");
        return;
      }
      const data = await res.json();
      setItems((cur) => [
        ...cur,
        { id: data.message.id, from: "player", body: data.message.body, at: data.message.createdAt },
      ]);
      setText("");
    } catch {
      setError("The message could not be sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-surface md:h-[calc(100vh-11rem)] md:min-h-[32rem]">
      <header className="border-b border-line px-5 py-4">
        <h2 className="text-sm font-semibold text-ink">Your coaches</h2>
        <p className="mt-0.5 text-xs text-muted">Ask about your feedback, a drill or what to film next.</p>
      </header>

      <div role="log" aria-label="Conversation" tabIndex={0} className="min-h-[16rem] flex-1 overflow-y-auto px-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600">
        {items.length === 0 ? (
          <p className="text-sm text-muted">No messages yet. Write to your coach below and we will reply by email and here.</p>
        ) : (
          <ol className="space-y-5">
            {items.map((m) => {
              const mine = m.from === "player";
              return (
                <li key={m.id} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
                  <p className="mb-1.5 text-xs text-muted">
                    <span className="font-medium text-body">{mine ? "You" : "Coach"}</span> · {when(m.at)}
                  </p>
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed sm:max-w-[75%] ${
                      mine ? "rounded-br-md bg-brand-600 text-on-brand" : "rounded-bl-md bg-chip text-ink"
                    }`}
                  >
                    {m.body}
                  </p>
                </li>
              );
            })}
          </ol>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="border-t border-line p-3 sm:p-4">
        <label htmlFor="msg" className="sr-only">
          Message to your coach
        </label>
        <div className="flex items-end gap-3">
          <textarea
            id="msg"
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(e);
            }}
            placeholder="Write a message"
            className="field !min-h-[3.25rem] flex-1 resize-none !py-3"
          />
          <button type="submit" disabled={!text.trim() || sending} className="btn btn-primary !min-h-12 shrink-0 disabled:opacity-50" aria-label="Send message">
            <DIcons.send className="h-4 w-4" />
            <span className="hidden sm:inline">{sending ? "Sending" : "Send"}</span>
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-2 text-sm text-[#ff8a7a]">
            {error}
          </p>
        )}
        <p className="mt-2 text-xs text-muted">Press Ctrl or Cmd and Enter to send. Your coach is notified by email.</p>
      </form>
    </div>
  );
}
