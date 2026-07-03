import * as React from "react";
import { Link } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { pillVariants } from "./pill-variants";

/**
 * Shared "pill" call-to-action link used across marketing sections
 * (Hero, AI showcase, final CTA, etc.). Centralizes the rounded-full
 * button styling that was previously duplicated per-section so every
 * CTA gets consistent hover *and* keyboard-focus treatment.
 */
export interface PillLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "children">, VariantProps<typeof pillVariants> {
  children: React.ReactNode;
}

export function PillLink({ variant, className, ...props }: PillLinkProps) {
  return <Link className={cn(pillVariants({ variant }), className)} {...props} />;
}
