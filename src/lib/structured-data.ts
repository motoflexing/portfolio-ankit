import { site } from "@/data/site";
import { socialList } from "@/data/socials";
import { absoluteUrl } from "./seo";
import type { Project } from "@/types/project";

/**
 * JSON-LD structured-data builders. Each returns a plain object to be
 * serialized into a <script type="application/ld+json"> tag.
 *
 * Honesty note: we describe what exists. No fabricated ratings, awards, or
 * employment claims are emitted.
 */

/** schema.org/Person for Ankit Dubey. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.domain,
    jobTitle: site.role,
    email: site.email ? `mailto:${site.email}` : undefined,
    address: {
      "@type": "PostalAddress",
      addressCountry: site.base,
    },
    sameAs: socialList.map((s) => s.url),
    knowsAbout: [
      "Software Development",
      "SaaS Platforms",
      "Web Development",
      "React",
      "TypeScript",
      "Firebase",
      "Mobile Development",
      "AI Integration",
    ],
  };
}

/** schema.org/WebSite for the portfolio. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.domain,
    description: site.defaultDescription,
    author: { "@type": "Person", name: site.name },
  };
}

/** schema.org/CreativeWork for a project case study. */
export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: absoluteUrl(`/projects/${project.slug}`),
    creator: { "@type": "Person", name: site.name, url: site.domain },
    keywords: project.technologies.join(", "),
    about: project.category,
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  };
}

/**
 * Serializable <script> props. Use:
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={jsonLd(schema)} />
 */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}
