"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VideoUploadForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Choose a video file.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.set("title", title);
    formData.set("note", note);
    formData.set("file", file);

    const res = await fetch("/api/videos", { method: "POST", body: formData });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Upload failed.");
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="e.g. Match vs. Alex, first set"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
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
          className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Video</label>
        <input
          type="file"
          accept="video/*"
          required
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 transition-colors"
      >
        {submitting ? "Uploading..." : "Send video"}
      </button>
    </form>
  );
}
