import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import NeuralBackground from "@/components/ui/flow-field-background";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TerminalDemo } from "@/components/TerminalDemo";

const HeroSupreme = () => {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
        
        {/* Supreme Calm Background */}
        <div className="absolute inset-0 z-0">
          <NeuralBackground 
            color="#00E5B8" 
            trailOpacity={0.05} 
            speed={0.4} 
            particleCount={700} 
          />
        </div>

        {/* Gradiente para transición */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-brand-bg/40 to-brand-bg pointer-events-none" />

        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-brand-primary/30 z-[2]" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-brand-primary/30 z-[2]" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-brand-primary/30 z-[2]" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-brand-primary/30 z-[2]" />

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-bg-2/40 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary node-pulse" />
            <span className="font-mono text-[10px] text-brand-primary tracking-widest uppercase">
              Sistema operativo · v2.0.26
            </span>
          </motion.div>

          {/* Titulo principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-extrabold leading-[0.95] mb-8 tracking-tighter"
          >
            <span className="block text-2xl md:text-5xl text-brand-fg/80 font-semibold mb-2">
              Neoflow
            </span>
            <span className="block text-4xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-br from-brand-primary via-brand-accent to-brand-secondary">
              El motor de IA
            </span>
            <span className="block text-3xl md:text-6xl lg:text-7xl text-brand-fg mt-1">
              para tu negocio
            </span>
          </motion.h1>

          {/* Subtitulo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10"
          >
            <p className="font-sans text-lg md:text-xl text-brand-fg/70 max-w-2xl mx-auto mb-4 leading-relaxed">
              Automatiza las tareas que consumen tu tiempo. Pasa de{" "}
              <span className="font-mono text-destructive line-through">10,5h manuales/mes</span>{" "}
              a{" "}
              <span className="font-mono text-brand-primary font-semibold">
                minutos con IA
              </span>.
            </p>
            <p className="font-mono text-xs text-brand-muted">
              // Dato extraido del benchmarking de ineficiencia en pymes españolas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="font-display font-bold text-sm uppercase tracking-wider bg-brand-primary text-brand-bg hover:bg-brand-primary/90 px-8 py-6 shadow-[0_0_30px_rgba(0,229,184,0.3)] transition-all hover:scale-105"
              onClick={() =>
                document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              &gt; Flujo en Vivo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-display font-bold text-sm uppercase tracking-wider border-brand-primary/40 text-brand-primary hover:bg-brand-primary/10 px-8 py-6 transition-all"
              onClick={() =>
                document.getElementById("casos-uso")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explorar Serenidad
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-mono text-[10px] text-brand-fg/50 uppercase tracking-[0.3em]">
            Desliza para fluir
          </span>
          <div className="w-5 h-9 rounded-full border border-brand-primary/40 flex items-start justify-center p-1.5 shadow-[0_0_15px_rgba(0,229,184,0.2)]">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-brand-primary"
            />
          </div>
        </motion.div>
      </section>

      <section className="relative bg-transparent overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="space-y-3 mb-2">
              <p className="font-mono text-xs text-brand-primary tracking-[0.3em] uppercase">
                // panel operativo
              </p>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-brand-fg leading-tight tracking-tight">
                Tu negocio,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent block sm:inline drop-shadow-sm">
                  pilotado con serenidad
                </span>
              </h2>
            </div>
          }
        >
          <TerminalDemo />
        </ContainerScroll>
      </section>
    </>
  );
};

export default HeroSupreme;
