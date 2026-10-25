export const LOCALES = ["pl", "es", "it", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export type AppLocale = "en" | Locale;

export const DEFAULT_LOCALE: AppLocale = "en";

export const LOCALE_LABELS: Record<AppLocale, string> = {
  en: "English",
  pl: "Polski",
  es: "Español",
  it: "Italiano",
  ru: "Русский",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** English lives at the bare paths ("/", "/pricing"); every other locale
 * is prefixed ("/pl/pricing"). Use this whenever building an internal
 * link from a component that needs to stay within the current locale. */
export function localizedHref(lang: AppLocale, path: string): string {
  if (lang === "en") return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}
