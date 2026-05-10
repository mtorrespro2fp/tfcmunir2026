import TubesBackground from "@/components/ui/neon-flow";
import { CinematicFooter } from "@/components/ui/motion-footer";
import Navbar from "@/components/Navbar";

export default function Proto2() {
  return (
    <div className="relative w-full bg-brand-bg min-h-screen font-sans selection:bg-brand-primary/20 overflow-x-hidden">
      <Navbar />

      <main className="relative z-10 w-full min-h-[120vh] bg-transparent flex flex-col items-center justify-center text-brand-fg border-b border-brand-primary/10 shadow-md rounded-b-[40px] overflow-hidden">
        
        {/* Interactive Tubes Background */}
        <div className="absolute inset-0 z-0">
          <TubesBackground enableClickInteraction={true} />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl pointer-events-none mt-20">
          <span className="text-brand-bg bg-brand-primary px-3 py-1 rounded-full uppercase tracking-widest text-xs font-bold mb-6 font-mono shadow-[0_0_15px_rgba(0,229,184,0.5)]">
            Prototipo 02 — Interactive Neon
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-brand-fg mb-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] leading-tight">
            Interacción <br /> <span className="text-brand-primary">Dinámica</span>
          </h1>
          <p className="text-brand-fg/90 text-lg md:text-xl max-w-2xl font-body mb-10 leading-relaxed drop-shadow-md bg-brand-bg/40 p-4 rounded-xl backdrop-blur-sm border border-brand-primary/20">
            Un efecto que reacciona a tus clics y movimientos. Transmite tecnología de vanguardia y conexiones inteligentes, ideal para una herramienta de automatización n8n.
          </p>
          
          <div className="animate-bounce mt-10 pointer-events-auto">
            <p className="text-sm text-brand-fg/60 uppercase tracking-widest font-mono mb-2">Haz clic en el fondo</p>
            <div className="w-[1px] h-20 bg-gradient-to-b from-brand-primary to-transparent mx-auto"></div>
          </div>
        </div>
      </main>

      {/* Cinematic Footer reveals under the main content */}
      <CinematicFooter />
    </div>
  );
}
