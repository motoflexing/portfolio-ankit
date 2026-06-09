import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

/**
 * Typographic identity: an "AD" monogram in a hairline square, optionally
 * paired with the "Ankit Dubey" wordmark. This is the personal mark — the
 * MotoFlexing logo is deliberately NOT used as the personal identity.
 */
interface LogoProps {
  /** Show the wordmark next to the monogram. */
  withWordmark?: boolean;
  href?: string;
  className?: string;
}

export function Logo({
  withWordmark = true,
  href = "/",
  className,
}: LogoProps) {
  const content = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded border border-line-strong font-display text-sm font-semibold leading-none tracking-tight text-text transition-colors duration-300 group-hover:border-accent group-hover:text-accent"
      >
        AD
      </span>
      {withWordmark && (
        <span className="font-display text-[0.95rem] font-medium tracking-tight text-text">
          Ankit&nbsp;Dubey
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`${site.name} — home`}
        className="inline-flex rounded outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {content}
      </Link>
    );
  }
  return content;
}
