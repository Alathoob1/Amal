import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const nav = [
    { to: "/about", label: t.nav.about },
    { to: "/ai-analysis", label: t.nav.ai },
    { to: "/community", label: t.nav.community },
    { to: "/knowledge", label: t.nav.knowledge },
    { to: "/places", label: t.nav.places },
    { to: "/contact", label: t.nav.contact },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2" aria-label={t.nav.home}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Heart className="h-4 w-4" aria-hidden />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Hemaya</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t.nav.primaryNav}>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t.nav.signIn}
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t.nav.getStarted}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.close : t.nav.open}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border/60 bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-page flex flex-col py-3" aria-label={t.nav.mobileNav}>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-border/60 pt-3">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.nav.signIn}
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.nav.getStarted}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
