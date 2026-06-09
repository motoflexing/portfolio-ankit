import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { ProjectRail } from "@/components/projects/ProjectRail";
import { featuredProjects } from "@/data/projects";

/**
 * Selected Projects — a CURATED set (featured only), not every project,
 * presented as a swipeable Embla rail. Cards use the shared <ProjectCard>,
 * so the design matches the /projects grid.
 */
export function SelectedProjects() {
  return (
    <Section index="02" label="Selected Work">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="A few things I've built"
          lead="A curated selection — real products with live deployments, honest status, and stories behind them. Not an exhaustive list."
        />
        <Link
          href="/projects"
          className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text md:pb-1"
        >
          All work
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-12">
        <ProjectRail projects={featuredProjects} />
      </div>
    </Section>
  );
}
