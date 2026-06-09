"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Tracks the user's `prefers-reduced-motion` setting reactively.
 * Returns `true` when the user has requested reduced motion.
 *
 * Used to disable scroll-jacking, pause the 3D scene, swap reveals for
 * instant fades, and stop the cursor follower — per the brief's
 * "respect prefers-reduced-motion everywhere" rule.
 *
 * Built on useMediaQuery (useSyncExternalStore) for an SSR-safe,
 * cascading-render-free subscription.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
