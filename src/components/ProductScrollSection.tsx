import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import SampleAnalysisMock from "@/components/SampleAnalysisMock";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

export default function ProductScrollSection({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].productScroll;

  return (
    <div className="flex flex-col overflow-hidden bg-surface">
      <ContainerScroll
        titleComponent={
          <div className="pb-14 md:pb-24">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
              {t.eyebrow}
            </p>
            <h2 className="mt-3 text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.95] text-ink">
              {t.titleLine1}
              <br />
              <span className="text-brand-600">{t.titleLine2}</span>
            </h2>
          </div>
        }
      >
        <SampleAnalysisMock lang={lang} />
      </ContainerScroll>
    </div>
  );
}
