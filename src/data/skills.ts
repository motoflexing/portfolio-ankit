import type { SkillGroup } from "@/types/skill";

/**
 * Skills — grouped, with honest depth tags. No percentage bars, no fake levels.
 *
 * Tag meaning:
 *  - Shipped:    used in a shipped/deployed project
 *  - Prototype:  built working prototypes, not yet shipped to production
 *  - Explored:   hands-on experiments / learning projects
 *  - Learning:   currently learning / early exposure
 */
export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    index: "01",
    skills: [
      { name: "TypeScript", level: "Shipped" },
      { name: "JavaScript", level: "Shipped" },
      { name: "Python", level: "Explored", note: "AI/ML exploration" },
      { name: "Dart", level: "Prototype", note: "Flutter app work" },
      { name: "C#", level: "Explored", note: "Unity exploration" },
      { name: "HTML", level: "Shipped" },
      { name: "CSS", level: "Shipped" },
    ],
  },
  {
    name: "Frontend",
    index: "02",
    skills: [
      { name: "React", level: "Shipped" },
      { name: "Next.js", level: "Shipped" },
      { name: "Tailwind CSS", level: "Shipped" },
      { name: "shadcn/ui", level: "Shipped" },
      { name: "Responsive UI design", level: "Shipped" },
    ],
  },
  {
    name: "Backend & App Logic",
    index: "03",
    skills: [
      { name: "Next.js API / Route Handlers", level: "Shipped" },
      { name: "Authentication & RBAC", level: "Shipped" },
      { name: "Multi-tenant architecture", level: "Shipped", note: "OfficeOS" },
      { name: "REST integration", level: "Shipped" },
      { name: "Application architecture", level: "Shipped" },
    ],
  },
  {
    name: "Database & Cloud",
    index: "04",
    skills: [
      { name: "Firebase Authentication", level: "Shipped" },
      { name: "Cloud Firestore", level: "Shipped" },
      { name: "Firebase Security Rules", level: "Shipped" },
      { name: "Vercel", level: "Shipped" },
    ],
  },
  {
    name: "AI & ML",
    index: "05",
    skills: [
      { name: "AI integration in products", level: "Prototype" },
      { name: "Python AI/ML fundamentals", level: "Explored" },
      { name: "Prompt & assistant design", level: "Explored" },
    ],
  },
  {
    name: "Mobile",
    index: "06",
    skills: [
      { name: "Flutter", level: "Prototype" },
      { name: "Firebase (mobile)", level: "Prototype" },
      { name: "Role-based mobile UIs", level: "Prototype" },
    ],
  },
  {
    name: "Game Dev",
    index: "07",
    skills: [
      { name: "Unity", level: "Explored" },
      { name: "C# (game logic)", level: "Explored" },
      { name: "Web game logic & scoring", level: "Shipped", note: "MotoFlexing Games" },
    ],
  },
  {
    name: "Motion, Interaction & 3D",
    index: "08",
    skills: [
      { name: "Framer Motion", level: "Shipped" },
      { name: "GSAP / ScrollTrigger", level: "Prototype" },
      { name: "Three.js / React Three Fiber", level: "Explored" },
      { name: "Embla / Swiper carousels", level: "Shipped" },
    ],
  },
  {
    name: "Tools & Platforms",
    index: "09",
    skills: [
      { name: "Git & GitHub", level: "Shipped" },
      { name: "Vercel deployment", level: "Shipped" },
      { name: "Firebase console", level: "Shipped" },
      { name: "VS Code", level: "Shipped" },
      { name: "Figma", level: "Explored" },
    ],
  },
];

/** Ordered list of the honesty tags, for legends / filters. */
export const skillLevels = ["Shipped", "Prototype", "Explored", "Learning"] as const;
