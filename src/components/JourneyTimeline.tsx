"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { Timeline3DNode } from "@/components/Timeline3DNode";
import { journey } from "@/data/journey";

export function JourneyTimeline() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 62%",
          end: "bottom 82%",
          scrub: 0.55,
        },
      });

      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]");
      stages.forEach((stage, index) => {
        gsap.fromTo(
          stage,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.to(stage, {
          y: index % 2 === 0 ? -14 : 14,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.55,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative">
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-4 top-0 h-full w-px overflow-visible md:left-1/2 md:-translate-x-1/2"
        preserveAspectRatio="none"
        viewBox="0 0 1 100"
      >
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100"
          stroke="var(--line)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100"
          stroke="rgba(229,72,77,0.16)"
          strokeWidth="5"
          vectorEffect="non-scaling-stroke"
        />
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
        {journey.map((stage, index) => {
          const left = index % 2 === 0;
          const active = activeIndex === index;

          return (
            <li
              key={stage.index}
              data-stage
              className="relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
              onPointerEnter={() => setActiveIndex(index)}
              onPointerLeave={() => setActiveIndex((current) => (current === index ? null : current))}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex((current) => (current === index ? null : current))}
            >
              <span className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
                <Timeline3DNode active={active} />
              </span>
              <span
                aria-hidden="true"
                className="absolute left-4 top-6 z-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl md:left-1/2"
              />

              <div
                className={cn(
                  left ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12",
                )}
              >
                <motion.div
                  whileHover={reduced ? undefined : { y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className={cn(
                    "relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(23,23,28,0.84),rgba(9,9,11,0.96))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-md md:p-6",
                    active && "border-accent/35 shadow-[0_26px_72px_rgba(0,0,0,0.34),0_0_30px_rgba(229,72,77,0.12)]",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-[radial-gradient(220px_circle_at_72%_26%,rgba(229,72,77,0.16),transparent_58%)] transition-opacity duration-300",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4">
                      <span className="section-index">{stage.index}</span>
                      <span className="eyebrow text-text-faint">{stage.phase}</span>
                    </div>

                    <h3 className="mt-4 font-display text-h3 font-medium text-text">
                      {stage.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
