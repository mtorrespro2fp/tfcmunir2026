import { motion } from "framer-motion";

const OdsSection = () => {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-cyan p-8 md:p-12"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-6">
            // 04 — Impacto Social
          </span>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-light-slate mb-4">
                Alineados con los <span className="text-primary">ODS</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                NeoFlow contribuye activamente a los Objetivos de Desarrollo Sostenible 
                de la ONU, impulsando la economía local a través de la innovación tecnológica 
                accesible y la digitalización responsable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* ODS 8 */}
              <div className="flex-1 border border-primary/20 rounded-lg p-5 bg-primary/5">
                <div className="font-mono text-3xl font-bold text-primary mb-2">08</div>
                <h3 className="font-mono text-sm font-semibold text-light-slate mb-2">
                  Trabajo Decente y Crecimiento Económico
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  Automatizamos tareas repetitivas para que los negocios locales 
                  inviertan su tiempo en crecer, no en administrar.
                </p>
              </div>

              {/* ODS 9 */}
              <div className="flex-1 border border-accent/20 rounded-lg p-5 bg-accent/5">
                <div className="font-mono text-3xl font-bold text-accent mb-2">09</div>
                <h3 className="font-mono text-sm font-semibold text-light-slate mb-2">
                  Industria, Innovación e Infraestructura
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  Democratizamos el acceso a IA y automatización para pymes que 
                  no pueden permitirse departamentos de IT.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OdsSection;
