import * as React from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { pillVariants } from "./pill-variants";

/**
 * Native-button counterpart to PillLink: same rounded-full CTA look,
 * hover, and focus-visible treatment, for actions that aren't navigation
 * (e.g. "Choose a file"). Both share one CVA definition (pill-variants.ts)
 * so they can't drift apart visually over time.
 */
export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof pillVariants> {}

export const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ variant, className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        pillVariants({ variant }),
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
PillButton.displayName = "PillButton";
