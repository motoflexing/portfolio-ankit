"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { ActionButton } from "@/components/ActionButton";
import { navLinks } from "@/data/nav";
import { socials } from "@/data/socials";

/**
 * Sticky top navigation with active-state awareness and an accessible
 * mobile drawer (Escape to close, body scroll lock, focus moved into the
 * panel, full keyboard support, aria-expanded/controls wired up).
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the drawer whenever the route changes (covers browser back/forward,
  // not just in-app clicks). This is a legitimate URL→UI synchronization; the
  // updater is a no-op when already closed, so there is no cascading render.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen((isOpen) => (isOpen ? false : isOpen));
  }, [pathname]);

  // Condense the bar after a little scroll. The initial read is deferred to
  // the next frame so we don't setState synchronously inside the effect body.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll + Escape-to-close while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-line bg-bg/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <nav
          className="container-rhythm flex h-16 items-center justify-between"
          aria-label="Primary"
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative font-mono text-xs uppercase tracking-widest transition-colors",
                      active
                        ? "text-text"
                        : "text-text-muted hover:text-text",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <ActionButton href={socials.github.url} variant="outline" size="sm">
              GitHub
              <ArrowUpRight />
            </ActionButton>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="grid h-10 w-10 place-items-center rounded border border-line-strong text-text md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />
            <motion.div
              key="panel"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col border-l border-line bg-surface md:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-6">
                <Logo withWordmark={false} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  autoFocus
                  className="grid h-10 w-10 place-items-center rounded border border-line-strong text-text"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex flex-1 flex-col gap-1 px-4 py-6">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-baseline justify-between rounded-md px-3 py-4 transition-colors",
                          active
                            ? "bg-surface-2 text-text"
                            : "text-text-muted hover:bg-surface-2 hover:text-text",
                        )}
                      >
                        <span className="font-display text-2xl tracking-tight">
                          {link.label}
                        </span>
                        <span className="section-index">{link.index}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-line p-4">
                <ActionButton
                  href={socials.github.url}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  View GitHub
                  <ArrowUpRight />
                </ActionButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
