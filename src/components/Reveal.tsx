"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Scroll-reveal wrapper: content fades and rises into view once, the first
 * time it enters the viewport. Under reduced-motion it renders instantly with
 * no transform — the brief's "swap reveals for instant fades" rule.
 *
 * `delay` staggers siblings; `as` lets the wrapper be a list item, etc.
 */
interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  /** Vertical offset to rise from (px). */
  y?: number;
  as?: "div" | "li" | "span" | "section";
}

export function Reveal({
  delay = 0,
  y = 16,
  as = "div",
  children,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    return <MotionTag {...props}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
