import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { type Product } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { QuoteModal } from "@/components/QuoteModal";
import { ProductGallery } from "@/components/ProductGallery";


export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <article className="group steel-panel flex h-full flex-col overflow-hidden rounded-xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10">
        <div className="relative overflow-hidden bg-background/40">
          <ProductGallery
            images={product.images}
            alt={`${product.name} (${product.model})`}
            labels={product.imageLabels}
            imageClassName="aspect-[16/10] w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />

          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              {product.badge}
            </span>
          )}
          <span className="absolute bottom-3 right-3 rounded bg-background/80 px-2 py-1 font-mono text-[11px] text-spark backdrop-blur-sm">
            {product.model}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            {product.category}
          </span>
          <h3 className="mt-1.5 font-display text-lg font-bold leading-snug">{product.name}</h3>
          <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">{product.description}</p>

          <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-[13px]">
            {product.specs.slice(0, 5).map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-4">
                <dt className="shrink-0 text-muted-foreground">{s.label}</dt>
                <dd className="truncate text-right font-mono text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-ember"
            >
              Get Price / Quote
            </button>
            <div className="mt-2 flex items-center justify-between gap-3">
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary/60 hover:text-primary"
              >
                View details
              </Link>
              <a
                href={product.datasheet}
                download
                className="inline-flex items-center gap-1.5 rounded-md border border-primary/50 px-3 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
                </svg>
                PDF
              </a>
            </div>
          </div>
        </div>
      </article>
      <QuoteModal product={product} open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </Reveal>
  );
}
