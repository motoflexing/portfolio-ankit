export function SectionSignalOrb({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const shell =
    size === "md"
      ? "h-18 w-18 border-accent/25"
      : "h-12 w-12 border-accent/22";
  const inner = size === "md" ? "h-9 w-9" : "h-6 w-6";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative grid place-items-center ${className ?? ""}`}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(229,72,77,0.16),transparent_68%)] blur-xl" />
      <div
        className={`motion-safe:animate-[hero-spin_18s_linear_infinite] rounded-full border ${shell}`}
      />
      <div className="absolute h-full w-full rounded-full border border-white/8 [transform:rotateX(68deg)] opacity-60" />
      <div className={`rounded-full border border-white/10 bg-white/[0.03] ${inner}`} />
      <span className="absolute left-[12%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(229,72,77,0.55)]" />
    </div>
  );
}
