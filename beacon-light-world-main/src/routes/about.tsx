import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Brain, Ear, Eye, MessageCircle, Palette, Users } from "lucide-react";
import { useT } from "@/lib/i18n";
import { dictionaries } from "@/lib/i18n-dict";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: dictionaries.en.about.metaTitle },
      {
        name: "description",
        content: dictionaries.en.about.metaDesc,
      },
      { property: "og:title", content: "About Autism | Hemaya" },
      {
        property: "og:description",
        content: "A calm, evidence-informed introduction to Autism Spectrum Disorder.",
      },
    ],
  }),
});

function About() {
  const t = useT();
  const icons = [MessageCircle, Ear, Users, Palette, Brain, Eye];
  const traits = t.about.traits.map((tr, i) => ({ ...tr, icon: icons[i] }));
  return (
    <>
      <PageHeader eyebrow={t.about.eyebrow} title={t.about.title} description={t.about.body} />
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {traits.map(({ icon: Icon, title, body }) => (
            <article key={title} className="surface-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                {Icon ? <Icon className="h-5 w-5" aria-hidden /> : null}
              </span>
              <h2 className="mt-4 font-display text-xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>

        <div className="surface-card mt-10 p-8 md:p-12">
          <h2 className="font-display text-2xl">{t.about.signsTitle}</h2>
          <p className="mt-2 text-muted-foreground">{t.about.signsBody}</p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {t.about.signs.map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-2xl bg-muted/60 p-4 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
