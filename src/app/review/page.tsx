import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import ReviewForm from "@/components/ReviewForm";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/review");
  }

  const existingReview = await prisma.review.findUnique({
    where: { userId: session.user.id },
    select: { rating: true, body: true, status: true, mediaUrl: true, mediaContentType: true },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Your opinion"
        title="Leave a review"
        subtitle="Tell other players what working with your coach has been like."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-lg mx-auto">
          <ReviewForm existing={existingReview} />
        </div>
      </main>
    </div>
  );
}
