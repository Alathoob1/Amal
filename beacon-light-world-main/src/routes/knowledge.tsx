import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { BookOpen, PlayCircle, Clock } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/knowledge")({
  component: Knowledge,
  head: () => ({
    meta: [
      { title: "Knowledge Center | Hemaya" },
      { name: "description", content: "Evidence-informed articles and videos on autism, translated in Arabic and English, reviewed by clinicians." },
    ],
  }),
});

function Knowledge() {
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow={t.knowledge.eyebrow}
        title={t.knowledge.title}
        description={t.knowledge.body}
      />
      <section className="container-page py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          {t.knowledge.filters.map((f, i) => (
            <button
              key={f}
              className={
                "rounded-full px-4 py-2 text-sm font-medium " +
                (i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-background hover:bg-muted")
              }
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.knowledge.articles.map((a) => (
            <article key={a.title} className="surface-card flex flex-col p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <BookOpen className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{a.topic}</p>
              <h3 className="mt-1.5 font-display text-lg leading-snug">{a.title}</h3>
              <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.read} {t.knowledge.minutes}</span>
                <span className="inline-flex items-center gap-1"><PlayCircle className="h-3.5 w-3.5" /> {t.knowledge.videoAvailable}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}