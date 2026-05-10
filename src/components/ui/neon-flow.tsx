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
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const updateSize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
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
      clientX = e.clientX;
      clientY = e.clientY;
      isIdle = false;
      idleTime = 0;
      updateTarget();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', updateTarget, { passive: true });

    // Trail logic
    const segments = 60; 
    const history: {x: number, y: number}[] = [];
    for (let i=0; i<segments; i++) history.push({x: width/2, y: height/2});

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.016; 
      
      if (!isIdle) {
        idleTime += 0.016;
        if (idleTime > 2.0) isIdle = true;
      }

      if (isIdle) {
        const centerX = width / 2;
        const centerY = height / 2;
        const wanderX = Math.sin(time * 0.8) * Math.cos(time * 0.5) * (width * 0.4);
        const wanderY = Math.sin(time * 0.5) * (height * 0.25);
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

        // Base dark gelatinous mass (subtle, less saturated, thick)
        drawSegment(50, "rgba(2, 25, 18, 0.15)", 0);
        
        // Inner mass body
        drawSegment(25, "rgba(5, 40, 30, 0.3)", 5);
        
        // Intense professional glow on the small inner lines (perfectly centered now)
        drawSegment(4, "rgba(0, 229, 184, 0.6)", 40); // Enormous cyan glow
        drawSegment(1.5, "rgba(255, 255, 255, 0.9)", 15); // Sharp bright core
      }
      
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', updateTarget);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={cn("relative w-full h-full min-h-[400px] overflow-hidden", className)}>
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
