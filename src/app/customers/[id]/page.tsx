import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import MessageThread from "@/components/MessageThread";

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
