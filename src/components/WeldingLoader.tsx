import { useEffect, useRef, useState } from "react";

const DURATION = 2600; // ms of welding travel
const FADE = 500;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

const SPARK_COLORS = ["#ffd9a0", "#ffb35c", "#ff8c2e", "#fff3d6", "#ff6a00"];

export function WeldingLoader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    let fadeTimer: number | undefined;
    let goneTimer: number | undefined;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease slightly, like a welder settling into the seam
      const eased = t < 0.08 ? t * t / 0.08 : t;
      setProgress(eased);

      // spawn sparks at the weld point
      const bar = barRef.current;
      const sparkCanvas = canvasRef.current;
      if (bar && sparkCanvas && t < 1) {
        const rect = bar.getBoundingClientRect();
        const crect = sparkCanvas.getBoundingClientRect();
        const x = rect.left - crect.left + rect.width * eased;
        const y = rect.top - crect.top;
        const count = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: x + (Math.random() - 0.5) * 4,
            y: y + (Math.random() - 0.5) * 2,
            vx: (Math.random() - 0.5) * 2.4,
            vy: Math.random() * 1.2 + 0.4,
            life: 0,
            maxLife: 40 + Math.random() * 40,
            size: Math.random() * 2 + 0.8,
            color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)] ?? "#ff8c2e",
          });
        }
      }

      // draw sparks
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
          for (const p of particlesRef.current) {
            p.life++;
            p.vy += 0.12; // gravity
            p.vx *= 0.985;
            p.x += p.vx;
            p.y += p.vy;
            const a = 1 - p.life / p.maxLife;
            ctx.globalAlpha = a;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            // streak
            ctx.strokeStyle = p.color;
            ctx.lineWidth = p.size * 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
        }
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        fadeTimer = window.setTimeout(() => setLeaving(true), 200);
        goneTimer = window.setTimeout(() => setGone(true), 200 + FADE + 60);
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (goneTimer) clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  const pct = Math.round(progress * 100);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-[min(560px,86vw)]">
        <p className="mb-2 text-center font-display text-xl font-extrabold tracking-widest">
          <span className="text-foreground">ANU</span> <span className="text-primary">ARC</span>
        </p>
        <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          For Welding Precision
        </p>

        {/* sparks canvas covers arm + bar area */}
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

        {/* robotic welder arm riding along the bar */}
        <div
          className="pointer-events-none absolute bottom-[58px]"
          style={{ left: `${progress * 100}%` }}
        >
          <div style={{ transform: "translateX(-97px)" }}>
            <WelderArm welding={progress > 0.02 && progress < 1} />
          </div>
        </div>

        {/* loading bar */}
        <div
          ref={barRef}
          className="relative h-2 overflow-visible rounded-full border border-border bg-card"
        >
          {/* welded seam fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/80 via-primary to-spark"
            style={{ width: `${progress * 100}%` }}
          />
          {/* molten glow at the weld point */}
          <div
            className="absolute top-1/2 size-5 -translate-y-1/2 rounded-full bg-spark blur-[6px]"
            style={{
              left: `calc(${progress * 100}% - 10px)`,
              opacity: progress > 0 && progress < 1 ? 0.9 : 0,
            }}
          />
          <div
            className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-white"
            style={{
              left: `calc(${progress * 100}% - 4px)`,
              opacity: progress > 0 && progress < 1 ? 1 : 0,
              boxShadow: "0 0 12px 4px rgba(255,190,90,0.9)",
            }}
          />
        </div>

        <p className="mt-12 text-center font-mono text-xs tracking-[0.3em] text-spark">
          WELDING {pct}%
        </p>
      </div>
    </div>
  );
}

function WelderArm({ welding }: { welding: boolean }) {
  return (
    <svg
      width="120"
      height="110"
      viewBox="0 0 120 110"
      fill="none"
      className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
      style={{ transform: "translateY(-2px)" }}
    >
      {/* base */}
      <rect x="6" y="96" width="34" height="10" rx="2" fill="#3a3f46" stroke="#555c66" strokeWidth="1" />
      <rect x="14" y="82" width="18" height="14" rx="2" fill="#4a5058" stroke="#5f6772" strokeWidth="1" />
      {/* lower arm */}
      <line x1="23" y1="84" x2="46" y2="52" stroke="#e8611a" strokeWidth="9" strokeLinecap="round" />
      <line x1="23" y1="84" x2="46" y2="52" stroke="#ff8c3b" strokeWidth="4" strokeLinecap="round" />
      {/* elbow joint */}
      <circle cx="46" cy="52" r="7" fill="#4a5058" stroke="#6a727d" strokeWidth="1.5" />
      <circle cx="46" cy="52" r="2.5" fill="#ff8c3b" />
      {/* upper arm */}
      <line x1="46" y1="52" x2="78" y2="66" stroke="#e8611a" strokeWidth="8" strokeLinecap="round" />
      <line x1="46" y1="52" x2="78" y2="66" stroke="#ff8c3b" strokeWidth="3.5" strokeLinecap="round" />
      {/* wrist + torch angled down to bar */}
      <circle cx="78" cy="66" r="5" fill="#4a5058" stroke="#6a727d" strokeWidth="1.5" />
      <line x1="78" y1="66" x2="92" y2="92" stroke="#9aa3ad" strokeWidth="5" strokeLinecap="round" />
      <line x1="92" y1="92" x2="96" y2="104" stroke="#c8cfd6" strokeWidth="3" strokeLinecap="round" />
      {/* torch tip arc flash */}
      {welding && (
        <>
          <circle cx="96.5" cy="106" r="4" fill="#fff6e0">
            <animate attributeName="r" values="3;5;3.5;5.5;3" dur="0.35s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1;0.7;1" dur="0.28s" repeatCount="indefinite" />
          </circle>
          <circle cx="96.5" cy="106" r="9" fill="#ff9a2e" opacity="0.45">
            <animate attributeName="r" values="7;12;8;11;7" dur="0.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5;0.3;0.5" dur="0.3s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
}
