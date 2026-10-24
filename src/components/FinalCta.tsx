import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/** Closing call to action: one clear next step for an academy, on the brand
 * forest background. Reuses the hero's button labels. */
export default function FinalCta({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];

  return (
    <section className="bg-forest section-pad">
      <Reveal className="container-x text-center">
        <h2 className="t-h2 text-cream max-w-2xl mx-auto">{dict.ctaBand.title}</h2>
        <p className="t-lead mt-4 text-cream/75 max-w-xl mx-auto">{dict.ctaBand.subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={localizedHref(lang, "/contact")} className="btn btn-on-dark">
            {dict.hero.ctaPrimary}
            <IconArrowRight className="w-4 h-4" />
          </Link>
          <Link href={`${localizedHref(lang, "/pricing")}?audience=clubs`} className="btn btn-ghost-dark">
            {dict.hero.ctaSecondary}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
