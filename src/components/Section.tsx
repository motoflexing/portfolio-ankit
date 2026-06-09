import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial section wrapper. Carries the persistent thin left margin with a
 * mono section index and a vertical hairline (the magazine-grid signature),
 * and applies consistent vertical rhythm.
 *
 * Server Component — purely structural. Animated reveals are layered on by
 * <Reveal> around the content, not here.
 */
interface SectionProps extends React.ComponentProps<"section"> {
  /** Mono index shown in the left margin, e.g. "02". */
  index?: string;
  /** Short mono label rendered under the index. */
  label?: string;
  /** Remove the default top/bottom padding. */
  flush?: boolean;
}

export function Section({
  index,
  label,
  flush = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "container-rhythm relative",
        !flush && "py-20 md:py-28",
        className,
      )}
      {...props}
    >
      {/* Editorial margin (desktop only) */}
      {(index || label) && (
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-(--grid-margin) border-r border-line lg:block">
          <div className="absolute left-4 top-0 flex flex-col gap-2 pt-1">
            {index && <span className="section-index">{index}</span>}
            {label && (
              <span className="eyebrow [writing-mode:vertical-lr] mt-3 rotate-180 text-text-faint">
                {label}
              </span>
            )}
          </div>
        </div>
      )}

      <div className={cn(index || label ? "lg:pl-(--grid-margin)" : undefined)}>
        {children}
      </div>
    </section>
  );
}

/**
 * Section heading block: mono eyebrow + display heading + optional lead.
 * Keeps heading rhythm consistent across the home sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  /** Heading level — use "h1" for a page's primary heading. */
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Heading className="font-display text-h2 font-semibold text-text">
        {title}
      </Heading>
      {lead && (
        <p className="measure mt-5 text-base leading-relaxed text-text-muted md:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
