import Hero from "@/components/Hero";
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

const Index = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (planName: string, isYearly: boolean) => {
    navigate("/precios", { state: { planName, isYearly } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      {/* 01 — Hero (particulas + parallax) */}
      <Hero />
      {/* 02 — Logos de confianza */}
      <Logos3 />
      {/* 03 — Problema */}
      <Problem />
      {/* 04 — Arquitectura de la solucion */}
      <Solution />
      {/* 05 — Casos de uso para PYMEs */}
      <UseCasesSection />
      {/* 06 — Demo en vivo (formulario -> n8n) */}
      <LiveDemoSection />
      {/* 07 — Flujos n8n detallados */}
      <N8nMockup />
      {/* 08 — Precios */}
      <div id="precios" className="relative z-10 pt-20">
        <PricingSection4 onSelectPlan={handlePlanSelect} />
      </div>
      {/* 09 — ODS / impacto social */}
      <OdsSection />
      {/* 10 — Contacto */}
      <ContactSection />
      <Footer />
      <AIAgentButton />
    </div>
  );
};

export default Index;
