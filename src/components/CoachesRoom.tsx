import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { homeDictionaries } from "@/i18n/dictionaries/home";
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

export default async function CoachesRoom({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];
  const t = dict.coachesRoom;

  const coaches = await prisma.coach.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <section className="spotlight-room relative overflow-hidden section-pad">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow !text-gold">{t.eyebrow}</p>
          <h2 className="t-h2 mt-3 text-cream">{t.title}</h2>
          <p className="t-lead mt-4 text-cream/70 max-w-2xl mx-auto">{t.subtitle}</p>
        </Reveal>

        {coaches.length > 0 ? (
          <div
            className={`mt-12 grid gap-5 max-w-3xl mx-auto sm:grid-cols-2 ${
              coaches.length >= 3 ? "lg:max-w-none lg:grid-cols-3" : ""
            }`}
          >
            {coaches.map((coach, i) => (
              <Reveal key={coach.id} delay={i * 80}>
                <div className="h-full rounded-2xl border border-cream/15 bg-cream/[0.04] p-6 transition-colors hover:border-gold/60">
                  <div className="w-12 h-12 rounded-full border border-gold/60 text-gold font-semibold flex items-center justify-center">
                    {initials(coach.name)}
                  </div>
                  <p className="mt-4 text-lg font-semibold text-cream">{coach.name}</p>
                  {coach.specialty && (
                    <p className="mt-1 text-sm font-medium text-lime-300">{coach.specialty}</p>
                  )}
                  {coach.bio && (
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-cream/70">{coach.bio}</p>
                  )}
                  <Link
                    href={localizedHref(lang, `/coaches/${coach.id}`)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-cream transition-colors"
                  >
                    {t.viewProfile}
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-3">
            {dict.badges.map((b) => (
              <span
                key={b}
                className="rounded-sm border border-cream/15 bg-cream/[0.04] text-cream/90 text-sm px-4 py-2"
              >
                {b}
              </span>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
