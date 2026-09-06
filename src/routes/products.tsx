import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, type ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SparkField } from "@/components/SparkField";

type CategoryFilter = ProductCategory | "All";

function parseCategory(value: unknown): CategoryFilter {
  return typeof value === "string" && (CATEGORIES as string[]).includes(value)
    ? (value as ProductCategory)
    : "All";
}

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): { category: CategoryFilter } => ({
    category: parseCategory(search["category"]),
  }),
  head: () => ({
    meta: [
      { title: "Our Products — ANU ARC Sales & Services" },
      {
        name: "description",
        content:
          "Browse the ANU ARC welding equipment catalogue: MIG welding machines, MIG welding torches, TIG/SAW/laser welding machines and batching controllers with full specifications and downloadable PDF datasheets.",
      },
      { property: "og:title", content: "Our Products — ANU ARC Sales & Services" },
      {
        property: "og:description",
        content:
          "MIG welding machines, torches, TIG/SAW/laser welders and controllers — full specs and PDF datasheets from ANU ARC, Indore.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "name", label: "Name: A to Z" },
  { value: "category", label: "Category" },
] as const;

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["value"]>("featured");

  const products = useMemo(() => {
    const filtered =
      category === "All" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === category);
    switch (sort) {
      case "category":
        return filtered.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [category, sort]);

  return (
    <main>
      {/* Page hero */}
      <section className="relative overflow-hidden border-b border-border">
        <SparkField count={14} />
        <div className="pointer-events-none absolute -top-32 left-1/3 size-96 rounded-full bg-primary/15 blur-3xl glow-pulse" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Catalogue</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our <span className="text-molten">Products</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Every machine listed with its model number, full specifications and a
            downloadable PDF datasheet. Filter by category to find your setup.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative">
            <span className="sr-only">Filter by category</span>
            <select
              value={category}
              onChange={(e) =>
                navigate({
                  search: { category: e.target.value as CategoryFilter },
                  replace: true,
                })
              }
              className="h-11 cursor-pointer appearance-none rounded-md border border-border bg-card pl-4 pr-10 text-sm font-medium outline-none transition-colors hover:border-primary focus:border-primary"
            >
              <option value="All">Category: All</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </label>

          <label className="relative">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="h-11 cursor-pointer appearance-none rounded-md border border-border bg-card pl-4 pr-10 text-sm font-medium outline-none transition-colors hover:border-primary focus:border-primary"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </label>

          <span className="ml-auto font-mono text-xs text-muted-foreground">
            {products.length} {products.length === 1 ? "machine" : "machines"}
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={(i % 3) * 90} />
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="steel-panel flex flex-col items-center gap-4 rounded-xl border border-border px-6 py-10 text-center">
            <h2 className="font-display text-2xl font-bold">Need the full catalogue?</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Download the complete product catalogue with every model and its full specifications.
            </p>
            <a
              href="/datasheets/anu-arc-full-catalogue.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-ember"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
              </svg>
              Download Full Catalogue (PDF)
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
