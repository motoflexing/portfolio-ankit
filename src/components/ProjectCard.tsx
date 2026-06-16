import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { TiltWrapper } from "@/components/TiltWrapper";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/**
 * Shared project card — used by the home Embla rail, the projects grid, and
 * (as content) the Swiper showcase. Keeps card design consistent everywhere.
 *
 * Honest by construction: shows the real status badge, ownership, role, and
 * the project's own technologies — never invented metrics.
 */
interface ProjectCardProps {
  project: Project;
  className?: string;
  /** Compact variant for dense rails. */
  compact?: boolean;
  /** Opt into the 3D hover tilt + accent glow (used by the home rail). */
  tilt?: boolean;
}

export function ProjectCard({
  project,
  className,
  compact,
  tilt,
}: ProjectCardProps) {
  const inner = (
    <Card interactive accentHover className={cn("h-full", className)}>
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="view"
        className="group flex h-full flex-col p-6 outline-none md:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="font-mono text-xs text-text-faint">
              {project.category}
            </span>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text" />
        </div>

        <h3 className="mt-6 font-display text-h3 font-medium text-text">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
          {project.shortDescription}
        </p>

        {!compact && (
          <p className="mt-4 font-mono text-xs text-text-faint">
            {project.ownershipType}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, compact ? 3 : 4).map((tech) => (
            <span
              key={tech}
              className="rounded border border-line px-2 py-1 font-mono text-[0.7rem] text-text-faint"
            >
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </Card>
  );

  if (tilt) {
    return <TiltWrapper className={cn("h-full", className)}>{inner}</TiltWrapper>;
  }
  return inner;
}
