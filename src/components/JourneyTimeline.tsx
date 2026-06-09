"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { journey } from "@/data/journey";

/**
 * Scrubbed development-journey timeline. As you scroll, a vertical accent line
 * fills and each stage animates in. The line fill is tied to scroll via GSAP
 * ScrollTrigger (scrub), and each stage reveals once.
 *
 * Reduced-motion: no scrub, no scroll-jacking — a plain, fully-visible
 * vertical timeline renders instead.
 */
export function JourneyTimeline() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fill the progress line as the section scrolls through the viewport.
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        },
      );

      // Reveal each stage as it enters.
      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]");
      stages.forEach((stage) => {
        gsap.fromTo(
          stage,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative">
      {/* Track + animated fill (desktop centred, mobile left) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-4 top-0 w-px bg-line md:left-1/2 md:-translate-x-1/2"
      >
        <div
          ref={lineRef}
          className="h-full w-full origin-top bg-accent"
          style={{ transform: reduced ? "scaleY(1)" : undefined }}
        />
      </div>

      <ol className="space-y-12 md:space-y-16">
        {journey.map((stage, i) => {
          const left = i % 2 === 0;
          return (
            <li
              key={stage.index}
              data-stage
              className="relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
            >
              {/* Node */}
              <span
                aria-hidden="true"
                className="absolute left-4 top-1.5 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full border border-accent bg-bg md:left-1/2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              {/* Content — alternating sides on desktop */}
              <div
                className={
                  left
                    ? "md:col-start-1 md:pr-12 md:text-right"
                    : "md:col-start-2 md:pl-12"
                }
              >
                <div
                  className={
                    "flex items-center gap-3 " +
                    (left ? "md:flex-row-reverse" : "")
                  }
                >
                  <span className="section-index">{stage.index}</span>
                  <span className="eyebrow text-text-faint">{stage.phase}</span>
                </div>
                <h3 className="mt-3 font-display text-h3 font-medium text-text">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {stage.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
