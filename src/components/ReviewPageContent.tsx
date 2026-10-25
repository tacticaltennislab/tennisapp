import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import ReviewForm from "@/components/ReviewForm";
import { dashboardDictionaries } from "@/i18n/dictionaries/dashboard";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default async function ReviewPageContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = dashboardDictionaries[lang].review;
  const session = await auth();
  if (!session?.user) {
    redirect(`${localizedHref(lang, "/sign-in")}?callbackUrl=${localizedHref(lang, "/review")}`);
  }

  const existingReview = await prisma.review.findUnique({
    where: { userId: session.user.id },
    select: { rating: true, body: true, status: true, mediaUrl: true, mediaContentType: true },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader eyebrow={t.pageEyebrow} title={t.pageTitle} subtitle={t.pageSubtitle} />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-lg mx-auto">
          <ReviewForm existing={existingReview} lang={lang} />
        </div>
      </main>
    </div>
  );
}
