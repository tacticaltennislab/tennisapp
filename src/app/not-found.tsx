import Link from "next/link";
import { IconArrowRight, IconTarget } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
          <IconTarget className="w-6 h-6" />
        </div>
        <p className="mt-4 text-sm font-semibold text-brand-600 uppercase tracking-wide">
          404
        </p>
        <h1 className="mt-1 text-2xl font-bold">That shot went wide</h1>
        <p className="mt-2 text-body">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-on-brand font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            Back to home
            <IconArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:border-brand-600 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
