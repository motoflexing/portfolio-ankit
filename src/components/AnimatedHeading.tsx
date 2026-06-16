"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Large display word whose letters drop into place: each glyph starts at a
 * deterministic random Y offset (-30..+30px) and settles to 0, staggered.
 *
 * The real word is exposed to assistive tech (the wrapping element carries the
 * text via aria-label and the per-letter spans are aria-hidden). Under
 * reduced-motion the word renders statically with no transform.
 */
export function AnimatedHeading({
  text,
  className,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2";
}) {
  const reduced = useReducedMotion();

  // Deterministic per-letter offsets so SSR/CSR match and renders are stable.
  const offsets = useMemo(() => {
    let seed = text.length * 97 + 7;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    return text.split("").map(() => (rand() * 2 - 1) * 30); // -30..30
  }, [text]);

  const MotionTag = motion[Tag];

  return (
    <MotionTag className={cn("inline-block", className)} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex overflow-hidden">
        {text.split("").map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="inline-block"
            initial={reduced ? false : { y: offsets[i], opacity: 0 }}
            animate={reduced ? undefined : { y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: i * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ whiteSpace: "pre" }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </MotionTag>
  );
}
