import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SparkField } from "@/components/SparkField";
import heroImg from "@/assets/hero-welding.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ANU ARC — MIG, TIG, SAW & Laser Welding Machines, Indore" },
      {
        name: "description",
        content:
          "ANU ARC Sales & Services, Indore — trader and supplier of Mogora MIG welding machines, MIG welding torches, TIG/SAW/laser welding machines and batching controllers. Full catalogue with specifications and downloadable datasheets.",
      },
      { property: "og:title", content: "ANU ARC — Welding Machines & Torches, Indore" },
      {
        property: "og:description",
        content:
          "ANU ARC Sales & Services, Indore — Mogora MIG welding machines, MIG torches, TIG/SAW/laser welders and batching controllers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const SERVICES = [
  {
    title: "Machines & Equipment",
    text: "Mogora MIG, TIG, SAW, laser and arc welding machines — genuine products, supplied nationwide.",
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  },
  {
    title: "Torches, Controllers & Spares",
    text: "MIG welding torches, RMC batching/robot controllers, welding accessories and consumables.",
    icon: (
      <>
        <path d="M12 2v4" />
        <rect x="8" y="6" width="8" height="6" rx="1" />
        <path d="M12 12v3m-5 7 5-4 5 4" />
      </>
    ),
  },
  {
    title: "Service & Training",
    text: "On-site maintenance, genuine spares, consumables supply and operator certification.",
    icon: (
      <>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7Z" />
      </>
    ),
  },
];

function HomePage() {
  const featured = PRODUCTS.filter((p) => p.badge).concat(
    PRODUCTS.filter((p) => !p.badge),
  ).slice(0, 3);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Welder striking a bright arc with flying sparks"
          width={1600}
          height={1000}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <SparkField count={22} />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-spark backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-spark arc-flicker" />
              Authorized Welding Equipment Dealership
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Strike the <span className="text-molten">perfect arc</span>, every single time.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              MIG welding machines, welding torches, TIG, SAW and laser systems — with full
              specifications and a downloadable datasheet for every model we supply.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/products"
                search={{ category: "All" }}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-ember hover:shadow-primary/50"
              >
                Browse the Catalogue
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/50 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
              >
                Talk to an Engineer
              </Link>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-14 flex flex-wrap gap-10">
              {[
                { value: "20+", label: "Years in the trade" },
                { value: "5", label: "Welding process types" },
                { value: "100%", label: "Genuine products" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-extrabold text-spark">{s.value}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">What we sell</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Every welding process, one counter.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat} delay={i * 80}>
                <Link
                  to="/products"
                  search={{ category: cat }}
                  className="group steel-panel flex h-full flex-col justify-between rounded-xl border border-border p-5 transition-all hover:-translate-y-1 hover:border-primary/60"
                >
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-bold leading-tight group-hover:text-primary">
                      {cat}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-spark">
                      View range
                      <svg viewBox="0 0 24 24" className="size-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">From the catalogue</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Featured machines
              </h2>
            </div>
            <Link
              to="/products"
              search={{ category: "All" }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-spark"
            >
              View all products
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="relative overflow-hidden border-t border-border">
        <SparkField count={10} />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 size-96 rounded-full bg-ember/15 blur-3xl glow-pulse" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">More than a store</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              From a single torch to a fully automated welding line.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="steel-panel h-full rounded-xl border border-border p-7 transition-colors hover:border-primary/50">
                  <span className="grid size-12 place-items-center rounded-lg bg-primary/15 text-primary">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Not sure which machine fits your job?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Tell us your material, thickness and production volume — we'll spec the right setup.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-ember"
            >
              Get a Free Consultation
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
