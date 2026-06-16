import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionSignalOrb } from "@/components/SectionSignalOrb";
import { SelectedWorkGrid } from "@/components/projects/SelectedWorkGrid";
import { featuredProjects } from "@/data/projects";

/**
 * Home selected-work showcase. The section intentionally uses a disciplined
 * responsive grid instead of the previous horizontal rail so the layout starts
 * from the left edge and sits more cleanly beneath the hero.
 */
export function SelectedProjects() {
  return (
    <Section
      index="02"
      label="Selected Work"
      className="relative pt-14 pb-18 md:pt-18 md:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-10 hidden opacity-90 lg:block"
      >
        <SectionSignalOrb size="md" />
      </div>
      <div className="flex flex-col gap-6 border-t border-white/8 pt-8 md:flex-row md:items-end md:justify-between md:pt-10">
        <div className="space-y-2">
          <p className="text-display text-text">Selected Work</p>
          <p className="text-body text-text-muted">A few things I&apos;ve built</p>
        </div>
        <Link
          href="/projects"
          className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text md:pb-1"
        >
          All work
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-8 md:mt-10">
        <SelectedWorkGrid projects={featuredProjects} />
      </div>
    </Section>
  );
}
