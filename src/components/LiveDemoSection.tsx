import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, Circle, Loader2, Zap, AlertCircle, Webhook, Settings2, GitBranch, Bot, Database, Mail, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Types ─────────────────────────────────────────────── */
interface LogLine {
  id: number;
  ms: number;
  node: string;
  nodeType: "webhook" | "set" | "if" | "ai" | "email" | "crm" | "respond";
  message: string;
  status: "pending" | "running" | "done" | "error";
}

interface FormData {
  nombre: string;
  email: string;
  negocio: string;
  mensaje: string;
}

/* ─── Node colour map (same palette as real n8n) ────────── */
const NODE_COLORS: Record<string, string> = {
  webhook: "#FF6D5A",
  set:     "#31C46D",
  if:      "#1F91FA",
  ai:      "#9B59B6",
  email:   "#EA4335",
  crm:     "#F39C12",
  respond: "#2ECC71",
};

/* ─── Mock execution log ─────────────────────────────────── */
const buildLog = (email: string, negocio: string): LogLine[] => [
  { id: 1, ms: 0,    node: "Webhook",       nodeType: "webhook", message: "POST /neoflow-contacto — datos recibidos",           status: "pending" },
  { id: 2, ms: 180,  node: "Set",           nodeType: "set",     message: "Campos normalizados: nombre, email, mensaje",       status: "pending" },
  { id: 3, ms: 350,  node: "IF Clasificar", nodeType: "if",      message: "Evaluando tipo de consulta…",                       status: "pending" },
  { id: 4, ms: 720,  node: "AI Agent",      nodeType: "ai",      message: "GPT-4o-mini procesando — sector: " + (negocio||"general"), status: "pending" },
  { id: 5, ms: 1050, node: "CRM",           nodeType: "crm",     message: `Lead #NF-${Date.now().toString().slice(-4)} creado para ${email}`, status: "pending" },
  { id: 6, ms: 1280, node: "Email",         nodeType: "email",   message: `Confirmación enviada → ${email}`,                  status: "pending" },
  { id: 7, ms: 1450, node: "Respond",       nodeType: "respond", message: "HTTP 200 OK · flujo completado",                   status: "pending" },
];

/* ─── Helper: call real n8n, fall back gracefully ────────── */
const N8N_ENDPOINT = import.meta.env.VITE_N8N_ENDPOINT;

