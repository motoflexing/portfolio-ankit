"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { hero } from "@/data/home";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LazyScene } from "@/components/three/LazyScene";

// Background grid canvas — client-only, code-split, never SSR'd.
const GridFieldScene = dynamic(
  () => import("@/components/three/GridFieldScene"),
  { ssr: false },
);

/** One word that rises from below as the section scrolls into view. */
function Word({
  children,
  accent,
  progress,
  start,
  end,
}: {
  children: React.ReactNode;
  accent: boolean;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const y = useTransform(progress, [start, end], ["0.6em", "0em"]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={`inline-block ${accent ? "text-accent" : ""}`}
        style={{ y, opacity }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Short statement block beneath the hero. Each word rises into place as the
 * section enters the viewport (scroll-linked, staggered), with the closing
 * phrase carrying the accent. Behind the copy, a subtle dissolving grid canvas
 * sits at very low opacity. Copy is sourced from data/home.ts.
 *
 * Reduced-motion: words render statically (no scroll transform) and the canvas
 * is never mounted (handled by LazyScene).
 */
export function Statement() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.35"],
  });

  // The accent phrase stays a single highlighted unit at the end.
  const accentPhrase = "build useful products";
  const [before] = hero.statement.split(accentPhrase);
  const leadWords = before.trim().split(/\s+/);
  const accentWords = accentPhrase.split(/\s+/);

  // Build the ordered token list so each word gets its own stagger window.
  const tokens: { text: string; accent: boolean }[] = [
    ...leadWords.map((t) => ({ text: t, accent: false })),
    ...accentWords.map((t, i) => ({
      text: i === accentWords.length - 1 ? `${t}.` : t,
      accent: true,
    })),
  ];

  return (
    <section
      ref={sectionRef}
      className="container-rhythm relative overflow-hidden border-y border-line py-20 md:py-28"
      aria-label="Statement"
    >
      {/* Dissolving grid canvas behind the text */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
      >
        <LazyScene Scene={GridFieldScene} className="h-full w-full" />
      </div>

      <p className="relative mx-auto max-w-4xl text-center font-display text-h2 font-medium leading-tight tracking-tight text-text">
        {/* Screen readers get the clean sentence; visual words are aria-hidden */}
        <span className="sr-only">
          {before}
          {accentPhrase}.
        </span>
        <span aria-hidden="true">
          {tokens.map((tok, i) => {
            const start = i / (tokens.length + 2);
            const end = start + 2 / (tokens.length + 2);
            return (
              <span key={`${tok.text}-${i}`}>
                {reduced ? (
                  <span className={tok.accent ? "text-accent" : ""}>
                    {tok.text}
                  </span>
                ) : (
                  <Word
                    accent={tok.accent}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                  >
                    {tok.text}
                  </Word>
                )}{" "}
              </span>
            );
          })}
        </span>
      </p>
    </section>
  );
}
