import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Card, CardBody } from "@/components/Card";
import { ActionButton } from "@/components/ActionButton";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { MetaRow } from "@/components/projects/CaseStudyBlocks";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import {
  aboutIntro,
  approachSteps,
  strengths,
  motivation,
} from "@/data/about";
import { experience, education } from "@/data/experience";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Ankit Dubey is a software developer and product builder. How he approaches building, his core strengths, his journey, and what keeps him building.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <Section index="00" label="About" className="pt-16 md:pt-20">
        <p className="eyebrow mb-6">{aboutIntro.eyebrow}</p>
        <h1 className="max-w-2xl font-display text-display-l font-medium tracking-tight text-text">
          {aboutIntro.heading}
        </h1>
        <div className="text-body measure mt-6 space-y-4 text-text-muted">
          {aboutIntro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-9">
          <ActionButton href={site.resumeUrl} variant="outline" external>
            Download resume
            <ArrowUpRight />
          </ActionButton>
        </div>
      </Section>

      {/* How I Approach Building */}
      <Section index="01" label="Approach" className="border-t border-line">
        <SectionHeading
          eyebrow="How I approach building"
          title="From problem to shipped"
          lead="A simple, repeatable way of working that keeps products coherent and honest."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-5">
          {approachSteps.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 0.05}>
              <div className="flex h-full flex-col bg-surface p-6">
                <span className="section-index">{step.index}</span>
                <h3 className="text-subheading mt-4 text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Core Strengths */}
      <Section index="02" label="Strengths" className="border-t border-line">
        <SectionHeading
          eyebrow="Core strengths"
          title="What I bring"
          lead="Each backed by a concrete example — not an empty badge."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05}>
              <Card className="h-full">
                <CardBody>
                  <h3 className="text-subheading text-text">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {s.support}
                  </p>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Technical matrix + Personal details */}
      <Section index="03" label="Capabilities" className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Technical matrix"
              title="The full toolset"
              lead="Grouped and tagged by how deeply each has actually been used. Filter by level; expand or collapse any group."
            />
            <div className="mt-10">
              <SkillsMatrix />
            </div>
          </div>

          {/* Personal details panel */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="card-hairline p-6 md:p-7">
              <p className="eyebrow mb-4">Personal details</p>
              <dl>
                <MetaRow label="Name">{site.name}</MetaRow>
                <MetaRow label="Role">{site.role}</MetaRow>
                <MetaRow label="Base">{site.base}</MetaRow>
                <MetaRow label="Focus">
                  Building useful, shippable products
                </MetaRow>
                <MetaRow label="Status">{site.status}</MetaRow>
                <MetaRow label="Ecosystem">{site.ecosystem}</MetaRow>
              </dl>
              <div className="mt-6">
                <ActionButton
                  href={site.resumeUrl}
                  variant="primary"
                  external
                  className="w-full"
                >
                  Download resume
                  <ArrowUpRight />
                </ActionButton>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Experience & Education */}
      <Section index="04" label="Background" className="border-t border-line">
        <SectionHeading
          eyebrow="Experience & education"
          title="Background"
          lead="Internship work and personal products are kept separate and described honestly."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Experience */}
          <div>
            <p className="eyebrow mb-5">Experience</p>
            <div className="space-y-5">
              {experience.map((exp) => (
                <Card key={exp.title} className="h-full">
                  <CardBody>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-subheading text-text">
                        {exp.title}
                      </h3>
                      <span className="font-mono text-xs text-text-faint">
                        {exp.period}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-text-muted">
                      {exp.organization}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-text-muted">
                      {exp.summary}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {exp.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="flex gap-2 text-sm text-text-muted"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-line px-2 py-1 font-mono text-[0.7rem] text-text-faint"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <p className="eyebrow mb-5">Education</p>
            <div className="space-y-5">
              {education.map((edu) => (
                <Card key={edu.degree} className="h-full">
                  <CardBody>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-subheading text-text">
                        {edu.degree}
                      </h3>
                      <span className="font-mono text-xs text-text-faint">
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-text-muted">
                      {edu.institution}
                      {edu.location ? ` · ${edu.location}` : ""}
                    </p>
                    {edu.note && (
                      <p className="mt-4 text-sm leading-relaxed text-text-muted">
                        {edu.note}
                      </p>
                    )}
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* What Keeps Me Building */}
      <Section index="05" label="Motivation" className="border-t border-line">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow mb-5">Motivation</p>
            <h2 className="font-display text-h2 font-medium tracking-tight text-text">
              {motivation.heading}
            </h2>
            <div className="text-body measure mt-5 space-y-4 text-text-muted">
              {motivation.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
