import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
interface FlowNode {
  id: string;
  label: string;
  emoji: string;
  type: string;
  x: number;
  y: number;
  sub: string;
}

interface FlowConn {
  from: string;
  to: string;
  branch?: "true" | "false";
}

interface Workflow {
  id: string;
  name: string;
  tag: string;
  description: string;
  nodes: FlowNode[];
  connections: FlowConn[];
  stats: { executions: string; avgTime: string; saved: string };
}

/* ─── Node colours ───────────────────────────────────────── */
const NC: Record<string, string> = {
  webhook:  "#FF6D5A",
  set:      "#31C46D",
  if:       "#1F91FA",
  ai:       "#9B59B6",
  email:    "#EA4335",
  crm:      "#F39C12",
  whatsapp: "#25D366",
  calendar: "#4285F4",
  respond:  "#2ECC71",
  schedule: "#FF9800",
};

/* ─── Workflow data ─────────────────────────────────────── */
const WORKFLOWS: Workflow[] = [
  /* 1 — Atención al Cliente */
  {
    id: "atencion",
    name: "Atención al Cliente",
    tag: "caso #1",
    description:
      "Formulario web → IA clasifica la consulta → CRM + email de confirmación automático.",
    stats: { executions: "1.243", avgTime: "1.4s", saved: "20h/sem" },
    nodes: [
      { id: "wh", label: "Formulario Web", emoji: "📋", type: "webhook",  x: 30,  y: 120, sub: "POST /neoflow-contacto" },
      { id: "if", label: "Clasificar",     emoji: "🔀", type: "if",       x: 230, y: 120, sub: "¿Consulta de precio?" },
      { id: "ai", label: "Agente IA",      emoji: "🤖", type: "ai",       x: 430, y: 60,  sub: "GPT-4o-mini" },
      { id: "cr", label: "CRM Set",        emoji: "📊", type: "crm",      x: 430, y: 185, sub: "Crear lead" },
      { id: "em", label: "Email",          emoji: "✉️", type: "email",    x: 630, y: 60,  sub: "Confirmación" },
      { id: "rs", label: "Respond",        emoji: "✅", type: "respond",  x: 630, y: 185, sub: "HTTP 200" },
    ],
    connections: [
      { from: "wh", to: "if" },
      { from: "if", to: "ai", branch: "true" },
      { from: "if", to: "cr", branch: "false" },
      { from: "ai", to: "em" },
      { from: "cr", to: "rs" },
    ],
  },
  /* 2 — Reservas */
  {
    id: "reservas",
    name: "Reservas Automáticas",
    tag: "caso #2",
    description:
      "Cliente reserva desde web → confirmación por WhatsApp → evento en Google Calendar → recordatorio automático.",
    stats: { executions: "856", avgTime: "0.9s", saved: "8h/sem" },
    nodes: [
      { id: "wh", label: "Formulario Reserva", emoji: "📋", type: "webhook",  x: 30,  y: 120, sub: "POST /reserva" },
      { id: "se", label: "Validar campos",     emoji: "⚙️",  type: "set",      x: 230, y: 120, sub: "Fecha · hora · nombre" },
      { id: "ca", label: "Google Calendar",    emoji: "📅", type: "calendar", x: 430, y: 60,  sub: "Crear evento" },
      { id: "wa", label: "WhatsApp",           emoji: "💬", type: "whatsapp", x: 430, y: 185, sub: "Confirmar cita" },
      { id: "sc", label: "Recordatorio",       emoji: "⏰", type: "schedule", x: 630, y: 60,  sub: "Schedule -2h" },
      { id: "rs", label: "Respond",            emoji: "✅", type: "respond",  x: 630, y: 185, sub: "HTTP 200" },
    ],
    connections: [
      { from: "wh", to: "se" },
      { from: "se", to: "ca" },
      { from: "se", to: "wa" },
      { from: "ca", to: "sc" },
      { from: "wa", to: "rs" },
    ],
  },
  /* 3 — Lead Scoring */
  {
    id: "leads",
    name: "Lead Scoring con IA",
    tag: "caso #3",
    description:
      "Cada nuevo contacto es puntuado por IA (1-10). Los hot leads van al comercial en segundos; los fríos entran en nurturing.",
    stats: { executions: "3.102", avgTime: "2.1s", saved: "12h/sem" },
    nodes: [
      { id: "wh", label: "Nuevo Contacto",  emoji: "📋", type: "webhook",  x: 30,  y: 120, sub: "CRM / Form / LinkedIn" },
      { id: "ai", label: "AI Score",        emoji: "🤖", type: "ai",       x: 230, y: 120, sub: "GPT-4o · score 1-10" },
      { id: "if", label: "Score > 7?",      emoji: "🔀", type: "if",       x: 430, y: 120, sub: "Hot vs Cold lead" },
      { id: "em", label: "Alertar Equipo",  emoji: "✉️", type: "email",    x: 630, y: 60,  sub: "Lead caliente 🔥" },
      { id: "cr", label: "Nurturing CRM",   emoji: "📊", type: "crm",      x: 630, y: 185, sub: "Secuencia email" },
      { id: "wa", label: "WhatsApp Biz",    emoji: "💬", type: "whatsapp", x: 830, y: 60,  sub: "Notificar comercial" },
    ],
    connections: [
      { from: "wh", to: "ai" },
      { from: "ai", to: "if" },
      { from: "if", to: "em", branch: "true" },
      { from: "if", to: "cr", branch: "false" },
      { from: "em", to: "wa" },
    ],
  },
];

