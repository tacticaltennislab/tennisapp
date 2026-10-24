"use client";

import { useEffect, useRef, useState } from "react";
import { DIcons } from "@/components/dashboard/icons";
import { MESSAGES, PLAYER, type ChatMessage } from "@/lib/dashboardSample";

export default function MessagesDemo() {
  const [items, setItems] = useState<ChatMessage[]>(MESSAGES);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [items.length]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    setItems((cur) => [
      ...cur,
      { id: `new-${cur.length}`, from: "player", author: PLAYER.name.split(" ")[0], at: "Just now (demo)", body },
    ]);
    setText("");
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-surface md:h-[calc(100vh-11rem)] md:min-h-[32rem]">
      <header className="border-b border-line px-5 py-4">
        <h2 className="text-sm font-semibold text-ink">Your coaches</h2>
        <p className="mt-0.5 text-xs text-muted">Piotr and Mateusz. Ask about your feedback, a drill or what to film next.</p>
      </header>

      <div role="log" aria-label="Conversation" tabIndex={0} className="flex-1 overflow-y-auto px-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600">
      <ol className="space-y-5">
        {items.map((m) => {
          const mine = m.from === "player";
          return (
            <li key={m.id} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
              <p className="mb-1.5 text-xs text-muted">
                <span className="font-medium text-body">{m.author}</span> · {m.at}
              </p>
              <p
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed sm:max-w-[75%] ${
                  mine ? "rounded-br-md bg-brand-600 text-on-brand" : "rounded-bl-md bg-chip text-ink"
                }`}
              >
                {m.body}
              </p>
            </li>
          );
        })}
      </ol>
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
          <button type="submit" disabled={!text.trim()} className="btn btn-primary !min-h-12 shrink-0 disabled:opacity-50" aria-label="Send message">
            <DIcons.send className="h-4 w-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">Prototype: messages are not sent. In the real app your coach is notified by email.</p>
      </form>
    </div>
  );
}
