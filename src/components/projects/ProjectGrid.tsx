"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types/project";

type Filter = "All" | ProjectCategory;

/**
 * Filterable project grid. The filter bar is generated from the categories
 * present in the data, and filtering animates with a layout transition
 * (instant under reduced-motion). Keyboard-accessible tab-style filter.
 */
export function ProjectGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: Filter[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects],
  );

  return (
    <div>
      {/* Filter bar */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => {
          const active = filter === cat;
          const count =
            cat === "All"
              ? projects.length
              : projects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(cat)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors",
                active
                  ? "border-accent bg-accent/10 text-text"
                  : "border-line-strong text-text-muted hover:border-text-faint hover:text-text",
              )}
            >
              {cat}
              <span
                className={cn(
                  "text-[0.65rem]",
                  active ? "text-accent" : "text-text-faint",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout={!reduced}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-12 text-center font-mono text-sm text-text-faint">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
