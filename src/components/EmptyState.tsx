export default function EmptyState({
  icon: Icon,
  title,
  detail,
}: {
  icon: (props: { className?: string }) => React.ReactElement;
  title: string;
  detail?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-6 py-10 text-center">
      <div className="mx-auto w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <p className="mt-3 font-medium text-ink">{title}</p>
      {detail && <p className="mt-1 text-sm text-muted">{detail}</p>}
    </div>
  );
}
