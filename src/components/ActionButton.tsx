"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useMagneticCursor } from "@/hooks/useMagneticCursor";

/**
 * Branded action button for the portfolio's editorial system.
 * Distinct from shadcn's <Button> (which stays for dialog internals).
 *
 * - `primary`   : solid accent fill — the one signal-red CTA per view
 * - `solid`     : off-white fill on dark — high-contrast neutral CTA
 * - `outline`   : hairline border, fills subtly on hover
 * - `ghost`     : text-only with an accent underline on hover
 *
 * Renders as a <button>, an internal <Link>, or an external <a>, inferred
 * from props. Set `magnetic` to enable the cursor pull (auto-disabled on
 * touch / reduced-motion via the hook).
 */
const actionButtonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-text hover:bg-accent-deep",
        solid:
          "bg-text text-bg hover:bg-text/90",
        outline:
          "border border-line-strong bg-transparent text-text hover:border-accent hover:bg-accent/[0.06]",
        ghost:
          "bg-transparent text-text-muted hover:text-text",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type CommonProps = VariantProps<typeof actionButtonVariants> & {
  className?: string;
  magnetic?: boolean;
  children: React.ReactNode;
};

type AsButton = CommonProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type AsLink = CommonProps &
  Omit<React.ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string;
    /** Force external rendering / new tab. Auto-detected for http(s) links. */
    external?: boolean;
  };

export type ActionButtonProps = AsButton | AsLink;

export function ActionButton(props: ActionButtonProps) {
  const { variant, size, className, magnetic = false, children } = props;
  // Magnetic ref is always created; the hook no-ops when not enabled.
  const magneticRef = useMagneticCursor<HTMLElement>();
  const ref = magnetic ? magneticRef : undefined;

  const classes = cn(actionButtonVariants({ variant, size }), className);

  // Internal vs external link inference
  if ("href" in props && props.href) {
    const { href, external } = props as AsLink;
    const rest = stripOwnProps(props) as React.ComponentPropsWithoutRef<"a">;
    const isExternal = external ?? /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          data-cursor="link"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        data-cursor="link"
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const rest = stripOwnProps(props) as React.ComponentPropsWithoutRef<"button">;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      data-cursor="link"
      {...rest}
    >
      {children}
    </button>
  );
}

/** Remove component-only props so the remainder is safe to spread on DOM. */
function stripOwnProps(props: ActionButtonProps) {
  const rest = { ...props } as Record<string, unknown>;
  delete rest.variant;
  delete rest.size;
  delete rest.className;
  delete rest.magnetic;
  delete rest.children;
  delete rest.external;
  delete rest.href;
  return rest;
}

export { actionButtonVariants };
