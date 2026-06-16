"use client";

import dynamic from "next/dynamic";
import { LazyScene } from "@/components/three/LazyScene";

const TorusKnotScene = dynamic(
  () => import("@/components/three/TorusKnotScene"),
  { ssr: false },
);

/**
 * Decorative wireframe torus-knot backdrop for the contact CTA. Code-split,
 * idle-mounted, frameloop-paused offscreen, and skipped under reduced-motion
 * (all via LazyScene). Purely visual (aria-hidden by the caller).
 */
export function TorusKnotBackdrop({ className }: { className?: string }) {
  return <LazyScene Scene={TorusKnotScene} className={className} />;
}
