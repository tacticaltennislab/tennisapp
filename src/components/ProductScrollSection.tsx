import Reveal from "@/components/Reveal";
import SampleAnalysisMock from "@/components/SampleAnalysisMock";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

/** Shows what a delivered analysis looks like. Illustrative, and labelled
 * as such inside the report itself. */
export default function ProductScrollSection({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].productScroll;

  return (
    <section id="sample-analysis" className="theme-charcoal section-pad mx-3 rounded-[2rem] bg-background text-body scroll-mt-16 sm:mx-5">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="t-h2 mt-4">
            {t.titleLine1} <span className="text-muted">{t.titleLine2}</span>
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-12 md:mt-16">
          <div className="overflow-hidden rounded-3xl border border-line bg-surface">
            <SampleAnalysisMock lang={lang} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
