"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { journey } from "@/data/journey";

/**
 * Scrubbed development-journey timeline.
 *
 *  - A vertical SVG line DRAWS ITSELF (strokeDashoffset) as the section scrolls
 *    through the viewport (GSAP ScrollTrigger scrub).
 *  - Each stage "materializes" (scale + opacity from 0) as it enters, staggered.
 *  - Each milestone is a 3D flip card: front shows index/phase/title, hover or
 *    keyboard-focus flips it to reveal the description.
 *
 * Accessibility: the description is always present in the DOM (so screen
 * readers and keyboard users get it), the card flips on focus as well as hover,
 * and under reduced-motion nothing flips or scrubs — the title and description
 * render stacked and fully visible, and the line is drawn instantly.
 */
export function JourneyTimeline() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Self-drawing SVG line, scrubbed by scroll.
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      });

      // Materialize each stage as it enters.
      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]");
      stages.forEach((stage) => {
        gsap.fromTo(
          stage,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "back.out(1.4)",
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
      {/* Self-drawing SVG track (desktop centred, mobile left). */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-4 top-0 h-full w-px overflow-visible md:left-1/2 md:-translate-x-1/2"
        preserveAspectRatio="none"
        viewBox="0 0 1 100"
      >
        <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path
          ref={pathRef}
          d="M0.5 0 L0.5 100"
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={reduced ? undefined : { strokeDashoffset: 0 }}
        />
      </svg>

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
                className="absolute left-4 top-3 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full border border-accent bg-bg md:left-1/2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              {/* Content — alternating sides on desktop */}
              <div
                className={
                  left
                    ? "md:col-start-1 md:pr-12"
                    : "md:col-start-2 md:pl-12"
                }
              >
                {reduced ? (
                  // Reduced-motion: no flip — title + description stacked.
                  <div className="card-hairline p-5">
                    <div className="flex items-center gap-3">
                      <span className="section-index">{stage.index}</span>
                      <span className="eyebrow text-text-faint">
                        {stage.phase}
                      </span>
                    </div>
                    <h3 className="text-subheading mt-3 text-text">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {stage.description}
                    </p>
                  </div>
                ) : (
                  <FlipCard stage={stage} />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * 3D flip card. Front: index/phase/title. Back: description. Flips on hover
 * AND focus (keyboard-accessible); `tabIndex=0` + role/label expose it. The
 * description stays in the DOM for screen readers.
 */
function FlipCard({
  stage,
}: {
  stage: (typeof journey)[number];
}) {
  return (
    <div
      className="group/flip perspective-distant relative h-44 outline-none"
      tabIndex={0}
      aria-label={`${stage.title}. ${stage.description}`}
    >
      <div className="transform-3d relative h-full w-full transition-transform duration-500 group-hover/flip:rotate-y-180 group-focus-visible/flip:rotate-y-180">
        {/* Front */}
        <div className="card-hairline backface-hidden absolute inset-0 flex flex-col justify-center p-5">
          <div className="flex items-center gap-3">
            <span className="section-index">{stage.index}</span>
            <span className="eyebrow text-text-faint">{stage.phase}</span>
          </div>
          <h3 className="mt-3 font-display text-h3 font-medium text-text">
            {stage.title}
          </h3>
          <span className="mt-3 font-mono text-[0.7rem] uppercase tracking-widest text-text-faint">
            Hover to read
          </span>
        </div>
        {/* Back */}
        <div className="card-hairline backface-hidden absolute inset-0 flex rotate-y-180 flex-col justify-center bg-surface-2 p-5">
          <span className="section-index">{stage.index}</span>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {stage.description}
          </p>
        </div>
      </div>
    </div>
  );
}
