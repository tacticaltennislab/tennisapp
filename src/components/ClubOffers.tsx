import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import type { ClubTier } from "@/i18n/dictionaries/pricing";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default function ClubOffers({
  eyebrow,
  title,
  subtitle,
  tiers,
  cta,
  note,
  lang = "en",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tiers: ClubTier[];
  cta: string;
  note: string;
  lang?: AppLocale;
}) {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">{eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-1">{title}</h2>
        <p className="mt-2 text-body">{subtitle}</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 60}>
            <div className="h-full flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm">
              <h3 className="font-bold text-lg text-ink">{tier.name}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-muted">{tier.period}</span>
              </p>
              <p className="mt-3 text-sm text-body">{tier.description}</p>
              <ul className="mt-4 space-y-2 text-sm flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-brand-600">✓</span>
                    <span className="text-body">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={localizedHref(lang, "/contact")}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2.5 text-sm shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                {cta}
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted text-center max-w-xl mx-auto">{note}</p>
    </div>
  );
}
