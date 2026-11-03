"use client";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { Link } from "@/lib/router-compat";
import { cn } from "@/lib/utils";

/**
 * Shape system: primary actions are pills, cards are rounded-2xl, inputs rounded-lg.
 * One accent per intent: alarm red = emergency, ev purple = everything else.
 */
const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-brsemi transition-[transform,background-color,border-color] duration-200 ease-out-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        emergency:
          "bg-alarm text-white hover:bg-alarm-strong focus-visible:ring-alarm",
        primary:
          "bg-ev-700 text-white hover:bg-ev-800 focus-visible:ring-ev-700",
        light:
          "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white",
        quiet:
          "border border-line bg-white text-ink hover:border-ev-300 hover:text-ev-700 focus-visible:ring-ev-700",
      },
      size: {
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3.5 text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 17" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M9.62 4.45331L13.6667 8.49998L9.62 12.5466" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.33337 8.5H13.5534" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cta = forwardRef(function Cta(
  { variant, size, to, arrow = false, className, children, ...props },
  ref
) {
  const classes = cn(ctaVariants({ variant, size }), className);
  const content = (
    <>
      {children}
      {arrow && <ArrowIcon />}
    </>
  );
  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <button ref={ref} className={classes} {...props}>
      {content}
    </button>
  );
});

export default Cta;
