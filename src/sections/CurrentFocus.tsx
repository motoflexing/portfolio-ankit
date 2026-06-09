import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { currentFocus } from "@/data/home";

/**
 * Current Focus — what Ankit is actively working on now. A simple, honest
 * list rendered as an editorial index (number + label + detail), no inflated
 * "roadmap" theatre.
 */
export function CurrentFocus() {
  return (
    <Section index="04" label="Current Focus">
      <SectionHeading
        eyebrow="Right now"
        title="What I'm focused on"
        lead="The work that has my attention at the moment — fundamentals, products, and process."
      />

      <ol className="mt-12 divide-y divide-line border-y border-line">
        {currentFocus.map((item, i) => (
          <Reveal as="li" key={item.label} delay={i * 0.05}>
            <div className="grid gap-3 py-7 md:grid-cols-[auto_1fr] md:gap-10">
              <span className="section-index pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="grid gap-2 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
                <h3 className="font-display text-h3 font-medium text-text">
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted md:text-base">
                  {item.detail}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
