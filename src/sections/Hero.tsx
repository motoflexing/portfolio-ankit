"use client";

import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { ActionButton } from "@/components/ActionButton";
import { ProductConstellation } from "@/components/three/ProductConstellation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/data/home";
import { site } from "@/data/site";
import { socials } from "@/data/socials";

/**
 * Home hero — text + CTAs + availability indicator, alongside the signature
 * 3D ProductConstellation (lazy-loaded, reduced-motion safe). The heading
 * applies accent emphasis to a single key word, per the red-discipline rule.
 *
 * `visual` can override the default constellation (used in tests/variants).
 */
export function Hero({ visual }: { visual?: React.ReactNode }) {
  const reduced = useReducedMotion();

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.06,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      className="container-rhythm relative grid min-h-[88vh] items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8"
      aria-label="Introduction"
    >
      {/* Editorial margin index */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-(--grid-margin) border-r border-line lg:block">
        <span className="section-index absolute left-4 top-32">00 / Hero</span>
      </div>

      {/* Text column */}
      <div className="relative lg:pl-(--grid-margin)">
        <motion.p
          className="eyebrow mb-6"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-display text-display-xl font-semibold leading-[0.95] tracking-tight text-text">
          {[hero.headingLead, hero.headingAccent, hero.headingTail].map(
            (chunk, i) => (
              <motion.span
                key={i}
                className="inline"
                custom={i}
                variants={reduced ? undefined : wordVariants}
                initial={reduced ? false : "hidden"}
                animate={reduced ? undefined : "show"}
              >
                {i === 1 ? (
                  <span className="text-accent">{chunk}</span>
                ) : (
                  chunk
                )}{" "}
              </motion.span>
            ),
          )}
        </h1>

        <p className="measure mt-7 text-lg leading-relaxed text-text-muted">
          {hero.supporting}
        </p>
        <p className="measure mt-4 text-base leading-relaxed text-text-faint">
          {hero.secondary}
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <ActionButton href="/projects" variant="primary" size="lg" magnetic>
            Explore my work
            <ArrowRight />
          </ActionButton>
          <ActionButton
            href={socials.github.url}
            variant="outline"
            size="lg"
          >
            View GitHub
          </ActionButton>
          <ActionButton href="/about" variant="ghost" size="lg">
            Read my story
          </ActionButton>
        </div>

        {/* Availability indicator — subtle, honest */}
        <div className="mt-10 flex items-start gap-3 border-t border-line pt-6">
          <span className="relative mt-1 inline-flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="max-w-md font-mono text-xs leading-relaxed text-text-muted">
            {site.status}
          </p>
        </div>
      </div>

      {/* Visual column — signature 3D constellation */}
      <div className="relative aspect-square w-full lg:aspect-auto lg:h-[70vh]">
        {visual ?? <ProductConstellation />}
      </div>
    </section>
  );
}
