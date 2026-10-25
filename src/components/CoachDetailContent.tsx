import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IconArrowRight, IconTrophy } from "@/components/icons";
import { coachesDictionaries } from "@/i18n/dictionaries/coaches";
import { localizedHref, type AppLocale } from "@/i18n/locales";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function CoachDetailContent({ id, lang = "en" }: { id: string; lang?: AppLocale }) {
  const t = coachesDictionaries[lang].detail;
  const coach = await prisma.coach.findUnique({ where: { id } });
  if (!coach) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow={t.eyebrow} title={coach.name} subtitle={coach.specialty || t.fallbackSubtitle} />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full bg-brand-50 text-brand-600 text-xl font-semibold flex items-center justify-center">
                {initials(coach.name)}
              </div>
              <div>
                <p className="font-semibold text-lg">{coach.name}</p>
                {coach.specialty && (
                  <p className="text-sm text-brand-600">{coach.specialty}</p>
                )}
              </div>
            </div>
          </Reveal>

          {coach.bio && (
            <Reveal delay={80} className="mt-8">
              <h2 className="text-lg font-semibold">{t.background}</h2>
              <p className="mt-2 text-body leading-relaxed">{coach.bio}</p>
            </Reveal>
          )}

          {coach.gptcaUrl && (
            <Reveal delay={120} className="mt-8">
              <h2 className="text-lg font-semibold">{t.credentials}</h2>
              <a
                href={coach.gptcaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center gap-3 rounded-2xl border border-line p-4 shadow-sm hover:shadow-md hover:border-brand-600 transition-all group"
              >
                <span className="shrink-0 w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                  <IconTrophy className="w-5 h-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{t.gptcaTitle}</span>
                  <span className="block text-sm text-muted">{t.gptcaSubtitle}</span>
                </span>
                <IconArrowRight className="w-4 h-4 text-muted group-hover:text-brand-600 transition-colors" />
              </a>
            </Reveal>
          )}

          <Reveal delay={160} className="mt-10 text-center">
            <p className="text-body">
              {t.readyPrefix} {coach.name.split(" ")[0]}
              {t.readySuffix}
            </p>
            <Link
              href={localizedHref(lang, "/submit-video")}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-on-brand font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              {t.sendVideo}
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
