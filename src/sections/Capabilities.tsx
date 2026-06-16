import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import {
  SkillLevelDot,
  SkillLevelLegend,
} from "@/components/SkillLevelTag";
import { SectionSignalOrb } from "@/components/SectionSignalOrb";
import { SkillsWeb } from "@/components/SkillsWeb";
import { GlassTile } from "@/components/GlassTile";
import { SectionReveal } from "@/components/SectionReveal";
import { skillGroups } from "@/data/skills";

/**
 * Technical Capabilities — condensed for the home page. Shows the grouped
 * technical matrix with honest level dots (no progress bars, no fake levels).
 * The full, filterable set lives on /about; here we keep it curated.
 */
export function Capabilities() {
  return (
    <Section index="03" label="Capabilities" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-12 hidden lg:block"
      >
        <SectionSignalOrb />
      </div>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:flex-col lg:items-start">
          <SectionHeading
            eyebrow="Technical capabilities"
            title="The tools, used honestly"
            lead="Grouped by area and tagged by how deeply each has actually been used — shipped, prototyped, or explored. No percentage bars, no inflated levels."
          />
          <SkillLevelLegend className="shrink-0 md:pb-1 lg:pb-0" />
        </div>

        {/* Decorative interactive skills web — the honest content lives in the
            grid below, so this is purely a visual layer (aria-hidden). */}
        <div aria-hidden="true" className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(229,72,77,0.16),transparent_56%)] blur-3xl" />
          <SkillsWeb />
        </div>
      </div>

      <div className="mt-12 grid auto-rows-fr gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <SectionReveal key={group.name} delay={(i % 3) * 0.05} className="h-full">
            <GlassTile className="h-full">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-subheading text-text">{group.name}</h3>
                  <span className="section-index">{group.index}</span>
                </div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="text-small flex items-center gap-2.5 text-text-muted"
                    >
                      <SkillLevelDot level={skill.level} />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassTile>
          </SectionReveal>
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
