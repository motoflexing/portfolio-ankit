import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SocialIcon } from "@/components/SocialIcons";
import { DraggableMonogram } from "@/components/DraggableMonogram";
import { site } from "@/data/site";
import { socialList } from "@/data/socials";

/**
 * Editorial footer — not a corporate agency block.
 * Identity + ecosystem tagline, grouped links, social row, dynamic year.
 * Server Component (static content + current year computed at render).
 */
const explore = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Journey", href: "/journey" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="container-rhythm py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <Logo />
            <p className="text-mono mt-5 normal-case text-text-faint">
              {site.identityLine}.
            </p>
            <p className="text-small mt-3 max-w-xs text-text-faint">
              Building products under the {site.ecosystem} ecosystem.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="text-mono mb-1 text-text-faint">Explore</p>
            {explore.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-small w-fit text-text-muted no-underline transition-colors hover:text-text hover:underline"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.resumeUrl}
              className="text-small flex w-fit items-center gap-1 text-text-muted no-underline transition-colors hover:text-text hover:underline"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <p className="text-mono mb-1 text-text-faint">Connect</p>
            {socialList.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-small flex w-fit items-center gap-2.5 text-text-muted no-underline transition-colors hover:text-text"
              >
                <SocialIcon
                  platform={s.platform}
                  className="h-4 w-4 text-text-faint transition-colors group-hover:text-accent"
                />
                <span className="group-hover:underline">{s.label}</span>
              </a>
            ))}
            <a
              href={site.ecosystemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small mt-1 flex w-fit items-center gap-1 text-text-muted no-underline transition-colors hover:text-text hover:underline"
            >
              {site.ecosystem}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-mono normal-case text-text-faint" style={{ fontSize: "0.625rem" }}>
            © {year} {site.name}. Software Developer · Product Builder ·
            Creative Technologist.
          </p>
          <p className="text-mono flex items-center gap-2 normal-case text-text-faint" style={{ fontSize: "0.625rem" }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Based in {site.base}
          </p>
        </div>

        {/* Easter egg: a throwable "AD" token (interact.js, desktop + motion
            only). Decorative — the real identity mark is the Logo above. */}
        <div className="mt-8 hidden lg:block">
          <DraggableMonogram />
        </div>
      </div>
    </footer>
  );
}
