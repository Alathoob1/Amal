import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Sign in | Hemaya" },
      { name: "description", content: "Sign in to your Hemaya account to continue your family's journey." },
    ],
  }),
});

function Login() {
  const t = useT();
  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-16">
      <div className="surface-card w-full max-w-md p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">{t.login.eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl">{t.login.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.login.body}</p>
        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Field label={t.login.email} type="email" placeholder={t.login.emailPh} />
          <Field label={t.login.password} type="password" placeholder={t.login.passwordPh} />
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            {t.login.signIn}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t.login.newHere}{" "}
          <Link to="/register" className="font-medium text-primary hover:opacity-80">
            {t.login.createAccount}
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