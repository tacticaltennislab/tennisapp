import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { IconArrowRight } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) {
    redirect("/pricing");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id).catch(() => null);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-2xl">
          ✓
        </div>
        <h1 className="mt-4 text-2xl font-bold">You&apos;re all set</h1>
        <p className="mt-2 text-body">
          {session?.payment_status === "paid" || session?.status === "complete"
            ? "Your payment went through. We'll be in touch shortly, or you can send your video now."
            : "Thanks — we're confirming your payment now."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/submit-video"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            Send your video
            <IconArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:border-brand-600 transition-colors"
          >
            Go to your account
          </Link>
        </div>
      </div>
    </main>
  );
}
