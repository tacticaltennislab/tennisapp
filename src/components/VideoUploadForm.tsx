"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { upload } from "@vercel/blob/client";

export default function VideoUploadForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Choose a video file.");
      return;
    }

    setSubmitting(true);
    setProgress(0);

    try {
      const blob = await upload(`videos/${file.name}`, file, {
        access: "private",
        handleUploadUrl: "/api/videos/upload-token",
        onUploadProgress: ({ percentage }) => setProgress(percentage),
      });

      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          note,
          storagePath: blob.pathname,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Upload failed.");
        setSubmitting(false);
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setError("Upload failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white border border-line shadow-sm rounded-2xl p-6 sm:p-8"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="e.g. Match vs. Alex, first set"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          What do you want feedback on?
        </label>
        <textarea
          placeholder="e.g. My serve keeps going long, and I want tips on net play."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Video</label>
        <label
          htmlFor="video-file"
          className="flex items-center gap-3 w-full rounded-lg border border-dashed border-line px-3 py-2.5 text-sm cursor-pointer hover:border-brand-600 transition-colors"
        >
          <span className="shrink-0 rounded-md bg-brand-50 text-brand-600 px-3 py-1.5 text-xs font-semibold">
            Choose file
          </span>
          <span className="text-muted truncate">
            {file ? file.name : "No file selected"}
          </span>
        </label>
        <input
          id="video-file"
          type="file"
          accept="video/*"
          required
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="sr-only"
        />
      </div>

      {submitting && (
        <div className="h-2 rounded-full bg-line overflow-hidden">
          <div
            className="h-full bg-brand-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:translate-y-0 text-white font-semibold py-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
      >
        {submitting ? `Uploading... ${progress}%` : "Send video"}
      </button>
    </form>
  );
}
