import Link from "next/link";
import RevealWords from "@/components/motion/RevealWords";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/**
 * Typography only: one headline, one sentence, one action. The tactical court
 * view directly below is the visual. Rendered inside the charcoal chapter.
 */
export default function HeroSection({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];

  return (
    <section className="container-x pb-12 pt-16 text-center sm:pb-14 sm:pt-20 lg:pt-24">
      <RevealWords
        text={dict.hero.title}
        className="t-display mx-auto max-w-5xl !text-[clamp(3rem,7.4vw,6.25rem)]"
      />
      {/* Static on purpose: the largest text on screen is what the browser
          measures for Largest Contentful Paint. */}
      <p className="t-lead mx-auto mt-7 max-w-2xl">{dict.hero.subtitle}</p>
      <div className="animate-fade-up mt-9" style={{ animationDelay: "120ms" }}>
        <Link href={localizedHref(lang, "/contact")} className="btn btn-lime">
          {dict.hero.ctaPrimary}
        </Link>
      </div>
    </section>
  );
}
