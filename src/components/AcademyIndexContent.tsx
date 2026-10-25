import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { IconVideo } from "@/components/icons";
import { academyDictionaries } from "@/i18n/dictionaries/academy";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default async function AcademyIndexContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = academyDictionaries[lang];
  const here = localizedHref(lang, "/academy");
  const session = await auth();
  if (!session?.user) {
    redirect(`${localizedHref(lang, "/sign-in")}?callbackUrl=${encodeURIComponent(here)}`);
  }

  const memberships = await prisma.academyMember.findMany({
    where: { userId: session.user.id },
    include: { academy: { select: { id: true, name: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow={t.index.eyebrow} title={t.index.title} subtitle={t.index.subtitle} />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-xl mx-auto">
          {memberships.length === 0 ? (
            <EmptyState icon={IconVideo} title={t.index.emptyTitle} detail={t.index.emptyDetail} />
          ) : (
            <ul className="divide-y divide-line rounded-2xl border border-line">
              {memberships.map((m) => (
                <li key={m.id}>
                  <Link
                    href={localizedHref(lang, `/academy/${m.academy.id}`)}
                    className="flex items-center justify-between p-4 hover:bg-surface-muted transition-colors"
                  >
                    <span className="font-medium">{m.academy.name}</span>
                    <span className="text-xs text-muted">
                      {m.role === "owner" ? t.roles.owner : t.roles.coach}
                    </span>
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
