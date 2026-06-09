"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Page-transition wrapper rendered from app/template.tsx (which re-mounts on
 * every navigation). On route change a near-black curtain wipes up to reveal
 * the "AD" monogram, then lifts as the new page content fades in.
 *
 * Under reduced-motion the curtain is skipped entirely and content renders
 * immediately — no wipe, no flash.
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
          className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-bg"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 100% 0)" }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.05,
          }}
          aria-hidden="true"
        >
          <motion.span
            className="grid h-12 w-12 place-items-center rounded border border-line-strong font-display text-lg font-semibold tracking-tight text-text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.96] }}
            transition={{ duration: 0.55, times: [0, 0.3, 0.7, 1] }}
          >
            AD
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* Content fade/raise in */}
      <motion.div
        key={`content-${pathname}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
