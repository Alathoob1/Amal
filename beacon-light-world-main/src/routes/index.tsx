import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  Stethoscope,
  HeartHandshake,
  MapPin,
  BookOpen,
  ShieldCheck,
  LineChart,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import heroImage from "@/assets/hero-autism.jpg";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PillLink } from "@/components/site/pill-link";
import { ArrowLink } from "@/components/site/arrow-link";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeatureGrid />
      <AIShowcase />
      <DashboardsPreview />
      <CommunityAndPlaces />
      <FinalCTA />
    </>
  );
}

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid gap-14 py-16 md:grid-cols-[1.05fr_1fr] md:items-center md:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            {t.home.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t.home.heroBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PillLink to="/register" variant="primary">
              {t.home.createFamily}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </PillLink>
            <PillLink to="/about" variant="secondary">
              {t.home.learnAutism}
            </PillLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {t.home.features.map((f) => (
              <li key={f} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary-soft/40 blur-2xl"
            aria-hidden
          />
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-lifted)]">
            <img
              src={heroImage}
              alt={t.home.heroImgAlt}
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="surface-card absolute -bottom-6 start-6 hidden max-w-xs items-start gap-3 p-4 md:flex">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium">{t.home.linaInsight}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.home.linaInsightBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const { t } = useLanguage();
  return (
    <section aria-label={t.home.trustLabel} className="border-y border-border/60 bg-surface">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-[0.7rem]">{t.home.trustLabel}</span>
        {t.home.trustPartners.map((i) => (
          <span key={i} className="font-medium text-foreground/70">
            {i}
          </span>
        ))}
      </div>
    </section>
  );
}

const FEATURE_ICONS = [Sparkles, LineChart, Stethoscope, Users, MapPin, BookOpen] as const;

function FeatureGrid() {
  const { t } = useLanguage();
  return (
    <section className="container-page py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          {t.home.featuresEyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{t.home.featuresTitle}</h2>
        <p className="mt-4 text-muted-foreground">{t.home.featuresBody}</p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.home.featureCards.map(({ title, body }, i) => {
          const Icon = FEATURE_ICONS[i];
          return (
            <article key={title} className="surface-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AIShowcase() {
  const { t } = useLanguage();
  return (
    <section className="bg-surface">
      <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {t.home.aiEyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{t.home.aiTitle}</h2>
          <p className="mt-4 text-muted-foreground">{t.home.aiBody}</p>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-warm/40 bg-warm/15 p-4 text-sm text-warm-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <p>{t.home.aiDisclaimer}</p>
          </div>
          <PillLink to="/ai-analysis" variant="primary" className="mt-6">
            {t.home.aiCta}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </PillLink>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {t.home.reportLine}
              </p>
              <p className="mt-1 font-display text-lg">{t.home.reportChild}</p>
            </div>
            <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
              {t.home.reviewed}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Metric label={t.home.metricConfidence} value="82%" />
            <Metric label={t.home.metricTone} value={t.home.calm} />
            <Metric label={t.home.metricTrend} value="+12%" tone="success" />
          </div>

          <ul className="mt-5 space-y-3 text-sm">
            {t.home.aiLines.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span className="text-foreground/85">{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-3 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
            <Stethoscope className="h-4 w-4 shrink-0" aria-hidden />
            {t.home.verifiedBy}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "success" }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 font-display text-xl",
          tone === "success" ? "text-success" : "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}

const ROLE_ICONS = [HeartHandshake, Stethoscope, ShieldCheck] as const;

function DashboardsPreview() {
  const { t } = useLanguage();
  return (
    <section className="container-page py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          {t.home.dashEyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{t.home.dashTitle}</h2>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {t.home.roles.map(({ role, title, body }, i) => {
          const Icon = ROLE_ICONS[i];
          return (
            <article key={role} className="surface-card flex flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{role}</p>
              </div>
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{body}</p>
              <ArrowLink to="/dashboard" className="mt-5">
                {t.home.viewDash}
              </ArrowLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CommunityAndPlaces() {
  const { t } = useLanguage();
  return (
    <section className="bg-surface">
      <div className="container-page grid gap-6 py-20 md:grid-cols-2 md:py-28">
        <article className="surface-card p-8">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Users className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="mt-5 font-display text-2xl">{t.home.communityTitle}</h3>
          <p className="mt-2 text-muted-foreground">{t.home.communityBody}</p>
          <ul className="mt-5 grid gap-2 text-sm text-foreground/85">
            {t.home.communityBullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/50"
                  aria-hidden
                />
                {b}
              </li>
            ))}
          </ul>
          <ArrowLink to="/community" className="mt-6">
            {t.home.visitCommunity}
          </ArrowLink>
        </article>

        <article className="surface-card p-8">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent">
            <MapPin className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="mt-5 font-display text-2xl">{t.home.placesTitle}</h3>
          <p className="mt-2 text-muted-foreground">{t.home.placesBody}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
            {t.home.placeStats.map((s) => (
              <div key={s.k} className="rounded-xl border border-border bg-background p-3">
                <p className="text-muted-foreground">{s.k}</p>
                <p className="mt-1 font-medium text-foreground">{s.v}</p>
              </div>
            ))}
          </div>
          <ArrowLink to="/places" className="mt-6">
            {t.home.explorePlaces}
          </ArrowLink>
        </article>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { t } = useLanguage();
  return (
    <section className="container-page py-20 md:py-28">
      <div className="surface-card relative overflow-hidden p-10 text-center md:p-16">
        <div
          className="absolute inset-x-0 -top-20 -z-10 mx-auto h-56 w-56 rounded-full bg-primary-soft blur-3xl"
          aria-hidden
        />
        <h2 className="mx-auto max-w-2xl font-display text-3xl md:text-4xl">{t.home.finalTitle}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.home.finalBody}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PillLink to="/register" variant="primary">
            {t.home.createFamily}
          </PillLink>
          <PillLink to="/contact" variant="secondary">
            {t.home.talkToTeam}
          </PillLink>
        </div>
      </div>
    </section>
  );
}
