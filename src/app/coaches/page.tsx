import CoachesAdmin from "@/components/CoachesAdmin";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CoachesPage() {
  const coaches = await prisma.coach.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Our staff"
        title="Coaches"
        subtitle="Our coaching staff. This list is managed here for now; individual coach sign-in accounts are planned for later."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <CoachesAdmin initialCoaches={coaches} />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
