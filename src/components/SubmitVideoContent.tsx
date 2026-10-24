import Link from "next/link";
import { auth } from "@/auth";
import VideoUploadForm from "@/components/VideoUploadForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IconVideo, IconTarget, IconUpload, IconSpark, IconArrowRight } from "@/components/icons";
import { dashboardDictionaries } from "@/i18n/dictionaries/dashboard";
import { localizedHref, type AppLocale } from "@/i18n/locales";

const TIP_ICONS = [IconVideo, IconUpload, IconTarget, IconSpark];

export default async function SubmitVideoContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = dashboardDictionaries[lang].submitVideo;
  const session = await auth();

  const tips = t.tips.map((text, i) => ({ icon: TIP_ICONS[i], text }));

  if (!session?.user) {
    return (
      <div className="flex-1 flex flex-col">
        <PageHeader eyebrow={t.beforeEyebrow} title={t.beforeTitle} subtitle={t.beforeSubtitle} />
        <main className="flex-1 px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-12">
            <Reveal>
              <h2 className="text-lg font-semibold mb-5">{t.processTitle}</h2>
              <ol className="space-y-4">
                {t.process.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex items-start gap-4 rounded-2xl border border-line p-5 shadow-sm"
                  >
                    <span className="shrink-0 w-8 h-8 rounded-full bg-brand-600 text-on-brand text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm text-body">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-2xl border border-line bg-brand-50/50 p-6 sm:p-8">
                <h2 className="font-semibold text-lg">{t.tipsTitle}</h2>
                <ul className="mt-5 space-y-4">
                  {tips.map((tip) => (
                    <li key={tip.text} className="flex items-start gap-3">
                      <span className="shrink-0 w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center text-brand-600">
                        <tip.icon className="w-4 h-4" />
                      </span>
                      <span className="text-sm text-body">{tip.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120} className="text-center">
              <p className="text-body">{t.readyText}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href={`${localizedHref(lang, "/sign-up")}?callbackUrl=${localizedHref(lang, "/submit-video")}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-on-brand font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  {t.createAccountCta}
                  <IconArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`${localizedHref(lang, "/pricing")}?audience=players`}
                  className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:border-brand-600 transition-colors"
                >
                  {t.seePricingCta}
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted">
                {t.haveAccount}{" "}
                <Link
                  href={`${localizedHref(lang, "/sign-in")}?callbackUrl=${localizedHref(lang, "/submit-video")}`}
                  className="text-brand-600 font-medium"
                >
                  {t.signInLink}
                </Link>
              </p>
            </Reveal>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-[1fr_1.3fr] items-start">
          <Reveal>
            <div className="rounded-2xl border border-line bg-brand-50/50 p-6 sm:p-8">
              <h2 className="font-semibold text-lg">{t.tipsTitle}</h2>
              <ul className="mt-5 space-y-4">
                {tips.map((tip) => (
                  <li key={tip.text} className="flex items-start gap-3">
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center text-brand-600">
                      <tip.icon className="w-4 h-4" />
                    </span>
                    <span className="text-sm text-body">{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="zoom" delay={100}>
            <VideoUploadForm lang={lang} />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
