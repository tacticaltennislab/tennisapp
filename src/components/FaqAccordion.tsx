interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-line px-5 py-4 shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between gap-3 cursor-pointer font-medium list-none">
              {item.question}
              <span className="shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-body">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
