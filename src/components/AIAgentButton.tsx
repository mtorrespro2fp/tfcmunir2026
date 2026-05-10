import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

const RESPONSES: Record<string, string> = {
  precio:    "Tenemos tres planes: Starter 89€/mes, Profesional 249€/mes y Enterprise 599€/mes. Todos incluyen agente IA, flujos n8n y soporte. ¿Cuál se adapta mejor a tu negocio?",
  whatsapp:  "Sí, integramos WhatsApp Business API. Tus clientes escriben y el agente responde al instante, 24/7, sin que tengas que hacer nada. 📱",
  n8n:       "n8n es nuestra herramienta de automatización. Conecta tu formulario web → agente IA → WhatsApp/email/CRM de forma automática. Sin código, sin complicaciones.",
  web:       "Creamos webs con React + Tailwind CSS, optimizadas para conversión y SEO. Como esta misma que estás viendo ahora — deployada en minutos. 🚀",
  ia:        "Usamos OpenAI GPT-4o mini para los agentes. Son capaces de responder consultas, cualificar leads y gestionar citas. Se adaptan a tu negocio con un prompt personalizado.",
  crm:       "Conectamos con Supabase como base de datos. Cada interacción del cliente queda registrada automáticamente. Sin Excel, sin datos perdidos.",
  hola:      "¡Hola! Soy el agente IA de NeoFlow. Puedo contarte sobre nuestros precios, integraciones de WhatsApp, flujos n8n o webs de alto rendimiento. ¿Por dónde empezamos?",
  gracias:   "¡De nada! Si tienes más preguntas sobre cómo NeoFlow puede ayudar a tu negocio, aquí estoy. 😊",
  default:   "Entendido. NeoFlow automatiza las tareas repetitivas de tu negocio: atención al cliente con IA, flujos n8n para WhatsApp/email/CRM, y webs que convierten. ¿Quieres saber más sobre algún módulo en concreto?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return RESPONSES.default;
}

const AIAgentButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "¡Hola! Soy el agente IA de NeoFlow. ¿En qué puedo ayudarte hoy? 👋" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-agent", handleOpen);
    return () => window.removeEventListener("open-ai-agent", handleOpen);
  }, []);

  const handleSend = () => {
    if (!input.trim() || loading || msgCount >= 20) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);
    setMsgCount(c => c + 1);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: getResponse(userMsg) },
      ]);
      setLoading(false);
    }, 900);
  };

  const openChat = () => setIsOpen(true);

  return (
    <>
      {/* Floating button — data-ai-trigger permite que Solution.tsx lo abra */}
      <motion.button
        data-ai-trigger
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 bg-transparent backdrop-blur-sm border-2 border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(0,229,184,0.5)]"
        aria-label="Abrir agente IA NeoFlow"
      >
        {isOpen ? <X size={18} className="md:w-[22px] md:h-[22px]" /> : <Bot size={18} className="md:w-[22px] md:h-[22px]" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-32px)] md:w-80 max-h-[440px] glass-card border-brand-primary/50 flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,229,184,0.15)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-green node-pulse" />
              <span className="font-mono text-xs text-primary font-semibold">NeoFlow AI Agent</span>
              <span className="ml-auto font-mono text-[10px] text-cool-gray">online · GPT-4o mini</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`
                    max-w-[88%] px-3 py-2 rounded font-mono text-xs leading-relaxed
                    ${msg.role === "user"
                      ? "bg-primary/20 text-primary border border-primary/20"
                      : "bg-secondary text-light-slate border border-border/50"
                    }
                  `}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary border border-border/50 rounded px-3 py-2 font-mono text-xs text-cool-gray">
                    <span className="animate-pulse">procesando...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="px-3 pb-1 flex gap-1 flex-wrap">
              {["precios", "WhatsApp", "n8n"].map(q => (
                <button
                  key={q}
                  disabled={loading || msgCount >= 20}
                  onClick={() => {
                    if (msgCount >= 20) return;
                    setMessages(prev => [...prev, { role: "user", text: q }]);
                    setLoading(true);
                    setMsgCount(c => c + 1);
                    setTimeout(() => {
                      setMessages(prev => [...prev, { role: "bot", text: getResponse(q) }]);
                      setLoading(false);
                    }, 700);
                  }}
                  className="font-mono text-[10px] border border-primary/30 text-primary px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={msgCount >= 20 ? "Límite de mensajes alcanzado" : "Escribe tu consulta..."}
                maxLength={500}
                disabled={msgCount >= 20}
                className="flex-1 bg-background/50 border border-border rounded px-3 py-2 font-mono text-xs text-foreground placeholder:text-cool-gray focus:outline-none focus:border-primary/50 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={loading || msgCount >= 20}
                className="p-2 rounded border border-primary/30 text-primary hover:bg-primary/10 transition-colors disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAgentButton;
