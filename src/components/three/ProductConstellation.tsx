"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";
import { ConstellationFallback } from "./ConstellationFallback";

/**
 * Signature 3D visual for the hero. Behaviour:
 *  - WebGL scene is lazy-loaded (next/dynamic, SSR off) so it never blocks
 *    first paint and only ships its bundle on the client.
 *  - The render loop pauses when the hero scrolls offscreen (Intersection
 *    Observer) to save battery/GPU.
 *  - Under reduced-motion the scene is never mounted — the static fallback
 *    stands in permanently.
 *  - GSAP ScrollTrigger subtly scales/fades the whole visual as the hero
 *    scrolls away, tying it to the page rhythm.
 */
const ConstellationScene = dynamic(() => import("./ConstellationScene"), {
  ssr: false,
  loading: () => <ConstellationFallback />,
});

export function ProductConstellation() {
  const reduced = useReducedMotion();
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Defer mounting the WebGL bundle until after first paint + idle, so the
  // hero text and CTAs are interactive first.
  const [mountScene, setMountScene] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const idle =
      "requestIdleCallback" in window
        ? (cb: () => void) => window.requestIdleCallback(cb)
        : (cb: () => void) => window.setTimeout(cb, 200);
    const id = idle(() => setMountScene(true));
    return () => {
      if ("cancelIdleCallback" in window && typeof id === "number") {
        window.cancelIdleCallback(id);
      }
    };
  }, [reduced]);

  // GSAP scroll tie-in: scale + fade the visual as the hero leaves the view.
  useEffect(() => {
    if (reduced) return;
    const el = wrapperRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scale: 0.92,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  // Reduced-motion: permanent static fallback, no WebGL.
  if (reduced) {
    return <ConstellationFallback />;
  }

  // Scene is paused (frameloop: "demand") when offscreen — saves GPU.
  const paused = !inView;

  return (
    <div ref={inViewRef} className="h-full w-full">
      <div ref={wrapperRef} className="h-full w-full will-change-transform">
        {mountScene ? (
          <ConstellationScene paused={paused} />
        ) : (
          <ConstellationFallback />
        )}
      </div>
    </div>
  );
}
