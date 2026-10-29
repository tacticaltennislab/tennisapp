import Link from "next/link";
import { DIcons } from "@/components/dashboard/icons";

/** First run: no analyses yet. Mentions the free credit when the player still has it. */
export default function EmptyAnalyses({ freeCredit }: { freeCredit: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
        <DIcons.upload className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-ink">No analyses yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
        Send a clip of a stroke, a match or a training session. A coach reviews it and the notes appear here,
        pinned to the moments in your video.
        {freeCredit ? " You have a free credit, so your first analysis costs nothing." : ""}
      </p>
      <Link href="/dashboard/upload" className="btn btn-primary mt-6 inline-flex">
        Upload your first clip
        <DIcons.arrow className="h-4 w-4" />
      </Link>
    </div>
  );
}