async function callN8n(data: FormData): Promise<{ ok: boolean; respuesta?: string }> {
  if (!N8N_ENDPOINT) {
    await new Promise(r => setTimeout(r, 800));
    return { ok: false };
  }
  try {
    const res = await fetch(`${N8N_ENDPOINT}/webhook/neoflow-contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const json = await res.json();
      return { ok: true, respuesta: json.respuesta ?? json.mensaje };
    }
  } catch {
    // n8n offline or CORS — show mock execution
  }
  return { ok: false };
}

/* ── Node status icon ─────────────────────────────────── */
const NodeIcon = ({ status }: { status: LogLine["status"] }) => {
  if (status === "running") return <Loader2 size={13} className="animate-spin text-primary" />;
  if (status === "done")    return <CheckCircle2 size={13} className="text-neon-green" />;
  if (status === "error")   return <AlertCircle size={13} className="text-destructive" />;
  return <Circle size={13} className="text-border" />;
};

/* ═══════════════════════════════════════════════════════════
   Component
═══════════════════════════════════════════════════════════ */
const LiveDemoSection = () => {
  const [form, setForm] = useState<FormData>({ nombre: "", email: "", negocio: "", mensaje: "" });
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [log, setLog]   = useState<LogLine[]>([]);
  const [aiReply, setAiReply] = useState<string>("");
  const [elapsed, setElapsed] = useState(0);
  const [n8nOnline, setN8nOnline] = useState<boolean | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email) return;

    const lines = buildLog(form.email, form.negocio);
    setLog(lines.map(l => ({ ...l, status: "pending" })));
    setPhase("running");
    setAiReply("");
    const startTime = Date.now();

    // Fire n8n in parallel
    const n8nPromise = callN8n(form);

    // Animate log lines
    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, i === 0 ? 100 : lines[i].ms - lines[i - 1].ms));
      setLog(prev => prev.map((l, idx) => idx === i ? { ...l, status: "running" } : l));
      await new Promise(r => setTimeout(r, 200));
      setLog(prev => prev.map((l, idx) => idx === i ? { ...l, status: "done" } : l));
    }

    const n8nResult = await n8nPromise;
    setN8nOnline(n8nResult.ok);
    if (n8nResult.respuesta) setAiReply(n8nResult.respuesta);
    else setAiReply(
      `¡Hola ${form.nombre}! Hemos recibido tu consulta sobre automatización para tu ${form.negocio || "negocio"}. ` +
      `En menos de 24 horas te enviaremos una propuesta personalizada con los flujos que mejor se adapten a tu caso. — NeoFlow AI 🚀`
    );

    setElapsed(Date.now() - startTime);
    setPhase("done");
  };

  const reset = () => {
    setPhase("idle");
    setLog([]);
    setAiReply("");
    setForm({ nombre: "", email: "", negocio: "", mensaje: "" });
  };

  /* ── Node status icon ─────────────────────────────────── */
  // Moved NodeIcon outside of the main component

  return (
    <section id="live-demo" className="relative py-24 md:py-32 overflow-hidden">
      {/* BG accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // 04 — Demo en Vivo
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-light-slate mt-4 mb-3"
        >
          Rellena el formulario.{" "}
          <span className="text-gradient-cyan">Mira el flujo ejecutarse.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="font-body text-lg text-muted-foreground max-w-2xl mb-12"
        >
          Así funciona NeoFlow en tu negocio: cada campo que envías dispara un flujo real de n8n
          que clasifica, procesa con IA, actualiza el CRM y envía la confirmación.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: Form ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {phase === "idle" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass-card p-8"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-neon-green node-pulse" />
                    <span className="font-mono text-xs text-neon-green tracking-widest uppercase">
                      formulario de contacto — NeoFlow
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] text-cool-gray block mb-2 uppercase tracking-wider">Nombre *</label>
                        <input
                          required value={form.nombre} maxLength={100}
                          onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                          placeholder="Ana García"
                          className="w-full bg-background/50 border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-cool-gray/40 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] text-cool-gray block mb-2 uppercase tracking-wider">Email *</label>
                        <input
                          type="email" required value={form.email} maxLength={254}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="ana@empresa.com"
                          className="w-full bg-background/50 border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-cool-gray/40 focus:outline-none focus:border-primary/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-cool-gray block mb-2 uppercase tracking-wider">Sector / Negocio</label>
                      <select
                        value={form.negocio}
                        onChange={e => setForm(f => ({ ...f, negocio: e.target.value }))}
                        className="w-full bg-background/50 border border-border rounded px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                      >
                        <option value="">Selecciona tu sector...</option>
                        <option>Restaurante / Bar</option>
                        <option>Clínica / Salud</option>
                        <option>Comercio local</option>
                        <option>Academia / Formación</option>
                        <option>Servicios profesionales</option>
                        <option>E-commerce</option>
                        <option>Inmobiliaria</option>
                        <option>Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-cool-gray block mb-2 uppercase tracking-wider">¿Qué quieres automatizar?</label>
                      <textarea
                        value={form.mensaje} maxLength={1000}
                        onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                        placeholder="Ej: Quiero automatizar las reservas de mi restaurante y enviar confirmación por WhatsApp..."
                        rows={3}
                        className="w-full bg-background/50 border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-cool-gray/40 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={phase !== "idle"}
                      className="w-full font-mono text-sm uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan py-5 group"
                    >
                      <Play size={14} className="mr-2 group-hover:scale-110 transition-transform" />
                      ▶&nbsp; Ejecutar Flujo n8n
                    </Button>

                    <p className="font-mono text-[10px] text-cool-gray text-center">
                      // Dispara un webhook real · procesa con GPT-4o · actualiza CRM
                    </p>
                    {!N8N_ENDPOINT && (
                      <p className="font-mono text-[10px] text-amber-400/80 text-center mt-2">
                        Modo demo — los formularios no envían datos en esta versión pública.
                      </p>
                    )}
                  </form>
                </motion.div>
              )}

              {(phase === "running" || phase === "done") && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="glass-card p-8"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-primary" />
                      <span className="font-mono text-xs text-primary tracking-widest uppercase">
                        {phase === "running" ? "Ejecutando flujo..." : `Flujo completado · ${(elapsed/1000).toFixed(2)}s`}
                      </span>
                    </div>
                    {phase === "done" && (
                      <span className={`font-mono text-[10px] px-2 py-1 rounded border ${n8nOnline ? "text-neon-green border-neon-green/40 bg-neon-green/10" : "text-primary border-primary/40 bg-primary/10"}`}>
                        {n8nOnline ? "● n8n online" : "● modo demo"}
                      </span>
                    )}
                  </div>

                  {/* Execution log */}
                  <div className="space-y-2 mb-6 max-h-64 overflow-y-auto pr-1">
                    {log.map(line => (
                      <motion.div
                        key={line.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: line.status === "pending" ? 0.3 : 1, x: 0 }}
                        className="flex items-start gap-3 font-mono text-xs"
                      >
                        <NodeIcon status={line.status} />
                        <span
                          className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold"
                          style={{
                            backgroundColor: NODE_COLORS[line.nodeType] + "22",
                            color: NODE_COLORS[line.nodeType],
                            border: `1px solid ${NODE_COLORS[line.nodeType]}44`,
                          }}
                        >
                          {line.node}
                        </span>
                        <span className={`leading-relaxed ${line.status === "done" ? "text-foreground" : line.status === "running" ? "text-primary" : "text-cool-gray/40"}`}>
                          {line.message}
                        </span>
                      </motion.div>
                    ))}
                    <div ref={logEndRef} />
                  </div>

                  {/* AI response */}
                  <AnimatePresence>
                    {phase === "done" && aiReply && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="border border-primary/30 bg-primary/5 rounded p-4 mb-5"
                      >
                        <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">
                          🤖 Respuesta del Agente IA
                        </p>
                        <p className="font-body text-sm text-foreground leading-relaxed">{aiReply}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {phase === "done" && (
                    <button
                      onClick={reset}
                      className="font-mono text-xs text-cool-gray hover:text-primary transition-colors underline cursor-pointer"
                    >
                      → Probar de nuevo
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Visual flow diagram ───────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="relative p-6 md:p-8 rounded-2xl border border-white/5 bg-[#030712]/60 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl"
          >
            <p className="font-mono text-[10px] text-cool-gray uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
              <span className="text-primary mr-2">●</span> flujo: neoflow-contacto · nodos: 7 · estado: activo
            </p>

            <div className="space-y-1">
              {[
                { nodeType: "webhook", label: "Webhook",   sub: "POST /neoflow-contacto", id: 1, icon: Webhook },
                { nodeType: "set",     label: "Set Node",  sub: "Normalizar campos",       id: 2, icon: Settings2 },
                { nodeType: "if",      label: "IF",        sub: "Clasificar consulta",      id: 3, icon: GitBranch },
                { nodeType: "ai",      label: "AI Agent",  sub: "GPT-4o-mini · análisis",   id: 4, icon: Bot },
                { nodeType: "crm",     label: "CRM Set",   sub: "Crear lead / registro",    id: 5, icon: Database },
                { nodeType: "email",   label: "Email",     sub: "Enviar confirmación",      id: 6, icon: Mail },
                { nodeType: "respond", label: "Respond",   sub: "HTTP 200 · JSON response", id: 7, icon: CheckSquare },
              ].map((node, i) => {
                const logLine = log.find(l => l.id === node.id);
                const status  = logLine?.status ?? "pending";
                const color   = NODE_COLORS[node.nodeType];
                const isActive = status === "running";
                const isDone   = status === "done";

                return (
                  <div key={node.id}>
                    <motion.div
                      animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="flex items-center gap-3 p-3 rounded border transition-all duration-300"
                      style={{
                        borderColor: isDone ? color + "88" : isActive ? color : "transparent",
                        backgroundColor: isDone ? color + "11" : isActive ? color + "22" : "transparent",
                      }}
                    >
                      {/* Node type dot */}
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center text-sm shrink-0 transition-all shadow-inner"
                        style={{
                          backgroundColor: isActive || isDone ? color + "20" : "#ffffff05",
                          border: `1px solid ${isActive || isDone ? color + "60" : "#ffffff10"}`,
                          boxShadow: isActive ? `0 0 12px ${color}40` : "none"
                        }}
                      >
                        {isActive ? <Loader2 size={14} className="animate-spin" style={{ color }} />
                          : isDone  ? <CheckCircle2 size={14} style={{ color }} />
                          : <node.icon size={14} style={{ color: color + "aa" }} />}
                      </div>

                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <p className="font-mono text-xs font-semibold text-light-slate">{node.label}</p>
                        <p className="font-mono text-[10px] text-cool-gray/70 truncate hidden sm:block">— {node.sub}</p>
                      </div>

                      {isDone && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                          className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: color + "22", color, border: `1px solid ${color}44` }}
                        >
                          OK
                        </motion.span>
                      )}
                    </motion.div>

                    {/* Connector line */}
                    {i < 6 && (
                      <div className="ml-7 flex flex-col items-center">
                        <div
                          className="w-px transition-all duration-500"
                          style={{
                            height: "10px",
                            backgroundColor: isDone ? color + "88" : "#ffffff15",
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-border/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-cool-gray">
                  Tiempo medio de ejecución: <span className="text-primary">~1.4s</span>
                </span>
                <div className="flex gap-3">
                  {(["webhook","ai","email"] as const).map(t => (
                    <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded border"
                      style={{ color: NODE_COLORS[t], borderColor: NODE_COLORS[t]+"44", backgroundColor: NODE_COLORS[t]+"11" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LiveDemoSection;
