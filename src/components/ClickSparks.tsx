import { useEffect, useRef } from "react";

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

const SPARK_COLORS = ["#ff8c1a", "#ffb347", "#ffd27a", "#fff3d6"];

/**
 * Renders molten-metal sparks wherever the user clicks.
 * Canvas overlay is pointer-events: none so it never blocks UI.
 */
export function ClickSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let rafId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const burst = (x: number, y: number) => {
      const count = 14 + Math.floor(Math.random() * 8);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 4.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          life: 0,
          maxLife: 28 + Math.random() * 22,
          size: 1 + Math.random() * 2.2,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]!,
        });
      }
    };

    const onPointerDown = (e: PointerEvent) => burst(e.clientX, e.clientY);
    window.addEventListener("pointerdown", onPointerDown);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.vx *= 0.985;
        const t = 1 - p.life / p.maxLife;
        if (t <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = t;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * t, 0, Math.PI * 2);
        ctx.fill();
        // small streak for motion
        ctx.beginPath();
        ctx.strokeStyle = p.color;
        ctx.lineWidth = Math.max(0.5, p.size * t * 0.5);
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
        ctx.stroke();
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
