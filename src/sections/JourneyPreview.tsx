import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { journey } from "@/data/journey";

/**
 * Development Journey preview — a condensed glimpse of the progression from
 * creator to product builder, linking to the full /journey timeline (built
 * out in Phase 8). Shows first and last stages plus the phase arc; not every
 * stage (the home page stays curated).
 */
export function JourneyPreview() {
  // Show a curated slice: the opening, a midpoint, and the latest stages.
  const preview = [journey[0], journey[5], journey[10], journey[12]];

  return (
    <Section index="06" label="Journey">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="From creator to builder"
          title="A non-linear path into building products"
          lead="I came to engineering through content creation and storytelling — which is exactly why I think about products, not just code."
        />
        <Link
          href="/journey"
          className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text md:pb-1"
        >
          Full journey
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {preview.map((stage, i) => (
          <Reveal as="li" key={stage.index} delay={i * 0.05}>
            <div className="flex h-full flex-col bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="section-index">{stage.index}</span>
                <span className="eyebrow text-text-faint">{stage.phase}</span>
              </div>
              <h3 className="mt-5 font-display text-base font-medium text-text">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {stage.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
