import MatrixRain from "@/components/ui/matrix-code";
import { CinematicFooter } from "@/components/ui/motion-footer";
import Navbar from "@/components/Navbar";

export default function Proto3() {
  return (
    <div className="relative w-full bg-brand-bg min-h-screen font-sans selection:bg-brand-primary/20 overflow-x-hidden">
      <Navbar />

      <main className="relative z-10 w-full min-h-[120vh] bg-transparent flex flex-col items-center justify-center text-brand-fg border-b border-brand-primary/10 shadow-md rounded-b-[40px] overflow-hidden">
        
        {/* Calm Matrix Background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
          <MatrixRain 
            fontSize={16}
            color="#00897B" // Muted teal for calmness
            characters="01NEOFLOW"
            fadeOpacity={0.05}
            speed={0.3} // Slow, calm speed
          />
        </div>
        
        {/* Soft overlay to ensure readability and calmness */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/80 via-transparent to-brand-bg z-0 pointer-events-none"></div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mt-10">
          <span className="text-[#00897B] border border-[#00897B]/50 px-4 py-1.5 rounded-full uppercase tracking-widest text-xs font-bold mb-8 font-mono bg-brand-bg/80 backdrop-blur-md">
            Prototipo 03 — Digital Serenity
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-light tracking-widest text-brand-fg mb-6">
            PROCESOS <span className="font-black text-[#00E5B8]">TRANQUILOS</span>
          </h1>
          <p className="text-brand-fg/70 text-lg max-w-2xl font-mono mb-12 leading-relaxed bg-brand-bg/60 p-6 rounded-2xl border border-brand-primary/10 backdrop-blur-md">
            El código corre en segundo plano para que tú no tengas que hacerlo. Un diseño que inspira confianza, donde la tecnología compleja se ejecuta con simplicidad y calma.
          </p>
          
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-transparent border border-brand-primary text-brand-primary rounded font-mono text-sm hover:bg-brand-primary hover:text-brand-bg transition-colors duration-300">
              EXPLORAR_
            </button>
          </div>
        </div>
      </main>

      {/* Cinematic Footer reveals under the main content */}
      <CinematicFooter />
    </div>
  );
}
