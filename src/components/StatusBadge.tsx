import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project";

/**
 * Status badge with an animated dot, keyed to a project's lifecycle status.
 * The pulse uses tailwindcss-motion and is automatically stilled under
 * reduced-motion (animations are neutralized globally in globals.css).
 *
 * This is a Server Component — the animation is pure CSS.
 */

const STATUS_STYLES: Record<
  ProjectStatus,
  { dot: string; ring: string; label: string; pulse: boolean }
> = {
  Live: {
    dot: "bg-accent",
    ring: "bg-accent/30",
    label: "text-text",
    pulse: true,
  },
  "In Development": {
    dot: "bg-metal",
    ring: "bg-metal/25",
    label: "text-text-muted",
    pulse: true,
  },
  Prototype: {
    dot: "bg-metal",
    ring: "bg-metal/20",
    label: "text-text-muted",
    pulse: false,
  },
  Experimental: {
    dot: "bg-text-faint",
    ring: "bg-text-faint/20",
    label: "text-text-muted",
    pulse: false,
  },
  Planned: {
    dot: "bg-text-faint",
    ring: "bg-text-faint/15",
    label: "text-text-faint",
    pulse: false,
  },
};

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
  /** Hide the text label and show only the dot. */
  dotOnly?: boolean;
}

export function StatusBadge({ status, className, dotOnly }: StatusBadgeProps) {
  const s = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs tracking-wide",
        s.label,
        className,
      )}
    >
      <span className="relative inline-flex h-2 w-2 items-center justify-center">
        {s.pulse && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute inline-flex h-full w-full rounded-full motion-safe:animate-ping",
              s.ring,
            )}
          />
        )}
        <span
          className={cn("relative inline-flex h-2 w-2 rounded-full", s.dot)}
        />
      </span>
      {!dotOnly && <span className="uppercase">{status}</span>}
    </span>
  );
}
