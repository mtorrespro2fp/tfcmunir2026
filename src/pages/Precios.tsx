import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Lock, CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection4 from "@/components/ui/pricing-section-4";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { cn } from "@/lib/utils";

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (value: string) => {
  const raw = value.replace(/\D/g, "").slice(0, 4);
  if (raw.length >= 3) return `${raw.slice(0, 2)}/${raw.slice(2)}`;
  return raw;
};

const Precios = () => {
  const paymentRef = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "processing" | "success">("idle");

  const [form, setForm] = useState({
    cardNumber: "",
    holder: "",
    expiry: "",
    cvv: "",
    email: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const markTouched = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const isCardValid = form.cardNumber.replace(/\s/g, "").length === 16;
  const isHolderValid = form.holder.trim().length > 2;
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(form.expiry) &&
    Number(form.expiry.slice(0, 2)) >= 1 &&
    Number(form.expiry.slice(0, 2)) <= 12;
  const isCvvValid = /^\d{3,4}$/.test(form.cvv);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isFormValid = isCardValid && isHolderValid && isExpiryValid && isCvvValid && isEmailValid;

  const fieldState = (field: string, valid: boolean) => {
    if (!touched[field]) return "";
    return valid
      ? "border-neon-green/50 focus:border-neon-green/70"
      : "border-destructive/50 focus:border-destructive/70";
  };

  const selectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setPhase("idle");
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ cardNumber: true, holder: true, expiry: true, cvv: true, email: true });
    if (!isFormValid) return;
    setPhase("processing");
    setTimeout(() => setPhase("success"), 2200);
  };

  const reset = () => {
    setPhase("idle");
    setSelectedPlan(null);
    setForm({ cardNumber: "", holder: "", expiry: "", cvv: "", email: "" });
    setTouched({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-brand-primary/20">
      <Navbar extraLinks={[
        { label: "Acerca de", href: "/acerca-de", isRoute: true },
        { label: "Términos", href: "/terminos", isRoute: true },
      ]} />

      <main>
      <PricingSection4 onSelectPlan={selectPlan} />

      {/* ── Formulario de pago ficticio ──────────────────────── */}
      <section ref={paymentRef} id="pago" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 max-w-lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="font-mono text-xs text-primary tracking-widest uppercase">
              // Pago seguro
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-light-slate mb-4"
          >
            Confirma tu <span className="text-gradient-cyan">plan</span>
          </motion.h2>

          {/* Demo warning */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8 p-4 rounded-lg border border-accent/30 bg-accent/5"
          >
            <AlertTriangle size={18} className="text-accent shrink-0" />
            <p className="font-mono text-xs text-accent">
              DEMO — No se procesa ningún pago real. Datos ficticios para demostración.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {phase === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-8 text-center"
              >
                <div className="flex justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  >
                    <CheckCircle size={56} className="text-neon-green" strokeWidth={1.5} />
                  </motion.div>
                </div>
                <h3 className="font-mono text-xl font-bold text-light-slate mb-2">
                  ¡Pago confirmado!
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-1">
                  Plan <span className="text-primary font-semibold">{selectedPlan}</span> activado correctamente.
                </p>
                <p className="font-mono text-[10px] text-cool-gray mb-6">
                  // Recuerda: esto es una demo, no se ha procesado ningún cobro real.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="font-mono text-[10px] text-neon-green border border-neon-green/40 bg-neon-green/10 px-2 py-1 rounded">
                    ● estado: activo
                  </span>
                  <span className="font-mono text-[10px] text-primary border border-primary/40 bg-primary/10 px-2 py-1 rounded">
                    ● modo: demo
                  </span>
                </div>
                <button
                  onClick={reset}
                  className="font-mono text-xs text-cool-gray hover:text-primary transition-colors underline"
                >
                  ← Volver a planes
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-panel p-8"
              >
                {/* Selected plan indicator */}
                {selectedPlan && (
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                    <CreditCard size={16} className="text-primary" />
                    <span className="font-mono text-xs text-muted-foreground">
                      Plan seleccionado:
                    </span>
                    <span className="font-mono text-sm text-primary font-bold">
                      {selectedPlan}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Card number */}
                  <div>
                    <label htmlFor="card-number" className="font-mono text-[10px] text-cool-gray block mb-2 uppercase tracking-wider">
                      Número de tarjeta
                    </label>
                    <div className="relative">
                      <input
                        id="card-number" name="card-number" autoComplete="cc-number"
                        type="text"
                        inputMode="numeric"
                        value={form.cardNumber}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))
                        }
                        onBlur={() => markTouched("cardNumber")}
                        placeholder="1234 5678 9012 3456"
                        className={cn(
                          "w-full bg-background/50 border border-border rounded px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-cool-gray/40 focus:outline-none transition-colors pr-10",
                          fieldState("cardNumber", isCardValid),
                        )}
                      />
                      <CreditCard
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-cool-gray/40"
                      />
                    </div>
                  </div>

                  {/* Holder */}
                  <div>
                    <label htmlFor="card-name" className="font-mono text-[10px] text-cool-gray block mb-2 uppercase tracking-wider">
                      Titular de la tarjeta
                    </label>
                    <input
                      id="card-name" name="card-name" autoComplete="cc-name"
                      type="text"
                      value={form.holder}
                      onChange={(e) => setForm((f) => ({ ...f, holder: e.target.value }))}
                      onBlur={() => markTouched("holder")}
                      placeholder="NOMBRE APELLIDOS"
                      className={cn(
                        "w-full bg-background/50 border border-border rounded px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-cool-gray/40 focus:outline-none transition-colors uppercase",
                        fieldState("holder", isHolderValid),
                      )}
                    />
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="card-expiry" className="font-mono text-[10px] text-cool-gray block mb-2 uppercase tracking-wider">
                        Fecha de expiración
                      </label>
                      <input
                        id="card-expiry" name="card-expiry" autoComplete="cc-exp"
                        type="text"
                        inputMode="numeric"
                        value={form.expiry}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))
                        }
                        onBlur={() => markTouched("expiry")}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={cn(
                          "w-full bg-background/50 border border-border rounded px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-cool-gray/40 focus:outline-none transition-colors",
                          fieldState("expiry", isExpiryValid),
                        )}
                      />
                    </div>
                    <div>
                      <label htmlFor="card-cvc" className="font-mono text-[10px] text-cool-gray block mb-2 uppercase tracking-wider">
                        CVV
                      </label>
                      <input
                        id="card-cvc" name="card-cvc" autoComplete="cc-csc"
                        type="password"
                        inputMode="numeric"
                        value={form.cvv}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          }))
                        }
                        onBlur={() => markTouched("cvv")}
                        placeholder="•••"
                        maxLength={4}
                        className={cn(
                          "w-full bg-background/50 border border-border rounded px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-cool-gray/40 focus:outline-none transition-colors",
                          fieldState("cvv", isCvvValid),
                        )}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="billing-email" className="font-mono text-[10px] text-cool-gray block mb-2 uppercase tracking-wider">
                      Email de facturación
                    </label>
                    <input
                      id="billing-email" name="billing-email" autoComplete="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      onBlur={() => markTouched("email")}
                      placeholder="tu@email.com"
                      className={cn(
                        "w-full bg-background/50 border border-border rounded px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-cool-gray/40 focus:outline-none transition-colors",
                        fieldState("email", isEmailValid),
                      )}
                    />
                  </div>

                  {/* Submit */}
                  <GlassButton
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={phase === "processing"}
                  >
                    {phase === "processing" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        Confirmar pago
                      </>
                    )}
                  </GlassButton>

                  {/* Security note */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <Lock size={10} className="text-cool-gray/60" />
                    <p className="font-mono text-[10px] text-cool-gray/60">
                      Conexión cifrada · Datos protegidos · Demo sin cobro real
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Precios;
