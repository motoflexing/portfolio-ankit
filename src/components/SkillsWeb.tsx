"use client";

import dynamic from "next/dynamic";
import { LazyScene } from "@/components/three/LazyScene";

// Client-only, code-split skills-web canvas.
const SkillsWebScene = dynamic(
  () => import("@/components/three/SkillsWebScene"),
  { ssr: false },
);

/**
 * Decorative interactive skills web for the home Capabilities section. It sits
 * alongside the honest, screen-reader-friendly grid (which remains the source
 * of the actual skill content + honesty tags), so removing the canvas under
 * reduced-motion loses nothing meaningful.
 */
export function SkillsWeb() {
  return (
    <LazyScene
      Scene={SkillsWebScene}
      className="mx-auto aspect-square w-full max-w-[320px]"
    />
  );
}
