import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-lg font-extrabold tracking-tight">
            ANU<span className="text-primary">ARC</span>
            <span className="ml-2 font-mono text-[9px] font-medium tracking-[0.25em] text-muted-foreground">
              FOR WELDING PRECISION
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Trader and supplier of MIG welding machines, MIG welding torches, TIG, SAW and laser
            welding machines, batching controllers and consumables. Sales, installation and service.
          </p>
          <div className="mt-5 space-y-1.5 font-mono text-xs text-muted-foreground">
            <p>Phone: +91 9403614761 / +91 9405575965</p>
            <p>Email:&nbsp; office@anuarc.in</p>
            <p>Showroom:&nbsp;CM 2nd-560, Pandit Dindayal Upadhyay Nagar, Nyay Nagar, Sukhliya, Indore, Madhya Pradesh 452010, India</p>
          </div>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Products</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link
                  to="/products"
                  search={{ category: cat }}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="text-muted-foreground transition-colors hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">About Us</Link></li>
            <li><Link to="/products" search={{ category: "All" }} className="text-muted-foreground transition-colors hover:text-primary">Catalogue</Link></li>
            <li><Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} ANU ARC Welding Systems. All rights reserved.</span>
          <span className="font-mono">Forged with precision · Strike every arc with confidence</span>
        </div>
      </div>
    </footer>
  );
}
