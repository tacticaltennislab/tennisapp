import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import {
  IconArrowRight,
  IconTarget,
  IconSpark,
  IconGrowth,
  IconTrophy,
  IconGlobe,
  IconVideo,
  IconUsers,
} from "@/components/icons";
import { aboutDictionaries } from "@/i18n/dictionaries/about";
import { localizedHref, type AppLocale } from "@/i18n/locales";

const PHILOSOPHY_ICONS = [IconTarget, IconSpark, IconGrowth];
const TRUST_ICONS = [IconTrophy, IconGlobe, IconVideo, IconUsers];

export default function AboutContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = aboutDictionaries[lang];

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow={t.pageHeader.eyebrow}
        title={t.pageHeader.title}
        subtitle={t.pageHeader.subtitle}
      />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold">{t.story.title}</h2>
            <div className="mt-3 space-y-4 text-body">
              {t.story.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="mt-14">
            <Reveal className="text-center">
              <h2 className="text-2xl font-bold">{t.philosophyTitle}</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {t.philosophy.map((p, i) => {
                const Icon = PHILOSOPHY_ICONS[i];
                return (
                  <Reveal key={p.title} variant="zoom" delay={i * 100}>
                    <TiltCard
                      maxTilt={5}
                      className="group h-full rounded-2xl border border-line bg-surface p-6 shadow-sm hover:shadow-lg"
                    >
                      <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-on-brand transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="mt-4 font-semibold text-lg">{p.title}</h3>
                      <p className="mt-2 text-sm text-body">{p.detail}</p>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="mt-14">
            <Reveal className="text-center">
              <h2 className="text-2xl font-bold">{t.trustTitle}</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {t.trust.map((item, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <Reveal key={item.title} delay={i * 80}>
                    <TiltCard maxTilt={4} className="group h-full rounded-2xl border border-line bg-surface p-6 shadow-sm hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-on-brand transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="mt-1 text-sm text-body">{item.detail}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal variant="zoom" className="mt-14 text-center">
            <p className="text-body">{t.ctaText}</p>
            <Link
              href={localizedHref(lang, "/coaches")}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-on-brand font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              {t.ctaButton}
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
