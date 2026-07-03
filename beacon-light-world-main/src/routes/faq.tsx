import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ | Hemaya" },
      { name: "description", content: "Answers to common questions about Hemaya, AI insights, privacy, and clinical care." },
    ],
  }),
});

function FAQ() {
  const t = useT();
  return (
    <>
      <PageHeader eyebrow={t.faq.eyebrow} title={t.faq.title} />
      <section className="container-page py-12">
        <div className="mx-auto max-w-3xl space-y-3">
          {t.faq.items.map((it) => (
            <details key={it.q} className="surface-card group p-5 open:bg-surface">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium">
                <span>{it.q}</span>
                <span className="text-primary transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}