"use client";

import dynamic from "next/dynamic";
import { LazyScene } from "@/components/three/LazyScene";

const PortalRingScene = dynamic(
  () => import("@/components/three/PortalRingScene"),
  { ssr: false },
);

export function PortalRingBackdrop({ className }: { className?: string }) {
  return <LazyScene Scene={PortalRingScene} className={className} />;
}
