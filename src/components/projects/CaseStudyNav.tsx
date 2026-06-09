import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import type { Project } from "@/types/project";

/**
 * Previous / next case-study navigation. Wraps around at the ends so there is
 * always somewhere to go. Stacks on mobile (effectively swipeable as two full
 * cards) and sits side-by-side on larger screens.
 */
export function CaseStudyNav({
  prev,
  next,
}: {
  prev: Project | null;
  next: Project | null;
}) {
  return (
    <nav
      aria-label="More case studies"
      className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2"
    >
      {prev && (
        <Link
          href={`/projects/${prev.slug}`}
          className="group flex flex-col gap-4 bg-surface p-6 outline-none transition-colors hover:bg-surface-2 md:p-8"
        >
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-faint">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="font-display text-h3 font-medium text-text">
            {prev.title}
          </span>
          <StatusBadge status={prev.status} />
        </Link>
      )}
      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className="group flex flex-col items-end gap-4 bg-surface p-6 text-right outline-none transition-colors hover:bg-surface-2 md:p-8"
        >
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-faint">
            Next
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="font-display text-h3 font-medium text-text">
            {next.title}
          </span>
          <StatusBadge status={next.status} />
        </Link>
      )}
    </nav>
  );
}
