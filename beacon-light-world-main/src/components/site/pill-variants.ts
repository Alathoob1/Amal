import { cva } from "class-variance-authority";

/**
 * Shared rounded-full CTA styling used by both PillLink (navigation)
 * and PillButton (in-page actions), so the two never visually drift apart.
 */
export const pillVariants = cva(
  "inline-flex items-center gap-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-sm hover:opacity-95",
        secondary: "border border-border bg-background text-foreground hover:bg-muted",
      },
      size: {
        default: "px-5 py-3",
        sm: "px-4 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);
