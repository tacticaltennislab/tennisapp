"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { creditsUiDictionaries } from "@/i18n/dictionaries/creditsUi";
import { localizedHref, type AppLocale } from "@/i18n/locales";

interface CreditsInfo {
  balance: number;
  academies: { id: string; name: string; balance: number; renewsAt: string | null }[];
}

/** "Credits: N" for the signed in user, plus the academy's balance for academy members. */
export default function CreditsPill({
  userId,
  locale,
  onNavigate,
  className = "",
}: {
  userId: string;
  locale: AppLocale;
  onNavigate?: () => void;
  className?: string;
}) {
  const [info, setInfo] = useState<{ userId: string; data: CreditsInfo } | null>(null);
  const t = creditsUiDictionaries[locale].header;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/credits")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: CreditsInfo | null) => {
        if (!cancelled && data) setInfo({ userId, data });
      })
      .catch(() => {
        // The balance is a convenience; a failed lookup must never break the header.
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const data = info?.userId === userId ? info.data : null;
  if (!data) return null;

  const pill =
    "inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink hover:border-brand-600 whitespace-nowrap";
  return (
    <span className={`flex flex-wrap items-center gap-2 lg:flex-nowrap ${className}`}>
      <Link
        href={localizedHref(locale, "/account")}
        onClick={onNavigate}
        aria-label={`${t.aria}: ${data.balance}`}
        className={pill}
      >
        {t.label.replace("{n}", String(data.balance))}
      </Link>
      {data.academies.length === 1 && (
        <Link
          href={localizedHref(locale, "/account")}
          onClick={onNavigate}
          title={data.academies[0].name}
          className={`${pill} max-w-[9rem]`}
        >
          <span className="truncate">{data.academies[0].name}</span>
          <span className="shrink-0">: {data.academies[0].balance}</span>
        </Link>
      )}
    </span>
  );
}
