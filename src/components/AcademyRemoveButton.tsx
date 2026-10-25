"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { academyDictionaries, fill } from "@/i18n/dictionaries/academy";
import type { AppLocale } from "@/i18n/locales";

export default function AcademyRemoveButton({
  url,
  label,
  lang = "en",
}: {
  url: string;
  label: string;
  lang?: AppLocale;
}) {
  const t = academyDictionaries[lang].remove;
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRemove() {
    if (!window.confirm(fill(t.confirm, { name: label }))) return;
    setError(null);
    setSubmitting(true);
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) {
      setSubmitting(false);
      const data = await res.json().catch(() => ({}));
      setError(data.error || t.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={handleRemove}
        disabled={submitting}
        className="text-xs text-red-600 hover:text-red-700 disabled:opacity-60"
      >
        {submitting ? t.removing : t.button}
      </button>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
