"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/** Admin: a credit balance with an "Adjust" form (positive or negative, with a note). */
export default function CreditAdjust({
  balance,
  userId,
  academyId,
}: {
  balance: number;
  userId?: string;
  academyId?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [delta, setDelta] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res = await fetch("/api/admin/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, academyId, delta: Number(delta), note }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not adjust the credits.");
      return;
    }
    setDelta("");
    setNote("");
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="min-w-[8rem]">
      <div className="flex items-center gap-2">
        <span className="t-mono font-semibold">{balance}</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="text-xs font-medium text-brand-600 hover:underline"
        >
          {open ? "Close" : "Adjust"}
        </button>
      </div>
      {open && (
        <form onSubmit={submit} className="mt-2 space-y-2">
          <label className="block text-xs text-muted">
            Credits (+ or −)
            <input
              type="number"
              step={1}
              required
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
              className="mt-1 w-24 rounded-md border border-line bg-transparent px-2 py-1 text-sm text-ink"
            />
          </label>
          <label className="block text-xs text-muted">
            Note
            <input
              type="text"
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 w-44 rounded-md border border-line bg-transparent px-2 py-1 text-sm text-ink"
            />
          </label>
          {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-brand-600 px-3 py-1 text-xs font-semibold text-on-brand disabled:opacity-60"
          >
            {busy ? "Saving" : "Save"}
          </button>
        </form>
      )}
    </div>
  );
}
