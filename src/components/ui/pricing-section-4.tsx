"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";

interface PricingSection4Props {
  onSelectPlan?: (planName: string, isYearly: boolean) => void;
}

const plans = [
  {
    name: "Starter",
    description:
      "Ideal para pequeños negocios que buscan empezar con IA",
    price: 89,
    yearlyPrice: 890,
    buttonText: "Empezar",
    buttonVariant: "outline" as const,
    includes: [
      "Funciones incluidas:",
      "1 Agente IA especializado",
      "Soporte por email",
      "Respuestas limitadas",
      "Configuración básica",
    ],
  },
  {
    name: "Business",
    description:
      "El mejor valor para empresas en crecimiento con necesidades avanzadas",
    price: 249,
    yearlyPrice: 2490,
    buttonText: "Empezar",
    buttonVariant: "default" as const,
    popular: true,
    includes: [
      "Todo lo de Starter, además:",
      "3 Agentes IA especializados",
      "Integración con WhatsApp",
      "Flujos en n8n ilimitados",
      "Soporte prioritario 24/7",
    ],
  },
  {
    name: "Enterprise",
    description:
      "Plan avanzado con seguridad mejorada y acceso ilimitado para grandes equipos",
    price: 599,
    yearlyPrice: 5990,
    buttonText: "Empezar",
    buttonVariant: "outline" as const,
    includes: [
      "Todo lo de Business, además:",
      "Agentes IA ilimitados",
      "Conexión a CRMs propios",
      "Entrenamiento IA a medida",
      "Manager de cuenta dedicado",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-brand-bg-2 border border-brand-primary/20 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-brand-bg" : "text-brand-fg",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border border-brand-primary bg-brand-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Mensual</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-brand-bg" : "text-brand-fg",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border border-brand-primary bg-brand-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Anual (-20%)</span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection4({ onSelectPlan }: PricingSection4Props) {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
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
      className="min-h-screen mx-auto relative bg-brand-bg overflow-x-hidden"
      ref={pricingRef}
    >
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] "
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#00E5B81a_1px,transparent_1px),linear-gradient(to_bottom,#00E5B81a_1px,transparent_1px)] bg-[size:70px_80px] "></div>
        <SparklesComp
          density={800}
          direction="bottom"
          speed={1}
          color="#00E5B8"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>
      
      <TimelineContent
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0 pointer-events-none"
      >
        <div className="mx-auto relative w-full max-w-4xl opacity-30">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-[1000px] flex-none rounded-full"
            style={{
              border: "100px solid #00E5B8",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
            }}
          ></div>
        </div>
      </TimelineContent>

      <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-2 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-brand-fg tracking-tight">
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
            Planes que se adaptan a ti
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-brand-fg/70 font-sans text-lg mt-4 max-w-xl mx-auto mb-10"
        >
          Elige la potencia de IA que tu negocio necesita. Empieza gratis o domina tu sector con soluciones Enterprise.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="mt-8 mb-16"
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      <div className="grid md:grid-cols-3 max-w-6xl gap-6 py-6 mx-auto px-4 lg:px-8 relative z-10">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={`relative border-brand-primary/20 flex flex-col h-full ${
                plan.popular
                  ? "bg-gradient-to-b from-brand-bg-2 to-brand-bg shadow-[0px_0px_50px_-15px_rgba(0,229,184,0.3)] z-20 scale-105"
                  : "bg-brand-bg-2/50 z-10"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-brand-primary text-brand-bg text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Más Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-left pb-4">
                <div className="flex justify-between">
                  <h3 className="text-2xl font-display font-semibold text-brand-fg">{plan.name}</h3>
                </div>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-brand-primary">
                    €
                    <NumberFlow
                      format={{
                        currency: "EUR",
                      }}
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-bold ml-1"
                    />
                  </span>
                  <span className="text-brand-fg/50 ml-1 text-sm font-mono">
                    /{isYearly ? "año" : "mes"}
                  </span>
                </div>
                <p className="text-sm text-brand-fg/70 mt-4 min-h-[40px]">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-1">
                <div className="mb-8">
                  {plan.popular ? (
                    <GlassButton 
                      className="w-full font-bold uppercase tracking-wider text-sm bg-brand-primary text-brand-bg hover:bg-brand-primary/90"
                      onClick={() => onSelectPlan?.(plan.name, isYearly)}
                    >
                      {plan.buttonText}
                    </GlassButton>
                  ) : (
                    <button
                      onClick={() => onSelectPlan?.(plan.name, isYearly)}
                      className="w-full py-3 rounded-full font-bold uppercase tracking-wider text-sm border border-brand-primary/40 text-brand-primary hover:bg-brand-primary/10 transition-colors"
                    >
                      {plan.buttonText}
                    </button>
                  )}
                </div>

                <div className="space-y-3 pt-6 border-t border-brand-primary/10 flex-1">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-brand-fg/60 mb-4">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-3">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 h-1.5 w-1.5 bg-brand-primary rounded-full shrink-0 shadow-[0_0_8px_rgba(0,229,184,0.8)]"></span>
                        <span className="text-sm text-brand-fg/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
      
      {/* Bottom padding for spacing */}
      <div className="h-24"></div>
    </div>
  );
}
