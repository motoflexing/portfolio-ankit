"use client";

import dynamic from "next/dynamic";
import { LazyScene } from "@/components/three/LazyScene";

const WireframeSphereScene = dynamic(
  () => import("@/components/three/WireframeSphereScene"),
  { ssr: false },
);

/**
 * Decorative floating wireframe sphere. Code-split, idle-mounted, frameloop-
 * paused offscreen, skipped under reduced-motion AND when WebGL is unavailable
 * (all via LazyScene). Purely visual — the caller marks it aria-hidden and
 * sets a low opacity so it never competes with the text.
 */
export function WireframeBackdrop({ className }: { className?: string }) {
  return <LazyScene Scene={WireframeSphereScene} className={className} />;
}
