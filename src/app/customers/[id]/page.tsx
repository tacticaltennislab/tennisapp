import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import MessageThread from "@/components/MessageThread";
import {
  focusLabel,
  goalLabel,
  levelLabel,
  isFocusArea,
  isGoal,
  isSkillLevel,
} from "@/lib/trainingOptions";

export const dynamic = "force-dynamic";

export default async function CustomerThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/customers");
  }
  if (session.user.role !== "admin") {
    redirect("/account");
  }

  const { id } = await params;
  const customer = await prisma.user.findUnique({ where: { id } });
  if (!customer) {
    notFound();
  }

  const messages = await prisma.message.findMany({
    where: { userId: id },
    orderBy: { createdAt: "asc" },
  });

  const submissions = await prisma.videoSubmission.findMany({
    where: { userId: id },
    orderBy: { createdAt: "desc" },
  });

  await prisma.message.updateMany({
    where: { userId: id, sender: "customer", read: false },
    data: { read: true },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Customer"
        title={customer.name || customer.email}
        subtitle={customer.email}
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-lg mx-auto">
          {submissions.length > 0 && (
            <div className="mb-10">
              <h2 className="text-lg font-semibold mb-4">Training focus</h2>
              <ul className="space-y-3">
                {submissions.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-2xl border border-line p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{s.title || s.fileName}</p>
                      <a
                        href={`/api/videos/${s.id}/file`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-brand-600 hover:underline shrink-0"
                      >
                        Watch video
                      </a>
                    </div>
                    {s.note && <p className="mt-1 text-sm text-body">{s.note}</p>}
                    {(s.skillLevel || s.goal || s.focusAreas.length > 0) && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {s.skillLevel && isSkillLevel(s.skillLevel) && (
                          <span className="text-xs rounded-full bg-brand-50 text-brand-700 px-2 py-0.5">
                            {levelLabel(s.skillLevel)}
                          </span>
                        )}
                        {s.goal && isGoal(s.goal) && (
                          <span className="text-xs rounded-full bg-brand-50 text-brand-700 px-2 py-0.5">
                            {goalLabel(s.goal)}
                          </span>
                        )}
                        {s.focusAreas.filter(isFocusArea).map((area) => (
                          <span
                            key={area}
                            className="text-xs rounded-full bg-gray-100 text-body px-2 py-0.5"
                          >
                            {focusLabel(area)}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <MessageThread
            userId={customer.id}
            viewerRole="admin"
            initialMessages={messages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() }))}
          />
        </div>
      </main>
    </div>
  );
}
