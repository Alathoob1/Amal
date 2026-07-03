import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { MapPin, Star, Volume2, Sun, Users } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/places")({
  component: Places,
  head: () => ({
    meta: [
      { title: "Autism-Friendly Places | Hemaya" },
      { name: "description", content: "Cafés, clinics, parks, and museums scored by real families for sensory friendliness." },
    ],
  }),
});

function Places() {
  const t = useT();
  const scores = [4.8, 4.6, 4.7, 4.4];
  const places = t.places.places.map((p, i) => ({ ...p, score: scores[i] }));
  const filterIcons = [Volume2, Sun, Users, MapPin];
  return (
    <>
      <PageHeader
        eyebrow={t.places.eyebrow}
        title={t.places.title}
        description={t.places.body}
      />
      <section className="container-page py-12">
        <div className="mb-8 grid gap-3 md:grid-cols-4">
          {t.places.filters.map((label, i) => {
            const Icon = filterIcons[i];
            return (
              <button key={label} className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm hover:bg-muted">
                <Icon className="h-4 w-4" aria-hidden /> {label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {places.map((p) => (
            <article key={p.name} className="surface-card overflow-hidden p-0">
              <div className="h-40 w-full bg-gradient-to-br from-primary-soft to-accent-soft" aria-hidden />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl">{p.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{p.city}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-warm/25 px-2.5 py-1 text-xs font-medium text-warm-foreground">
                    <Star className="h-3.5 w-3.5 fill-current" /> {p.score}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                  {[
                    { k: t.places.noise, v: p.noise },
                    { k: t.places.lighting, v: p.light },
                    { k: t.places.crowd, v: p.crowd },
                  ].map((s) => (
                    <div key={s.k} className="rounded-xl border border-border bg-background p-3">
                      <p className="text-muted-foreground">{s.k}</p>
                      <p className="mt-1 font-medium">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}