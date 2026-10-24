import Image from "next/image";
import Reveal from "@/components/Reveal";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { SITE_STILLS } from "@/lib/siteMedia";
import type { AppLocale } from "@/i18n/locales";

export default function ProcessSection({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];
  const still = SITE_STILLS.process;

  return (
    <section id="how-it-works" className="section-pad scroll-mt-16">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">{dict.howItWorks.title}</p>
            <h2 className="t-h2 mt-4">{dict.hero.tagline}</h2>
            <p className="t-lead mt-5 max-w-md">{dict.howItWorks.subtitle}</p>
          </Reveal>

          <ol className="mt-12 border-t border-line">
            {dict.steps.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 70} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-6">
                <span className="t-mono pt-1 text-sm text-muted" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-body">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {still && (
          <figure className="lg:order-first">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-muted">
              <Image
                src={still.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover saturate-[0.88]"
                style={{ objectPosition: still.position }}
              />
            </div>
            <figcaption className="mt-3 text-xs text-muted">
              {dict.hero.footageCaption}{" "}
              <a
                href={still.credit.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-ink"
              >
                {still.credit.creator} / Pexels
              </a>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
