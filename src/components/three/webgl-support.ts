/**
 * Synchronously probes for a usable WebGL context.
 *
 * Why this exists: when WebGL is disabled/blocked (sandboxed browsers, no GPU,
 * blocklisted drivers), @react-three/fiber's <Canvas> tries to create a context
 * and throws ASYNCHRONOUSLY ("Error creating WebGL context") from inside its
 * mount effect. That rejection is NOT catchable by a React error boundary and
 * crashes the page's JS — which froze scroll and client navigation.
 *
 * Probing first with a throwaway canvas lets us simply NOT mount <Canvas> when
 * there's no context to be had, degrading to a CSS fallback instead of crashing.
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

/**
 * Client-only React hook reporting WebGL availability.
 *
 * Built on useSyncExternalStore (like useMediaQuery) so the server snapshot is
 * `false` — meaning SSR + first paint render the CSS fallback, and the real
 * probe result is read on the client without setState-in-effect.
 */
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// Probe once and cache — the snapshot must be referentially stable across
// renders or React warns about an unstable store value.
let cachedSupport: boolean | null = null;
function getClientSnapshot(): boolean {
  if (cachedSupport === null) cachedSupport = isWebGLAvailable();
  return cachedSupport;
}

export function useWebGLAvailable(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    getClientSnapshot, // client snapshot (cached)
    () => false, // server snapshot
  );
}
