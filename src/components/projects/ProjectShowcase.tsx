"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/types/project";

import "swiper/css";
import "swiper/css/effect-coverflow";

/**
 * Full-bleed coverflow showcase at the top of /projects.
 * Desktop reads as a card stack; mobile is a clean swipe. Keyboard-navigable
 * and a11y-labelled via Swiper's A11y module. Under reduced-motion the
 * coverflow effect is dropped for a plain slide (no 3D rotation).
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        modules={[EffectCoverflow, Keyboard, A11y]}
        effect={reduced ? "slide" : "coverflow"}
        grabCursor
        centeredSlides
        loop={projects.length > 2}
        slidesPerView={1.15}
        spaceBetween={20}
        keyboard={{ enabled: true }}
        a11y={{
          prevSlideMessage: "Previous project",
          nextSlideMessage: "Next project",
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 160,
          modifier: 1.8,
          slideShadows: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1.6, spaceBetween: 28 },
          1024: { slidesPerView: 2.1, spaceBetween: 32 },
        }}
        className="!overflow-visible !py-6"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.slug} className="h-auto">
            <ShowcasePanel project={project} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => swiperRef.current?.slideToLoop(i)}
              aria-label={`Go to ${p.title}`}
              aria-current={activeIndex === i ? "true" : undefined}
              className={
                "h-1.5 rounded-full transition-all " +
                (activeIndex === i
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-line-strong hover:bg-text-faint")
              }
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous project"
            className="grid h-10 w-10 place-items-center rounded border border-line-strong text-text-muted transition-colors hover:border-accent hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next project"
            className="grid h-10 w-10 place-items-center rounded border border-line-strong text-text-muted transition-colors hover:border-accent hover:text-text"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** The large showcase panel for a single project. */
function ShowcasePanel({ project }: { project: Project }) {
  const implemented = project.features.filter(
    (f) => f.state === "Implemented",
  ).length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full overflow-hidden rounded-lg border border-line bg-surface outline-none transition-colors hover:border-line-strong"
    >
      {/* Visual band — grid texture + accent core (no fake screenshot) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-bg">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(245,245,243,0.06) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute left-6 top-6">
          <StatusBadge status={project.status} />
        </div>
        <div className="absolute bottom-6 left-6">
          <p className="text-heading tracking-tight text-text">
            {project.title}
          </p>
        </div>
        <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text" />
      </div>

      <div className="p-6 md:p-8">
        <p className="text-small text-text-muted">
          {project.shortDescription}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 font-mono text-xs">
          <div>
            <dt className="text-text-faint">Ownership</dt>
            <dd className="mt-1 text-text-muted">{project.ownershipType}</dd>
          </div>
          <div>
            <dt className="text-text-faint">Category</dt>
            <dd className="mt-1 text-text-muted">{project.category}</dd>
          </div>
          <div>
            <dt className="text-text-faint">Implemented</dt>
            <dd className="mt-1 text-text-muted">
              {implemented} feature{implemented === 1 ? "" : "s"}
            </dd>
          </div>
          <div>
            <dt className="text-text-faint">Stack</dt>
            <dd className="mt-1 truncate text-text-muted">
              {project.technologies.slice(0, 2).join(", ")}
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
