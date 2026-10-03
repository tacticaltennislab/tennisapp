import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import AcademyCreateForm from "@/components/AcademyCreateForm";
import { IconVideo } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function AcademiesAdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/academies");
  }
  if (session.user.role !== "admin") {
    redirect("/account");
  }

  const academies = await prisma.academy.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { members: true, players: true } } },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow="Admin" title="Academies" subtitle="Create academy accounts after a contract is signed." />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-xl mx-auto space-y-12">
          <section>
            <h2 className="text-lg font-semibold mb-3">New academy</h2>
            <AcademyCreateForm />
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">All academies</h2>
            {academies.length === 0 ? (
              <EmptyState icon={IconVideo} title="No academies yet" />
            ) : (
              <ul className="divide-y divide-line rounded-2xl border border-line">
                {academies.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/academy/${a.id}`}
                      className="flex items-center justify-between p-4 hover:bg-surface-muted transition-colors"
                    >
                      <span className="font-medium">{a.name}</span>
                      <span className="text-xs text-muted">
                        {a._count.members} staff · {a._count.players} players
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
