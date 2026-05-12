import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, CalendarCheck, Target, Package, Receipt, Bot, Megaphone } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
interface UseCase {
  id: number;
  icon: any;
  title: string;
  sector: string;
  description: string;
  tags: string[];
  saves: string;
  nodes: { label: string; type: string; sub: string }[];
  benefit: string;
}

const NODE_COLORS: Record<string, string> = {
  webhook: "#FF6D5A",
  set: "#31C46D",
  if: "#1F91FA",
  ai: "#9B59B6",
  email: "#EA4335",
  crm: "#F39C12",
  whatsapp: "#25D366",
  calendar: "#4285F4",
  sheet: "#0F9D58",
  invoice: "#FF9800",
  respond: "#2ECC71",
  sms: "#607D8B",
  social: "#E91E63",
};

const USE_CASES: UseCase[] = [
  {
    id: 1,
    icon: CalendarCheck,
    title: "Reservas Automáticas",
    sector: "Restaurantes · Clínicas · Spas",
    description:
      "El cliente reserva desde la web, WhatsApp o Google Maps. n8n confirma al instante, añade al calendario y recuerda 2h antes.",
    tags: ["webhook", "calendar", "whatsapp"],
    saves: "8h / semana",
    nodes: [
      { label: "Webhook", type: "webhook", sub: "POST /reserva" },
      { label: "Calendar", type: "calendar", sub: "Crear evento" },
      { label: "WhatsApp", type: "whatsapp", sub: "Confirmar cita" },
      { label: "Schedule", type: "set", sub: "Recordatorio -2h" },
    ],
    benefit: "0 llamadas para confirmar citas · Reducción de no-shows del 60%",
  },
  {
    id: 2,
    icon: Target,
    title: "Cualificación de Leads",
    sector: "Ventas · Inmobiliarias · Seguros",
    description:
      "Cada formulario es analizado por IA: detecta intención, puntúa el lead (1-10) y enruta al comercial correcto o al flujo de nurturing.",
    tags: ["webhook", "ai", "crm"],
    saves: "12h / semana",
    nodes: [
      { label: "Webhook", type: "webhook", sub: "Nuevo contacto" },
      { label: "AI Score", type: "ai", sub: "GPT-4o · puntuación" },
      { label: "IF", type: "if", sub: "Score > 7" },
      { label: "CRM", type: "crm", sub: "Asignar comercial" },
    ],
    benefit: "Solo hablas con leads calientes · Conversión +35%",
  },
  {
    id: 3,
    icon: Package,
    title: "Seguimiento de Pedidos",
    sector: "E-commerce · Tiendas · Logística",
    description:
      "Cada cambio de estado de pedido dispara notificación automática. El cliente sabe en tiempo real dónde está su compra.",
    tags: ["webhook", "email", "whatsapp"],
    saves: "6h / semana",
    nodes: [
      { label: "Trigger", type: "webhook", sub: "Estado cambia" },
      { label: "Set", type: "set", sub: "Formatear mensaje" },
      { label: "Email", type: "email", sub: "Notificación" },
      { label: "WhatsApp", type: "whatsapp", sub: "SMS alternativo" },
    ],
    benefit: "75% menos consultas de soporte · NPS +22 puntos",
  },
  {
    id: 4,
    icon: Receipt,
    title: "Facturación Automática",
    sector: "Autónomos · Agencias · Freelances",
    description:
      "Al cerrar un proyecto o venta, n8n genera la factura en PDF, la envía por email y actualiza la hoja de contabilidad en Google Sheets.",
    tags: ["set", "email", "sheet"],
    saves: "5h / mes",
    nodes: [
      { label: "Trigger", type: "webhook", sub: "Venta cerrada" },
      { label: "PDF Set", type: "set", sub: "Generar factura" },
      { label: "Sheets", type: "sheet", sub: "Registrar cobro" },
      { label: "Email", type: "email", sub: "Enviar PDF" },
    ],
    benefit: "Cero facturas olvidadas · Cobros más rápidos",
  },
  {
    id: 5,
    icon: Bot,
    title: "Atención al Cliente 24/7",
    sector: "Cualquier negocio local",
    description:
      "Agente IA entrenado con tu FAQ responde en segundos por web, email o WhatsApp. Si no sabe, escala al humano con el contexto completo.",
    tags: ["webhook", "ai", "whatsapp"],
    saves: "20h / semana",
    nodes: [
      { label: "Chat/WA", type: "whatsapp", sub: "Mensaje entrante" },
      { label: "AI Agent", type: "ai", sub: "GPT-4o · FAQ" },
      { label: "IF Resuelto", type: "if", sub: "¿Necesita humano?" },
      { label: "Respond", type: "respond", sub: "Respuesta o alerta" },
    ],
    benefit: "Respuesta instantánea · Escalado inteligente al equipo",
  },
  {
    id: 6,
    icon: Megaphone,
    title: "Marketing Automatizado",
    sector: "Academias · Tiendas · Servicios",
    description:
      "Publica en Instagram, Facebook y Google My Business con un clic. IA genera el copy, elige el hashtag y programa el mejor horario.",
    tags: ["ai", "social", "set"],
    saves: "10h / semana",
    nodes: [
      { label: "Schedule", type: "set", sub: "Trigger semanal" },
      { label: "AI Copy", type: "ai", sub: "Generar contenido" },
      { label: "Social", type: "social", sub: "Publicar post" },
      { label: "Analytics", type: "sheet", sub: "Registrar métricas" },
    ],
    benefit: "Presencia constante sin esfuerzo · Engagement +40%",
  },
];

