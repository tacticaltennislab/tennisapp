"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, localizedHref, type AppLocale } from "@/i18n/locales";

const ALL_LOCALES: AppLocale[] = ["en", ...LOCALES];

// Pages that exist in every locale. Grows as more pages are translated;
// anything not listed here falls back to that locale's homepage instead
// of a 404.
const TRANSLATED_PAGES = [
  "/",
  "/pricing",
  "/faq",
  "/about",
  "/coaches",
  "/contact",
  "/account",
  "/submit-video",
  "/review",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/terms",
  "/privacy",
];

export function currentLocaleFromPathname(pathname: string): AppLocale {
  const first = pathname.split("/")[1];
  return (LOCALES as readonly string[]).includes(first) ? (first as AppLocale) : "en";
}

/** Strips the locale prefix (if any) to get the page path, e.g.
 * "/pl/pricing" -> "/pricing", "/pl" -> "/", "/pricing" -> "/pricing". */
function pagePathFromPathname(pathname: string, locale: AppLocale): string {
  if (locale === "en") return pathname || "/";
  const stripped = pathname.slice(`/${locale}`.length);
  return stripped || "/";
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = currentLocaleFromPathname(pathname);

  function pick(lang: AppLocale) {
    setOpen(false);
    const pagePath = pagePathFromPathname(pathname, current);
    const target = TRANSLATED_PAGES.includes(pagePath) ? pagePath : "/";
    // Keep ?audience= so switching language doesn't flip the pricing view.
    const search = target === "/pricing" ? window.location.search : "";
    router.push(`${localizedHref(lang, target)}${search}`);
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
