import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import SampleAnalysisMock from "@/components/SampleAnalysisMock";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

export default function ProductScrollSection({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].productScroll;

  return (
    <section id="sample-analysis" className="bg-forest section-pad scroll-mt-20">
      <ContainerScroll
        titleComponent={
          <>
            <p className="eyebrow !text-gold">{t.eyebrow}</p>
            <h2 className="mt-4 text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.95] text-cream">
              {t.titleLine1}
              <br />
              <span className="text-gold">{t.titleLine2}</span>
            </h2>
          </>
        }
      >
        <SampleAnalysisMock lang={lang} />
      </ContainerScroll>
    </section>
  );
}
