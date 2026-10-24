import Reveal from "@/components/Reveal";
import SampleAnalysisMock from "@/components/SampleAnalysisMock";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

/** The main proof of the product: a court view with tactical annotations and
 * the written report beside it. Illustrative, and labelled as such inside it. */
export default function ProductScrollSection({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];

  return (
    <section id="sample-analysis" aria-labelledby="sample-analysis-title" className="container-x pb-20 scroll-mt-16 sm:pb-28 lg:pb-36">
      <h2 id="sample-analysis-title" className="sr-only">
        {dict.productScroll.titleLine1} {dict.productScroll.titleLine2}
      </h2>
      <Reveal>
        <SampleAnalysisMock t={dict.sampleAnalysis} />
      </Reveal>
    </section>
  );
}
