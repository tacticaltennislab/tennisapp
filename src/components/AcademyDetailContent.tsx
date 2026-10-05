import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canManageAcademy, canViewAcademy } from "@/lib/academy";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import SubmissionReview from "@/components/SubmissionReview";
import AcademyInviteForm from "@/components/AcademyInviteForm";
import AcademyPendingInvites from "@/components/AcademyPendingInvites";
import AcademyRemoveButton from "@/components/AcademyRemoveButton";
import { IconVideo } from "@/components/icons";
import { academyDictionaries } from "@/i18n/dictionaries/academy";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default async function AcademyDetailContent({
  id,
  lang = "en",
}: {
  id: string;
  lang?: AppLocale;
}) {
  const t = academyDictionaries[lang];
  const session = await auth();
  if (!session?.user) {
    redirect(
      `${localizedHref(lang, "/sign-in")}?callbackUrl=${encodeURIComponent(localizedHref(lang, `/academy/${id}`))}`
    );
  }
  if (!(await canViewAcademy(session.user, id))) {
    notFound();
  }

  const academy = await prisma.academy.findUnique({
    where: { id },
    include: {
      members: { include: { user: { select: { name: true, email: true } } }, orderBy: { createdAt: "asc" } },
      players: { include: { user: { select: { id: true, name: true, email: true } } }, orderBy: { createdAt: "asc" } },
      invites: {
        where: { acceptedAt: null, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!academy) notFound();

  const canManage = await canManageAcademy(session.user, id);
  const isAdmin = session.user.role === "admin";
  const playerIds = academy.players.map((p) => p.user.id);
  const submissions = playerIds.length
    ? await prisma.videoSubmission.findMany({
        where: { userId: { in: playerIds } },
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      })
    : [];

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow={t.detail.eyebrow} title={academy.name} subtitle={t.detail.subtitle} />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <section>
            <h2 className="text-lg font-semibold mb-3">{t.detail.coaches}</h2>
            <ul className="divide-y divide-line rounded-2xl border border-line">
              {academy.members.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-4 p-4 text-sm">
                  <div>
                    <p className="font-medium">{m.user.name || m.user.email}</p>
                    <p className="text-xs text-muted">
                      {m.role === "owner" ? t.roles.owner : t.roles.coach} · {m.user.email}
                    </p>
                  </div>
                  {canManage && m.role !== "owner" && (
                    <AcademyRemoveButton
                      url={`/api/academies/${id}/members/${m.userId}`}
                      label={m.user.name || m.user.email}
                      lang={lang}
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">{t.detail.players}</h2>
            {academy.players.length === 0 ? (
              <EmptyState
                icon={IconVideo}
                title={t.detail.noPlayersTitle}
                detail={canManage ? t.detail.noPlayersDetail : undefined}
              />
            ) : (
              <ul className="divide-y divide-line rounded-2xl border border-line">
                {academy.players.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 p-4 text-sm">
                    <div>
                      <p className="font-medium">{p.user.name || p.user.email}</p>
                      <p className="text-xs text-muted">{p.user.email}</p>
                    </div>
                    {canManage && (
                      <AcademyRemoveButton
                        url={`/api/academies/${id}/players/${p.user.id}`}
                        label={p.user.name || p.user.email || t.detail.fallbackPlayer}
                        lang={lang}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {canManage && (
            <section>
              <h2 className="text-lg font-semibold mb-3">{t.detail.inviteTitle}</h2>
              <AcademyInviteForm academyId={id} lang={lang} />
              <AcademyPendingInvites
                academyId={id}
                lang={lang}
                invites={academy.invites.map((inv) => ({ id: inv.id, email: inv.email, role: inv.role }))}
              />
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold mb-3">{t.detail.submissionsTitle}</h2>
            {submissions.length === 0 ? (
              <EmptyState icon={IconVideo} title={t.detail.noVideos} />
            ) : (
              <ul className="space-y-4">
                {submissions.map((s, i) => (
                  <Reveal key={s.id} as="li" delay={Math.min(i, 6) * 60}>
                    <SubmissionReview
                      lang={lang}
                      canDelete={isAdmin}
                      submission={{
                        id: s.id,
                        title: s.title,
                        note: s.note,
                        status: s.status,
                        coachNotes: s.coachNotes,
                        userName: s.user.name,
                        userEmail: s.user.email,
                        skillLevel: s.skillLevel,
                        goal: s.goal,
                        focusAreas: s.focusAreas,
                      }}
                    />
                  </Reveal>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
