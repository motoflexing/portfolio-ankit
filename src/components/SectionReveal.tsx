"use client";

import * as React from "react";
import { Reveal } from "@/components/Reveal";

export function SectionReveal({
  children,
  delay = 0,
  y = 20,
  as = "div",
  ...props
}: React.ComponentProps<typeof Reveal>) {
  return (
    <Reveal delay={delay} y={y} as={as} {...props}>
      {children}
    </Reveal>
  );
}
