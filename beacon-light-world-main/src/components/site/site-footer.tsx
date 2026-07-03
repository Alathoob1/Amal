import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-display text-lg font-semibold">Hemaya</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t.footer.tagline}
          </p>
        </div>

        <FooterCol
          title={t.footer.platform}
          links={[
            { to: "/ai-analysis", label: t.footer.aiDrawing },
            { to: "/dashboard", label: t.footer.parentDash },
            { to: "/community", label: t.footer.community },
            { to: "/places", label: t.footer.places },
          ]}
        />
        <FooterCol
          title={t.footer.learn}
          links={[
            { to: "/about", label: t.footer.about },
            { to: "/knowledge", label: t.footer.knowledge },
            { to: "/faq", label: t.footer.faq },
            { to: "/contact", label: t.footer.contact },
          ]}
        />
        <FooterCol
          title={t.footer.account}
          links={[
            { to: "/login", label: t.footer.signIn },
            { to: "/register", label: t.footer.createAccount },
          ]}
        />
      </div>
      <div className="border-t border-border/60">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ to: string; label: string }>;
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold tracking-wide text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
