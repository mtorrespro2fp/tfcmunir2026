import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Call n8n webhook ───────────────────────────────────── */
// TODO: Server-Side Security: Implement rate limiting and payload validation directly 
// in the n8n webhook workflow to prevent direct endpoint abuse via curl/postman.
const N8N_ENDPOINT = import.meta.env.VITE_N8N_ENDPOINT;

async function submitToN8n(data: {
  name: string; email: string; business: string; message: string;
}): Promise<{ ok: boolean; ai?: string }> {
  if (!N8N_ENDPOINT) {
    await new Promise(r => setTimeout(r, 800));
    return { ok: false };
  }
  try {
    const res = await fetch(`${N8N_ENDPOINT}/webhook/neoflow-contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: data.name, email: data.email, negocio: data.business, mensaje: data.message }),
      signal: AbortSignal.timeout(6000),
    });
    if (res.ok) {
      const json = await res.json();
      return { ok: true, ai: json.respuesta ?? json.mensaje };
    }
  } catch {
    // n8n not running — show demo success anyway
  }
  return { ok: false };
}

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiReply, setAiReply] = useState<string>("");
  const [n8nLive, setN8nLive] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    // Validación robusta de email: previene bypass del atributo HTML5 via consola
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(form.email)) return;
    setLoading(true);

    const result = await submitToN8n(form);
    setN8nLive(result.ok);
    setAiReply(
      result.ai ??
      `¡Hola ${form.name}! Hemos recibido tu consulta sobre "${form.business || "automatización"}". ` +
      `Nuestro equipo te enviará una propuesta personalizada en menos de 24 horas. — NeoFlow AI 🚀`
    );

    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contacto" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-4 text-center">
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // 07 — Contacto
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-light-slate mb-4 text-center"
        >
          Empieza a{" "}
          <span className="text-neon-green">automatizar</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-lg text-muted-foreground max-w-xl mb-12 text-center mx-auto"
        >
          Cuéntanos tu negocio. En menos de 24 horas te enviamos una propuesta personalizada.
        </motion.p>

        <div className="max-w-2xl mx-auto">

          {/* ── Form ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
                <CheckCircle className="text-neon-green" size={48} strokeWidth={1.5} />
                <h3 className="font-mono text-xl font-bold text-light-slate">¡Mensaje recibido!</h3>

                {aiReply && (
                  <div className="w-full text-left border border-primary/30 bg-primary/5 rounded p-4">
                    <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2 flex items-center gap-1">
                      <Zap size={10} /> Respuesta del Agente IA
                    </p>
                    <p className="font-body text-sm text-foreground leading-relaxed">{aiReply}</p>
                  </div>
                )}

                <p className="font-body text-sm text-muted-foreground">
                  Te contactaremos en menos de 24h con una propuesta.
                </p>
                <span className={`font-mono text-xs px-2 py-1 rounded border ${n8nLive ? "text-neon-green border-neon-green/40 bg-neon-green/10" : "text-primary border-primary/40 bg-primary/10"}`}>
                  {n8nLive ? "● flujo_contacto: ejecutado · CRM: actualizado" : "● flujo_contacto: demo · respuesta simulada"}
                </span>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", business: "", message: "" }); }}
                  className="font-mono text-xs text-cool-gray hover:text-primary transition-colors underline mt-2"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="font-mono text-xs text-cool-gray block mb-2">NOMBRE *</label>
                    <input
                      id="name" name="name"
                      type="text" required value={form.name} maxLength={100}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Tu nombre"
                      className="w-full bg-background/50 border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-cool-gray/50 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-xs text-cool-gray block mb-2">EMAIL *</label>
                    <input
                      id="email" name="email"
                      type="email" required value={form.email} maxLength={254}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="tu@email.com"
                      className="w-full bg-background/50 border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-cool-gray/50 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="business" className="font-mono text-xs text-cool-gray block mb-2">TIPO DE NEGOCIO</label>
                  <select
                    id="business" name="business"
                    value={form.business}
                    onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
                    className="w-full bg-background/50 border border-border rounded px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                  >
                    <option value="">Selecciona...</option>
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
                  <label htmlFor="message" className="font-mono text-xs text-cool-gray block mb-2">¿QUÉ QUIERES AUTOMATIZAR?</label>
                  <textarea
                    id="message" name="message"
                    value={form.message} maxLength={1000}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Cuéntanos tu caso..."
                    rows={4}
                    className="w-full bg-background/50 border border-border rounded px-3 py-2 font-mono text-sm text-foreground placeholder:text-cool-gray/50 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit" disabled={loading}
                  className="w-full font-mono text-sm uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan py-5"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Ejecutando flujo n8n...
                    </span>
                  ) : (
                    <><Send size={15} className="mr-2" /> &gt; Enviar consulta</>
                  )}
                </Button>

                <p className="font-mono text-[10px] text-cool-gray text-center">
                  // Procesado por agente IA · CRM actualizado · Respuesta &lt; 24h
                </p>
                {!N8N_ENDPOINT && (
                  <p className="font-mono text-[10px] text-amber-400/80 text-center mt-2">
                    Modo demo — los formularios no envían datos en esta versión pública.
                  </p>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
