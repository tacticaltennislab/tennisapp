import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { faqDictionaries } from "@/i18n/dictionaries/faq";
import type { AppLocale } from "@/i18n/locales";

export default function FaqContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = faqDictionaries[lang];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.categories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <div className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHeader
        eyebrow={t.pageHeader.eyebrow}
        title={t.pageHeader.title}
        subtitle={t.pageHeader.subtitle}
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-10">
          {t.categories.map((category, i) => (
            <Reveal key={category.title} delay={i * 60}>
              <FaqAccordion title={category.title} items={category.items} />
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
}
