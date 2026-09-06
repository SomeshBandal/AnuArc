import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES } from "@/data/products";
import logoHd from "@/assets/anu-arc-logo-hd.png";
import { Typewriter } from "@/components/Typewriter";

function LogoMark() {
  return (
    <span className="relative block h-12 shrink-0">
      <img
        src={logoHd}
        alt="ANU ARC — For Welding Precision"
        className="logo-welcome h-full w-auto object-contain drop-shadow-[0_0_12px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]"
      />
      <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-spark arc-flicker" />
    </span>
  );
}

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Our Products" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              ANU <span className="text-primary">ARC</span>
            </span>
            <span className="mt-0.5 inline-flex items-center text-[0.625rem] font-medium uppercase tracking-[0.18em] text-primary">
              <Typewriter text="For Welding Precision" />
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Our Products" ? (
              <div key={link.to} className="group relative">
                <Link
                  to="/products"
                  search={{ category: "All" }}
                  className="link-molten flex items-center gap-1.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground active" }}
                >
                  Our Products
                  <svg viewBox="0 0 24 24" className="size-3.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="w-60 rounded-xl border border-border bg-popover p-2 shadow-2xl shadow-black/50">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat}
                        to="/products"
                        search={{ category: cat }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <span className="size-1.5 rounded-full bg-primary" />
                        {cat}
                      </Link>
                    ))}
                    <div className="mt-1 border-t border-border pt-1">
                      <Link
                        to="/products"
                        search={{ category: "All" }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-secondary"
                      >
                        View full catalogue →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="link-molten py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground active" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            to="/contact"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-ember hover:shadow-primary/40"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          className="grid size-10 place-items-center rounded-md border border-border text-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
