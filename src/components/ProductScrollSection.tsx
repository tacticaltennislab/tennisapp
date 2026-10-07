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
          <>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
              {t.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-ink mt-2">
              {t.titleLine1}
              <br />
              {t.titleLine2}
            </h2>
          </>
        }
      >
        <SampleAnalysisMock lang={lang} />
      </ContainerScroll>
    </div>
  );
}
