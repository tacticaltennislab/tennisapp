import { homeDictionaries } from "@/i18n/dictionaries/home";
import { backedByTitle } from "@/components/BackedBy";
import type { AppLocale } from "@/i18n/locales";

/** Slim credentials bar directly under the hero: who reviews the video and
 * who backs the project. Moved out of the hero so the headline stays clean. */
export default function TrustStrip({ lang = "en" }: { lang?: AppLocale }) {
  const items = [...homeDictionaries[lang].badges, backedByTitle(lang)];

  return (
    <div className="bg-surface border-b border-line">
      <ul className="container-x py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.8125rem] font-medium text-body">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
