"use client";

import React, { useEffect, useRef, useCallback } from "react";

/**
 * AntiGravityCanvas: capa de fondo con particulas que reaccionan al raton.
 * Extraido del demo "particle-effect-for-hero": SOLO el canvas, sin nav ni hero
 * (esos los aporta el resto de la web).
 */

interface Particle {
  x: number; y: number;
  originX: number; originY: number;
  vx: number; vy: number;
  size: number; color: string;
  angle: number;
}

interface BackgroundParticle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
  phase: number;
}

interface MouseState { x: number; y: number; isActive: boolean; }

// Densidad adaptativa: en movil reducimos 60% para no matar rendimiento
const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;
const getParticleDensity = () => (isMobile() ? 0.00005 : 0.00012);
const getBgDensity = () => (isMobile() ? 0.00002 : 0.00004);
const MOUSE_RADIUS = 180;
const RETURN_SPEED = 0.08;
const DAMPING = 0.90;
const REPULSION_STRENGTH = 1.2;

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

interface Props {
  className?: string;
  /** Color principal de las particulas (default cian NeoFlow) */
  primaryColor?: string;
  /** Color del glow radial (default cian NeoFlow) */
  glowColor?: string;
}

export const ParticleCanvas: React.FC<Props> = ({
  className = "",
  primaryColor = "#00E5B8",
  glowColor = "0, 229, 184",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const backgroundParticlesRef = useRef<BackgroundParticle[]>([]);
  const mouseRef = useRef<MouseState>({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef<number>(0);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const frameCountRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  const initParticles = useCallback((width: number, height: number) => {
    // Hard cap the number of particles to prevent GPU overload on 4K/Ultra-wide screens
    const rawParticleCount = Math.floor(width * height * getParticleDensity());
    const particleCount = Math.min(rawParticleCount, 60); 

    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      newParticles.push({
        x, y, originX: x, originY: y, vx: 0, vy: 0,
        size: randomRange(1, 2.5),
        color: Math.random() > 0.85 ? primaryColor : "#ffffff",
        angle: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = newParticles;

    const rawBgCount = Math.floor(width * height * getBgDensity());
    const bgCount = Math.min(rawBgCount, 40);

    const newBgParticles: BackgroundParticle[] = [];
    for (let i = 0; i < bgCount; i++) {
      newBgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: randomRange(0.5, 1.5),
        alpha: randomRange(0.1, 0.4),
        phase: Math.random() * Math.PI * 2,
      });
    }
    backgroundParticlesRef.current = newBgParticles;
  }, [primaryColor]);

  const animate = useCallback((time: number) => {
    if (!isVisibleRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pulsating glow
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const pulse = Math.sin(time * 0.0008) * 0.03 + 0.07;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(canvas.width, canvas.height) * 0.7);
    grad.addColorStop(0, `rgba(${glowColor}, ${pulse})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Background twinkle particles
    const bg = backgroundParticlesRef.current;
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < bg.length; i++) {
      const p = bg[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      const tw = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5;
      ctx.globalAlpha = p.alpha * (0.3 + 0.7 * tw);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Foreground particles physics
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (mouse.isActive && distance < MOUSE_RADIUS) {
        const forceX = dx / distance;
        const forceY = dy / distance;
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        const repulsion = force * REPULSION_STRENGTH;
        p.vx -= forceX * repulsion * 5;
        p.vy -= forceY * repulsion * 5;
      }
      p.vx += (p.originX - p.x) * RETURN_SPEED;
      p.vy += (p.originY - p.y) * RETURN_SPEED;
    }

    // Drawing
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.vx *= DAMPING; p.vy *= DAMPING;
      p.x += p.vx; p.y += p.vy;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.3 + velocity * 0.1, 1);
      ctx.fillStyle = p.color === "#ffffff" ? `rgba(255,255,255,${opacity})` : p.color;
      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, [glowColor]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      initParticles(width, height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [initParticles]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (containerRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            cancelAnimationFrame(frameIdRef.current);
            frameIdRef.current = requestAnimationFrame(animate);
          }
        });
      }, { threshold: 0 });
      observer.observe(containerRef.current);
      // El observer arranca el loop al detectar visibilidad inicial
    } else {
      // Fallback si el ref no está disponible
      frameIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      if (observer) observer.disconnect();
    };
  }, [animate]);

  // Track mouse globally so the effect feels alive across the whole page-section
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      lastMoveTimeRef.current = Date.now();
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      };
    };
    const handleLeave = () => { mouseRef.current.isActive = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
