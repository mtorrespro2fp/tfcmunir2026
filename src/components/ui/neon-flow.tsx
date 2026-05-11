"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({ 
  children, 
  className,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const updateSize = (e?: Event) => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      
      // Re-start loop if we pass to desktop (only on actual resize event)
      if (e && window.innerWidth >= 768) {
        cancelAnimationFrame(animationFrameId);
        render();
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);

    const mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0 };
    const target = { x: width / 2, y: height / 2 };
    
    let clientX = width / 2;
    let clientY = height / 2;
    let idleTime = 0;
    let isIdle = true;

    const updateTarget = () => {
      const rect = canvas.getBoundingClientRect();
      target.x = clientX - rect.left;
      target.y = clientY - rect.top;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Prevent guiding on mobile
      clientX = e.clientX;
      clientY = e.clientY;
      isIdle = false;
      idleTime = 0;
      updateTarget();
    };

    // Listen to touch events to prevent accidental guiding on scroll
    const handleTouchMove = (e: TouchEvent) => {
      if (window.innerWidth < 768) return;
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        isIdle = false;
        idleTime = 0;
        updateTarget();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', updateTarget, { passive: true });

    // Trail logic
    const segments = 60; 
    const history: {x: number, y: number}[] = [];
    for (let i=0; i<segments; i++) history.push({x: width/2, y: height/2});

    let time = 0;

    function render() {
      // Complete stop on mobile to save CPU/Battery
      if (window.innerWidth < 768) {
        return; 
      }
      
      time += 0.016; 
      
      if (!isIdle) {
        idleTime += 0.016;
        if (idleTime > 2.0) isIdle = true;
      }

      if (isIdle) {
        const centerX = width / 2;
        const centerY = height / 2;
        // Consistent patrol movement: smooth wide figure 8
        const wanderX = Math.sin(time * 1.2) * (width * 0.4);
        const wanderY = Math.sin(time * 0.6) * Math.cos(time * 0.4) * (height * 0.35);
        
        clientX += ((centerX + wanderX) - clientX) * 0.02;
        clientY += ((centerY + wanderY) - clientY) * 0.02;
        updateTarget();
      }

      // Sluggish physics for a heavy "gel/venom" feel
      mouse.vx += (target.x - mouse.x) * 0.03;
      mouse.vy += (target.y - mouse.y) * 0.03;
      mouse.vx *= 0.82; 
      mouse.vy *= 0.82;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      history.unshift({ x: mouse.x, y: mouse.y });
      history.pop();

      ctx.clearRect(0, 0, width, height);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < history.length - 1; i++) {
        const p1 = history[i];
        const p2 = history[i + 1];
        
        const prev = i > 0 ? history[i - 1] : p1;
        const xc1 = (prev.x + p1.x) / 2;
        const yc1 = (prev.y + p1.y) / 2;
        const xc2 = (p1.x + p2.x) / 2;
        const yc2 = (p1.y + p2.y) / 2;

        const opacity = Math.pow(1 - (i / history.length), 1.2); 
        if (opacity <= 0.01) continue;

        ctx.globalAlpha = opacity;

        const drawSegment = (width: number, color: string, blur: number) => {
          ctx.beginPath();
          ctx.moveTo(xc1, yc1);
          ctx.quadraticCurveTo(p1.x, p1.y, xc2, yc2);
          ctx.lineWidth = width;
          ctx.strokeStyle = color;
          ctx.shadowBlur = blur;
          ctx.shadowColor = blur > 0 ? "#00E5B8" : "transparent";
          ctx.stroke();
        };

        // Base dark gelatinous mass
        drawSegment(50, "rgba(2, 25, 18, 0.2)", 0);
        
        // Inner mass body
        drawSegment(25, "rgba(5, 40, 30, 0.4)", 5);
        
        // Intense professional glow
        drawSegment(6, "rgba(0, 229, 184, 0.8)", 50); 
        drawSegment(2.5, "rgba(255, 255, 255, 1)", 20); 
      }
      
      ctx.globalAlpha = 1.0;
      
      // Draw a highly visible glowing "head" (the ball)
      const head = history[0];
      ctx.beginPath();
      ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 30;
      ctx.shadowColor = "#00E5B8";
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', updateTarget);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={cn("relative w-full h-full min-h-[400px] overflow-hidden hidden md:block", className)}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block mix-blend-screen opacity-70"
        style={{ touchAction: 'none' }}
      />
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
