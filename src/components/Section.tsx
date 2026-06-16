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
 * Section heading — minimal label pattern: index · hairline rule · small mono
 * title. Small and authoritative, not a large display heading. The content
 * below the heading carries the meaning, so the descriptive `lead` paragraph
 * is intentionally not rendered (the prop is kept for API stability).
 *
 * `eyebrow` and `lead` remain in the signature so existing call sites compile
 * unchanged; only `eyebrow` (when present) feeds the mono label if `title`
 * isn't a short string.
 */
export function SectionHeading({
  eyebrow,
  title,
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** Kept for API stability; the descriptive lead is no longer rendered. */
  lead?: React.ReactNode;
  className?: string;
  /** Heading level — use "h1" for a page's primary heading. */
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {eyebrow && (
        <span className="text-mono shrink-0 text-text-faint">{eyebrow}</span>
      )}
      <span className="h-px w-8 shrink-0 bg-line-strong" aria-hidden="true" />
      <Heading className="text-mono truncate text-text-muted">{title}</Heading>
    </div>
  );
}
