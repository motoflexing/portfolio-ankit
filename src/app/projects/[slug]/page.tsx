import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/SocialIcons";
import {
  projects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { projectSchema, jsonLd } from "@/lib/structured-data";
import { StatusBadge } from "@/components/StatusBadge";
import { ActionButton } from "@/components/ActionButton";
import { FeatureList } from "@/components/projects/FeatureList";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CaseStudyNav } from "@/components/projects/CaseStudyNav";
import { CaseStudyTitle } from "@/components/projects/CaseStudyTitle";
import { TechStackVisual } from "@/components/projects/TechStackVisual";
import {
  ProseBlock,
  ListBlock,
  BlockHeading,
  MetaRow,
} from "@/components/projects/CaseStudyBlocks";

/** Statically generate every case study at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Unique metadata per case study. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return buildMetadata({
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <article className="container-rhythm py-16 md:py-20">
      {/* JSON-LD: CreativeWork */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(projectSchema(project))}
      />

      {/* Back link */}
      <Link
        href="/projects"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        All work
      </Link>

      {/* Header */}
      <header className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <StatusBadge status={project.status} />
            <span className="font-mono text-xs text-text-faint">
              {project.category}
            </span>
            <span className="font-mono text-xs text-text-faint">
              {project.ownershipType}
            </span>
          </div>

          <CaseStudyTitle title={project.title} />
          <p className="measure mt-5 text-lg leading-relaxed text-text-muted">
            {project.fullDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <ActionButton href={project.liveUrl} variant="primary" magnetic>
                Visit live
                <ArrowUpRight />
              </ActionButton>
            )}
            {project.repositoryUrl && (
              <ActionButton href={project.repositoryUrl} variant="outline">
                <SocialIcon platform="github" className="h-4 w-4" />
                Repository
              </ActionButton>
            )}
          </div>
        </div>

        {/* Overview panel */}
        <aside className="card-hairline h-fit p-6 md:p-7">
          <p className="eyebrow mb-4">Overview</p>
          <dl>
            <MetaRow label="Role">{project.role}</MetaRow>
            <MetaRow label="Status">{project.status}</MetaRow>
            <MetaRow label="Ownership">{project.ownershipType}</MetaRow>
            <MetaRow label="Category">{project.category}</MetaRow>
            <MetaRow label="Stack">
              <span className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-line px-2 py-0.5 font-mono text-[0.7rem] text-text-faint"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </MetaRow>
          </dl>
        </aside>
      </header>

      {/* Gallery */}
      {project.screenshots.length > 0 && (
        <section className="mt-14">
          <ProjectGallery
            screenshots={project.screenshots}
            title={project.title}
          />
        </section>
      )}

      {/* Narrative */}
      <div className="mt-14">
        <ProseBlock index="01" title="The problem" body={project.problem} />

        <ListBlock
          index="02"
          title="Who it's for"
          items={project.targetUsers}
        />

        <ListBlock index="03" title="User roles" items={project.userRoles} />

        <ListBlock
          index="04"
          title="My responsibility"
          lead="What I actually did on this project — kept honest, especially on collaborative work."
          items={project.responsibilities}
        />

        <ListBlock
          index="05"
          title="Product decisions"
          items={project.productDecisions}
        />

        {/* Architecture */}
        <ProseBlock
          index="06"
          title="Architecture"
          body={project.architecture}
        />

        {/* Tech-stack 3D cluster (decorative) + accessible label row */}
        {project.technologies.length > 0 && (
          <div className="-mt-2 pb-10 md:pb-12">
            <TechStackVisual technologies={project.technologies} />
          </div>
        )}

        {/* Key features — honest states */}
        <section className="border-t border-line py-10 md:py-12">
          <BlockHeading index="07" title="Key features" />
          <p className="measure mt-5 text-base leading-relaxed text-text-muted">
            Every feature is labelled by its real state. Nothing planned is
            shown as shipped.
          </p>
          <div className="mt-6">
            <FeatureList features={project.features} />
          </div>
        </section>

        <ListBlock
          index="08"
          title="Challenges"
          items={project.challenges}
        />

        <ListBlock index="09" title="Solutions" items={project.solutions} />

        <ListBlock
          index="10"
          title="Security considerations"
          items={project.securityConsiderations}
        />

        <ProseBlock
          index="11"
          title="Deployment"
          body={project.deployment}
        />

        <ListBlock
          index="12"
          title="Current limitations"
          lead="What this project does not do yet — stated plainly."
          items={project.limitations}
        />

        <ListBlock
          index="13"
          title="Lessons learned"
          items={project.lessons}
        />

        <ListBlock
          index="14"
          title="Future roadmap"
          items={project.futurePlans}
        />
      </div>

      {/* Prev / next */}
      <div className="mt-16">
        <CaseStudyNav prev={prev} next={next} />
      </div>
    </article>
  );
}
