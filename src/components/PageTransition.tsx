"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Page-transition wrapper rendered from app/template.tsx (which re-mounts on
 * every navigation).
 *
 *  - A near-black curtain wipes up (600ms out) while the "AD" monogram DRAWS
 *    itself via SVG stroke-dashoffset during the hold (~200ms).
 *  - The incoming page deblurs (blur 8px -> 0) and descales (0.96 -> 1) as the
 *    curtain lifts (400ms in).
 *
 * Under reduced-motion the curtain is skipped entirely and content renders
 * immediately — no wipe, no blur, no flash.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Curtain — keyed to pathname so it replays each navigation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="pointer-events-none fixed inset-0 z-90 flex items-center justify-center bg-bg"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 100% 0)" }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6, // 600ms out
            ease: [0.76, 0, 0.24, 1],
            delay: 0.2, // 200ms hold before lift
          }}
          aria-hidden="true"
        >
          {/* Self-drawing "AD" monogram */}
          <motion.svg
            width="56"
            height="56"
            viewBox="0 0 64 64"
            fill="none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.96] }}
            transition={{ duration: 0.7, times: [0, 0.25, 0.7, 1] }}
          >
            <rect
              x="6.5"
              y="6.5"
              width="51"
              height="51"
              rx="10"
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
            <motion.path
              d="M18 44 L24 20 L30 44 M20 37 L28 37 M37 20 L37 44 L43 44 C48 44 50 39 50 32 C50 25 48 20 43 20 L37 20"
              stroke="var(--text)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeInOut", delay: 0.05 }}
            />
          </motion.svg>
        </motion.div>
      </AnimatePresence>

      {/* Content: deblur + descale in as the curtain lifts */}
      <motion.div
        key={`content-${pathname}`}
        initial={{ opacity: 0, filter: "blur(8px)", scale: 0.96 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.45 }} // 400ms in
        style={{ transformOrigin: "center top" }}
      >
        {children}
      </motion.div>
    </>
  );
}
