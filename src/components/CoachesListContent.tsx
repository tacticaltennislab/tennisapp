import CoachesAdmin from "@/components/CoachesAdmin";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { coachesDictionaries } from "@/i18n/dictionaries/coaches";
import type { AppLocale } from "@/i18n/locales";

export default async function CoachesListContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = coachesDictionaries[lang].list;
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
      <PageHeader eyebrow={t.pageHeader.eyebrow} title={t.pageHeader.title} subtitle={t.pageHeader.subtitle} />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <CoachesAdmin initialCoaches={coaches} isAdmin={isAdmin} lang={lang} />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
