import type { Metadata } from "next";
import CoachesAdmin from "@/components/CoachesAdmin";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet Your Junior Tennis Coaches",
  description:
    "Former ATP-ranked players and ITF Level 2 certified coaches who personally review every video submission from junior and competitive players.",
};

export default async function CoachesPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  const coaches = await prisma.coach.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      specialty: true,
      bio: true,
      email: isAdmin,
      phone: isAdmin,
    },
  });

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
