import NeuralBackground from "@/components/ui/flow-field-background";
import { CinematicFooter } from "@/components/ui/motion-footer";
import Navbar from "@/components/Navbar";

export default function Proto1() {
  return (
    <div className="relative w-full bg-brand-bg min-h-screen font-sans selection:bg-brand-primary/20 overflow-x-hidden">
      <Navbar />

      <main className="relative z-10 w-full min-h-[120vh] bg-transparent flex flex-col items-center justify-center text-brand-fg border-b border-brand-primary/10 shadow-md rounded-b-[40px] overflow-hidden">
        
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <NeuralBackground 
            color="#00E5B8" 
            trailOpacity={0.08} 
            speed={0.5} 
            particleCount={500} 
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl backdrop-blur-sm bg-brand-bg/30 p-12 rounded-3xl border border-brand-primary/20">
          <span className="text-brand-primary uppercase tracking-widest text-sm mb-4 font-mono">
            // Prototipo 01 — Calm Flow
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-brand-fg mb-6 drop-shadow-lg">
            Siente el <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Flujo</span>
          </h1>
          <p className="text-brand-fg/80 text-lg md:text-xl max-w-2xl font-body mb-10 leading-relaxed">
            Una experiencia diseñada para transmitir alivio y profesionalidad. Los colores suaves y el movimiento calmado reflejan cómo NeoFlow simplifica tus procesos automáticos.
          </p>
          
          <button className="px-8 py-4 bg-brand-bg-2 border border-brand-primary/30 rounded-full text-brand-fg font-medium hover:bg-brand-primary/10 hover:border-brand-primary/60 transition-all duration-300">
            Desliza hacia abajo
          </button>
        </div>
      </main>

      {/* Cinematic Footer reveals under the main content */}
      <CinematicFooter />
    </div>
  );
}
