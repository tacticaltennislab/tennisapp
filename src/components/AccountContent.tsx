import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import MessageThread from "@/components/MessageThread";
import { IconVideo } from "@/components/icons";
import { isFocusArea, isGoal, isSkillLevel } from "@/lib/trainingOptions";
import { focusLabel, goalLabel, levelLabel } from "@/i18n/dictionaries/trainingOptions";
import { countSuccessfulReferrals } from "@/lib/referral";
import ReferralLinkCard from "@/components/ReferralLinkCard";
import ReviewForm from "@/components/ReviewForm";
import { dashboardDictionaries } from "@/i18n/dictionaries/dashboard";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default async function AccountContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = dashboardDictionaries[lang].account;
  const session = await auth();

  if (!session?.user) {
    redirect(`${localizedHref(lang, "/sign-in")}?callbackUrl=${localizedHref(lang, "/account")}`);
  }

  const submissions = await prisma.videoSubmission.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const messages = await prisma.message.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  const referralCount = await countSuccessfulReferrals(session.user.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const referralLink = `${siteUrl}/?ref=${session.user.id}`;

  const existingReview = await prisma.review.findUnique({
    where: { userId: session.user.id },
    select: { rating: true, body: true, status: true, mediaUrl: true, mediaContentType: true },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow={t.eyebrow}
        title={session.user.name ? t.welcomeBack.replace("{name}", session.user.name) : t.defaultTitle}
        subtitle={session.user.email || ""}
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="mb-10">
            <ReferralLinkCard link={referralLink} referralCount={referralCount} lang={lang} />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t.yourVideos}</h2>
            <Link
              href="/submit-video"
              className="text-sm rounded-xl bg-brand-600 hover:bg-brand-700 text-on-brand px-3 py-1.5 shadow-sm hover:shadow-md transition-all"
            >
              {t.sendVideo}
            </Link>
          </div>

          {submissions.length === 0 ? (
            <EmptyState icon={IconVideo} title={t.noVideosTitle} detail={t.noVideosDetail} />
          ) : (
            <ul className="space-y-4">
              {submissions.map((s, i) => (
                <Reveal key={s.id} as="li" delay={Math.min(i, 6) * 60}>
                  <div className="rounded-2xl border border-line p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{s.title || s.fileName}</p>
                      <span
                        className={`text-xs rounded-full px-2 py-0.5 ${
                          s.status === "reviewed"
                            ? "bg-brand-50 text-brand-700"
                            : "bg-chip text-muted"
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                    {s.note && <p className="mt-1 text-sm text-body">{s.note}</p>}
                    {(s.skillLevel || s.goal || s.focusAreas.length > 0) && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {s.skillLevel && isSkillLevel(s.skillLevel) && (
                          <span className="text-xs rounded-full bg-brand-50 text-brand-700 px-2 py-0.5">
                            {levelLabel(s.skillLevel, lang)}
                          </span>
                        )}
                        {s.goal && isGoal(s.goal) && (
                          <span className="text-xs rounded-full bg-brand-50 text-brand-700 px-2 py-0.5">
                            {goalLabel(s.goal, lang)}
                          </span>
                        )}
                        {s.focusAreas.filter(isFocusArea).map((area) => (
                          <span key={area} className="text-xs rounded-full bg-chip text-body px-2 py-0.5">
                            {focusLabel(area, lang)}
                          </span>
                        ))}
                      </div>
                    )}
                    <a
                      href={`/api/videos/${s.id}/file`}
                      className="mt-2 inline-block text-sm text-brand-600"
                    >
                      {t.viewVideo}
                    </a>
                    {s.coachNotes && (
                      <div className="mt-3 rounded-lg bg-surface-muted p-3 text-sm">
                        <p className="font-medium mb-1">{t.coachFeedback}</p>
                        <p className="text-body">{s.coachNotes}</p>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          )}

          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-1">{t.messagesTitle}</h2>
            <p className="text-sm text-muted mb-4">{t.messagesNote}</p>
            <MessageThread
              viewerRole="customer"
              initialMessages={messages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() }))}
              lang={lang}
            />
          </div>

          <div className="mt-10">
            <ReviewForm existing={existingReview} lang={lang} />
          </div>
        </div>
      </main>
    </div>
  );
}
