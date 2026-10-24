import { useId } from "react";

export interface BeforeAfterCopy {
  eyebrow: string;
  title: string;
  lead: string;
  before: string;
  after: string;
  beforeText: string;
  afterText: string;
  caption: string;
  legend: string;
}

/**
 * One tactical pattern, before and after the coach's recommendation, as two
 * court diagrams side by side (stacked on phones). Both states are always
 * visible: a comparison reads fastest when nothing has to be dragged.
 */
export default function BeforeAfter({
  copy,
  beforeVisual,
  afterVisual,
}: {
  copy: BeforeAfterCopy;
  beforeVisual: React.ReactNode;
  afterVisual: React.ReactNode;
}) {
  const id = useId();

  return (
    <section id="before-after" aria-labelledby={`${id}-title`} className="section-pad scroll-mt-16">
      <div className="container-x">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id={`${id}-title`} className="t-h2 mt-4 max-w-3xl">
          {copy.title}
        </h2>
        <p className="t-lead mt-5 max-w-xl">{copy.lead}</p>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          <figure>
            <div className="aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface-muted">{beforeVisual}</div>
            <figcaption className="mt-5 border-t border-line pt-4">
              <p className="eyebrow">{copy.before}</p>
              <p className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-body">{copy.beforeText}</p>
            </figcaption>
          </figure>
          <figure>
            <div className="aspect-[16/10] overflow-hidden rounded-3xl border border-accent/50 bg-surface">{afterVisual}</div>
            <figcaption className="mt-5 border-t border-accent pt-4">
              <p className="eyebrow !text-ink">{copy.after}</p>
              <p className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-body">{copy.afterText}</p>
            </figcaption>
          </figure>
        </div>

        <p className="mt-8 text-xs text-muted">{copy.legend}</p>
        <p className="mt-1 text-xs text-muted">{copy.caption}</p>
      </div>
    </section>
  );
}
