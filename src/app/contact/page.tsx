import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { PortalRingBackdrop } from "@/components/PortalRingBackdrop";
import { SocialIcon } from "@/components/SocialIcons";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { socials } from "@/data/socials";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Let's build something useful. Reach Ankit Dubey about junior software roles, internships, freelance projects, product collaborations, and startup conversations.",
  path: "/contact",
});

const channels = [
  {
    platform: "linkedin" as const,
    label: socials.linkedin.label,
    handle: socials.linkedin.handle,
    url: socials.linkedin.url,
  },
  {
    platform: "github" as const,
    label: socials.github.label,
    handle: socials.github.handle,
    url: socials.github.url,
  },
];

export default function ContactPage() {
  return (
    <Section index="00" label="Contact" className="pt-16 md:pt-20">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-6">Get in touch</p>
          <h1 className="font-display text-display-l font-medium tracking-tight text-text">
            Let&apos;s build something <span className="text-accent">useful</span>.
          </h1>
          <p className="text-body measure mt-5 text-text-muted">
            I&apos;m open to junior software roles, internships, freelance
            projects, product collaborations, and startup conversations. Tell me
            what you&apos;re working on and I&apos;ll get back to you.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="mb-6 hidden h-36 lg:block">
            <PortalRingBackdrop className="h-full w-full" />
          </div>

          <div className="card-hairline p-6 md:p-7">
            <p className="eyebrow mb-5">Direct channels</p>

            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-3 border-b border-line py-4 text-sm text-text transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4 text-text-faint transition-colors group-hover:text-accent" />
              {site.email}
            </a>

            {channels.map((c) => (
              <a
                key={c.platform}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 border-b border-line py-4 text-sm text-text transition-colors hover:text-accent"
              >
                <span className="flex items-center gap-3">
                  <SocialIcon
                    platform={c.platform}
                    className="h-4 w-4 text-text-faint transition-colors group-hover:text-accent"
                  />
                  {c.label}
                </span>
                <span className="font-mono text-xs text-text-faint">
                  {c.handle}
                </span>
              </a>
            ))}

            <div className="flex items-center gap-3 border-b border-line py-4 text-sm text-text-muted">
              <MapPin className="h-4 w-4 text-text-faint" />
              {site.base}
            </div>

            <div className="flex items-start gap-3 py-4">
              <span className="relative mt-1 inline-flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <p className="font-mono text-xs leading-relaxed text-text-muted">
                {site.status}
              </p>
            </div>

            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 flex items-center justify-between gap-2 rounded-md border border-line-strong px-4 py-3 text-sm text-text transition-colors hover:border-accent"
            >
              Download resume
              <ArrowUpRight className="h-4 w-4 text-text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text" />
            </a>
          </div>
        </aside>
      </div>
    </Section>
  );
}
