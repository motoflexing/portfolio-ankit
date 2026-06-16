import { Section, SectionHeading } from "@/components/Section";
import { Card, CardBody } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { buildCards } from "@/data/home";

/**
 * "What I Build" — six categories, one tight paragraph each.
 * Hairline cards with motion hover depth. Server-rendered content;
 * the Card hover and Reveal supply the motion layer.
 */
export function WhatIBuild() {
  return (
    <Section index="01" label="What I Build">
      <SectionHeading
        eyebrow="Capabilities in practice"
        title="What I build"
        lead="Six kinds of product I design and ship — each grounded in real work, not a list of services."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {buildCards.map((card, i) => (
          <Reveal key={card.index} delay={i * 0.05} y={20}>
            <Card
              interactive
              accentHover
              className="h-full rounded-none border-0 bg-surface"
            >
              <CardBody className="flex h-full flex-col">
                <span className="section-index">{card.index}</span>
                <h3 className="text-subheading mt-5 text-text">{card.title}</h3>
                <p className="text-small mt-2 line-clamp-2 text-text-muted">
                  {card.description}
                </p>
              </CardBody>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
