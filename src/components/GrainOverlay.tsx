"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Fixed film-grain + vignette overlay for cinematic depth.
 * Pure CSS, GPU-cheap. The animated grain is disabled under reduced-motion
 * (the keyframes are neutralized in globals.css); we keep the static vignette.
 */
export function GrainOverlay() {
  const reduced = useReducedMotion();

  return (
    <>
      <div
        className="grain-layer"
        aria-hidden="true"
        // When reduced, the CSS already stops the animation; the static
        // grain texture remains but is barely perceptible at 0.04 opacity.
        data-reduced={reduced ? "true" : "false"}
      />
      <div className="vignette-layer" aria-hidden="true" />
    </>
  );
}
