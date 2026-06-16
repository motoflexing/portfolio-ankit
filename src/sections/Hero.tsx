"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { ActionButton } from "@/components/ActionButton";
import { ProductConstellation } from "@/components/three/ProductConstellation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/data/home";
import { site } from "@/data/site";

/**
 * Home hero — cinematic split scene. Left ~45%: editorial text column with a
 * word-per-line clip-path reveal heading and two CTAs. Right ~55%: the
 * signature 3D ProductConstellation (lazy, reduced-motion safe, Bloom + scroll
 * camera pull-back). All copy comes from data/home.ts + data/site.ts.
 *
 * `visual` can override the default constellation (used in tests/variants).
 */
export function Hero({ visual }: { visual?: React.ReactNode }) {
  const reduced = useReducedMotion();

  // Word reveal: each line wipes up from a clipped baseline, staggered.
  const wordVariants: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: {
        delay: 0.25 + i * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      className="container-rhythm relative grid min-h-[92vh] items-center gap-12 py-20 lg:grid-cols-[45fr_55fr] lg:gap-10"
      aria-label="Introduction"
    >
      {/* Editorial margin index */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-(--grid-margin) border-r border-line lg:block">
        <span className="section-index absolute left-4 top-32">00 / Hero</span>
      </div>

      {/* Text column */}
      <div className="relative lg:pl-(--grid-margin)">
        {/* Mono accent eyebrow */}
        <motion.p
          className="mb-7 font-mono text-xs font-medium uppercase text-accent"
          style={{ letterSpacing: "0.15em" }}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hero.eyebrowAlt}
        </motion.p>

        {/* Display heading — one word per line, clip-path wipe reveal */}
        <h1 className="font-display text-display-xl font-semibold leading-[0.95] tracking-tight text-text">
          {hero.headingWords.map((word, i) => (
            <span key={word} className="block overflow-hidden py-[0.04em]">
              <motion.span
                className="inline-block"
                custom={i}
                variants={reduced ? undefined : wordVariants}
                initial={reduced ? false : "hidden"}
                animate={reduced ? undefined : "show"}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtext — delayed fade */}
        <motion.p
          className="measure mt-7 text-lg leading-relaxed text-text-muted"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.supporting}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-wrap items-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ActionButton href="/projects" variant="primary" size="lg" magnetic>
            {hero.ctaPrimary}
            <ArrowRight />
          </ActionButton>
          <ActionButton href="/contact" variant="ghost" size="lg">
            {hero.ctaSecondary}
          </ActionButton>
        </motion.div>

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

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex items-center gap-3 text-text-faint"
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-hidden="true"
        >
          <ChevronDown
            className={`h-4 w-4${reduced ? "" : " motion-safe:animate-bounce"}`}
          />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em]">
            {hero.scrollHint}
          </span>
        </motion.div>
      </div>

      {/* Visual column — signature 3D constellation (full-bleed on the right) */}
      <div className="relative aspect-square w-full lg:aspect-auto lg:h-[78vh]">
        {visual ?? <ProductConstellation />}
      </div>
    </section>
  );
}
