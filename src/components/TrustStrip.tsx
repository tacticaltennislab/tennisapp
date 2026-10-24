import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

/** One quiet line of credentials after the hero. */
export default function TrustStrip({ lang = "en" }: { lang?: AppLocale }) {
  const items = homeDictionaries[lang].badges.slice(0, 3);

  return (
    <div className="border-y border-line">
      <ul className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-2 py-5 text-[0.875rem] text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
