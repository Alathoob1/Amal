import { useState } from "react";
import type { FormEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useT } from "@/lib/i18n";
import { dictionaries } from "@/lib/i18n-dict";
import { PillButton } from "@/components/site/pill-button";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: dictionaries.en.contact.metaTitle },
      { name: "description", content: dictionaries.en.contact.metaDesc },
    ],
  }),
});

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring/40 transition-shadow focus:border-ring focus:ring-4";

function Contact() {
  const t = useT();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // Simulated submit — no backend wired yet. Gives the user honest,
    // calm confirmation instead of a click that silently does nothing.
    window.setTimeout(() => setStatus("sent"), 700);
  }

  return (
    <>
      <PageHeader
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        description={t.contact.body}
      />
      <section className="container-page grid gap-8 py-16 md:py-20 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="px-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t.contact.detailsTitle}
          </h2>
          <div className="mt-3 space-y-3">
            {[
              { icon: Mail, label: t.contact.email, value: "hello@hemaya.care" },
              { icon: Phone, label: t.contact.phone, value: "+966 11 000 0000" },
              { icon: MapPin, label: t.contact.office, value: t.contact.officeValue },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="surface-card flex items-start gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-0.5 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-8">
          <h2 className="font-display text-lg">{t.contact.formTitle}</h2>

          {status === "sent" ? (
            <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl bg-success/10 p-6 animate-in fade-in duration-300">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-lg">{t.contact.sentTitle}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.contact.sentBody}</p>
              </div>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField label={t.contact.yourName} placeholder={t.contact.yourName} required />
                <FormField
                  label={t.contact.yourEmail}
                  type="email"
                  placeholder="you@family.com"
                  required
                />
              </div>
              <FormField
                label={t.contact.message}
                placeholder={t.contact.messagePh}
                multiline
                rows={6}
                required
              />
              <PillButton type="submit" variant="primary" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    {t.contact.sending}
                  </>
                ) : (
                  t.contact.send
                )}
              </PillButton>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

type FormFieldProps = { label: string; multiline?: false } & InputHTMLAttributes<HTMLInputElement>;
type FormFieldTextareaProps = {
  label: string;
  multiline: true;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

function FormField({ label, multiline, ...rest }: FormFieldProps | FormFieldTextareaProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {multiline ? (
        <textarea
          className={fieldClass}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input className={fieldClass} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </label>
  );
}
