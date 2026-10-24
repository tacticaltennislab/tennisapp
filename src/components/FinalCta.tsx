import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/** Closing call to action: one headline, one clear next step. */
export default function FinalCta({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];

  return (
    <section className="section-pad border-t border-line">
      <Reveal className="container-x text-center">
        <h2 className="t-display mx-auto max-w-4xl">{dict.ctaBand.title}</h2>
        <p className="t-lead mx-auto mt-6 max-w-xl">{dict.ctaBand.subtitle}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href={localizedHref(lang, "/contact")} className="btn btn-primary">
            {dict.hero.ctaPrimary}
          </Link>
          <Link href={`${localizedHref(lang, "/pricing")}?audience=clubs`} className="link-arrow">
            {dict.hero.ctaSecondary}
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
