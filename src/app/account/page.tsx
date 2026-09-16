import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import MessageThread from "@/components/MessageThread";
import { IconVideo } from "@/components/icons";
import { focusLabel, goalLabel, levelLabel, isFocusArea, isGoal, isSkillLevel } from "@/lib/trainingOptions";
import { countSuccessfulReferrals } from "@/lib/referral";
import ReferralLinkCard from "@/components/ReferralLinkCard";

export const dynamic = "force-dynamic";

function referralStatusLine(count: number): string {
  if (count >= 5) {
    return "You've got most plans free (PRO Tour capped at 40% off, Match IQ: Full capped at 50% off).";
  }
  if (count >= 2) {
    return "You have 40% off every plan. Refer 3 more (5 total) and most plans are free.";
  }
  if (count >= 1) {
    return "You have 20% off every plan. Refer 1 more for 40% off.";
  }
  return "Refer 1 friend to unlock 20% off every plan.";
}

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/account");
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

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Your account"
        title={session.user.name ? `Welcome back, ${session.user.name}` : "Your account"}
        subtitle={session.user.email || ""}
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="mb-10">
            <ReferralLinkCard
              link={referralLink}
              referralCount={referralCount}
              statusLine={referralStatusLine(referralCount)}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your videos</h2>
            <Link
              href="/submit-video"
              className="text-sm rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 shadow-sm hover:shadow-md transition-all"
            >
              Send a video
            </Link>
          </div>

          {submissions.length === 0 ? (
            <EmptyState
              icon={IconVideo}
              title="You haven't sent any videos yet"
              detail="Send one to get personalized coach feedback."
            />
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
                            {levelLabel(s.skillLevel)}
                          </span>
                        )}
                        {s.goal && isGoal(s.goal) && (
                          <span className="text-xs rounded-full bg-brand-50 text-brand-700 px-2 py-0.5">
                            {goalLabel(s.goal)}
                          </span>
                        )}
                        {s.focusAreas.filter(isFocusArea).map((area) => (
                          <span key={area} className="text-xs rounded-full bg-chip text-body px-2 py-0.5">
                            {focusLabel(area)}
                          </span>
                        ))}
                      </div>
                    )}
                    <a
                      href={`/api/videos/${s.id}/file`}
                      className="mt-2 inline-block text-sm text-brand-600"
                    >
                      View video
                    </a>
                    {s.coachNotes && (
                      <div className="mt-3 rounded-lg bg-surface-muted p-3 text-sm">
                        <p className="font-medium mb-1">Coach feedback</p>
                        <p className="text-body">{s.coachNotes}</p>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          )}

          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-1">Messages</h2>
            <p className="text-sm text-muted mb-4">
              Managing this account for a junior player? Everything here — every
              message, note, and piece of feedback — is visible to whoever
              holds this login.
            </p>
            <MessageThread
              viewerRole="customer"
              initialMessages={messages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() }))}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
