import type { Analysis, ObservationKind } from "@/lib/dashboardSample";

export function StatusChip({ status }: { status: Analysis["status"] }) {
  if (status === "reviewed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/15 px-2.5 py-1 text-xs font-semibold text-brand-600">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
        Reviewed
      </span>
    );
  }
  const label = status === "in_review" ? "In review" : status === "rejected" ? "Not accepted" : "Awaiting review";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-chip px-2.5 py-1 text-xs font-semibold text-body">
      <span
        className={`h-1.5 w-1.5 rounded-full ${status === "in_review" ? "bg-[#f5a524]" : status === "rejected" ? "bg-[#ff8a7a]" : "bg-muted"}`}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

export const KIND_META: Record<ObservationKind, { label: string; dot: string; text: string }> = {
  strength: { label: "Strength", dot: "bg-brand-600", text: "text-brand-600" },
  issue: { label: "Technical issue", dot: "bg-[#f5a524]", text: "text-[#f5a524]" },
  tactical: { label: "Tactical", dot: "bg-[#9fb6ff]", text: "text-[#9fb6ff]" },
};

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-line bg-surface ${className}`}>
      {title && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">{title}</h2>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
