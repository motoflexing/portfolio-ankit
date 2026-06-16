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
      <p className="text-body measure mt-4 text-text-muted" style={{ lineHeight: 1.7 }}>
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
        <p className="text-body measure mt-4 text-text-muted">{lead}</p>
      )}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-small flex gap-2 text-text-muted"
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
    <div className="flex items-center gap-3">
      <span className="text-mono shrink-0 text-text-faint">{index}</span>
      <span className="h-px w-8 shrink-0 bg-line-strong" aria-hidden="true" />
      <h2 className="text-mono text-text-muted">{title}</h2>
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
      <dt className="text-mono text-text-faint">{label}</dt>
      <dd className="text-small text-text">{children}</dd>
    </div>
  );
}
