import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SocialIcon } from "@/components/SocialIcons";
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
            <p className="measure mt-5 text-sm leading-relaxed text-text-muted">
              {site.identityLine}.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-faint">
              Building products under the {site.ecosystem} ecosystem.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Explore</p>
            {explore.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="w-fit text-sm text-text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.resumeUrl}
              className="flex w-fit items-center gap-1 text-sm text-text-muted transition-colors hover:text-text"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Connect</p>
            {socialList.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-2.5 text-sm text-text-muted transition-colors hover:text-text"
              >
                <SocialIcon
                  platform={s.platform}
                  className="h-4 w-4 text-text-faint transition-colors group-hover:text-accent"
                />
                {s.label}
              </a>
            ))}
            <a
              href={site.ecosystemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex w-fit items-center gap-1 text-sm text-text-muted transition-colors hover:text-text"
            >
              {site.ecosystem}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-xs text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Software Developer · Product Builder ·
            Creative Technologist.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Based in {site.base}
          </p>
        </div>
      </div>
    </footer>
  );
}
