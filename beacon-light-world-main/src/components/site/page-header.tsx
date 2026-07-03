import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border/60 bg-surface">
      <div className="container-page py-16 md:py-20">
        {eyebrow ? (
          <p className="mb-3 inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export function ComingSoon({ label }: { label: string }) {
  const { t } = useLanguage();
  return (
    <section className="container-page py-16">
      <div className="surface-card mx-auto max-w-2xl p-10 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          {t.page.comingSoon}
        </p>
        <h2 className="mt-3 font-display text-2xl">{label}</h2>
        <p className="mt-3 text-muted-foreground">{t.page.comingBody}</p>
      </div>
    </section>
  );
}