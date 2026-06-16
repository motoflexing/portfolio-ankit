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
            <span className="text-mono text-text-faint">
              {project.category}
            </span>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text" />
        </div>

        <h3 className="text-subheading mt-6 text-text">{project.title}</h3>
        <p className="text-small mt-2 line-clamp-2 flex-1 text-text-muted">
          {project.shortDescription}
        </p>

        {/* Status + category already shown above; ownership omitted to keep the
            card to two meta facts (per the minimal card rule). */}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, compact ? 3 : 4).map((tech) => (
            <span
              key={tech}
              className="rounded border border-line px-2 py-0.5 font-mono text-[0.625rem] text-text-faint"
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
