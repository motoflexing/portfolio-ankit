import { cn } from "@/lib/utils";
import type { SkillLevel } from "@/types/skill";

/**
 * Honest skill-level indicator — a small dot + label, NOT a progress bar.
 * Colour encodes depth of real use: accent for Shipped, metal for Prototype,
 * faint for Explored/Learning.
 */
const LEVEL_STYLES: Record<SkillLevel, { dot: string; text: string }> = {
  Shipped: { dot: "bg-accent", text: "text-text-muted" },
  Prototype: { dot: "bg-metal", text: "text-text-muted" },
  Explored: { dot: "bg-text-faint", text: "text-text-faint" },
  Learning: { dot: "bg-text-faint", text: "text-text-faint" },
};

export function SkillLevelDot({
  level,
  className,
}: {
  level: SkillLevel;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-block h-1.5 w-1.5 rounded-full", LEVEL_STYLES[level].dot, className)}
      aria-hidden="true"
    />
  );
}

export function SkillLevelLegend({ className }: { className?: string }) {
  const levels: SkillLevel[] = ["Shipped", "Prototype", "Explored", "Learning"];
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-text-faint",
        className,
      )}
    >
      {levels.map((level) => (
        <li key={level} className="flex items-center gap-2">
          <SkillLevelDot level={level} />
          <span className="uppercase tracking-wide">{level}</span>
        </li>
      ))}
    </ul>
  );
}

export { LEVEL_STYLES };
