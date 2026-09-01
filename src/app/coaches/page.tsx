import CoachesAdmin from "@/components/CoachesAdmin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CoachesPage() {
  const coaches = await prisma.coach.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="flex-1 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Coaches</h1>
        <p className="text-black/60 dark:text-white/60 mb-8">
          Our coaching staff. This list is managed here for now; individual
          coach sign-in accounts are planned for later.
        </p>
        <CoachesAdmin initialCoaches={coaches} />
      </div>
    </main>
  );
}
