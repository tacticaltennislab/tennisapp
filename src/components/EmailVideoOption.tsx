import { freeAnalysisDictionaries } from "@/i18n/dictionaries/freeAnalysis";
import type { AppLocale } from "@/i18n/locales";

const EMAIL = "tacticaltennislab@gmail.com";

/** The alternative to uploading on the site: send the video (or a download link) by email. */
export default function EmailVideoOption({ lang = "en", className = "" }: { lang?: AppLocale; className?: string }) {
  const t = freeAnalysisDictionaries[lang].emailOption;
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`;

  return (
    <aside className={`rounded-2xl border border-line bg-surface p-5 sm:p-6 ${className}`}>
      <h2 className="font-semibold text-lg">{t.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-body">{t.text}</p>
      <a href={href} className="btn btn-secondary mt-4">
        {t.cta}
      </a>
    </aside>
  );
}
