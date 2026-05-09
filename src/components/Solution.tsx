import { motion } from "framer-motion";
import { Globe, Bot, Workflow } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Webs de Alto Rendimiento",
    description: "Sitios web optimizados para conversión, velocidad y SEO. Tu escaparate digital que trabaja las 24 horas.",
    tag: "frontend",
    color: "primary" as const,
    action: () => document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth" }),
    actionLabel: "→ probar formulario en vivo",
  },
  {
    icon: Bot,
    title: "Agentes de IA 24/7",
    description: "Asistentes inteligentes que atienden, responden y cualifican clientes mientras tú descansas. Clasifican consultas y actualizan tu CRM.",
    tag: "ai-agent",
    color: "accent" as const,
    action: () => window.dispatchEvent(new Event("open-ai-agent")),
    actionLabel: "→ ver el agente en acción",
  },
  {
    icon: Workflow,
    title: "Orquestación con n8n",
    description: "Flujos automatizados que conectan tu CRM, email, WhatsApp y facturación. 3 flujos reales listos para importar.",
    tag: "automation",
    color: "primary" as const,
    action: () => document.getElementById("flujos")?.scrollIntoView({ behavior: "smooth" }),
    actionLabel: "→ explorar flujos n8n",
  },
];

const Solution = () => {
  return (
    <section id="solucion" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // 02 — Arquitectura de la Solución
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-light-slate mb-16"
        >
          Tres pilares. <span className="text-gradient-cyan">Un sistema.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="glass-card-cyan p-6 md:p-8 group hover:border-primary/60 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded border ${pillar.color === "accent" ? "border-accent/30 text-accent" : "border-primary/30 text-primary"}`}>
                  <pillar.icon size={24} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[10px] text-cool-gray uppercase tracking-widest">
                  {pillar.tag}
                </span>
              </div>

              <h3 className="font-mono text-lg font-semibold text-light-slate mb-3">
                {pillar.title}
              </h3>

              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>

              <div className="mt-6 pt-4 border-t border-border/50">
                <button
                  onClick={pillar.action}
                  className="font-mono text-xs text-primary group-hover:text-primary transition-colors hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  {pillar.actionLabel}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
