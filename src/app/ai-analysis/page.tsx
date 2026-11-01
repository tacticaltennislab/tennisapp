import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AiAnalysisTool from "@/components/AiAnalysisTool";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI analysis",
  robots: { index: false, follow: false },
};

/** Admin only, in its own tab. Not linked from anywhere a client or an academy coach can see. */
export default async function AiAnalysisPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in?callbackUrl=/ai-analysis");
  if (session.user.role !== "admin") redirect("/account");

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Admin only"
        title="AI analysis"
        subtitle="Choose a match video and get suggestions of moments to check and a draft summary. For your eyes only."
      />
      <main className="flex-1 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <AiAnalysisTool />
        </div>
      </main>
    </div>
  );
}
