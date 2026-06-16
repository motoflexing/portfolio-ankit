"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { StatusBadge } from "@/components/StatusBadge";
import { Interactive3DCard } from "@/components/Interactive3DCard";
import type { Project } from "@/types/project";

function SelectedWorkCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="h-full"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Interactive3DCard
        href={`/projects/${project.slug}`}
        dataCursor="view"
        className="h-full"
        contentClassName="flex h-full flex-col"
        surfaceClassName="p-6 md:p-7"
        glowSize={260}
        glowIntensity={0.2}
        tilt={8}
        lift={6}
      >
        <div className="flex items-start justify-between gap-4">
          <StatusBadge status={project.status} />
          <span className="section-index tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-7 space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-heading text-text">{project.title}</h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-text-faint transition-all duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent" />
          </div>
          <p className="text-body line-clamp-3 text-text-muted">
            {project.shortDescription}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/3 px-2.5 py-1 font-mono text-[0.625rem] text-text-faint"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Interactive3DCard>
    </motion.div>
  );
}

export function SelectedWorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid auto-rows-fr gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <SelectedWorkCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
