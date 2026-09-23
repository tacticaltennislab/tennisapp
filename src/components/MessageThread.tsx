"use client";

import { useEffect, useRef, useState } from "react";
import { dashboardDictionaries } from "@/i18n/dictionaries/dashboard";
import type { AppLocale } from "@/i18n/locales";

interface Message {
  id: string;
  sender: string;
  body: string;
  createdAt: string;
}

export default function MessageThread({
  userId,
  viewerRole,
  initialMessages,
  lang = "en",
}: {
  userId?: string;
  viewerRole: "customer" | "admin";
  initialMessages: Message[];
  lang?: AppLocale;
}) {
  const t = dashboardDictionaries[lang].messages;
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: text, userId }),
    });

    setSending(false);
    if (res.ok) {
      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
      setText("");
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface shadow-sm flex flex-col h-[420px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-muted">
            {viewerRole === "admin" ? t.emptyAdmin : t.emptyCustomer}
          </p>
        ) : (
          messages.map((m) => {
            const isSelf = m.sender === viewerRole;
            return (
              <div key={m.id} className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                    isSelf ? "bg-brand-600 text-white" : "bg-chip text-ink"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.body}</p>
                  <p className={`mt-1 text-[11px] ${isSelf ? "text-white/70" : "text-muted"}`}>
                    {new Date(m.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t border-line p-3 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-4 transition-colors"
        >
          {t.send}
        </button>
      </form>
    </div>
  );
}
