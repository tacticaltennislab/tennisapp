"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { dashboardDictionaries } from "@/i18n/dictionaries/dashboard";
import type { AppLocale } from "@/i18n/locales";

interface ExistingReview {
  rating: number;
  body: string;
  status: string;
  mediaUrl?: string | null;
  mediaContentType?: string | null;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export default function ReviewForm({
  existing,
  lang = "en",
}: {
  existing: ExistingReview | null;
  lang?: AppLocale;
}) {
  const t = dashboardDictionaries[lang].review;
  const STATUS_LABEL: Record<string, string> = {
    pending: t.statusPending,
    approved: t.statusApproved,
    rejected: t.statusRejected,
  };
  const [rating, setRating] = useState(existing?.rating || 5);
  const [body, setBody] = useState(existing?.body || "");
  const [status, setStatus] = useState(existing?.status || null);
  const [file, setFile] = useState<File | null>(null);
  const [existingMediaUrl, setExistingMediaUrl] = useState(existing?.mediaUrl || null);
  const [existingMediaContentType, setExistingMediaContentType] = useState(
    existing?.mediaContentType || null
  );
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (file && file.size > MAX_FILE_SIZE) {
      setError(t.fileTooLarge);
      return;
    }

    setSubmitting(true);
    setProgress(0);

    let mediaUrl = existingMediaUrl;
    let mediaContentType: string | null = existingMediaContentType;

    if (file) {
      try {
        const blob = await upload(`reviews/${file.name}`, file, {
          access: "private",
          handleUploadUrl: "/api/reviews/upload-token",
          onUploadProgress: ({ percentage }) => setProgress(percentage),
        });
        mediaUrl = blob.url;
        mediaContentType = blob.contentType || file.type;
      } catch {
        setSubmitting(false);
        setError(t.uploadFailed);
        return;
      }
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, body, mediaUrl, mediaContentType }),
    });

    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t.genericError);
      return;
    }
    setExistingMediaUrl(mediaUrl);
    setExistingMediaContentType(mediaContentType);
    setFile(null);
    setStatus("pending");
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{t.formTitle}</h2>
      <p className="mt-1 text-sm text-body">{t.formSubtitle}</p>

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
              aria-label={`${n} ${t.ratingAria}`}
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
          placeholder={t.bodyPlaceholder}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />

        <div>
          <label className="block text-sm font-medium mb-1">
            {t.mediaLabel} <span className="text-muted font-normal">{t.mediaOptional}</span>
          </label>

          {existingMediaUrl && !file && (
            <div className="mb-2 flex items-center gap-3">
              {existingMediaContentType?.startsWith("video/") ? (
                <video src={existingMediaUrl} controls className="w-28 h-20 rounded-lg object-cover bg-chip" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- user-uploaded blob URL, not a static asset
                <img src={existingMediaUrl} alt="" className="w-20 h-20 rounded-lg object-cover" />
              )}
              <button
                type="button"
                onClick={() => {
                  setExistingMediaUrl(null);
                  setExistingMediaContentType(null);
                }}
                className="text-xs text-red-600 hover:underline"
              >
                {t.remove}
              </button>
            </div>
          )}

          <label
            htmlFor="review-media"
            className="flex items-center gap-3 w-full rounded-lg border border-dashed border-line px-3 py-2.5 text-sm cursor-pointer hover:border-brand-600 transition-colors"
          >
            <span className="shrink-0 rounded-md bg-brand-50 text-brand-600 px-3 py-1.5 text-xs font-semibold">
              {t.chooseFile}
            </span>
            <span className="text-muted truncate">
              {file ? file.name : existingMediaUrl ? t.replaceFile : t.noFileSelected}
            </span>
          </label>
          <input
            id="review-media"
            type="file"
            accept="video/*,image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
        </div>

        {submitting && file && (
          <div className="h-2 rounded-full bg-line overflow-hidden">
            <div
              className="h-full bg-brand-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <p className="text-xs text-muted">{t.publicNote}</p>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-on-brand text-sm font-semibold px-4 py-2 transition-colors"
        >
          {submitting ? t.submitting : existing ? t.update : t.submit}
        </button>
      </form>
    </div>
  );
}
