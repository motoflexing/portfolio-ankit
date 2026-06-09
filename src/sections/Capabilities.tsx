import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  SkillLevelDot,
  SkillLevelLegend,
} from "@/components/SkillLevelTag";
import { skillGroups } from "@/data/skills";

/**
 * Technical Capabilities — condensed for the home page. Shows the grouped
 * technical matrix with honest level dots (no progress bars, no fake levels).
 * The full, filterable set lives on /about; here we keep it curated.
 */
export function Capabilities() {
  return (
    <Section index="03" label="Capabilities">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Technical capabilities"
          title="The tools, used honestly"
          lead="Grouped by area and tagged by how deeply each has actually been used — shipped, prototyped, or explored. No percentage bars, no inflated levels."
        />
        <SkillLevelLegend className="shrink-0 md:pb-1" />
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.name} delay={(i % 3) * 0.05}>
            <div className="flex h-full flex-col bg-surface p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-base font-medium text-text">
                  {group.name}
                </h3>
                <span className="section-index">{group.index}</span>
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2.5 text-sm text-text-muted"
                  >
                    <SkillLevelDot level={skill.level} />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/about"
          className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text"
        >
          See how I work
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </Section>
  );
}
