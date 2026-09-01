export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-line bg-brand-50/40">
      <div className="max-w-3xl mx-auto px-4 py-10 sm:py-12">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-bold mt-1">{title}</h1>
        <p className="mt-2 text-body max-w-xl">{subtitle}</p>
      </div>
    </div>
  );
}
