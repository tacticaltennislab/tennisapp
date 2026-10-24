import Reveal from "@/components/Reveal";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

export default function ProcessSection({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];

  return (
    <section id="how-it-works" className="section-pad scroll-mt-16">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
        <Reveal>
          <p className="eyebrow">{dict.howItWorks.title}</p>
          <h2 className="t-h2 mt-4">{dict.hero.tagline}</h2>
          <p className="t-lead mt-5 max-w-md">{dict.howItWorks.subtitle}</p>
        </Reveal>

        <ol className="border-t border-line">
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
    </section>
  );
}