/* ─── Mini flow component ───────────────────────────────── */
const MiniFlow = ({ nodes }: { nodes: UseCase["nodes"] }) => (
  <div className="flex items-center gap-1.5 flex-wrap mt-4 overflow-x-auto pb-1 scrollbar-none">
    {nodes.map((node, i) => (
      <div key={i} className="flex items-center gap-1.5">
        <div
          className="flex items-center gap-1.5 font-mono text-[10px] font-medium px-2 py-1 rounded-md border backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
          style={{
            color: NODE_COLORS[node.type] ?? "#e2e8f0",
            borderColor: (NODE_COLORS[node.type] ?? "#aaa") + "25",
            backgroundColor: (NODE_COLORS[node.type] ?? "#aaa") + "10",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: NODE_COLORS[node.type] ?? "#e2e8f0", boxShadow: `0 0 6px ${NODE_COLORS[node.type] ?? "#e2e8f0"}` }} />
          {node.label}
        </div>
        {i < nodes.length - 1 && (
          <ChevronRight size={12} className="text-white/20 shrink-0" />
        )}
      </div>
    ))}
  </div>
);

/* ─── Modal / expanded card ─────────────────────────────── */
const DetailModal = ({ uc, onClose }: { uc: UseCase; onClose: () => void }) => {
  const Icon = uc.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="relative p-8 max-w-lg w-full z-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#030712]/95 to-background/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-cool-gray hover:text-foreground transition-colors p-2 rounded-full hover:bg-white/5"
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary shadow-[0_4px_20px_rgba(0,229,184,0.15)] backdrop-blur-md">
          <Icon size={28} className="text-gradient-cyan" />
        </div>
        <span className="font-mono text-[10px] font-semibold text-primary uppercase tracking-widest">{uc.sector}</span>
      <h3 className="font-mono text-xl font-bold text-light-slate mt-1 mb-3">{uc.title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{uc.description}</p>

      {/* Flow diagram */}
      <div className="space-y-1 mb-6">
        {uc.nodes.map((node, i) => (
          <div key={i}>
            <div
              className="flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm"
              style={{
                borderColor: (NODE_COLORS[node.type] ?? "#aaa") + "30",
                backgroundColor: (NODE_COLORS[node.type] ?? "#aaa") + "08",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: NODE_COLORS[node.type] ?? "#aaa", boxShadow: `0 0 8px ${NODE_COLORS[node.type]}80` }}
              />
              <span className="font-mono text-xs font-semibold text-light-slate">{node.label}</span>
              <span className="font-mono text-[10px] text-cool-gray/70 ml-auto hidden sm:block">{node.sub}</span>
            </div>
            {i < uc.nodes.length - 1 && (
              <div className="ml-4 w-px h-2.5" style={{ backgroundColor: (NODE_COLORS[node.type] ?? "#aaa") + "40" }} />
            )}
          </div>
        ))}
      </div>

      <div className="border border-neon-green/20 bg-neon-green/5 rounded-xl p-4 mb-5">
        <p className="font-mono text-[10px] font-bold text-neon-green uppercase tracking-widest mb-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          Beneficio clave
        </p>
        <p className="font-body text-sm text-foreground/90">{uc.benefit}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <span className="font-mono text-xs text-cool-gray">
          Ahorra <span className="text-primary font-bold">{uc.saves}</span>
        </span>
        <button
          onClick={() => {
            onClose();
            setTimeout(() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }), 100);
          }}
          className="font-mono text-xs text-primary hover:text-white transition-colors hover:underline underline-offset-4 decoration-primary/50"
        >
          → Quiero este flujo
        </button>
      </div>
    </motion.div>
  </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════ */
const UseCasesSection = () => {
  const [selected, setSelected] = useState<UseCase | null>(null);

  return (
    <section id="casos-uso" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // 03 — Casos de Uso para PYMEs
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-light-slate mt-4 mb-4"
        >
          6 flujos que cambian{" "}
          <span className="text-gradient-cyan">tu negocio</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="font-body text-lg text-muted-foreground max-w-2xl mb-12"
        >
          Cada caso incluye un flujo real de n8n listo para importar. Pulsa cualquier tarjeta para ver los nodos.
        </motion.p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}
              onClick={() => setSelected(uc)}
              className="relative p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent cursor-pointer group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_40px_rgba(0,229,184,0.1)] backdrop-blur-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                    <uc.icon size={20} />
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-cool-gray uppercase border border-white/10 bg-black/20 backdrop-blur-md px-2.5 py-1.5 rounded-md">
                    {uc.saves} saved
                  </span>
                </div>

              <h3 className="font-mono text-sm font-bold text-light-slate mb-2 group-hover:text-primary transition-colors">
                {uc.title}
              </h3>

              <p className="font-mono text-[10px] text-primary mb-2">{uc.sector}</p>

              <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                {uc.description}
              </p>

              <MiniFlow nodes={uc.nodes} />

              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                <span className="font-mono text-[10px] text-cool-gray">
                  {uc.nodes.length} nodos
                </span>
                <span className="font-mono text-[10px] text-primary group-hover:underline">
                  Ver flujo →
                </span>
              </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total savings */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-10 glass-card p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
          <div>
            <p className="font-mono text-[10px] md:text-xs text-cool-gray uppercase tracking-widest mb-2 md:mb-1">
              Ahorro total estimado implementando todos los flujos
            </p>
            <p className="font-mono text-xl md:text-2xl font-bold text-light-slate leading-tight">
              <span className="text-gradient-cyan block md:inline">61 horas / semana</span> liberadas por empleado
            </p>
          </div>
          <button
            onClick={() => document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 font-mono text-sm uppercase tracking-wider bg-primary text-primary-foreground px-6 py-3 rounded hover:bg-primary/90 transition-colors glow-cyan"
          >
            ▶ Probar demo
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <DetailModal uc={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default UseCasesSection;
