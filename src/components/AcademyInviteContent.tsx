import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import AcademyInviteAccept from "@/components/AcademyInviteAccept";
import { academyDictionaries, fill } from "@/i18n/dictionaries/academy";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default async function AcademyInviteContent({
  token,
  lang = "en",
}: {
  token: string;
  lang?: AppLocale;
}) {
  const t = academyDictionaries[lang].accept;
  const session = await auth();
  if (!session?.user) {
    // Brand-new invitees need to be able to create an account from the
    // sign-in page and still land back on this invitation.
    redirect(
      `${localizedHref(lang, "/sign-in")}?callbackUrl=${encodeURIComponent(localizedHref(lang, `/academy/invite/${token}`))}`
    );
  }

  const invite = await prisma.academyInvite.findUnique({
    where: { token },
    include: { academy: { select: { name: true } } },
  });

  const invalid = !invite || invite.acceptedAt !== null || invite.expiresAt < new Date();
  const wrongEmail = !invalid && (session.user.email || "").toLowerCase() !== invite.email;

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-md mx-auto rounded-2xl border border-line p-6">
          {invalid ? (
            <p className="text-center text-body">{t.invalid}</p>
          ) : wrongEmail ? (
            <p className="text-center text-body">
              {fill(t.wrongEmail, { invited: invite.email, current: session.user.email || "" })}
            </p>
          ) : (
            <AcademyInviteAccept
              token={token}
              academyName={invite.academy.name}
              role={invite.role}
              lang={lang}
            />
          )}
        </div>
      </main>
    </div>
  );
}
