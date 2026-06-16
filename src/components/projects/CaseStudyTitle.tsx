"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Case-study title split into characters that animate in along a slight arc —
 * each glyph rises while easing in from a small horizontal offset, tracing a
 * curved path rather than a straight vertical one (keyframed x/y).
 *
 * The full title is exposed via aria-label; per-char spans are aria-hidden.
 * Under reduced-motion the title renders statically.
 */
export function CaseStudyTitle({ title }: { title: string }) {
  const reduced = useReducedMotion();
  const chars = title.split("");

  return (
    <h1
      aria-label={title}
      className="mt-6 font-display text-display-l font-medium tracking-tight text-text"
    >
      <span className="sr-only">{title}</span>
      <span aria-hidden="true">
        {chars.map((ch, i) => {
          // Alternate the arc direction so the entrance feels organic.
          const dir = i % 2 === 0 ? -1 : 1;
          return (
            <motion.span
              key={`${ch}-${i}`}
              className="inline-block"
              initial={
                reduced ? false : { y: 42, x: dir * 14, opacity: 0, rotate: dir * 4 }
              }
              animate={
                reduced
                  ? undefined
                  : { y: [42, -6, 0], x: [dir * 14, 0, 0], opacity: 1, rotate: 0 }
              }
              transition={{
                duration: 0.7,
                delay: i * 0.035,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.7, 1],
              }}
              style={{ whiteSpace: "pre" }}
            >
              {ch}
            </motion.span>
          );
        })}
      </span>
    </h1>
  );
}
