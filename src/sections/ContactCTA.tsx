import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ActionButton } from "@/components/ActionButton";
import { PortalRingBackdrop } from "@/components/PortalRingBackdrop";
import { site } from "@/data/site";

/**
 * Closing contact CTA on the home page. Confident, not desperate — leads into
 * the full /contact page. Carries the availability status from data/site.ts.
 * A softly rotating portal ring sits beside it as the final 3D accent.
 */
export function ContactCTA() {
  return (
    <section
      className="container-rhythm py-24 md:py-32"
      aria-label="Get in touch"
    >
      <Reveal>
        <div className="group relative overflow-hidden rounded-lg border border-line bg-surface p-10 md:p-16">
          {/* Portal ring backdrop — decorative, low opacity */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          >
            <PortalRingBackdrop className="absolute right-[-3%] top-1/2 h-[126%] w-[52%] -translate-y-1/2" />
          </div>

          {/* faint accent corner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[18%] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/8 opacity-70 blur-[100px] transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="relative max-w-2xl">
            <p className="eyebrow mb-5">Open to work & collaboration</p>
            <h2 className="text-display font-medium leading-[1.1] text-text">
              Let&apos;s build something{" "}
              <span className="text-accent">useful</span>.
            </h2>
            <p className="text-body measure mt-5 text-text-muted">
              {site.status}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ActionButton href="/contact" variant="primary" magnetic>
                Get in touch
                <ArrowRight />
              </ActionButton>
              <ActionButton href={`mailto:${site.email}`} variant="outline">
                {site.email}
              </ActionButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
