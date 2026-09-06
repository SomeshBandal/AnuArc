import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { SparkField } from "@/components/SparkField";
import heroImg from "@/assets/hero-welding.jpg";
import weldingVideo from "@/assets/welding-action.mp4.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Company Profile — ANU ARC Sales & Services" },
      {
        name: "description",
        content:
          "M/S Anu Arc Sales & Services, Indore — trader and supplier of industrial welding equipment since 2002. MIG welding machines, torches, batching controllers, accessories, service and support.",
      },
      { property: "og:title", content: "Company Profile — ANU ARC Sales & Services" },
      {
        property: "og:description",
        content:
          "Trader and supplier of industrial welding equipment in Indore, Madhya Pradesh since 2002. Sales, installation, maintenance and technical support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const ESTABLISHED = 2002;
const CURRENT_YEAR = new Date().getFullYear();
const YEARS_OF_EXPERIENCE = CURRENT_YEAR - ESTABLISHED;

const KEY_FACTS = [
  { label: "Nature of Business", value: "Trader and Supplier" },
  { label: "Location", value: "Indore, Madhya Pradesh, India" },
  { label: "Year of Establishment", value: String(ESTABLISHED) },
  { label: "No. of Employees", value: "05" },
  { label: "GST No.", value: "23AKGPK2852C1ZM" },
  { label: "Experience", value: `${YEARS_OF_EXPERIENCE}+ years` },
];

const CORE_PRODUCTS = [
  {
    title: "MIG Welding Machines",
    text: "Robust industrial MIG welding machines engineered for fabrication units, workshops and medium-scale production lines.",
  },
  {
    title: "MIG Welding Torches",
    text: "Precision MIG welding torches built for durability and consistent arc performance across demanding duty cycles.",
  },
  {
    title: "Welding Machines",
    text: "A reliable range of welding machines suited to varied industrial processes, material types and thicknesses.",
  },
  {
    title: "Batching Controllers",
    text: "Accurate batching controllers that bring process control and repeatability to welding and related operations.",
  },
];

const VALUES = [
  {
    title: "Genuine & reliable products",
    text: "Sourced from reputed manufacturers and brands to deliver performance, durability and efficiency on every job.",
  },
  {
    title: "Strong supplier relationships",
    text: "Ties with leading brands — including the Mogra brand distributorship — enable genuine, cost-effective solutions.",
  },
  {
    title: "Dedicated after-sales service",
    text: "Installation support, maintenance, troubleshooting and technical assistance for complete customer satisfaction.",
  },
];

function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <SparkField count={14} />
        <div className="pointer-events-none absolute -top-32 right-1/4 size-96 rounded-full bg-primary/15 blur-3xl glow-pulse" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Company Profile</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            M/S <span className="text-molten">ANU ARC</span> Sales & Services
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A notable trader and supplier of high-quality industrial welding equipment and solutions,
            based in Indore, Madhya Pradesh, India — established in {ESTABLISHED}.
          </p>
        </div>
      </section>

      {/* Profile overview */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-border">
            <video
              src={weldingVideo.url}
              poster={heroImg}
              autoPlay
              loop
              muted
              playsInline
              aria-label="Welder welding with flying sparks"
              className="aspect-[8/5] w-full object-cover"
            />
            <SparkField count={10} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Who we are</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
            Two decades of welding precision.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            M/S Anu Arc Sales & Services is a notable trader and supplier based in Indore,
            Madhya Pradesh, India, established in {ESTABLISHED}. We specialize in providing
            high-quality industrial welding equipment and solutions to a wide range of customers,
            including fabrication units, workshops, and small to medium industries.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our core product range includes MIG Welding Machines, MIG Welding Torches, Welding
            Machines, and Batching Controllers, along with essential welding accessories. With over
            two decades of experience, we are committed to delivering reliable products that ensure
            performance, durability, and efficiency.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We maintain strong relationships with reputed manufacturers and brands, enabling us to
            supply genuine and cost-effective solutions to our clients. We are also associated with
            the Mogra brand distributorship.
          </p>
        </Reveal>
      </section>

      {/* Key facts */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Key facts</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              At a glance
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {KEY_FACTS.map((f, i) => (
              <Reveal key={f.label} delay={i * 60}>
                <div className="h-full bg-card p-6">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold text-spark">{f.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core product range */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Core product range</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
            What we supply
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_PRODUCTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="steel-panel h-full rounded-xl border border-border p-6 transition-colors hover:border-primary/50">
                <div className="font-mono text-sm text-primary">0{i + 1}</div>
                <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            …along with essential welding accessories. We are also associated with the{" "}
             <span className="font-semibold text-spark">Mogora brand</span> distributorship
            (certificate to be shared soon).
          </p>
        </Reveal>
      </section>

      {/* After-sales service */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">After-sales service</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              Support that keeps you welding.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              In addition to trading and supply, we provide dedicated after-sales service — including
              installation support, maintenance, troubleshooting, and technical assistance — ensuring
              complete customer satisfaction and long-term reliability.
            </p>
            <Reveal className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-ember"
              >
                Request service & support →
              </Link>
            </Reveal>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                { t: "Installation support", d: "Correct setup and commissioning of every machine we deliver." },
                { t: "Maintenance", d: "Preventive upkeep that maximizes uptime and machine life." },
                { t: "Troubleshooting", d: "Fast diagnosis and resolution of welding process issues." },
                { t: "Technical assistance", d: "Expert guidance whenever your operation needs it." },
              ].map((s) => (
                <li key={s.t} className="steel-panel rounded-xl border border-border p-5">
                  <h3 className="font-display text-base font-bold">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Our commitment</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
            What we stand for
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="steel-panel h-full rounded-xl border border-border p-6 transition-colors hover:border-primary/50">
                <div className="font-mono text-sm text-primary">0{i + 1}</div>
                <h3 className="mt-3 font-display text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link
            to="/products"
            search={{ category: "All" }}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-ember"
          >
            Browse the catalogue →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
