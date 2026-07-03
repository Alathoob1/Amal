import type { LucideIcon } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  CalendarClock,
  Pill,
  NotebookPen,
  Target,
  ArrowUpRight,
  Smile,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { dictionaries } from "@/lib/i18n-dict";
import { PillLink } from "@/components/site/pill-link";
import { PillButton } from "@/components/site/pill-button";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: dictionaries.en.dashboard.metaTitle },
      { name: "description", content: dictionaries.en.dashboard.metaDesc },
    ],
  }),
});

function Dashboard() {
  const t = useT();
  return (
    <section className="container-page py-10 md:py-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <span
            aria-hidden
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-soft font-display text-xl text-primary"
          >
            L
          </span>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t.dashboard.familyView}
            </p>
            <h1 className="truncate font-display text-2xl md:text-3xl">{t.dashboard.childName}</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PillLink to="/ai-analysis" variant="secondary" size="sm">
            <Sparkles className="h-4 w-4" aria-hidden /> {t.dashboard.newDrawing}
          </PillLink>
          <PillButton variant="primary" size="sm">
            <NotebookPen className="h-4 w-4" aria-hidden /> {t.dashboard.addNote}
          </PillButton>
        </div>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-4">
        <StatCard
          icon={Smile}
          label={t.dashboard.moodLabel}
          value={t.dashboard.moodValue}
          hint={t.dashboard.moodHint}
        />
        <StatCard
          icon={Sparkles}
          label={t.dashboard.aiLabel}
          value={t.dashboard.aiValue}
          hint={t.dashboard.aiHint}
        />
        <StatCard
          icon={Target}
          label={t.dashboard.goalsLabel}
          value={t.dashboard.goalsValue}
          hint={t.dashboard.goalsHint}
        />
        <StatCard
          icon={CalendarClock}
          label={t.dashboard.nextLabel}
          value={t.dashboard.nextValue}
          hint={t.dashboard.nextHint}
        />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <article className="surface-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">{t.dashboard.timeline}</h2>
            <button
              type="button"
              className="-my-1 inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.dashboard.viewAll} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <ul className="mt-5 space-y-4">
            {t.dashboard.events.map((e) => (
              <li key={e.t} className="flex items-start gap-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                <div className="flex-1">
                  <p className="text-sm font-medium">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.t}</p>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                  {e.tag}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="surface-card p-6">
          <h2 className="font-display text-lg">{t.dashboard.medications}</h2>
          <ul className="mt-4 space-y-3">
            {t.dashboard.meds.map((m) => (
              <li
                key={m.name}
                className="flex items-start gap-3 rounded-2xl border border-border bg-background p-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Pill className="h-4 w-4" aria-hidden />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.dose}</p>
                </div>
                <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {m.tone}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-lg">{t.dashboard.goals}</h2>
          <ul className="mt-4 space-y-3">
            {t.dashboard.goalItems.map((g) => (
              <li key={g.g}>
                <div className="flex items-center justify-between text-sm">
                  <span>{g.g}</span>
                  <span className="text-muted-foreground">{g.p}%</span>
                </div>
                <div
                  className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted"
                  aria-hidden
                >
                  <div className="h-full rounded-full bg-primary" style={{ width: `${g.p}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
      <p className="mt-4 font-display text-2xl">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
