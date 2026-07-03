import type { ComponentType } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Upload, Sparkles, ShieldCheck, Stethoscope, TrendingUp } from "lucide-react";
import { useT } from "@/lib/i18n";
import { dictionaries } from "@/lib/i18n-dict";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/site/pill-button";

export const Route = createFileRoute("/ai-analysis")({
  component: AIAnalysis,
  head: () => ({
    meta: [
      { title: dictionaries.en.ai.metaTitle },
      { name: "description", content: dictionaries.en.ai.metaDesc },
    ],
  }),
});

function AIAnalysis() {
  const t = useT();
  return (
    <>
      <PageHeader eyebrow={t.ai.eyebrow} title={t.ai.title} description={t.ai.body} />
      <section className="container-page grid gap-8 py-12 md:py-16 md:grid-cols-[1.1fr_1fr]">
        <div className="surface-card p-8">
          <div className="rounded-2xl border-2 border-dashed border-border bg-surface p-10 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary">
              <Upload className="h-6 w-6" aria-hidden />
            </span>
            <p className="mt-4 font-display text-xl">{t.ai.upload}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{t.ai.uploadHint}</p>
            <PillButton variant="primary" className="mt-5">
              {t.ai.chooseFile}
            </PillButton>
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-warm/40 bg-warm/15 p-4 text-sm text-warm-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <p>{t.ai.disclaimer}</p>
          </div>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {t.ai.latest}
              </p>
              <p className="mt-1 font-display text-lg">{t.ai.reportSubject}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
              <Stethoscope className="h-3 w-3" aria-hidden /> {t.ai.reviewed}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Stat label={t.ai.confidence} value="82%" />
            <Stat label={t.ai.tone} value={t.ai.calm} />
            <Stat label={t.ai.trend} value="+12%" tone="success" icon={TrendingUp} />
          </div>

          <h2 className="mt-6 font-display text-base">{t.ai.observations}</h2>
          <ul className="mt-2 space-y-2.5 text-sm">
            {t.ai.lines.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="text-foreground/85">{line}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 font-display text-base">{t.ai.questions}</h2>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            {t.ai.q.map((q) => (
              <li key={q} className="flex items-start gap-2.5">
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60"
                  aria-hidden
                />
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  tone?: "success";
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 flex items-center gap-1.5 font-display text-lg",
          tone === "success" ? "text-success" : "text-foreground",
        )}
      >
        {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
        {value}
      </p>
    </div>
  );
}
