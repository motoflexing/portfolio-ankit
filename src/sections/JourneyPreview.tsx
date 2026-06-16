import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { GlassTile } from "@/components/GlassTile";
import { SectionReveal } from "@/components/SectionReveal";
import { Timeline3DNode } from "@/components/Timeline3DNode";
import { journey } from "@/data/journey";

export function JourneyPreview() {
  const preview = [journey[0], journey[5], journey[10], journey[12]];

  return (
    <Section index="06" label="Journey">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="From creator to builder"
          title="A non-linear path into building products"
          lead="I came to engineering through content creation and storytelling."
        />
        <Link
          href="/journey"
          className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text md:pb-1"
        >
          Full journey
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {preview.map((stage, index) => (
          <SectionReveal as="li" key={stage.index} delay={index * 0.04} className="h-full">
            <GlassTile className="h-full">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Timeline3DNode active={index === preview.length - 1} className="scale-[0.82]" />
                    <span className="section-index">{stage.index}</span>
                  </div>
                  <span className="eyebrow text-text-faint">{stage.phase}</span>
                </div>
                <h3 className="text-subheading mt-5 text-text">{stage.title}</h3>
                <p className="text-small mt-3 text-text-muted">{stage.description}</p>
              </div>
            </GlassTile>
          </SectionReveal>
        ))}
      </ol>
    </Section>
  );
}
