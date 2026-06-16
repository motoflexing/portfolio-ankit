"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { ActionButton } from "@/components/ActionButton";
import { HeroSceneOverlay } from "@/components/three/HeroSceneOverlay";
import type { HeroInteractionState } from "@/components/three/HeroScene";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hero } from "@/data/home";
import { site } from "@/data/site";

export function Hero({ visual }: { visual?: React.ReactNode }) {
  const reduced = useReducedMotion();
  const interactionRef = useRef<HeroInteractionState>({
    x: 0,
    y: 0,
    active: false,
  });

  const wordVariants: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: {
        delay: 0.25 + i * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden"
      aria-label="Introduction"
    >
      <Image
        src="/images/plain-black-hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,1,2,0.97)_0%,rgba(4,4,5,0.9)_30%,rgba(8,7,8,0.44)_56%,rgba(8,8,10,0.16)_78%,rgba(8,8,10,0.04)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(229,72,77,0.22),transparent_18%),radial-gradient(circle_at_64%_76%,rgba(229,72,77,0.1),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.52))]" />

      <div className="container-rhythm relative grid min-h-[100svh] items-end gap-10 pt-28 pb-14 lg:grid-cols-[45fr_55fr] lg:items-center lg:gap-8 lg:pt-24 lg:pb-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-(--grid-margin) border-r border-white/8 lg:block">
          <span className="section-index absolute left-4 top-32">00 / Hero</span>
        </div>

        <div className="relative z-[2] max-w-xl lg:pl-(--grid-margin)">
          <motion.p
            className="text-mono mb-5 text-text-faint"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {hero.eyebrowAlt}
          </motion.p>

          <h1 className="text-display flex flex-col gap-1 text-text">
            {hero.headingWords.map((word, i) => (
              <span key={word} className="block overflow-hidden py-[0.02em]">
                <motion.span
                  className="inline-block"
                  custom={i}
                  variants={reduced ? undefined : wordVariants}
                  initial={reduced ? false : "hidden"}
                  animate={reduced ? undefined : "show"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="text-body mt-5 max-w-lg text-text-muted"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{
              delay: 0.75,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.supporting}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ActionButton href="/projects" variant="primary" magnetic>
              {hero.ctaPrimary}
              <ArrowRight />
            </ActionButton>
            <ActionButton href="/contact" variant="ghost">
              {hero.ctaSecondary}
            </ActionButton>
          </motion.div>

          <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-6">
            <span className="relative mt-1 inline-flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <p className="text-small max-w-md text-text-muted">{site.status}</p>
          </div>

          <motion.div
            className="mt-8 text-text-faint"
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            aria-hidden="true"
          >
            <ChevronDown
              className={`h-4 w-4${reduced ? "" : " motion-safe:animate-bounce"}`}
            />
          </motion.div>
        </div>

        <div
          className="relative z-[1] h-[38vh] min-h-72 w-full bg-transparent sm:h-[46vh] lg:h-[78vh]"
          onPointerEnter={() => {
            interactionRef.current.active = true;
          }}
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const nextX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const nextY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
            interactionRef.current.x = Math.max(-1, Math.min(1, nextX));
            interactionRef.current.y = Math.max(-1, Math.min(1, -nextY));
            interactionRef.current.active = true;
          }}
          onPointerLeave={() => {
            interactionRef.current.x = 0;
            interactionRef.current.y = 0;
            interactionRef.current.active = false;
          }}
        >
          <div className="absolute inset-y-[-4%] left-[0%] right-[0%] bg-transparent sm:left-[4%] sm:right-[0%] lg:inset-y-[-2%] lg:left-[0%] lg:right-[2%]">
            {visual ?? <HeroSceneOverlay interactionRef={interactionRef} />}
          </div>
        </div>
      </div>
    </section>
  );
}
