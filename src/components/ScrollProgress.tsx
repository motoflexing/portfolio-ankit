"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * 2px accent-red scroll-progress bar fixed at the very top of the page.
 * Uses Framer Motion's scroll tracking with a spring for a smooth fill.
 * scaleX driven by a transform is GPU-cheap and reduced-motion safe
 * (springs settle instantly when transitions are zeroed globally).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-accent"
    />
  );
}
