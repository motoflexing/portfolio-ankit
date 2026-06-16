"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";

// Client-only, code-split tech-stack cluster.
const TechStackScene = dynamic(
  () => import("@/components/three/TechStackScene"),
  { ssr: false },
);

/**
 * 3D tech-stack cluster for a case study's Architecture section. The cluster is
 * decorative (aria-hidden); the actual technology names render as an accessible
 * caption row beneath, so removing the canvas (reduced-motion) loses nothing.
 *
 * Follows the project's perf architecture directly because it needs a `count`
 * prop (which LazyScene doesn't forward): ssr:false dynamic import, idle mount,
 * frameloop paused offscreen, no canvas under reduced-motion.
 */
export function TechStackVisual({ technologies }: { technologies: string[] }) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(
    useMemo(() => ({ rootMargin: "200px" }), []),
  );
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (reduced) return;
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
  }, [reduced]);

  return (
    <div className="card-hairline overflow-hidden">
      {/* 3D cluster — skipped entirely under reduced-motion */}
      {!reduced && (
        <div ref={ref} aria-hidden="true" className="h-56 w-full md:h-64">
          {mount ? (
            <TechStackScene count={technologies.length} paused={!inView} />
          ) : null}
        </div>
      )}

      {/* Accessible tech labels — the real content */}
      <div
        className={
          "flex flex-wrap gap-2 p-5" + (reduced ? "" : " border-t border-line")
        }
      >
        {technologies.map((t) => (
          <span
            key={t}
            className="rounded border border-line px-2.5 py-1 font-mono text-xs text-text-faint"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
