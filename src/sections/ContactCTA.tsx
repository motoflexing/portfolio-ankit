import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ActionButton } from "@/components/ActionButton";
import { site } from "@/data/site";

/**
 * Closing contact CTA on the home page. Confident, not desperate — leads into
 * the full /contact page. Carries the availability status from data/site.ts.
 */
export function ContactCTA() {
  return (
    <section
      className="container-rhythm py-24 md:py-32"
      aria-label="Get in touch"
    >
      <Reveal>
        <div className="card-hairline relative overflow-hidden p-10 md:p-16">
          {/* faint accent corner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative max-w-2xl">
            <p className="eyebrow mb-5">Open to work & collaboration</p>
            <h2 className="font-display text-display-l font-semibold leading-[1.02] tracking-tight text-text">
              Let&apos;s build something{" "}
              <span className="text-accent">useful</span>.
            </h2>
            <p className="measure mt-6 text-base leading-relaxed text-text-muted md:text-lg">
              {site.status}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ActionButton href="/contact" variant="primary" size="lg" magnetic>
                Get in touch
                <ArrowRight />
              </ActionButton>
              <ActionButton
                href={`mailto:${site.email}`}
                variant="outline"
                size="lg"
              >
                {site.email}
              </ActionButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
