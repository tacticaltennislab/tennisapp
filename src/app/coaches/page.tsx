import CoachesAdmin from "@/components/CoachesAdmin";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CoachesPage() {
  const [session, coaches] = await Promise.all([
    auth(),
    prisma.coach.findMany({ orderBy: { createdAt: "desc" } }),
  ]);
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Our staff"
        title="Coaches"
        subtitle="Meet the coaches behind every video review and training plan."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <CoachesAdmin initialCoaches={coaches} isAdmin={isAdmin} />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
