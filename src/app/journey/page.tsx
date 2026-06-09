import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Journey",
  description:
    "From content creation to building products — the ordered stages that shaped how Ankit Dubey approaches software and product development.",
  path: "/journey",
});

export default function JourneyPage() {
  return (
    <Section index="00" label="Journey" className="pt-16 md:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="The path"
        title="From creator to product builder"
        lead="A non-linear route into engineering. These are stages, not dates — the progression that informs how I think about products today."
      />

      <div className="mt-16 md:mt-20">
        <JourneyTimeline />
      </div>
    </Section>
  );
}
