import Reveal from "@/components/Reveal";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

export default function ProcessSection({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];

  return (
    <section id="how-it-works" className="section-pad mx-3 rounded-[2rem] bg-surface-muted scroll-mt-16 sm:mx-5">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 className="t-h2">{dict.howItWorks.title}</h2>
          <p className="t-lead mt-5 max-w-xl">{dict.howItWorks.subtitle}</p>
        </Reveal>

        <ol className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          {dict.steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 90} className="draw-line border-t border-line pt-6">
              <span className="t-mono text-sm text-muted" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-body max-w-sm">{step.detail}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
