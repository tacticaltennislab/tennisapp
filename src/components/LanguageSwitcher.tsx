"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, localizedHref, type AppLocale } from "@/i18n/locales";

const ALL_LOCALES: AppLocale[] = ["en", ...LOCALES];

export function currentLocaleFromPathname(pathname: string): AppLocale {
  const first = pathname.split("/")[1];
  return (LOCALES as readonly string[]).includes(first) ? (first as AppLocale) : "en";
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = currentLocaleFromPathname(pathname);

  function pick(lang: AppLocale) {
    setOpen(false);
    // Only the homepage is translated so far -- always land there. Once a
    // page has a localized version, this can map the current path instead.
    router.push(localizedHref(lang, "/"));
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="inline-flex items-center justify-center h-9 px-2.5 rounded-full border border-line hover:border-brand-600 text-body hover:text-brand-600 text-xs font-semibold uppercase transition-colors"
      >
        {current}
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 rounded-xl border border-line bg-surface shadow-lg py-1 z-20">
            {ALL_LOCALES.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => pick(lang)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-surface-muted transition-colors ${
                  lang === current ? "text-brand-600 font-semibold" : "text-body"
                }`}
              >
                {LOCALE_LABELS[lang]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
