/**
 * Static fallback for the ProductConstellation — shown while the WebGL scene
 * lazy-loads, and used as the permanent visual under reduced-motion.
 * A hairline frame with a faint node grid and a single accent core. Never a
 * stock dev illustration or fake terminal.
 */
export function ConstellationFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden rounded-lg border border-line bg-surface/40"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(245,245,243,0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_6px_rgba(229,72,77,0.35)]" />
      <span className="section-index absolute bottom-4 left-4">
        product constellation
      </span>
    </div>
  );
}
