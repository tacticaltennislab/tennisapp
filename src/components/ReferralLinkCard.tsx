"use client";

import { useState } from "react";
import { dashboardDictionaries } from "@/i18n/dictionaries/dashboard";
import type { AppLocale } from "@/i18n/locales";

export default function ReferralLinkCard({
  link,
  referralCount,
  lang = "en",
}: {
  link: string;
  referralCount: number;
  lang?: AppLocale;
}) {
  const t = dashboardDictionaries[lang].referral;
  const [copied, setCopied] = useState(false);

  function statusLine(count: number): string {
    if (count >= 5) return t.status5;
    if (count >= 2) return t.status2;
    if (count >= 1) return t.status1;
    return t.status0;
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-line p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{t.title}</h2>
      <p className="mt-1 text-sm text-body">{t.subtitle}</p>
      <div className="mt-4 flex items-stretch gap-2">
        <input
          readOnly
          value={link}
          className="flex-1 rounded-lg border border-line bg-surface-muted px-3 py-2 text-sm text-body truncate"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-lg bg-brand-600 hover:bg-brand-700 text-on-brand text-sm font-semibold px-4 transition-colors"
        >
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <p className="mt-3 text-sm text-body">
        <span className="font-semibold">{referralCount}</span>{" "}
        {referralCount === 1 ? t.friendSingular : t.friendPlural} {t.referredSoFar} {statusLine(referralCount)}
      </p>
    </div>
  );
}