/* ─── SVG Arrows ─────────────────────────────────────────── */
const Arrows = ({ nodes, connections, animated }: {
  nodes: FlowNode[];
  connections: FlowConn[];
  animated: boolean;
}) => {
  const getCenter = (id: string) => {
    const n = nodes.find(x => x.id === id);
    return n ? { x: n.x + 70, y: n.y + 24 } : { x: 0, y: 0 };
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(100,255,218,0.4)" />
        </marker>
        {animated && (
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>
      {connections.map((conn, i) => {
        const from = getCenter(conn.from);
        const to   = getCenter(conn.to);
        const midX = (from.x + to.x) / 2;
        const path = `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
        const color = conn.branch === "true"  ? "#31C46D"
                    : conn.branch === "false" ? "#1F91FA"
                    : "rgba(100,255,218,0.35)";
        return (
          <path
            key={i}
            d={path}
            stroke={color}
            strokeWidth={animated ? 1.5 : 1}
            fill="none"
            strokeDasharray={animated ? "6 4" : undefined}
            markerEnd="url(#arrowhead)"
            style={animated ? { animation: `dash 1.5s linear infinite`, animationDelay: `${i * 0.2}s` } : {}}
          />
        );
      })}
      <style>{`@keyframes dash { to { stroke-dashoffset: -20; } }`}</style>
    </svg>
  );
};

/* ─── Single node card ───────────────────────────────────── */
const NodeCard = ({ node }: { node: FlowNode }) => {
  const color = NC[node.type] ?? "#aaa";
  return (
    <div
      className="absolute flex flex-col items-start px-3 py-2 rounded border font-mono whitespace-nowrap cursor-default"
      style={{
        left: node.x, top: node.y,
        borderColor: color + "66",
        backgroundColor: color + "18",
        zIndex: 1,
        minWidth: 120,
      }}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[9px] text-cool-gray uppercase tracking-wide">{node.type}</span>
      </div>
      <span className="text-xs font-bold text-light-slate">{node.emoji} {node.label}</span>
      <span className="text-[9px] text-cool-gray mt-0.5">{node.sub}</span>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════ */
const N8nMockup = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [animated, setAnimated]   = useState(true);
  const wf = WORKFLOWS[activeTab];

  // Determine canvas height for current workflow
  const maxY = Math.max(...wf.nodes.map(n => n.y)) + 80;
  const maxX = Math.max(...wf.nodes.map(n => n.x)) + 160;

  return (
    <section id="flujos" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // 05 — Flujos n8n en Detalle
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-light-slate mt-4 mb-4"
        >
          Automatizaciones{" "}
          <span className="text-neon-green">reales</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="font-body text-lg text-muted-foreground max-w-2xl mb-10"
        >
          Flujos visuales listos para importar en n8n. Cada uno resuelve un problema real de tu negocio.
        </motion.p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {WORKFLOWS.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setActiveTab(i)}
              className={`font-mono text-xs px-4 py-2 rounded border transition-all duration-200 ${
                activeTab === i
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border/50 text-cool-gray hover:border-primary/30 hover:text-foreground"
              }`}
            >
              <span className="text-cool-gray mr-2">{w.tag}</span>
              {w.name}
            </button>
          ))}

          {/* Animate toggle */}
          <button
            onClick={() => setAnimated(a => !a)}
            className={`ml-auto font-mono text-xs px-3 py-2 rounded border transition-all ${
              animated ? "border-neon-green/40 text-neon-green bg-neon-green/10" : "border-border/40 text-cool-gray"
            }`}
          >
            {animated ? <><Pause size={11} className="inline mr-1" />Animado</> : <><Play size={11} className="inline mr-1" />Animar</>}
          </button>
        </div>

        {/* Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="glass-card overflow-x-auto"
          >
            {/* n8n-style toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-green node-pulse" />
                <span className="font-mono text-xs text-cool-gray">{wf.name}</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[10px] text-cool-gray">
                <span>⚡ {wf.stats.executions} ejecuciones</span>
                <span>⏱ {wf.stats.avgTime} promedio</span>
                <span className="text-neon-green">↑ {wf.stats.saved}</span>
              </div>
            </div>

            {/* Flow canvas */}
            <div
              className="relative"
              style={{ minWidth: maxX + 40, height: maxY + 40 }}
            >
              {/* Grid dots background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, #64ffda22 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <Arrows nodes={wf.nodes} connections={wf.connections} animated={animated} />

              {wf.nodes.map(node => (
                <NodeCard key={node.id} node={node} />
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border/40 flex items-center justify-between">
              <p className="font-body text-xs text-muted-foreground max-w-md">{wf.description}</p>
              <div className="flex gap-2">
                {wf.nodes.map((n, i) => (
                  <span
                    key={i}
                    className="font-mono text-[9px] px-1.5 py-0.5 rounded border"
                    style={{ color: NC[n.type] ?? "#aaa", borderColor: (NC[n.type] ?? "#aaa") + "44", backgroundColor: (NC[n.type] ?? "#aaa") + "11" }}
                  >
                    {n.type}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Import hint */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-4 font-mono text-xs text-cool-gray text-center"
        >
          // Todos los flujos están disponibles como JSON · importa en n8n → Menu → Import workflow
        </motion.p>
      </div>
    </section>
  );
};

export default N8nMockup;
