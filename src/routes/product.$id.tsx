import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, PRODUCTS } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { SparkField } from "@/components/SparkField";
import { QuoteModal } from "@/components/QuoteModal";
import { ProductGallery } from "@/components/ProductGallery";


export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Product";
    const desc = loaderData?.description ?? "Welding equipment from ANU ARC Sales & Services.";
    return {
      meta: [
        { title: `${name} — ANU ARC Sales & Services` },
        { name: "description", content: desc.slice(0, 155) },
        { property: "og:title", content: `${name} — ANU ARC Sales & Services` },
        { property: "og:description", content: desc.slice(0, 155) },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <SparkField count={12} />
        <div className="pointer-events-none absolute -top-28 left-1/4 size-96 rounded-full bg-primary/15 blur-3xl glow-pulse" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-28 sm:px-6 lg:grid-cols-2 lg:pb-20 lg:pt-32">
          <div className="steel-panel rounded-xl border border-border p-6">
            <ProductGallery
              images={product.images}
              alt={`${product.name} (${product.model})`}
              labels={product.imageLabels}
              showThumbs
              imageClassName="max-h-[420px] h-[420px] w-full object-contain"
            />
          </div>


          <div>
            <nav className="font-mono text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="px-2">/</span>
              <Link to="/products" search={{ category: "All" }} className="hover:text-primary">Products</Link>
              <span className="px-2">/</span>
              <Link to="/products" search={{ category: product.category }} className="hover:text-primary">
                {product.category}
              </Link>
            </nav>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 font-mono text-sm text-spark">Model: {product.model}</p>
            <p className="mt-4 text-muted-foreground">{product.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="rounded-md border border-border bg-card px-4 py-2 font-display text-lg font-bold text-spark">
                Price on request
              </span>
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-ember"
              >
                Get a Price / Quote
              </button>
              <a
                href={product.datasheet}
                download
                className="inline-flex items-center gap-2 rounded-md border border-primary/50 px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
                </svg>
                Download datasheet
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">
              <span className="text-molten">Specifications</span>
            </h2>
            <dl className="mt-5 overflow-hidden rounded-xl border border-border">
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`grid grid-cols-1 gap-1 px-4 py-3 text-sm sm:grid-cols-[240px_1fr] ${i % 2 ? "bg-card/40" : ""}`}
                >
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-mono text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-display text-2xl font-bold">
              <span className="text-molten">Trade Information</span>
            </h2>
            <dl className="mt-5 space-y-3 rounded-xl border border-border p-5 text-sm">
              {product.trade.map((s) => (
                <div key={s.label}>
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-mono text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <h2 className="font-display text-2xl font-bold">
            About this <span className="text-molten">product</span>
          </h2>
          <div className="mt-4 max-w-4xl space-y-4 text-muted-foreground">
            {product.overview.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal className="mt-14">
            <h2 className="font-display text-2xl font-bold">
              Related <span className="text-molten">machines</span>
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$id"
                  params={{ id: p.id }}
                  className="steel-panel flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:border-primary/60"
                >
                  <img src={p.image} alt={p.name} width={80} height={80} className="size-16 shrink-0 object-contain" />
                  <span className="text-sm font-semibold leading-snug">{p.name}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </section>
      <QuoteModal product={product} open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}
