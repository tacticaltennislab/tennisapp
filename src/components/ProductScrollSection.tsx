import Reveal from "@/components/Reveal";
import SampleAnalysisMock from "@/components/SampleAnalysisMock";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

/** The main proof of the product: what a delivered analysis looks like.
 * Illustrative, and labelled as such inside the report itself. */
export default function ProductScrollSection({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].productScroll;

  return (
    <section id="sample-analysis" className="section-pad scroll-mt-16">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="t-h2 mt-4">
            {t.titleLine1} <span className="text-muted">{t.titleLine2}</span>
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-12 md:mt-16">
          <div className="overflow-hidden rounded-3xl border border-line">
            <SampleAnalysisMock lang={lang} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
