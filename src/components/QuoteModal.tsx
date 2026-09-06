import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { type Product } from "@/data/products";

const REASONS = ["Get Quotation", "Get Price List", "Discuss Requirement"] as const;

function buildTemplate(reason: string, product: Product): string {
  const intro = `Regarding: ${product.name} (${product.model})\n`;
  switch (reason) {
    case "Get Quotation":
      return `${intro}Could you please send me a quotation for the items listed below?`;
    case "Get Price List":
      return `${intro}Can you provide me with the latest price list for your products?`;
    case "Discuss Requirement":
      return `${intro}I would like to discuss my requirements in detail. Can we set up a time to talk?`;
    default:
      return intro;
  }
}

const inputClass =
  "w-full rounded-md border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";

export function QuoteModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const [reason, setReason] = useState<string>(REASONS[0]);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  // Tracks whether the user has manually typed into the textarea, so selecting
  // a different reason only overrides the message when it hasn't been edited.
  const editedRef = useRef(false);

  useEffect(() => {
    if (open) {
      setReason(REASONS[0]);
      editedRef.current = false;
      setMessage(buildTemplate(REASONS[0], product));
      setPhone("");
      setError("");
      setSent(false);
    }
  }, [open, product]);

  function selectReason(r: string) {
    setReason(r);
    // Only replace the message if the user hasn't manually edited it yet.
    if (!editedRef.current) {
      setMessage(buildTemplate(r, product));
    }
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setSent(true);
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Contact us for a quote"
    >
      <div
        className="steel-panel relative w-full max-w-lg rounded-xl border border-border p-6 shadow-2xl shadow-primary/10 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {sent ? (
          <div className="flex flex-col items-center py-10 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
              <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold">Request sent!</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Thank you — our team will contact you on <span className="font-mono text-foreground">+91 {phone}</span> shortly
              with the {reason.toLowerCase()} for the {product.name}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ember"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="font-display text-2xl font-bold">
              Contact <span className="text-molten">Us</span>
            </h2>
            <p className="mt-1 font-mono text-xs text-spark">
              {product.name} · {product.model}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {REASONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => selectReason(r)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    reason === r
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="quote-message" className="text-xs font-medium text-muted-foreground">
                  Tell us your requirement
                </label>
                <span className="text-[11px] text-spark/80">Pick an option to load a template</span>
              </div>
              <textarea
                id="quote-message"
                rows={5}
                value={message}
                onChange={(e) => {
                  editedRef.current = true;
                  setMessage(e.target.value);
                }}
                placeholder="Tell us your requirement"
                maxLength={1000}
                className={`${inputClass} resize-none py-3 leading-relaxed`}
              />
            </div>

            <div className="mt-4 flex gap-2">
              <span className="flex h-12 shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-3 font-mono text-sm text-muted-foreground">
                <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-[2px]" aria-hidden="true">
                  <rect width="24" height="16" fill="#f97316" opacity="0.85" />
                  <rect y="5.33" width="24" height="5.33" fill="#e2e8f0" />
                  <rect y="10.66" width="24" height="5.34" fill="#16a34a" opacity="0.9" />
                  <circle cx="12" cy="8" r="1.8" fill="none" stroke="#1e3a8a" strokeWidth="0.6" />
                </svg>
                +91
              </span>
              <input
                type="tel"
                required
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))}
                placeholder="Mobile number"
                aria-label="Mobile number"
                className={`${inputClass} h-12 font-mono`}
              />
            </div>
            {error && <p className="mt-2 text-xs font-medium text-destructive">{error}</p>}

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-ember"
            >
              Contact Now
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
