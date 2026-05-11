import React, { useEffect, useRef } from 'react';
import { useCanvasVisibility } from '@/hooks/use-canvas-visibility';

interface MatrixRainProps {
  fontSize?: number;
  color?: string;
  characters?: string;
  fadeOpacity?: number;
  speed?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  fontSize = 20,
  color = '#00E5B8', // NeoFlow Cyan
  characters = '01',
  fadeOpacity = 0.1,
  speed = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisible = useCanvasVisibility(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = characters.split('');
    const drops: number[] = [];
    const columnCount = Math.floor(window.innerWidth / fontSize);

    for (let i = 0; i < columnCount; i++) {
      drops[i] = Math.random() * -100;
    }

    const interval = (33 / speed);
    let lastTime = 0;

    const draw = (timestamp: number) => {
      if (!isVisible) {
        animFrameId = requestAnimationFrame(draw);
        return;
      }

      if (timestamp - lastTime < interval) {
        animFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      ctx.fillStyle = `rgba(13, 17, 23, ${fadeOpacity})`; // Brand BG color
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed; 
      }
      
      animFrameId = requestAnimationFrame(draw);
    };

    animFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [fontSize, color, characters, fadeOpacity, speed, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default MatrixRain;
