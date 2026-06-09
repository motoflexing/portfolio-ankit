import { Dot } from "lucide-react";

/**
 * Small presentational blocks for the case-study narrative. They render
 * nothing when their content is absent, so the page only shows sections that
 * actually have content for a given project.
 */

/** A titled block with a paragraph of prose. */
export function ProseBlock({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body?: string;
}) {
  if (!body) return null;
  return (
    <section className="border-t border-line py-10 md:py-12">
      <BlockHeading index={index} title={title} />
      <p className="measure mt-5 text-base leading-relaxed text-text-muted md:text-lg">
        {body}
      </p>
    </section>
  );
}

/** A titled block with a bulleted list. */
export function ListBlock({
  index,
  title,
  items,
  lead,
}: {
  index: string;
  title: string;
  items?: string[];
  lead?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <section className="border-t border-line py-10 md:py-12">
      <BlockHeading index={index} title={title} />
      {lead && (
        <p className="measure mt-5 text-base leading-relaxed text-text-muted">
          {lead}
        </p>
      )}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-text-muted"
          >
            <Dot className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Section heading with a mono index. */
export function BlockHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="section-index">{index}</span>
      <h2 className="font-display text-h2 font-semibold text-text">{title}</h2>
    </div>
  );
}

/** A labelled metadata definition row used in the overview panel. */
export function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-line py-3 last:border-b-0">
      <dt className="font-mono text-xs uppercase tracking-wide text-text-faint">
        {label}
      </dt>
      <dd className="text-sm text-text">{children}</dd>
    </div>
  );
}
