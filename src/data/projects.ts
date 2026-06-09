import type { Project, ProjectCategory } from "@/types/project";

/**
 * Project catalogue — the single source of truth for all project content.
 *
 * Honesty rules applied throughout:
 *  - Feature `state` reflects reality (Implemented / Prototype / Planned).
 *  - Ownership is accurate; collaborative/internship work is NOT claimed as
 *    sole personal ownership.
 *  - No invented metrics, users, or revenue. Nothing unfinished is shown as
 *    complete.
 *
 * Image paths point at local optimized assets under /public/projects/<slug>/.
 * These are placeholders until real screenshots are added in the assets pass.
 */
export const projects: Project[] = [
  // ----------------------------------------------------------------
  // 1. OfficeOS
  // ----------------------------------------------------------------
  {
    slug: "officeos",
    title: "OfficeOS",
    shortDescription:
      "A multi-role employee management and internal operations SaaS for growing teams.",
    fullDescription:
      "OfficeOS is an independent SaaS product I designed and built end to end: a multi-tenant internal operations platform that brings employee management, attendance, leave, daily reporting, announcements, and feedback into one role-aware workspace. It was validated through a real deployment/demo environment. I focus here on the product and engineering decisions, not on any internal company data.",
    category: "SaaS",
    status: "Live",
    ownershipType: "Personal Product",
    role: "Sole developer & product builder — design, architecture, implementation, deployment.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Authentication",
      "Cloud Firestore",
      "Vercel",
    ],
    features: [
      { label: "Admin / HR / Employee role-based access (RBAC)", state: "Implemented" },
      { label: "Employee management", state: "Implemented" },
      { label: "Attendance tracking", state: "Implemented" },
      { label: "Leave request & approval workflows", state: "Implemented" },
      { label: "Daily reports", state: "Implemented" },
      { label: "Company-wide announcements", state: "Implemented" },
      { label: "Company settings", state: "Implemented" },
      { label: "Feedback system", state: "Implemented" },
      { label: "Developer panel", state: "Implemented" },
      { label: "Multi-tenant structure", state: "Implemented" },
      { label: "AI assistant", state: "Prototype" },
    ],
    image: "/projects/officeos/cover.png",
    screenshots: [
      "/projects/officeos/dashboard.png",
      "/projects/officeos/attendance.png",
      "/projects/officeos/leave.png",
      "/projects/officeos/reports.png",
    ],
    liveUrl: "https://officeos.motoflexing.com",
    featured: true,
    problem:
      "Small and growing teams often run internal operations across scattered spreadsheets, chats, and email. There's no single place that respects who can see and do what — so attendance, leave, reporting, and announcements stay fragmented and hard to audit.",
    targetUsers: [
      "Small-to-mid-sized teams that have outgrown spreadsheets",
      "Founders and operators who need a single internal source of truth",
      "HR and admins managing day-to-day people operations",
    ],
    userRoles: ["Admin", "HR", "Employee", "Developer (internal panel)"],
    responsibilities: [
      "Designed the multi-tenant data model and role-based access rules",
      "Built every role's interface and the shared operations modules",
      "Implemented authentication, Firestore data layer, and security rules",
      "Deployed and maintained the product on Vercel",
    ],
    productDecisions: [
      "Made roles a first-class concept so every screen is access-aware by default",
      "Chose Firestore for fast iteration on an evolving operations schema",
      "Kept the AI assistant explicitly labelled as a prototype rather than overselling it",
    ],
    architecture:
      "Next.js App Router frontend on Vercel; Firebase Authentication for identity; Cloud Firestore as the multi-tenant datastore with role-scoped security rules. Tenancy is enforced both in the data model and in the access layer.",
    challenges: [
      "Designing role-based access that stays correct as features grow",
      "Modelling multi-tenant data without leaking one tenant's data into another",
      "Keeping a broad feature set coherent under one consistent interface",
    ],
    solutions: [
      "Centralised role checks and route-level guards instead of ad-hoc per-page logic",
      "Tenant-scoped Firestore collections plus security rules as a second line of defence",
      "A shared component and layout system so every module feels like one product",
    ],
    securityConsiderations: [
      "Role-based access enforced in both UI and Firestore security rules",
      "Tenant isolation in the data model",
      "No sensitive internal company data is exposed in this portfolio",
    ],
    deployment: "Continuous deployment to Vercel from the project repository.",
    limitations: [
      "The AI assistant is an early prototype, not a finished feature",
      "Some advanced reporting and analytics are still on the roadmap",
    ],
    lessons: [
      "Designing for roles from day one is far cheaper than retrofitting access control",
      "A consistent shared UI system keeps a large feature set from feeling like many apps",
    ],
    futurePlans: [
      "Deepen analytics and reporting",
      "Mature the AI assistant from prototype toward a reliable feature",
      "Expand company-settings and customisation per tenant",
    ],
  },

  // ----------------------------------------------------------------
  // 2. AI Resume Screening Platform
  // ----------------------------------------------------------------
  {
    slug: "ai-resume-screening",
    title: "AI Resume Screening Platform",
    shortDescription:
      "An applicant tracking and candidate evaluation platform to streamline recruitment workflows.",
    fullDescription:
      "An in-development applicant tracking system that helps recruiters manage job openings, candidates, and interview pipelines in one place — with AI-assisted resume analysis layered in as it matures. The core ATS workflows are being built first; AI capabilities are added carefully and only marked done once they actually work.",
    category: "AI",
    status: "In Development",
    ownershipType: "Personal Product",
    role: "Sole developer & product builder.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Cloud Firestore",
    ],
    features: [
      { label: "Job opening management", state: "Implemented" },
      { label: "Candidate profiles", state: "Implemented" },
      { label: "Resume upload", state: "Implemented" },
      { label: "Candidate filtering", state: "Prototype" },
      { label: "Candidate status pipelines", state: "Prototype" },
      { label: "Interview tracking", state: "Prototype" },
      { label: "Dashboard analytics", state: "Prototype" },
      { label: "AI-assisted resume analysis", state: "Planned" },
      { label: "Job-to-candidate matching", state: "Planned" },
      { label: "Recruiter workflow automation", state: "Planned" },
    ],
    image: "/projects/ai-resume-screening/cover.png",
    screenshots: [
      "/projects/ai-resume-screening/jobs.png",
      "/projects/ai-resume-screening/candidates.png",
      "/projects/ai-resume-screening/pipeline.png",
    ],
    featured: true,
    problem:
      "Reviewing large volumes of resumes by hand is slow and inconsistent. Recruiters need a structured way to track candidates through a pipeline, with optional AI assistance to surface relevant profiles faster.",
    targetUsers: [
      "Recruiters and hiring teams",
      "Small companies running their own hiring",
    ],
    userRoles: ["Recruiter"],
    responsibilities: [
      "Designing the ATS data model and recruiter workflows",
      "Building job, candidate, and pipeline management",
      "Planning the AI-assisted analysis layer in an honest, incremental way",
    ],
    productDecisions: [
      "Build reliable ATS fundamentals before any AI features",
      "Treat AI as an assistive layer, not a black-box gatekeeper",
    ],
    architecture:
      "Next.js App Router frontend with a Firebase/Firestore backend for jobs, candidates, and pipeline state. The AI-analysis layer is designed as a separate, optional service so the ATS works fully without it.",
    challenges: [
      "Keeping AI claims honest while the analysis layer is still being built",
      "Designing pipelines flexible enough for different hiring processes",
    ],
    solutions: [
      "Explicit per-feature states so nothing AI-related is shown as done prematurely",
      "A configurable status pipeline rather than a fixed flow",
    ],
    limitations: [
      "AI-assisted analysis and matching are planned, not yet implemented",
      "Filtering, pipelines, and analytics are at prototype stage",
    ],
    lessons: [
      "Shipping the non-AI core first makes the AI layer easier to evaluate honestly",
    ],
    futurePlans: [
      "Implement AI-assisted resume analysis",
      "Add job-to-candidate matching",
      "Automate recruiter workflows",
    ],
  },

  // ----------------------------------------------------------------
  // 3. MotoFlexing Games
  // ----------------------------------------------------------------
  {
    slug: "motoflexing-games",
    title: "MotoFlexing Games",
    shortDescription:
      "A browser-based gaming platform with accounts, profiles, scoring, and leaderboards.",
    fullDescription:
      "A web gaming platform built around accounts and competition: players sign up, claim a unique username, play, and see their scores on cloud-backed leaderboards. The first game, Memory Arena, ships with difficulty levels and timer-based scoring. The platform is architected so more games can be added over time.",
    category: "Games",
    status: "In Development",
    ownershipType: "Personal Product",
    role: "Sole developer & product builder.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Authentication",
      "Cloud Firestore",
      "Vercel",
    ],
    features: [
      { label: "Authentication & player accounts", state: "Implemented" },
      { label: "Unique usernames", state: "Implemented" },
      { label: "Player profiles", state: "Implemented" },
      { label: "Memory Arena game (difficulty levels)", state: "Implemented" },
      { label: "Timer & scoring logic", state: "Implemented" },
      { label: "Cloud score storage", state: "Implemented" },
      { label: "Leaderboards", state: "Implemented" },
      { label: "Responsive game UI", state: "Implemented" },
      { label: "Multi-game architecture", state: "Prototype" },
    ],
    image: "/projects/motoflexing-games/cover.png",
    screenshots: [
      "/projects/motoflexing-games/memory-arena.png",
      "/projects/motoflexing-games/leaderboard.png",
      "/projects/motoflexing-games/profile.png",
    ],
    // liveUrl intentionally omitted until games.motoflexing.com is deployed —
    // avoids shipping a broken link for an in-development product.
    featured: true,
    problem:
      "Most simple browser games are one-off and stateless. I wanted a platform where play is persistent: accounts, profiles, saved scores, and leaderboards that make casual games feel competitive.",
    targetUsers: [
      "Casual players who enjoy quick, competitive browser games",
    ],
    userRoles: ["Player"],
    responsibilities: [
      "Built the platform: auth, profiles, unique usernames, and leaderboards",
      "Implemented the Memory Arena game with difficulty and scoring logic",
      "Designed a multi-game architecture for future titles",
    ],
    productDecisions: [
      "Make accounts and leaderboards core so games gain replay value",
      "Build a shared platform layer so new games plug in cleanly",
    ],
    architecture:
      "Next.js frontend on Vercel; Firebase Authentication for player identity; Firestore for profiles, usernames, and score storage powering the leaderboards. Games are structured as modules over a shared platform layer.",
    challenges: [
      "Guaranteeing username uniqueness reliably",
      "Storing and ranking scores so leaderboards stay fast and fair",
    ],
    solutions: [
      "Uniqueness enforced at the data layer",
      "Score documents structured for efficient leaderboard queries",
    ],
    limitations: [
      "Currently one game (Memory Arena); the multi-game system is still maturing",
    ],
    lessons: [
      "A shared platform layer makes the second game far cheaper than the first",
    ],
    futurePlans: [
      "Add more games on the shared architecture",
      "Expand profiles and competitive features",
    ],
  },

  // ----------------------------------------------------------------
  // 4. Nightlife Discovery Platform (collaborative / internship)
  // ----------------------------------------------------------------
  {
    slug: "nightlife-platform",
    title: "Nightlife Discovery Platform",
    shortDescription:
      "A mobile-first event discovery and management app for users, promoters, venues, and admins.",
    fullDescription:
      "A mobile-first platform for discovering and managing nightlife events, with distinct experiences for users, promoters, venues, and admins. This was collaborative / internship work — I contributed to the Flutter + Firebase app and its role-based interfaces. I describe my own contribution honestly and do not claim sole ownership of the product.",
    category: "Mobile",
    status: "In Development",
    ownershipType: "Collaborative Project",
    role: "Software development intern — contributed to Flutter app development, role-based interfaces, and feature work as part of a team.",
    technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
    features: [
      { label: "Role-based interfaces (user / promoter / venue / admin)", state: "Implemented" },
      { label: "Event discovery", state: "Implemented" },
      { label: "Search & filters", state: "Implemented" },
      { label: "RSVP flows", state: "Prototype" },
      { label: "Event creation", state: "Prototype" },
      { label: "Promoter management", state: "Prototype" },
      { label: "Venue administration", state: "Prototype" },
      { label: "Location-based discovery", state: "Prototype" },
    ],
    image: "/projects/nightlife-platform/cover.png",
    screenshots: [
      "/projects/nightlife-platform/discovery.png",
      "/projects/nightlife-platform/event.png",
    ],
    featured: false,
    problem:
      "Discovering nightlife events and managing them from the promoter and venue side usually lives in separate, disconnected tools. The goal was one mobile-first platform serving every role involved.",
    targetUsers: [
      "People discovering nightlife events",
      "Promoters running events",
      "Venues hosting events",
    ],
    userRoles: ["User", "Promoter", "Venue", "Admin"],
    responsibilities: [
      "Contributed to building Flutter screens and role-based interfaces",
      "Worked on event discovery, search/filter, and related features within the team",
      "Participated in debugging, deadlines, and daily reporting as an intern",
    ],
    productDecisions: [
      "(Team decisions) Mobile-first, role-aware experiences for each participant type",
    ],
    architecture:
      "Flutter mobile app backed by Firebase/Firestore, with role-based navigation and data access for users, promoters, venues, and admins.",
    challenges: [
      "Supporting four distinct roles in a single mobile app",
      "Coordinating feature work as part of a team on real deadlines",
    ],
    solutions: [
      "Role-driven navigation and screens",
      "Clear team communication and daily progress reporting",
    ],
    limitations: [
      "Several flows are at prototype stage",
      "This is collaborative work — credit is shared with the team",
    ],
    lessons: [
      "Building inside a team with real deadlines is a different discipline from solo product work",
      "Honest scoping of personal contribution matters as much as the contribution itself",
    ],
    futurePlans: [
      "(Team roadmap) Mature RSVP, event creation, and management flows",
    ],
  },

  // ----------------------------------------------------------------
  // 5. MotoFlexing (personal brand / ecosystem website)
  // ----------------------------------------------------------------
  {
    slug: "motoflexing",
    title: "MotoFlexing",
    shortDescription:
      "The product ecosystem and build-in-public platform that ties the MotoFlexing apps together.",
    fullDescription:
      "MotoFlexing is the ecosystem brand and build-in-public home for the products I create — a premium dark interface showcasing the apps, linking to live deployments, and presenting the ecosystem as a whole. Note the distinction: MotoFlexing represents the wider ecosystem, while this portfolio represents Ankit personally.",
    category: "Web",
    status: "Live",
    ownershipType: "Personal Product",
    role: "Sole developer, designer & maintainer.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    features: [
      { label: "Product showcase", state: "Implemented" },
      { label: "Live app links", state: "Implemented" },
      { label: "Premium dark interface", state: "Implemented" },
      { label: "Motion design", state: "Implemented" },
      { label: "SEO fundamentals", state: "Implemented" },
      { label: "Ecosystem architecture", state: "Implemented" },
    ],
    image: "/projects/motoflexing/cover.png",
    screenshots: [
      "/projects/motoflexing/home.png",
      "/projects/motoflexing/products.png",
    ],
    liveUrl: "https://motoflexing.com",
    featured: true,
    problem:
      "Several independent products needed one coherent home — a place that presents them as an ecosystem, links to live apps, and supports building in public.",
    targetUsers: [
      "Visitors discovering the MotoFlexing products",
      "Anyone following the build-in-public journey",
    ],
    userRoles: ["Visitor"],
    responsibilities: [
      "Designed and built the ecosystem site end to end",
      "Implemented the premium dark interface and motion design",
      "Set up deployment and SEO fundamentals",
    ],
    productDecisions: [
      "Position MotoFlexing as an ecosystem, not a single app",
      "Keep the personal portfolio (this site) separate from the ecosystem brand",
    ],
    architecture:
      "Next.js + Tailwind on Vercel, with Framer Motion for the motion layer and standard SEO fundamentals.",
    challenges: [
      "Presenting multiple products coherently without diluting any of them",
    ],
    solutions: [
      "A consistent ecosystem design language and clear links to each live app",
    ],
    limitations: [
      "Acts as a showcase/hub rather than a single feature-rich application",
    ],
    lessons: [
      "An ecosystem brand benefits from being distinct from the individual behind it",
    ],
    futurePlans: [
      "Continue evolving the ecosystem presentation as new products launch",
    ],
  },

  // ----------------------------------------------------------------
  // 6. MotoFlexing AI Editor (experimental / planned)
  // ----------------------------------------------------------------
  {
    slug: "ai-editor",
    title: "MotoFlexing AI Editor",
    shortDescription:
      "An experimental AI-assisted editor for turning raw long-form footage into polished and short-form video.",
    fullDescription:
      "An experimental, early-stage project exploring AI-assisted video editing: turning raw vlog, gym, coding, and long-form footage into polished cuts and short-form clips. The capabilities below are intended directions, not finished features — they are marked Planned until actually built, in keeping with honest scoping.",
    category: "AI",
    status: "Planned",
    ownershipType: "Experimental Project",
    role: "Solo experimental developer.",
    technologies: ["Concept / R&D", "AI tooling (under exploration)"],
    features: [
      { label: "Silence detection & removal", state: "Planned" },
      { label: "Highlight detection", state: "Planned" },
      { label: "Automated cuts", state: "Planned" },
      { label: "Caption generation", state: "Planned" },
      { label: "Shorts extraction", state: "Planned" },
      { label: "Music suggestions", state: "Planned" },
      { label: "Thumbnail concepts", state: "Planned" },
      { label: "Title generation", state: "Planned" },
    ],
    image: "/projects/ai-editor/cover.png",
    screenshots: [],
    featured: false,
    problem:
      "Editing long-form footage into polished videos and short clips is slow and repetitive. This experiment explores how much of that pipeline AI could reasonably assist with.",
    targetUsers: [
      "Creators producing long-form and short-form video",
    ],
    userRoles: ["Creator"],
    responsibilities: [
      "Defining the concept and the realistic scope of AI assistance",
    ],
    productDecisions: [
      "Treat every capability as Planned until it genuinely works",
    ],
    architecture:
      "Concept stage. Architecture will be defined as the experiment progresses; no capability is implemented yet.",
    challenges: [
      "AI video editing is genuinely hard; honest scoping is essential",
    ],
    solutions: [
      "Mark everything Planned and avoid presenting concepts as a working product",
    ],
    limitations: [
      "Nothing is implemented yet — this is an experimental concept",
    ],
    lessons: [
      "Labelling an idea as an experiment is more credible than overselling it",
    ],
    futurePlans: [
      "Prototype individual capabilities one at a time",
      "Validate which parts of the editing pipeline AI can realistically assist with",
    ],
  },
];

// ----------------------------------------------------------------
// Derived helpers (used across /projects, /, and case studies)
// ----------------------------------------------------------------

/** Categories present in the data, for the filter bar (always lead with "All"). */
export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/** Curated home rail — featured projects only, in catalogue order. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}
