import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects, featuredProjects, projectCategories } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Ankit Dubey — SaaS platforms, AI tools, web applications, mobile experiences, and games. Each with honest status and the story behind it.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      {/* Showcase */}
      <Section index="01" label="Work" className="pb-10 md:pb-12">
        <SectionHeading
          as="h1"
          eyebrow="Selected work"
          title="Products, prototypes & experiments"
          lead="A look at what I've built — from a live multi-tenant SaaS to honest works-in-progress. Status is always shown truthfully; nothing unfinished is dressed up as complete."
        />
        <div className="mt-12">
          <ProjectShowcase projects={featuredProjects} />
        </div>
      </Section>

      {/* Filterable grid */}
      <Section
        index="02"
        label="All Projects"
        className="border-t border-line pt-10 md:pt-12"
      >
        <SectionHeading
          eyebrow="Everything"
          title="Browse all projects"
          lead="Filter by category. Each card shows its real status, ownership, and stack."
        />
        <div className="mt-10">
          <ProjectGrid projects={projects} categories={projectCategories} />
        </div>
      </Section>
    </>
  );
}
