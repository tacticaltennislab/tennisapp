"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isFocusArea, isGoal, isSkillLevel } from "@/lib/trainingOptions";
import { focusLabel, goalLabel, levelLabel } from "@/i18n/dictionaries/trainingOptions";
import { academyDictionaries } from "@/i18n/dictionaries/academy";
import type { AppLocale } from "@/i18n/locales";

interface Submission {
  id: string;
  title: string | null;
  note: string | null;
  status: string;
  coachNotes: string | null;
  userName: string | null;
  userEmail: string;
  skillLevel: string | null;
  goal: string | null;
  focusAreas: string[];
}

export default function SubmissionReview({
  submission,
  canDelete = false,
  lang = "en",
}: {
  submission: Submission;
  canDelete?: boolean;
  lang?: AppLocale;
}) {
  const t = academyDictionaries[lang].review;
  const [coachNotes, setCoachNotes] = useState(submission.coachNotes || "");
  const [status, setStatus] = useState(submission.status);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm("Delete this video permanently? The file will be removed from storage.")) return;
    setError(null);
    setDeleting(true);

    const res = await fetch(`/api/videos/${submission.id}`, { method: "DELETE" });

    if (!res.ok) {
      setDeleting(false);
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not delete this video.");
      return;
    }

    router.refresh();
  }

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
      setError(data.error || t.error);
      return;
    }

    setStatus("reviewed");
  }

  return (
    <div className="rounded-2xl border border-line p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{submission.title || t.untitled}</p>
          <p className="text-xs text-muted">
            {submission.userName || submission.userEmail}
          </p>
        </div>
        <span
          className={`text-xs rounded-full px-2 py-0.5 ${
            status === "reviewed"
              ? "bg-brand-50 text-brand-700"
              : "bg-chip text-muted"
          }`}
        >
          {status === "reviewed" ? t.status.reviewed : t.status.pending}
        </span>
      </div>

      {submission.note && (
        <p className="mt-2 text-sm text-body">
          &ldquo;{submission.note}&rdquo;
        </p>
      )}

      {(submission.skillLevel || submission.goal || submission.focusAreas.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {submission.skillLevel && isSkillLevel(submission.skillLevel) && (
            <span className="text-xs rounded-full bg-brand-50 text-brand-700 px-2 py-0.5">
              {levelLabel(submission.skillLevel, lang)}
            </span>
          )}
          {submission.goal && isGoal(submission.goal) && (
            <span className="text-xs rounded-full bg-brand-50 text-brand-700 px-2 py-0.5">
              {goalLabel(submission.goal, lang)}
            </span>
          )}
          {submission.focusAreas.filter(isFocusArea).map((area) => (
            <span key={area} className="text-xs rounded-full bg-chip text-body px-2 py-0.5">
              {focusLabel(area, lang)}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2 flex items-center justify-between">
        <a
          href={`/api/videos/${submission.id}/file`}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-sm text-brand-600"
        >
          {t.watchVideo}
        </a>
        {canDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm text-red-600 hover:text-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete video"}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-3 space-y-2">
        <textarea
          placeholder={t.placeholder}
          value={coachNotes}
          onChange={(e) => setCoachNotes(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 shadow-sm hover:shadow-md transition-all"
        >
          {submitting ? t.saving : t.save}
        </button>
      </form>
    </div>
  );
}
