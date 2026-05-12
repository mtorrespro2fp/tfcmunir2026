import { motion } from "framer-motion";
import { Mail, FileSpreadsheet, PhoneMissed, FilePenLine, CalendarX, MessageCircleWarning, CopyMinus } from "lucide-react";

const chaosItems = [
  { icon: Mail, label: "Emails sin responder", x: "5%", y: "15%", rotation: -8 },
  { icon: FileSpreadsheet, label: "Excel roto", x: "45%", y: "10%", rotation: 5 },
  { icon: PhoneMissed, label: "Llamadas perdidas", x: "15%", y: "55%", rotation: -3 },
  { icon: FilePenLine, label: "Facturas a mano", x: "50%", y: "50%", rotation: 12 },
  { icon: CalendarX, label: "Citas olvidadas", x: "5%", y: "80%", rotation: -15 },
  { icon: MessageCircleWarning, label: "WhatsApp sin leer", x: "45%", y: "75%", rotation: 7 },
  { icon: CopyMinus, label: "Datos duplicados", x: "30%", y: "35%", rotation: -6 },
];

const Problem = () => {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // 01 — Diagnóstico
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-light-slate mb-6"
        >
          El problema es <span className="text-destructive">real</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-lg text-muted-foreground max-w-2xl mb-16"
        >
          Los negocios locales pierden una media de 10.5 horas mensuales en tareas 
          repetitivas que podrían estar automatizadas. Este es el caos típico:
        </motion.p>

        {/* Chaos wireframe */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[400px] md:h-[500px] rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent overflow-hidden shadow-2xl backdrop-blur-xl"
        >
          {/* Background noise lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <line x1="10%" y1="20%" x2="60%" y2="45%" stroke="hsl(0 84% 60%)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="55%" y1="15%" x2="30%" y2="60%" stroke="hsl(0 84% 60%)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="25%" y1="55%" x2="70%" y2="80%" stroke="hsl(0 84% 60%)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="65%" y1="50%" x2="15%" y2="85%" stroke="hsl(0 84% 60%)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="40%" y1="35%" x2="60%" y2="85%" stroke="hsl(0 84% 60%)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {chaosItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="absolute"
              style={{
                left: item.x,
                top: item.y,
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              <div className="flex items-center gap-2.5 bg-[#030712]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 font-mono text-sm text-destructive/90 shadow-[0_8px_32px_rgba(255,0,0,0.15)]">
                <item.icon size={16} className="text-destructive shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
            </motion.div>
          ))}

          {/* Error counter */}
          <div className="absolute bottom-4 right-4 font-mono text-xs text-destructive/60">
            errores_detectados: {chaosItems.length} · estado: crítico
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
