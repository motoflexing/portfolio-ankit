import type { Experience, Education } from "@/types/experience";

/**
 * Professional experience — honest, no inflated seniority or fabricated tenure.
 * Internship work is kept distinct from personal products (see data/projects.ts,
 * where Ownership separates personal vs collaborative/internship work).
 */
export const experience: Experience[] = [
  {
    title: "Software Development Intern",
    organization: "Software development internship",
    period: "Internship",
    location: "India",
    summary:
      "Worked as part of a team on real product development under real deadlines — primarily frontend and mobile app development with Flutter and Firebase, building role-based interfaces and internal tools.",
    responsibilities: [
      "Built frontend and mobile app features using Flutter and Firebase",
      "Implemented role-based interfaces for different user types",
      "Worked on internal tools and product functionality",
      "Debugged issues and shipped fixes against real deadlines",
      "Deployed and tested features in real environments",
      "Communicated with the team and submitted daily progress reports",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
  },
];

/**
 * Education. Institution and exact dates are placeholders to be confirmed —
 * update `institution` and `period` with the real values before launch.
 */
export const education: Education[] = [
  {
    degree: "Bachelor of Computer Applications",
    field: "Computer Applications (BCA)",
    institution: "—", // TODO: fill in institution name before launch
    period: "2021 — 2024", // TODO: confirm actual timeline
    location: "India",
    note: "Foundation in programming, application development, and computer fundamentals.",
  },
];
