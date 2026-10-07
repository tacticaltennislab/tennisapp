import Link from "next/link";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { BRAND_GRADIENT_TILES } from "@/lib/gradientTiles";
import { IconArrowRight } from "@/components/icons";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

const HREFS = ["/#how-it-works", "/coaches", "/pricing?audience=clubs", "/about"];

export default function JourneySection({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].journey;

  return (
    <section className="relative overflow-hidden bg-onyx">
      <ImageStreamHero
        images={BRAND_GRADIENT_TILES}
        cards={9}
        speed={20}
        axis={50}
        className="min-h-[720px] sm:min-h-[640px]"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(85% 70% at 50% 50%, rgba(10,18,12,0.55) 0%, rgba(10,18,12,0.85) 70%, rgba(10,18,12,0.96) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-16">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-wide">
            {t.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white text-center">
            {t.title}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl w-full">
            {t.steps.map((s, i) => (
              <Link
                key={s.title}
                href={localizedHref(lang, HREFS[i])}
                className="group rounded-2xl bg-white/8 border border-white/15 backdrop-blur px-5 py-5 hover:bg-white/15 hover:border-white/25 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-sm text-white/70">{s.detail}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-lime-300">
                      {s.cta}
                      <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ImageStreamHero>
    </section>
  );
}
