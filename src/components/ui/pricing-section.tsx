import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { GlassButton } from "@/components/ui/glass-button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const plans = [
  {
    name: "Inicial",
    description:
      "Ideal para empezar a automatizar tu negocio con IA. Landing page + agente IA + flujos básicos.",
    price: 89,
    yearlyPrice: 890,
    popular: false,
    includes: [
      "Incluye:",
      "Landing page optimizada SEO",
      "1 agente IA (chat web)",
      "3 flujos de automatización n8n",
      "Soporte por email",
      "Analíticas básicas",
      "Dominio personalizado",
      "SSL incluido",
    ],
  },
  {
    name: "Profesional",
    description:
      "La mejor opción para negocios en crecimiento. Automatización completa con múltiples agentes de IA.",
    price: 249,
    yearlyPrice: 2490,
    popular: true,
    includes: [
      "Todo en Inicial, más:",
      "Web personalizada multipágina",
      "3 agentes IA (chat, voz, email)",
      "10 flujos n8n avanzados",
      "Integración WhatsApp Business",
      "CRM integrado con Supabase",
      "Analíticas en tiempo real",
      "Soporte prioritario 48h",
    ],
  },
  {
    name: "Empresa",
    description:
      "Solución completa para equipos que necesitan máximo rendimiento y soporte dedicado.",
    price: 599,
    yearlyPrice: 5990,
    popular: false,
    includes: [
      "Todo en Profesional, más:",
      "Flujos n8n ilimitados",
      "Agentes IA ilimitados",
      "API personalizada",
      "SLA 99.9% garantizado",
      "Onboarding dedicado",
      "Soporte 24/7 con gestor asignado",
      "Formación del equipo incluida",
    ],
  },
];

function AnimatedPrice({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: 20, opacity: 0, filter: "blur(4px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="inline-block text-4xl font-bold"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

function PricingSwitch({ onSwitch }: { onSwitch: (value: string) => void }) {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-secondary border border-border p-1">
        {[
          { value: "0", label: "Mensual" },
          { value: "1", label: "Anual" },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleSwitch(value)}
            className={cn(
              "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-mono text-sm font-medium transition-colors",
              selected === value ? "text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {selected === value && (
              <motion.span
                layoutId="pricing-switch"
                className="absolute top-0 left-0 h-10 w-full rounded-full border-2 border-primary bg-gradient-to-t from-primary/80 to-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface PricingSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Resolve --primary at runtime so las partículas usan la cyan de marca
  const [brandCyan, setBrandCyan] = useState("hsl(166 100% 70%)");
  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();
    if (value) setBrandCyan(`hsl(${value})`);
  }, []);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.4, duration: 0.5 },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      className="min-h-screen mx-auto relative bg-background overflow-x-hidden"
      ref={pricingRef}
    >
      {/* Decorative grid + sparkles */}
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.08)_1px,transparent_1px)] bg-[size:70px_80px]" />
        <Sparkles
          density={isMobile ? 400 : 1200}
          direction="bottom"
          speed={1}
          color={brandCyan}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      {/* Decorative glow ellipse */}
      <TimelineContent
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute left-0 top-[-114px] w-full h-[114vh] flex flex-col items-start justify-start overflow-hidden p-0 z-0"
      >
        <div className="relative w-full h-full">
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] rounded-full"
            style={{
              border: "200px solid hsl(166 100% 70% / 0.15)",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
            }}
          />
        </div>
      </TimelineContent>

      {/* Header */}
      <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-2 relative z-50 px-6">
        <h2 className="text-4xl font-bold text-foreground">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Planes pensados para tu negocio
          </VerticalCutReveal>
        </h2>
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-muted-foreground font-body"
        >
          Resultados reales con IA. Elige el plan que mejor se adapte a tu
          negocio y empieza a automatizar desde hoy.
        </TimelineContent>
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      {/* Background radial glow */}
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, hsl(166 100% 70% / 0.12) 0%, transparent 70%)",
          opacity: 0.6,
          mixBlendMode: "screen",
        }}
      />

      {/* Plan cards */}
      <div className="grid md:grid-cols-3 max-w-5xl gap-4 py-6 mx-auto px-6">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={cn(
                "relative text-foreground border-border",
                plan.popular
                  ? "glass-panel shadow-[0px_-13px_300px_0px_hsl(var(--primary)/0.25)] z-20"
                  : "glass-panel z-10",
              )}
            >
              <CardHeader className="text-left">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                  {plan.popular && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary border border-primary/40 bg-primary/10 px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline">
                  <AnimatedPrice value={isYearly ? plan.yearlyPrice : plan.price} />
                  <span className="text-muted-foreground ml-1 font-mono text-sm">
                    €/{isYearly ? "año" : "mes"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-body mb-4 mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <GlassButton
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full mb-6 text-base"
                  size="lg"
                  onClick={() => onSelectPlan?.(plan.name)}
                >
                  Empezar ahora
                </GlassButton>
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <h4 className="font-mono font-medium text-sm mb-3 text-foreground">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-primary/60 rounded-full shrink-0" />
                        <span className="text-sm text-muted-foreground font-body">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
