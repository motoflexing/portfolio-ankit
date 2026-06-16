"use client";

import dynamic from "next/dynamic";
import { LazyScene } from "@/components/three/LazyScene";

const TechCoreScene = dynamic(
  () => import("@/components/three/TechCoreScene"),
  { ssr: false },
);

/**
 * Decorative tech-core object for the Capabilities section. The actual skills
 * stay in semantic content cards beside it; the canvas is purely atmospheric.
 */
export function SkillsWeb() {
  return (
    <LazyScene
      Scene={TechCoreScene}
      className="mx-auto aspect-square w-full max-w-[360px]"
    />
  );
}
