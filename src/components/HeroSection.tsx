import Image from "next/image";
import Link from "next/link";
import RevealWords from "@/components/motion/RevealWords";
import { IconArrowRight } from "@/components/icons";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import HeroMedia from "@/components/HeroMedia";
import { SITE_PHOTOS } from "@/lib/sitePhotos";
import { SITE_VIDEOS } from "@/lib/siteMedia";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/**
 * Two modes, one component. Without a photograph the hero is typographic.
 * Once SITE_PHOTOS.hero is set it becomes a full-bleed cinematic hero: the
 * photograph drifts slowly behind the text (CSS scroll-driven, no scroll
 * listener) under a gradient that keeps the headline readable.
 */
export default function HeroSection({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];
  const photo = SITE_PHOTOS.hero;
  const video = SITE_VIDEOS.hero;
  const cinematic = Boolean(photo) && !video;

  // Real footage available: a charcoal hero with the copy on solid colour and
  // the footage beside it, so the headline never sits on a busy image.
  if (video) {
    return (
      <section className="theme-charcoal bg-background">
        <div className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 lg:py-24">
          <div>
            <p className="eyebrow !leading-relaxed !text-brand-600">{dict.hero.tagline}</p>
            <RevealWords text={dict.hero.title} className="t-display mt-5 !text-[clamp(2.75rem,5.6vw,5rem)]" />
            <p className="t-lead mt-6 max-w-xl">{dict.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href={localizedHref(lang, "/contact")} className="btn btn-lime">
                {dict.hero.ctaPrimary}
              </Link>
              <Link href={`${localizedHref(lang, "/pricing")}?audience=clubs`} className="link-arrow">
                {dict.hero.ctaSecondary}
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="mt-7 text-sm text-muted">
              {dict.hero.playersNote}{" "}
              <Link
                href={`${localizedHref(lang, "/pricing")}?audience=players`}
                className="font-medium text-ink underline underline-offset-4 decoration-line-strong hover:decoration-ink transition-colors"
              >
                {dict.hero.playersLink}
              </Link>
            </p>
          </div>
          <HeroMedia video={video} caption={dict.hero.footageCaption} />
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        cinematic
          ? "relative isolate flex min-h-[88svh] items-end overflow-hidden bg-black text-white"
          : "container-x pt-20 pb-16 text-center sm:pt-28 sm:pb-24 lg:pt-36"
      }
    >
      {photo && (
        <>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="parallax-media absolute inset-0">
              <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="object-cover" />
            </div>
          </div>
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.18) 100%)" }}
          />
        </>
      )}

      <div className={cinematic ? "container-x w-full pb-14 pt-40 sm:pb-24" : ""}>
        <RevealWords
          text={dict.hero.title}
          className={`t-display ${cinematic ? "max-w-4xl !text-white" : "mx-auto max-w-5xl"}`}
        />
        {/* Static on purpose: this paragraph is the largest text on screen, so it is
            what the browser measures for Largest Contentful Paint. */}
        <p className={`t-lead mt-7 max-w-2xl ${cinematic ? "!text-white/85" : "mx-auto"}`}>
          {dict.hero.subtitle}
        </p>
        <div
          className={`animate-fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 ${cinematic ? "" : "justify-center"}`}
          style={{ animationDelay: "120ms" }}
        >
          <Link href={localizedHref(lang, "/contact")} className={cinematic ? "btn btn-on-dark" : "btn btn-primary"}>
            {dict.hero.ctaPrimary}
          </Link>
          <Link
            href={`${localizedHref(lang, "/pricing")}?audience=clubs`}
            className={`link-arrow ${cinematic ? "!text-white" : ""}`}
          >
            {dict.hero.ctaSecondary}
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <p
          className={`animate-fade-up mt-8 text-sm ${cinematic ? "text-white/75" : "text-muted"}`}
          style={{ animationDelay: "180ms" }}
        >
          {dict.hero.playersNote}{" "}
          <Link
            href={`${localizedHref(lang, "/pricing")}?audience=players`}
            className={`font-medium underline underline-offset-4 transition-colors ${
              cinematic ? "text-white decoration-white/50 hover:decoration-white" : "text-ink decoration-line-strong hover:decoration-ink"
            }`}
          >
            {dict.hero.playersLink}
          </Link>
        </p>
      </div>
    </section>
  );
}
