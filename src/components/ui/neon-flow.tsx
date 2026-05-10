import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({ 
  children, 
  className,
  enableClickInteraction = true 
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // @ts-ignore
        const module = await import('threejs-components/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#00E5B8", "#00897B", "#6EE7B7"], // NeoFlow colors
            lights: {
              intensity: 200,
              colors: ["#00E5B8", "#1C2833", "#0D1117", "#00897B"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {};

        window.addEventListener('resize', handleResize);
        
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
        };

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    
    // NeoFlow brand colors variation
    const colors = ["#00E5B8", "#00897B", "#6EE7B7", "#E0F2F1"];
    // Shuffle colors
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random()).slice(0, 3);
    const lightsColors = [...colors].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    tubesRef.current.tubes.setColors(shuffledColors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-[400px] overflow-hidden bg-brand-bg", className)}
      onClick={handleClick}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
