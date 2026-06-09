/**
 * Project domain model.
 * Honesty is enforced at the type level: every feature carries a `state`
 * so the UI can never present a planned feature as shipped.
 */

export type ProjectStatus =
  | "Live"
  | "Prototype"
  | "In Development"
  | "Experimental"
  | "Planned";

export type Ownership =
  | "Personal Product"
  | "Internship Work"
  | "Academic Project"
  | "Experimental Project"
  | "Collaborative Project";

export type ProjectCategory =
  | "SaaS"
  | "AI"
  | "Web"
  | "Mobile"
  | "Games"
  | "Experimental";

/** A single, honestly-labelled feature claim within a project. */
export interface FeatureClaim {
  label: string;
  state: "Implemented" | "Prototype" | "Planned";
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  ownershipType: Ownership;
  role: string;
  technologies: string[];
  features: FeatureClaim[];
  image: string;
  screenshots: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;

  // Case-study narrative fields (optional — used by /projects/[slug])
  problem?: string;
  targetUsers?: string[];
  userRoles?: string[];
  responsibilities?: string[];
  productDecisions?: string[];
  architecture?: string;
  challenges?: string[];
  solutions?: string[];
  securityConsiderations?: string[];
  deployment?: string;
  limitations?: string[];
  lessons?: string[];
  futurePlans?: string[];
}
