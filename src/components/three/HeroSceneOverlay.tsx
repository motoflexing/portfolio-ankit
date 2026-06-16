"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { HeroCSSFallback } from "./HeroCSSFallback";
import { useWebGLAvailable } from "./webgl-support";
import type { HeroInteractionRef } from "./HeroScene";

const Scene = dynamic(() => import("./HeroScene"), {
  ssr: false,
});

export function HeroSceneOverlay({
  interactionRef,
}: {
  interactionRef: HeroInteractionRef;
}) {
  const reduced = useReducedMotion();
  const webgl = useWebGLAvailable();
  const wrapperClass =
    "absolute inset-0 z-[1] h-full w-full bg-transparent pointer-events-none";

  if (reduced || !webgl) {
    return (
      <div className={wrapperClass}>
        <HeroCSSFallback />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <SceneErrorBoundary fallback={<HeroCSSFallback />}>
        <Scene interactionRef={interactionRef} />
      </SceneErrorBoundary>
    </div>
  );
}
