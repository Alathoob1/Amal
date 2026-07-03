import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Shared "text + trailing arrow" link used for secondary in-section CTAs
 * (e.g. "View dashboard", "Visit the community"). The arrow flips
 * automatically in RTL so it always points in the reading direction.
 */
export function ArrowLink({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "children"> & { children: React.ReactNode }) {
  return (
    <Link
      className={cn(
        "-mx-1 inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-sm font-medium text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
    </Link>
  );
}
