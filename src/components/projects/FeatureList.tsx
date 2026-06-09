import { Check, Wrench, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FeatureClaim } from "@/types/project";

/**
 * Honest feature list for a case study. Every feature shows its real state —
 * Implemented, Prototype, or Planned — so a planned capability can never read
 * as shipped. This is the core of the content-accuracy promise.
 */
const STATE_STYLE: Record<
  FeatureClaim["state"],
  { icon: typeof Check; iconClass: string; label: string; labelClass: string }
> = {
  Implemented: {
    icon: Check,
    iconClass: "text-accent",
    label: "Implemented",
    labelClass: "text-text-faint",
  },
  Prototype: {
    icon: Wrench,
    iconClass: "text-metal",
    label: "Prototype",
    labelClass: "text-text-faint",
  },
  Planned: {
    icon: CircleDashed,
    iconClass: "text-text-faint",
    label: "Planned",
    labelClass: "text-text-faint",
  },
};

export function FeatureList({ features }: { features: FeatureClaim[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
      {features.map((feature) => {
        const s = STATE_STYLE[feature.state];
        const Icon = s.icon;
        return (
          <li
            key={feature.label}
            className="flex items-start justify-between gap-4 bg-surface px-5 py-4"
          >
            <span className="flex items-start gap-3 text-sm text-text">
              <Icon
                className={cn("mt-0.5 h-4 w-4 shrink-0", s.iconClass)}
                aria-hidden="true"
              />
              {feature.label}
            </span>
            <span
              className={cn(
                "shrink-0 font-mono text-[0.65rem] uppercase tracking-wide",
                s.labelClass,
              )}
            >
              {s.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
