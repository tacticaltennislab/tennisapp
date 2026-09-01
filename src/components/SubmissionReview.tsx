"use client";

import { useState } from "react";

interface Submission {
  id: string;
  title: string | null;
  note: string | null;
  status: string;
  coachNotes: string | null;
  userName: string | null;
  userEmail: string;
}

export default function SubmissionReview({ submission }: { submission: Submission }) {
  const [coachNotes, setCoachNotes] = useState(submission.coachNotes || "");
  const [status, setStatus] = useState(submission.status);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch(`/api/videos/${submission.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coachNotes }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      return;
    }

    setStatus("reviewed");
  }

  return (
    <li className="rounded-xl border border-black/10 dark:border-white/10 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{submission.title || "Untitled video"}</p>
          <p className="text-xs text-black/50 dark:text-white/50">
            {submission.userName || submission.userEmail}
          </p>
        </div>
        <span
          className={`text-xs rounded-full px-2 py-0.5 ${
            status === "reviewed"
              ? "bg-green-600/10 text-green-600"
              : "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60"
          }`}
        >
          {status}
        </span>
      </div>

      {submission.note && (
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          &ldquo;{submission.note}&rdquo;
        </p>
      )}

      <a
        href={`/api/videos/${submission.id}/file`}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm text-green-600"
      >
        Watch video
      </a>

      <form onSubmit={handleSubmit} className="mt-3 space-y-2">
        <textarea
          placeholder="Feedback and training plan notes for this player..."
          value={coachNotes}
          onChange={(e) => setCoachNotes(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          {submitting ? "Saving..." : "Save feedback"}
        </button>
      </form>
    </li>
  );
}
