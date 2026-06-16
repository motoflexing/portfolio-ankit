import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects, featuredProjects, projectCategories } from "@/data/projects";
import { projectsIntro } from "@/data/projects-page";

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
        {/* Oversized animated word — letters drop into place */}
        <AnimatedHeading
          as="h1"
          text={projectsIntro.heroWord}
          className="font-display text-display-xl font-medium leading-[1.05] tracking-tight text-text"
        />
        <div className="mt-6">
          <SectionHeading
            eyebrow={projectsIntro.eyebrow}
            title={projectsIntro.title}
            lead={projectsIntro.lead}
          />
        </div>
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
          eyebrow={projectsIntro.allEyebrow}
          title={projectsIntro.allTitle}
          lead={projectsIntro.allLead}
        />
        <div className="mt-10">
          <ProjectGrid projects={projects} categories={projectCategories} />
        </div>
      </Section>
    </>
  );
}
