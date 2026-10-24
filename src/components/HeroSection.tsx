import Link from "next/link";
import RevealWords from "@/components/motion/RevealWords";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/**
 * Typography only: one headline, one sentence, one action. The analysis
 * report directly below is the visual.
 */
export default function HeroSection({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];

  return (
    <section className="container-x pb-20 pt-24 text-center sm:pb-28 sm:pt-32 lg:pb-36 lg:pt-44">
      <RevealWords
        text={dict.hero.title}
        className="t-display mx-auto max-w-5xl !text-[clamp(3.25rem,9.5vw,8.25rem)]"
      />
      {/* Static on purpose: the largest text on screen is what the browser
          measures for Largest Contentful Paint. */}
      <p className="t-lead mx-auto mt-8 max-w-2xl">{dict.hero.subtitle}</p>
      <div className="animate-fade-up mt-11" style={{ animationDelay: "120ms" }}>
        <Link href={localizedHref(lang, "/contact")} className="btn btn-primary">
          {dict.hero.ctaPrimary}
        </Link>
      </div>
    </section>
  );
}
