import { useMemo } from "react";

interface Spark {
  left: string;
  top: string;
  size: number;
  dx: string;
  dy: string;
  duration: string;
  delay: string;
}

/** Floating welding-spark particles. Render inside a relative container. */
export function SparkField({ count = 18, className = "" }: { count?: number; className?: string }) {
  const sparks = useMemo<Spark[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 53 + 7) % 100}%`,
        top: `${55 + ((i * 29) % 45)}%`,
        size: 2 + ((i * 7) % 4),
        dx: `${((i * 37) % 120) - 60}px`,
        dy: `${-80 - ((i * 41) % 180)}px`,
        duration: `${2.4 + ((i * 13) % 30) / 10}s`,
        delay: `${((i * 17) % 40) / 10}s`,
      })),
    [count],
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {sparks.map((s, i) => (
        <span
          key={i}
          className="spark-particle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            // @ts-expect-error CSS custom props
            "--dx": s.dx,
            "--dy": s.dy,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
