import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import AcademyInviteAccept from "@/components/AcademyInviteAccept";

export const dynamic = "force-dynamic";

export default async function AcademyInvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(`/academy/invite/${token}`)}`);
  }

  const invite = await prisma.academyInvite.findUnique({
    where: { token },
    include: { academy: { select: { name: true } } },
  });

  const invalid = !invite || invite.acceptedAt !== null || invite.expiresAt < new Date();
  const wrongEmail =
    !invalid && (session.user.email || "").toLowerCase() !== invite.email;

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow="Academy invitation" title="Join your academy" subtitle="Accept your invitation to get started." />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-md mx-auto rounded-2xl border border-line p-6">
          {invalid ? (
            <p className="text-center text-body">
              This invitation is no longer valid. Ask your academy for a new one.
            </p>
          ) : wrongEmail ? (
            <p className="text-center text-body">
              This invitation was sent to <strong>{invite.email}</strong>. You&apos;re signed in as{" "}
              {session.user.email}. Sign out and sign in with the invited address to accept.
            </p>
          ) : (
            <AcademyInviteAccept
              token={token}
              academyName={invite.academy.name}
              role={invite.role}
            />
          )}
        </div>
      </main>
    </div>
  );
}
