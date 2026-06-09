"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reactively evaluates a CSS media query using useSyncExternalStore — the
 * correct primitive for subscribing to an external store like matchMedia.
 * SSR-safe: the server snapshot is `false` to avoid hydration mismatch.
 *
 * @example const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  // Server / pre-hydration snapshot.
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Convenience: true on pointer-fine (mouse) devices — i.e. not touch. */
export function usePointerFine(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
