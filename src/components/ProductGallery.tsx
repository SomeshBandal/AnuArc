import { useEffect, useState } from "react";

interface Props {
  images: string[];
  alt: string;
  className?: string;
  showThumbs?: boolean;
  imageClassName?: string;
  labels?: string[] | undefined;
}

export function ProductGallery({
  images,
  alt,
  className = "",
  showThumbs = false,
  imageClassName = "aspect-[16/10] w-full object-contain p-4",
  labels,
}: Props) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    setIndex(0);
  }, [images]);

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);
  const label = labels?.[index];

  return (
    <div className={className}>
      <div className="group/gallery relative overflow-hidden">
        <img
          key={index}
          src={images[index]}
          alt={label ? `${label} — ${alt}` : `${alt} — view ${index + 1} of ${total}`}
          loading="lazy"
          className={`${imageClassName} transition-opacity duration-300`}
        />

        {label && (
          <span className="absolute left-3 top-3 rounded-md border border-primary/50 bg-background/85 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
            {label}
          </span>
        )}


        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground opacity-0 backdrop-blur transition-all hover:border-primary hover:text-primary group-hover/gallery:opacity-100 focus-visible:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground opacity-0 backdrop-blur transition-all hover:border-primary hover:text-primary group-hover/gallery:opacity-100 focus-visible:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Show image ${i + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/50 hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {showThumbs && total > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={`rounded-lg border p-1.5 transition-all ${
                i === index ? "border-primary" : "border-border hover:border-primary/60"
              }`}
            >
              <img src={src} alt="" className="size-16 object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
