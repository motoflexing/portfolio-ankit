"use client";

import dynamic from "next/dynamic";

/**
 * Client-only mount point for the LoadingGate. Per Next 16, `ssr: false`
 * dynamic imports must live inside a Client Component (not a Server Component
 * like the root layout), so this thin wrapper hosts the dynamic import.
 *
 * The gate never SSRs — it reads sessionStorage and runs a GSAP timeline, both
 * client-only — and ships its bundle only on the client.
 */
const LoadingGate = dynamic(
  () => import("./LoadingGate").then((m) => m.LoadingGate),
  { ssr: false },
);

export function LoadingGateMount() {
  return <LoadingGate />;
}
