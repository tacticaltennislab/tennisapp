import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { IconVideo } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function AcademyIndexPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/academy");
  }

  const memberships = await prisma.academyMember.findMany({
    where: { userId: session.user.id },
    include: { academy: { select: { id: true, name: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow="Academy" title="Your academies" subtitle="Academies you coach or manage on Tactical Tennis Lab." />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-xl mx-auto">
          {memberships.length === 0 ? (
            <EmptyState
              icon={IconVideo}
              title="No academy yet"
              detail="Once your academy invites you, open the invitation link from your email."
            />
          ) : (
            <ul className="divide-y divide-line rounded-2xl border border-line">
              {memberships.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/academy/${m.academy.id}`}
                    className="flex items-center justify-between p-4 hover:bg-surface-muted transition-colors"
                  >
                    <span className="font-medium">{m.academy.name}</span>
                    <span className="text-xs text-muted">{m.role === "owner" ? "Owner" : "Coach"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
