"use client";

import { type ComponentType, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";
import { useWebGLAvailable } from "./webgl-support";

/**
 * Shared performance wrapper for secondary R3F background scenes (Statement
 * grid, Capabilities skills web, Contact torus). It centralises the
 * non-negotiable performance architecture so every scene gets it for free:
 *
 *  - The scene component is provided already wrapped in `next/dynamic` with
 *    `ssr:false` by the caller (so the WebGL bundle never SSRs and is
 *    code-split), passed in as `Scene`.
 *  - Mount is deferred to idle after first paint (requestIdleCallback).
 *  - `useInView` pauses the scene's frameloop ("demand") when off-screen.
 *  - Under reduced-motion the canvas is NEVER mounted; `fallback` (or nothing)
 *    renders instead.
 *
 * The scene must accept a `paused?: boolean` prop (all our scenes do).
 */
export function LazyScene({
  Scene,
  fallback = null,
  className,
  rootMargin = "200px",
}: {
  Scene: ComponentType<{ paused?: boolean }>;
  fallback?: React.ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const reduced = useReducedMotion();
  // If WebGL can't create a context, mounting any <Canvas> throws an async,
  // uncatchable rejection that crashes the page (froze scroll). Probe first and
  // never mount the scene without a usable context — the fallback shows instead.
  const webgl = useWebGLAvailable();
  // Memoize so useInView's effect doesn't re-run every render on a fresh object.
  const observerOpts = useMemo<IntersectionObserverInit>(
    () => ({ rootMargin }),
    [rootMargin],
  );
  const { ref, inView } = useInView<HTMLDivElement>(observerOpts);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (reduced || !webgl) return;
    const idle =
      "requestIdleCallback" in window
        ? (cb: () => void) => window.requestIdleCallback(cb)
        : (cb: () => void) => window.setTimeout(cb, 200);
    const id = idle(() => setMount(true));
    return () => {
      if ("cancelIdleCallback" in window && typeof id === "number") {
        window.cancelIdleCallback(id);
      }
    };
  }, [reduced, webgl]);

  // Reduced-motion OR no WebGL: no canvas at all, just the fallback.
  if (reduced || !webgl) return <>{fallback}</>;

  return (
    <div ref={ref} className={className}>
      {mount ? <Scene paused={!inView} /> : fallback}
    </div>
  );
}
