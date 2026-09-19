"use client";

import { useState } from "react";

interface ReviewRow {
  id: string;
  rating: number;
  body: string;
  status: string;
  createdAt: string;
  userName: string;
  mediaUrl: string | null;
  mediaContentType: string | null;
}

const STATUS_TONE: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-gray-100 text-muted",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-lime-500" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-line">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function ReviewModeration({ initialReviews }: { initialReviews: ReviewRow[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    setBusyId(id);
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusyId(null);
    if (res.ok) {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
  }

  async function remove(id: string) {
    setBusyId(id);
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  }

  if (reviews.length === 0) {
    return <p className="text-sm text-muted">No reviews yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <li key={r.id} className="rounded-2xl border border-line p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-sm">{r.userName}</p>
              <Stars rating={r.rating} />
            </div>
            <span className={`text-xs rounded-full px-2 py-0.5 shrink-0 ${STATUS_TONE[r.status] || ""}`}>
              {r.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-body">{r.body}</p>
          {r.mediaUrl && (
            <div className="mt-2">
              {r.mediaContentType?.startsWith("video/") ? (
                <video src={`/api/reviews/${r.id}/media`} controls className="w-full max-w-xs rounded-lg bg-chip" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- user-uploaded blob URL, not a static asset
                <img src={`/api/reviews/${r.id}/media`} alt="" className="w-full max-w-xs rounded-lg" />
              )}
            </div>
          )}
          <div className="mt-3 flex gap-2">
            {r.status !== "approved" && (
              <button
                type="button"
                disabled={busyId === r.id}
                onClick={() => updateStatus(r.id, "approved")}
                className="text-xs rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold px-3 py-1.5 transition-colors"
              >
                Approve
              </button>
            )}
            {r.status !== "rejected" && (
              <button
                type="button"
                disabled={busyId === r.id}
                onClick={() => updateStatus(r.id, "rejected")}
                className="text-xs rounded-lg border border-line disabled:opacity-60 font-medium px-3 py-1.5 hover:border-brand-600 transition-colors"
              >
                Reject
              </button>
            )}
            <button
              type="button"
              disabled={busyId === r.id}
              onClick={() => remove(r.id)}
              className="text-xs rounded-lg border border-line disabled:opacity-60 font-medium px-3 py-1.5 text-red-600 hover:border-red-400 transition-colors"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
