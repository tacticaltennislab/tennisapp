import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import SitePhoto from "@/components/SitePhoto";
import { IconArrowRight } from "@/components/icons";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { SITE_PHOTOS } from "@/lib/sitePhotos";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default async function CoachesRoom({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];
  const t = dict.coachesRoom;

  const coaches = await prisma.coach.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <section id="coaches" className="defer-render section-pad bg-surface-muted scroll-mt-16">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="t-h2 mt-4">{t.title}</h2>
          <p className="t-lead mt-5 max-w-xl">{t.subtitle}</p>
        </Reveal>

        {coaches.length > 0 && (
          <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-16">
            {coaches.map((coach, i) => (
              <Reveal key={coach.id} delay={i * 80}>
                <SitePhoto
                  photo={SITE_PHOTOS.coaches[coach.name.toLowerCase()]}
                  className="mb-7 aspect-[4/5]"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
                <div className="border-t border-ink pt-6">
                  <h3 className="text-2xl font-semibold tracking-tight">{coach.name}</h3>
                  {coach.specialty && <p className="mt-1.5 font-medium text-body">{coach.specialty}</p>}
                  {coach.bio && (
                    <p className="mt-4 line-clamp-6 text-[1.0625rem] leading-relaxed text-body">{coach.bio}</p>
                  )}
                  <Link
                    href={localizedHref(lang, `/coaches/${coach.id}`)}
                    className="link-arrow mt-5 text-[0.9375rem]"
                  >
                    {t.viewProfile}
                    <IconArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
