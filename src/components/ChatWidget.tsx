"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MessageThread from "@/components/MessageThread";
import { IconChat, IconClose } from "@/components/icons";

interface Message {
  id: string;
  sender: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export default function ChatWidget() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(0);

  const isCustomer = status === "authenticated" && session?.user?.role !== "admin";

  useEffect(() => {
    if (!isCustomer || loaded) return;
    let cancelled = false;

    fetch("/api/messages")
      .then((res) => (res.ok ? res.json() : { messages: [] }))
      .then((data) => {
        if (cancelled) return;
        const msgs: Message[] = data.messages || [];
        setMessages(msgs);
        setUnread(msgs.filter((m) => m.sender === "admin" && !m.read).length);
        setLoaded(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isCustomer, loaded]);

  if (!isCustomer) return null;

  function handleOpen() {
    setOpen(true);
    if (unread > 0) {
      setUnread(0);
      fetch("/api/messages/mark-read", { method: "POST" }).catch(() => {});
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-30">
      {open && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] max-w-sm animate-fade-up">
          <div className="rounded-2xl border border-line bg-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between bg-brand-600 text-white px-4 py-3">
              <p className="font-semibold text-sm">Chat with your coach</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-white/80 hover:text-white"
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>
            <MessageThread viewerRole="customer" initialMessages={messages} />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : handleOpen())}
        aria-label={open ? "Close chat" : "Open chat with your coach"}
        className="relative w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center"
      >
        {open ? <IconClose className="w-6 h-6" /> : <IconChat className="w-6 h-6" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-lime-400 text-ink text-xs font-bold flex items-center justify-center border-2 border-white">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}
