"use client";

import { lazy, Suspense } from "react";

/**
 * SplineRobot — escena 3D Nexbot cargada de Spline con lazy loading.
 * Se descarga ~500KB de runtime + la escena solo cuando entra en viewport,
 * sin bloquear el primer render de la web.
 */
const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL =
  "https://prod.spline.design/nexbotrobotcharacterconcept-q1aWEUBNjpxpr3NqESXidTQ4/scene.splinecode";

interface Props {
  className?: string;
  /** URL alternativa de la escena Spline (.splinecode) */
  sceneUrl?: string;
}

export function SplineRobot({ className = "", sceneUrl = SCENE_URL }: Props) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<RobotPlaceholder />}>
        <Spline scene={sceneUrl} />
      </Suspense>
    </div>
  );
}

/** Placeholder mientras se carga la escena (~500KB primera vez) */
function RobotPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-brand-primary/60 uppercase tracking-widest">
          cargando IA
        </span>
      </div>
    </div>
  );
}
