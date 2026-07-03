import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/register")({
  component: Register,
  head: () => ({
    meta: [
      { title: "Create your family account | Hemaya" },
      { name: "description", content: "Create a Hemaya family account to start your child's calm, supportive journey." },
    ],
  }),
});

function Register() {
  const t = useT();
  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-16">
      <div className="surface-card w-full max-w-md p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">{t.register.eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl">{t.register.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.register.body}</p>
        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t.register.firstName} placeholder={t.register.firstNamePh} />
            <Field label={t.register.lastName} placeholder={t.register.lastNamePh} />
          </div>
          <Field label={t.register.email} type="email" placeholder={t.register.emailPh} />
          <Field label={t.register.password} type="password" placeholder={t.register.passwordPh} />
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            {t.register.continue}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t.register.haveAccount}{" "}
          <Link to="/login" className="font-medium text-primary hover:opacity-80">
            {t.register.signIn}
          </Link>
        </p>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...rest}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring/40 transition focus:border-ring focus:ring-4"
      />
    </label>
  );
}