"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { upload } from "@vercel/blob/client";
import {
  ALL_FOCUS_AREAS,
  FocusArea,
  Goal,
  GOALS,
  LEVELS,
  SkillLevel,
  focusLabel,
} from "@/lib/trainingOptions";

export default function VideoUploadForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("beginner");
  const [goal, setGoal] = useState<Goal>("general-fitness");
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function toggleFocus(area: FocusArea) {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

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
          skillLevel,
          goal,
          focusAreas,
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
      className="space-y-4 bg-surface border border-line shadow-sm rounded-2xl p-6 sm:p-8"
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

      <div className="rounded-xl border border-line bg-brand-50/40 p-4 space-y-4">
        <div>
          <p className="text-sm font-semibold">Your level & focus</p>
          <p className="text-xs text-muted mt-0.5">
            Help your coach see where you&apos;re at and what to work on before they watch your video.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Skill level</label>
          <div className="tilt-grid grid grid-cols-3 gap-2">
            {LEVELS.map((l) => (
              <button
                type="button"
                key={l.value}
                onClick={() => setSkillLevel(l.value)}
                className={`btn-3d rounded-lg px-3 py-2 text-sm font-medium border ${
                  skillLevel === l.value
                    ? "btn-3d-selected bg-brand-600 text-white border-brand-600"
                    : "border-line bg-surface hover:border-brand-600"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Primary goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
          >
            {GOALS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            What do you want to train?
          </label>
          <div className="tilt-grid flex flex-wrap gap-2">
            {ALL_FOCUS_AREAS.map((area) => (
              <button
                type="button"
                key={area}
                onClick={() => toggleFocus(area)}
                className={`btn-3d rounded-full px-3 py-1.5 text-sm border ${
                  focusAreas.includes(area)
                    ? "btn-3d-selected bg-brand-600 text-white border-brand-600"
                    : "border-line bg-surface hover:border-brand-600"
                }`}
              >
                {focusLabel(area)}
              </button>
            ))}
          </div>
        </div>
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
