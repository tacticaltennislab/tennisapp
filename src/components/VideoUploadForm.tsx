"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";
import {
  ALL_FOCUS_AREAS,
  FocusArea,
  Goal,
  SkillLevel,
} from "@/lib/trainingOptions";
import { focusLabel, localizedGoals, localizedLevels } from "@/i18n/dictionaries/trainingOptions";
import { dashboardDictionaries } from "@/i18n/dictionaries/dashboard";
import { freeAnalysisDictionaries } from "@/i18n/dictionaries/freeAnalysis";
import { creditsUiDictionaries } from "@/i18n/dictionaries/creditsUi";
import { pricingDictionaries } from "@/i18n/dictionaries/pricing";
import { creditNoun, formatCredits } from "@/lib/creditFormat";
import { creditsNeeded, type FootageKind as AnalysisKind } from "@/lib/creditCost";
import type { FootageType } from "@/lib/freeAnalysis";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default function VideoUploadForm({
  lang = "en",
  free = false,
  redirectTo,
}: {
  lang?: AppLocale;
  free?: boolean;
  /** Where to go after a successful upload. Defaults to the account page. */
  redirectTo?: string;
}) {
  const t = dashboardDictionaries[lang].submitVideo.form;
  const fa = freeAnalysisDictionaries[lang].form;
  const cu = creditsUiDictionaries[lang].form;
  const noun = pricingDictionaries[lang].credits.noun;
  const [footageType, setFootageType] = useState<FootageType>("match");
  // What is being sent decides how many credits it uses: a stroke is 1, match and training footage
  // cost one per started 60 minutes. The free analysis is always a match or a training session.
  const [kind, setKind] = useState<AnalysisKind>("stroke");
  const [minutes, setMinutes] = useState(0);
  const [credits, setCredits] = useState<{
    balance: number;
    academies: { id: string; name: string; balance: number }[];
  } | null>(null);
  const [chosenPayer, setChosenPayer] = useState<string | null>(null); // "mine" or an academy id
  const [publishConsent, setPublishConsent] = useState(false);
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

  const analysisKind: AnalysisKind = free ? footageType : kind;
  const needed = creditsNeeded(analysisKind, minutes);
  // Unless the user picked, pay from their own credits, or from an academy's if that is the one that can cover it.
  const coveringAcademy = credits?.academies.find((a) => a.balance >= needed);
  const payer = chosenPayer ?? ((credits?.balance ?? 0) >= needed || !coveringAcademy ? "mine" : coveringAcademy.id);
  const payerAcademy = credits?.academies.find((a) => a.id === payer);
  const available = payer === "mine" ? credits?.balance ?? 0 : payerAcademy?.balance ?? 0;
  const missing = credits ? Math.max(0, needed - available) : 0;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/credits")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setCredits(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  function onFileChosen(next: File | null) {
    setFile(next);
    setMinutes(0);
    if (!next) return;
    // The length comes from the video's own metadata, read in the browser; nothing is uploaded yet.
    const url = URL.createObjectURL(next);
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.onloadedmetadata = () => {
      if (Number.isFinite(probe.duration)) setMinutes(Math.max(1, Math.ceil(probe.duration / 60)));
      URL.revokeObjectURL(url);
    };
    probe.onerror = () => URL.revokeObjectURL(url);
    probe.src = url;
  }

  function toggleFocus(area: FocusArea) {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

  function needMoreText(n = missing) {
    return cu.needMore.replace("{n}", String(n)).replace("{noun}", creditNoun(lang, n, noun));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError(t.chooseFileError);
      return;
    }
    if (missing > 0) {
      setError(needMoreText());
      return;
    }

    setSubmitting(true);
    setProgress(0);

    try {
      const blob = await upload(`videos/${file.name}`, file, {
        access: "private",
        handleUploadUrl: "/api/videos/upload-token",
        clientPayload: JSON.stringify({
          analysisType: analysisKind,
          durationMinutes: analysisKind === "stroke" ? undefined : minutes,
          academyId: payer === "mine" ? undefined : payer,
        }),
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
          analysisType: analysisKind,
          durationMinutes: analysisKind === "stroke" ? undefined : minutes,
          academyId: payer === "mine" ? undefined : payer,
          ...(free ? { free: true, footageType, publishConsent } : {}),
          storagePath: blob.pathname,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          data.code === "insufficient_credits"
            ? needMoreText(data.missing)
            : data.error || t.uploadFailedError
        );
        setSubmitting(false);
        return;
      }

      router.push(redirectTo ?? localizedHref(lang, "/account"));
      router.refresh();
    } catch {
      setError(t.genericError);
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-surface border border-line shadow-sm rounded-2xl p-6 sm:p-8"
    >
      {free && (
        <div className="rounded-xl border border-accent/40 bg-brand-50/60 p-4 space-y-4">
          <div>
            <p className="inline-block rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-semibold text-on-brand">{fa.badge}</p>
            <p className="mt-2 text-sm text-body">{fa.note}</p>
          </div>
          <fieldset>
            <legend className="block text-sm font-medium mb-2">{fa.footageLabel}</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["match", "training"] as const).map((k) => (
                <button
                  type="button"
                  key={k}
                  aria-pressed={footageType === k}
                  onClick={() => setFootageType(k)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium border ${
                    footageType === k ? "bg-brand-600 text-on-brand border-brand-600" : "border-line bg-surface hover:border-brand-600"
                  }`}
                >
                  {k === "match" ? fa.match : fa.training}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={publishConsent}
              onChange={(e) => setPublishConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            <span>
              {fa.consentLabel}
              <span className="block text-xs text-muted">{fa.consentHint}</span>
            </span>
          </label>
        </div>
      )}

      <div>
        <label htmlFor="videouploadform-1" className="block text-sm font-medium mb-1">{t.titleLabel}</label>
        <input id="videouploadform-1"
          type="text"
          placeholder={t.titlePlaceholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />
      </div>
      <div>
        <label htmlFor="videouploadform-2" className="block text-sm font-medium mb-1">{t.feedbackLabel}</label>
        <textarea id="videouploadform-2"
          placeholder={t.feedbackPlaceholder}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />
      </div>

      <div className="rounded-xl border border-line bg-brand-50/40 p-4 space-y-4">
        <div>
          <p className="text-sm font-semibold">{t.levelFocusTitle}</p>
          <p className="text-xs text-muted mt-0.5">{t.levelFocusSubtitle}</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t.skillLevel}</label>
          <div className="tilt-grid grid grid-cols-3 gap-2">
            {localizedLevels(lang).map((l) => (
              <button
                type="button"
                key={l.value}
                onClick={() => setSkillLevel(l.value)}
                className={`btn-3d rounded-lg px-3 py-2 text-sm font-medium border ${
                  skillLevel === l.value
                    ? "btn-3d-selected bg-brand-600 text-on-brand border-brand-600"
                    : "border-line bg-surface hover:border-brand-600"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="videouploadform-3" className="block text-sm font-medium mb-1">{t.primaryGoal}</label>
          <select id="videouploadform-3"
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
          >
            {localizedGoals(lang).map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t.trainLabel}</label>
          <div className="tilt-grid flex flex-wrap gap-2">
            {ALL_FOCUS_AREAS.map((area) => (
              <button
                type="button"
                key={area}
                onClick={() => toggleFocus(area)}
                className={`btn-3d rounded-full px-3 py-1.5 text-sm border ${
                  focusAreas.includes(area)
                    ? "btn-3d-selected bg-brand-600 text-on-brand border-brand-600"
                    : "border-line bg-surface hover:border-brand-600"
                }`}
              >
                {focusLabel(area, lang)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-brand-50/40 p-4 space-y-3">
        {!free && (
          <div>
            <label htmlFor="analysis-kind" className="block text-sm font-medium mb-1">{cu.kindLabel}</label>
            <select
              id="analysis-kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as AnalysisKind)}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="stroke">{cu.kindStroke}</option>
              <option value="match">{cu.kindMatch}</option>
              <option value="training">{cu.kindTraining}</option>
            </select>
          </div>
        )}
        {analysisKind !== "stroke" && (
          <div>
            <label htmlFor="analysis-minutes" className="block text-sm font-medium mb-1">{cu.lengthLabel}</label>
            <input
              id="analysis-minutes"
              type="number"
              min={1}
              step={1}
              value={minutes || ""}
              onChange={(e) => setMinutes(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
              className="w-28 rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-muted">{cu.lengthHint}</p>
          </div>
        )}
        {credits && credits.academies.length > 0 && (
          <div>
            <label htmlFor="credit-payer" className="block text-sm font-medium mb-1">{cu.payWith}</label>
            <select
              id="credit-payer"
              value={payer}
              onChange={(e) => setChosenPayer(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="mine">{cu.payMine} ({credits.balance})</option>
              {credits.academies.map((a) => (
                <option key={a.id} value={a.id}>
                  {cu.payAcademy.replace("{name}", a.name)} ({a.balance})
                </option>
              ))}
            </select>
          </div>
        )}
        {credits && (
          <p className="text-sm" data-testid="credit-cost">
            <span className="font-semibold">{cu.cost.replace("{credits}", formatCredits(lang, needed, noun))}</span>{" "}
            <span className="text-muted">{cu.have.replace("{credits}", formatCredits(lang, available, noun))}</span>
          </p>
        )}
        {missing > 0 && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {needMoreText()}{" "}
            <a href={`${localizedHref(lang, "/pricing")}?audience=players`} className="underline">
              {creditsUiDictionaries[lang].account.buy}
            </a>
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t.videoLabel}</label>
        <label
          htmlFor="video-file"
          className="flex items-center gap-3 w-full rounded-lg border border-dashed border-line px-3 py-2.5 text-sm cursor-pointer hover:border-brand-600 transition-colors"
        >
          <span className="shrink-0 rounded-md bg-brand-50 text-brand-600 px-3 py-1.5 text-xs font-semibold">
            {t.chooseFile}
          </span>
          <span className="text-muted truncate">
            {file ? file.name : t.noFileSelected}
          </span>
        </label>
        <input
          id="video-file"
          type="file"
          accept="video/*"
          required
          onChange={(e) => onFileChosen(e.target.files?.[0] ?? null)}
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
        disabled={submitting || missing > 0}
        className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:translate-y-0 text-on-brand font-semibold py-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
      >
        {submitting ? t.uploading.replace("{pct}", String(progress)) : t.submit}
      </button>
    </form>
  );
}
