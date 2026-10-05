"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowRight } from "@/components/icons";
import { academyDictionaries } from "@/i18n/dictionaries/academy";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default function AcademyInviteAccept({
  token,
  academyName,
  role,
  lang = "en",
}: {
  token: string;
  academyName: string;
  role: string;
  lang?: AppLocale;
}) {
  const t = academyDictionaries[lang].accept;
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAccept() {
    setError(null);
    setSubmitting(true);
    const res = await fetch(`/api/academy-invites/${token}/accept`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setSubmitting(false);
      setError(data.error || t.error);
      return;
    }
    router.push(localizedHref(lang, `/academy/${data.academyId}`));
  }

  const intro = t.intro[role === "owner" || role === "coach" ? role : "player"];
  const [before, after] = intro.split("{academy}");

  return (
    <div className="text-center">
      <p className="text-body">
        {before}
        <strong>{academyName}</strong>
        {after}
      </p>
      <button
        type="button"
        onClick={handleAccept}
        disabled={submitting}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all"
      >
        {submitting ? t.submitting : t.button}
        <IconArrowRight className="w-4 h-4" />
      </button>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
