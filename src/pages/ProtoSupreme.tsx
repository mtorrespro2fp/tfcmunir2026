import HeroSupreme from "@/components/HeroSupreme";
import { Logos3 } from "@/components/ui/logos3";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import UseCasesSection from "@/components/UseCasesSection";
import LiveDemoSection from "@/components/LiveDemoSection";
import N8nMockup from "@/components/N8nMockup";
import PricingSection4 from "@/components/ui/pricing-section-4";
import OdsSection from "@/components/OdsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import AIAgentButton from "@/components/AIAgentButton";
import Navbar from "@/components/Navbar";
import TubesBackground from "@/components/ui/neon-flow";
import MatrixRain from "@/components/ui/matrix-code";

const ProtoSupreme = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (planName: string, isYearly: boolean) => {
    if (planName === "Demo Gratuita") {
      const contactSection = document.getElementById("contacto");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    navigate("/precios", { state: { planName, isYearly } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-brand-primary/20">
      <Navbar extraLinks={[
        { label: "Acerca de", href: "/acerca-de", isRoute: true },
        { label: "Términos", href: "/terminos", isRoute: true },
      ]} />

      {/* 01 — Hero con Neural Background */}
      <HeroSupreme />

      {/* 02 — Logos de confianza */}
      <Logos3 />

      {/* 03 — Problema */}
      <Problem />

      {/* ========================================================== */}
      {/* ZONA INTERACTIVA: TUBOS NEON PARA SOLUCIONES Y CASOS DE USO */}
      {/* ========================================================== */}
      <div className="relative w-full">
        <div className="absolute inset-0 z-0 pointer-events-auto mix-blend-screen opacity-50">
          <TubesBackground />
        </div>

        {/* Soft fading gradients to blend with surrounding sections */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-bg to-transparent z-[1] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-bg to-transparent z-[1] pointer-events-none"></div>

        <div className="relative z-10 pointer-events-none">
          {/* We make the sections pointer-events-auto so buttons still work inside them */}
          <div className="pointer-events-auto">
            <Solution />
          </div>
          <div className="pointer-events-auto">
            <UseCasesSection />
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* ZONA DE PROCESAMIENTO: MATRIZ CALMADA PARA DEMOS Y N8N */}
      {/* ========================================================== */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen">
          <MatrixRain
            fontSize={14}
            color="#00897B"
            characters="01NEOFLOW"
            fadeOpacity={0.08}
            speed={0.4}
          />
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-bg to-transparent z-[1] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-bg to-transparent z-[1] pointer-events-none"></div>

        <div className="relative z-10">
          <LiveDemoSection />
          <N8nMockup />
        </div>
      </div>

      {/* 08 — Precios */}
      <div id="precios" className="relative z-10 pt-20 bg-transparent">
        <PricingSection4 onSelectPlan={handlePlanSelect} />
      </div>

      {/* 09 — ODS / impacto social */}
      <OdsSection />

      {/* 10 — Contacto */}
      <ContactSection />

      {/* 11 — Footer Normal */}
      <Footer />

      <AIAgentButton />
    </div>
  );
};

export default ProtoSupreme;
