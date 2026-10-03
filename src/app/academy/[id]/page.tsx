import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canManageAcademy, canViewAcademy } from "@/lib/academy";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import SubmissionReview from "@/components/SubmissionReview";
import AcademyInviteForm from "@/components/AcademyInviteForm";
import AcademyRemoveButton from "@/components/AcademyRemoveButton";
import { IconVideo } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function AcademyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(`/academy/${id}`)}`);
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
      <PageHeader eyebrow="Academy" title={academy.name} subtitle="Your coaches, players, and their video submissions." />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <section>
            <h2 className="text-lg font-semibold mb-3">Coaches</h2>
            <ul className="divide-y divide-line rounded-2xl border border-line">
              {academy.members.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-4 p-4 text-sm">
                  <div>
                    <p className="font-medium">{m.user.name || m.user.email}</p>
                    <p className="text-xs text-muted">
                      {m.role === "owner" ? "Owner" : "Coach"} · {m.user.email}
                    </p>
                  </div>
                  {canManage && m.role !== "owner" && (
                    <AcademyRemoveButton
                      url={`/api/academies/${id}/members/${m.userId}`}
                      label={m.user.name || m.user.email}
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Players</h2>
            {academy.players.length === 0 ? (
              <EmptyState icon={IconVideo} title="No players yet" detail="Invite players by email below." />
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
                        label={p.user.name || p.user.email || "this player"}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {canManage && (
            <section>
              <h2 className="text-lg font-semibold mb-3">Invite someone</h2>
              <AcademyInviteForm academyId={id} />
              {academy.invites.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-muted mb-2">Pending invitations</p>
                  <ul className="text-sm space-y-1">
                    {academy.invites.map((inv) => (
                      <li key={inv.id}>
                        {inv.email} <span className="text-muted">({inv.role})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold mb-3">Player submissions</h2>
            {submissions.length === 0 ? (
              <EmptyState icon={IconVideo} title="No videos yet" />
            ) : (
              <ul className="space-y-4">
                {submissions.map((s, i) => (
                  <Reveal key={s.id} as="li" delay={Math.min(i, 6) * 60}>
                    <SubmissionReview
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
