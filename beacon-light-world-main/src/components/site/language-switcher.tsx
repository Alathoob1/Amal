import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function LanguageSwitcher({
  variant = "pill",
}: {
  variant?: "pill" | "inline";
}) {
  const { lang, toggle, t } = useLanguage();

  const base =
    "group inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";
  const inline =
    "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.switchTo}
      title={t.nav.switchTo}
      className={variant === "inline" ? inline : base}
    >
      <Languages className="h-3.5 w-3.5 opacity-70" aria-hidden />
      <span
        className={
          "font-semibold tracking-wide " +
          (lang === "ar" ? "text-primary" : "text-foreground/60")
        }
      >
        AR
      </span>
      <span aria-hidden className="text-border">|</span>
      <span
        className={
          "font-semibold tracking-wide " +
          (lang === "en" ? "text-primary" : "text-foreground/60")
        }
      >
        EN
      </span>
    </button>
  );
}