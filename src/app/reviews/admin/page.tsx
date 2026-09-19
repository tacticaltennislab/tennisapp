import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import ReviewModeration from "@/components/ReviewModeration";

export const dynamic = "force-dynamic";

export default async function ReviewsAdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/reviews/admin");
  }
  if (session.user.role !== "admin") {
    redirect("/account");
  }

  const reviews = await prisma.review.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { user: { select: { name: true, email: true } } },
  });

  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Admin"
        title="Reviews"
        subtitle={
          pendingCount > 0
            ? `${pendingCount} awaiting approval.`
            : "All caught up — nothing pending."
        }
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <ReviewModeration
            initialReviews={reviews.map((r) => ({
              id: r.id,
              rating: r.rating,
              body: r.body,
              status: r.status,
              createdAt: r.createdAt.toISOString(),
              userName: r.user.name || r.user.email,
              mediaUrl: r.mediaUrl,
              mediaContentType: r.mediaContentType,
            }))}
          />
        </div>
      </main>
    </div>
  );
}
