"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/types/project";

/**
 * Swipeable selected-projects rail (Embla) for the home page. Natural
 * touch/drag with momentum on mobile; arrow + keyboard controls on desktop.
 * Cards are the shared <ProjectCard>, so design stays consistent with the
 * /projects grid.
 */
export function ProjectRail({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // Defer the initial sync out of the effect body (avoids a synchronous
    // setState cascade); subsequent updates come from Embla's events.
    const raf = requestAnimationFrame(() => onSelect(emblaApi));
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div
        className="overflow-hidden"
        ref={emblaRef}
        role="region"
        aria-label="Selected projects, swipe to browse"
      >
        {/* Perspective on the track so each card's hover tilt reads as depth */}
        <div className="-ml-5 flex [perspective:1200px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              className="min-w-0 shrink-0 grow-0 basis-[85%] pl-5 sm:basis-[55%] lg:basis-[42%]"
              initial={
                reduced
                  ? false
                  : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
              }
              whileInView={
                reduced ? undefined : { clipPath: "inset(0 0% 0 0)", opacity: 1 }
              }
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCard project={project} className="h-full" tilt />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center gap-2">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous projects"
          className="grid h-10 w-10 place-items-center rounded border border-line-strong text-text-muted transition-colors hover:border-accent hover:text-text disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line-strong disabled:hover:text-text-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next projects"
          className="grid h-10 w-10 place-items-center rounded border border-line-strong text-text-muted transition-colors hover:border-accent hover:text-text disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line-strong disabled:hover:text-text-muted"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="ml-2 font-mono text-xs text-text-faint">
          Drag or swipe
        </span>
      </div>
    </div>
  );
}
