import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Bookmark, MessageCircle, Heart, ShieldCheck } from "lucide-react";
import { useT } from "@/lib/i18n";
import { dictionaries } from "@/lib/i18n-dict";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/community")({
  component: Community,
  head: () => ({
    meta: [
      { title: dictionaries.en.community.metaTitle },
      { name: "description", content: dictionaries.en.community.metaDesc },
    ],
  }),
});

const counts = [72, 51, 44, 33, 28, 22, 61];
const postMeta = [
  { replies: 24, hearts: 41, verified: true },
  { replies: 12, hearts: 66, verified: false },
  { replies: 8, hearts: 128, verified: false },
];

function Community() {
  const t = useT();
  const categories = t.community.categories;
  const posts = t.community.posts.map((p, i) => ({
    ...p,
    ...postMeta[i],
    time: t.community.times[i],
  }));
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <PageHeader
        eyebrow={t.community.eyebrow}
        title={t.community.title}
        description={t.community.body}
      />
      <section className="container-page grid gap-8 py-12 md:py-16 md:grid-cols-[240px_1fr]">
        <aside className="space-y-1">
          <p className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t.community.categoriesLabel}
          </p>
          {categories.map((c, i) => (
            <button
              key={c}
              type="button"
              aria-current={i === activeCategory ? "true" : undefined}
              onClick={() => setActiveCategory(i)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                i === activeCategory
                  ? "bg-primary-soft text-primary"
                  : "text-foreground/80 hover:bg-muted",
              )}
            >
              <span>{c}</span>
              <span className="text-xs text-muted-foreground">{counts[i]}</span>
            </button>
          ))}
        </aside>

        <div className="space-y-4">
          {posts.map((p) => (
            <Post key={p.title} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}

function Post({
  post,
}: {
  post: {
    title: string;
    cat: string;
    body: string;
    replies: number;
    hearts: number;
    verified: boolean;
    time: string;
  };
}) {
  const t = useT();
  const [saved, setSaved] = useState(false);

  return (
    <article className="surface-card p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{post.cat}</span>
        {post.verified ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-success">
            <ShieldCheck className="h-3 w-3" aria-hidden /> {t.community.clinicianReplied}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          {t.community.anonLabel}
          <span aria-hidden className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          {post.time}
        </span>
      </div>
      <h2 className="mt-3 font-display text-xl">{post.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{post.body}</p>
      <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="h-4 w-4" aria-hidden /> {post.hearts}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4" aria-hidden /> {post.replies}
        </span>
        <button
          type="button"
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
          className={cn(
            "ms-auto -my-1 inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            saved && "text-primary",
          )}
        >
          <Bookmark className={cn("h-4 w-4", saved && "fill-current")} aria-hidden />
          {saved ? t.community.saved : t.community.save}
        </button>
      </div>
    </article>
  );
}
