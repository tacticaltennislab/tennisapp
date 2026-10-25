import Link from "next/link";
import HeroScene from "@/components/motion/HeroScene";
import RevealWords from "@/components/motion/RevealWords";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/**
 * One headline, one sentence, one action, over two photographs of a clay court
 * that the page scrolls "down into". Rendered inside the charcoal chapter.
 */
export default function HeroSection({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];

  return (
    <HeroScene>
      <div className="container-x text-center">
        <RevealWords
          text={dict.hero.title}
          className="t-display mx-auto max-w-5xl !text-[clamp(3rem,7.4vw,6.25rem)] !text-white"
        />
        {/* Static on purpose: this text is what the browser measures for Largest Contentful Paint. */}
        <p className="t-lead mx-auto mt-7 max-w-2xl !text-white/90">{dict.hero.subtitle}</p>
        <div className="animate-fade-up mt-9" style={{ animationDelay: "120ms" }}>
          <Link href={localizedHref(lang, "/demo")} className="btn btn-lime">
            {dict.hero.ctaPrimary}
          </Link>
        </div>
      </div>
    </HeroScene>
  );
}
