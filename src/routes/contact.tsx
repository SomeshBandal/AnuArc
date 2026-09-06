import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { SparkField } from "@/components/SparkField";
import { CATEGORIES } from "@/data/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — ANU ARC Sales & Services" },
      {
        name: "description",
        content:
          "Get in touch with ANU ARC Sales & Services, Indore for quotes on MIG welding machines, torches, TIG/SAW/laser welders and service. Call or send an enquiry.",
      },
      { property: "og:title", content: "Contact Us — ANU ARC Sales & Services" },
      {
        property: "og:description",
        content:
          "Quotes and enquiries for MIG welding machines, torches, TIG/SAW/laser welders and service in Indore, Madhya Pradesh.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const inputClass =
  "h-12 w-full rounded-md border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <SparkField count={14} />
        <div className="pointer-events-none absolute -top-32 left-1/4 size-96 rounded-full bg-primary/15 blur-3xl glow-pulse" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Get in touch</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Contact <span className="text-molten">Us</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Tell us about your application and our engineers will recommend the right machine,
            robot or service plan — usually within one working day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="space-y-5">
            {[
              {
                label: "Phone",
                value: "+91 9403614761 / +91 9405575965",
                icon: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
              },
              {
                label: "Email",
                value: "Available on request",
                icon: (
                  <>
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </>
                ),
              },
              {
                label: "Showroom",
                value: "CM 2nd-560, Pandit Dindayal Upadhyay Nagar, Nyay Nagar, Sukhliya, Indore, Madhya Pradesh 452010, India",
                icon: (
                  <>
                    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </>
                ),
              },
              {
                label: "Working hours",
                value: "Mon–Sat,\u00a0  10:00 AM – 7:00 PM",
                icon: (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </>
                ),
              },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon}
                  </svg>
                </span>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="mt-1 font-semibold">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-3">
          {sent ? (
            <div className="steel-panel flex h-full flex-col items-center justify-center rounded-xl border border-primary/40 p-10 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
                <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold">Enquiry sent!</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Thank you — our team will get back to you within one working day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="steel-panel rounded-xl border border-border p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Name *</label>
                  <input id="name" required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="company" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Company</label>
                  <input id="company" placeholder="Company name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Phone *</label>
                  <input id="phone" required type="tel" placeholder="+91 …" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Email</label>
                  <input id="email" type="email" placeholder="you@company.com" className={inputClass} />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="interest" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">I'm interested in</label>
                <div className="relative">
                  <select id="interest" className={`${inputClass} cursor-pointer appearance-none pr-10`}>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                    <option>Service &amp; Spares</option>
                    <option>Other</option>
                  </select>
                  <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your material, thickness and production volume…"
                  className="w-full resize-none rounded-md border border-border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-ember"
              >
                Send Enquiry
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </main>
  );
}
