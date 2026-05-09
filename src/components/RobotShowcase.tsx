import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SplineRobot } from "@/components/ui/spline-robot";

/**
 * RobotShowcase — seccion dedicada al robot 3D Spline.
 * Usa IntersectionObserver para no cargar la escena (~500KB)
 * hasta que el usuario llega a esta zona.
 */
const RobotShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="robot-showcase"
      className="relative py-20 md:py-32 bg-brand-bg overflow-hidden"
    >
      {/* Glow de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-primary/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Lado izquierdo — Texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="font-mono text-xs text-brand-primary tracking-[0.3em] uppercase">
              // 03 — Tu nuevo empleado de IA
            </span>

            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-brand-fg leading-[0.95] tracking-tight">
              Trabaja contigo,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
                no por ti.
              </span>
            </h2>

            <p className="font-sans text-base md:text-lg text-brand-fg/70 leading-relaxed max-w-xl">
              Nexbot es la cara visible del agente de IA de Neoflow. Atiende clientes,
              califica leads, gestiona reservas y actualiza tu CRM mientras tu equipo se
              centra en lo que de verdad importa: vender y crecer.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { val: "24/7", lbl: "Disponibilidad" },
                { val: "<2s", lbl: "Tiempo respuesta" },
                { val: "+92%", lbl: "Consultas resueltas" },
              ].map((s) => (
                <div
                  key={s.lbl}
                  className="glass-panel p-4 text-center"
                >
                  <div className="font-display font-extrabold text-2xl md:text-3xl text-brand-primary">
                    {s.val}
                  </div>
                  <div className="font-mono text-[10px] text-brand-muted uppercase tracking-wider mt-1">
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lado derecho — Robot 3D Spline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] md:h-[600px] w-full"
          >
            {shouldLoad ? (
              <SplineRobot className="rounded-2xl overflow-hidden" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-brand-primary/20" />
              </div>
            )}

            {/* Overlay para tapar la marca de agua de Spline (la "made with Spline") */}
            <div className="absolute bottom-0 right-0 w-44 h-14 bg-brand-bg pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RobotShowcase;
