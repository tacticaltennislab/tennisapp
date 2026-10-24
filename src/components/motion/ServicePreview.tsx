/**
 * A tiny, abstract preview of what each service delivers. It reacts to the
 * hovered or focused service row (the row carries `group`), using only
 * transforms. Hidden from assistive technology: the text beside it says it all.
 */
export default function ServicePreview({ kind }: { kind: 0 | 1 | 2 }) {
  const frame = "mt-8 h-24 max-w-xs rounded-2xl border border-line bg-surface-muted p-4";

  if (kind === 0) {
    // Stroke analysis: a timeline with the coach's markers and a playhead.
    return (
      <div aria-hidden="true" className={frame}>
        <div className="relative mt-5 h-px bg-line-strong">
          {[14, 38, 61, 84].map((x) => (
            <span key={x} className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" style={{ left: `${x}%` }} />
          ))}
          <span className="absolute -top-4 left-[10%] h-9 w-0.5 rounded bg-ink transition-transform duration-500 ease-out group-hover:translate-x-[11rem] group-focus-within:translate-x-[11rem]" />
        </div>
        <div className="mt-6 flex justify-between text-[0.6875rem] text-muted t-mono">
          <span>00:00</span>
          <span>frame by frame</span>
        </div>
      </div>
    );
  }

  if (kind === 1) {
    // Training programs: four weeks filling up.
    const fill = ["w-full", "w-full", "w-1/2 group-hover:w-[85%] group-focus-within:w-[85%]", "w-0 group-hover:w-[25%] group-focus-within:w-[25%]"];
    return (
      <div aria-hidden="true" className={frame}>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {fill.map((w, i) => (
            <div key={i}>
              <div className="h-1.5 overflow-hidden rounded-full bg-line">
                <div className={`h-full rounded-full bg-ink transition-[width] duration-500 ease-out ${w}`} />
              </div>
              <p className="t-mono mt-2 text-[0.6875rem] text-muted">W{i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Match analysis: patterns, as bars that settle a little longer on hover.
  const rows = ["w-[70%] group-hover:w-[78%] group-focus-within:w-[78%]", "w-[44%] group-hover:w-[52%] group-focus-within:w-[52%]", "w-[58%] group-hover:w-[66%] group-focus-within:w-[66%]"];
  return (
    <div aria-hidden="true" className={frame}>
      <div className="space-y-3 pt-0.5">
        {rows.map((w, i) => (
          <div key={i} className="h-1.5 overflow-hidden rounded-full bg-line">
            <div className={`h-full rounded-full bg-ink transition-[width] duration-500 ease-out ${w}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
