import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { legalDictionaries } from "@/i18n/dictionaries/legal";
import type { AppLocale } from "@/i18n/locales";

export default function PrivacyContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = legalDictionaries[lang].privacy;

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {t.sections.map((section, i) => (
            <Reveal key={section.title} delay={i * 40}>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <div className="mt-3 space-y-3 text-body">
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
}
