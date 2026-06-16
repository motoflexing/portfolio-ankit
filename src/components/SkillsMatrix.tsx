"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  SkillLevelDot,
  SkillLevelLegend,
} from "@/components/SkillLevelTag";
import { skillGroups, skillLevels } from "@/data/skills";
import type { SkillLevel } from "@/types/skill";

/**
 * Full technical matrix for the About page. Groups are expandable (all open by
 * default) and the whole set is filterable by honesty level. No percentage
 * bars — depth is shown with level dots only.
 */
type LevelFilter = "All" | SkillLevel;

export function SkillsMatrix() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<LevelFilter>("All");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggle = (name: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const filterTabs: LevelFilter[] = ["All", ...skillLevels];

  const groups = useMemo(
    () =>
      skillGroups
        .map((g) => ({
          ...g,
          skills:
            filter === "All"
              ? g.skills
              : g.skills.filter((s) => s.level === filter),
        }))
        .filter((g) => g.skills.length > 0),
    [filter],
  );

  return (
    <div>
      {/* Controls: level filter + legend */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Filter skills by level" className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => {
            const active = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
                  active
                    ? "border-accent bg-accent/12 text-text shadow-[0_0_20px_rgba(229,72,77,0.12)]"
                    : "border-white/10 bg-white/[0.02] text-text-muted hover:border-text-faint hover:text-text",
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>
        <SkillLevelLegend />
      </div>

      {/* Groups */}
      <div className="mt-10 grid gap-3">
        {groups.map((group) => {
          const isCollapsed = collapsed.has(group.name);
          return (
            <div
              key={group.name}
              className="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,28,0.78),rgba(11,11,13,0.9))]"
            >
              <button
                type="button"
                onClick={() => toggle(group.name)}
                aria-expanded={!isCollapsed}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none transition-colors hover:bg-white/[0.03]"
              >
                <span className="flex items-baseline gap-4">
                  <span className="section-index">{group.index}</span>
                  <span className="text-subheading text-text">
                    {group.name}
                  </span>
                  <span className="text-mono text-text-faint">
                    {group.skills.length}
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-text-muted transition-transform",
                    isCollapsed ? "" : "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="flex flex-wrap gap-2 px-6 pb-6">
                      {group.skills.map((skill) => (
                        <li
                          key={skill.name}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-text-muted"
                          title={skill.note}
                        >
                          <SkillLevelDot level={skill.level} />
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
