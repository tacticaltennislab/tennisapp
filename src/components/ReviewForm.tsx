"use client";

import { useState } from "react";

interface ExistingReview {
  rating: number;
  body: string;
  status: string;
}

const STATUS_LABEL: Record<string, string> = {
  pending: "Awaiting approval — thanks for your patience.",
  approved: "Live on the site. Thank you!",
  rejected: "Not published. Feel free to update and resubmit.",
};

export default function ReviewForm({ existing }: { existing: ExistingReview | null }) {
  const [rating, setRating] = useState(existing?.rating || 5);
  const [body, setBody] = useState(existing?.body || "");
  const [status, setStatus] = useState(existing?.status || null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, body }),
    });

    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      return;
    }
    setStatus("pending");
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Leave a review</h2>
      <p className="mt-1 text-sm text-body">
        Help other players decide — share what working with your coach has been like.
      </p>

      {status && (
        <p className="mt-3 text-sm rounded-lg bg-brand-50 text-brand-700 px-3 py-2">
          {STATUS_LABEL[status]}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              className={`text-2xl leading-none transition-colors ${
                n <= rating ? "text-lime-500" : "text-line hover:text-lime-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          minLength={10}
          rows={4}
          placeholder="What did you work on, and what changed?"
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <p className="text-xs text-muted">
          If approved, this is shown publicly on our website with your name.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          {submitting ? "Submitting..." : existing ? "Update review" : "Submit review"}
        </button>
      </form>
    </div>
  );
}
