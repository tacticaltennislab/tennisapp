import Link from "next/link";
import SampleAnalysisMock from "@/components/SampleAnalysisMock";
import { freeAnalysisDictionaries } from "@/i18n/dictionaries/freeAnalysis";
import { localizedHref } from "@/i18n/locales";
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
      <SampleAnalysisMock t={dict.sampleAnalysis} />

      {/* The offer that makes the example above checkable: the same kind of analysis, on the visitor's own game. */}
      <div className="mt-10 flex flex-col items-start justify-between gap-5 md:mt-14 md:flex-row md:items-center">
        <div className="max-w-xl">
          <p className="text-2xl font-semibold tracking-tight text-ink">{freeAnalysisDictionaries[lang].home.text}</p>
          <p className="mt-2 text-[1.0625rem] leading-relaxed text-body">{freeAnalysisDictionaries[lang].home.sub}</p>
        </div>
        <Link href={localizedHref(lang, "/free-analysis")} className="btn btn-lime shrink-0">
          {freeAnalysisDictionaries[lang].home.cta}
        </Link>
      </div>
    </section>
  );
}
