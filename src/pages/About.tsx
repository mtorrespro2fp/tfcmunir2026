import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Leaf, Users, Brain, Shield, Zap, Target, Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const values = [
  {
    icon: Brain,
    title: "Innovación Agéntica",
    description:
      "Construimos agentes de IA que piensan, deciden y actúan de forma autónoma, liberando a los equipos humanos de las tareas repetitivas para que se centren en lo que de verdad importa.",
  },
  {
    icon: Leaf,
    title: "Green Coding",
    description:
      "Cada línea de código importa. Desarrollamos con principios de eficiencia energética y sostenibilidad digital, minimizando el consumo computacional y la huella de carbono de cada automatización.",
  },
  {
    icon: Shield,
    title: "Privacidad y Ética",
    description:
      "Cumplimos con el RGPD y la normativa europea de IA. Los datos de nuestros clientes nunca se comparten con terceros y los modelos se ejecutan con controles de sesgo y transparencia.",
  },
  {
    icon: Users,
    title: "Diseño Centrado en el Humano",
    description:
      "La tecnología debe adaptarse a las personas, no al revés. Nuestras interfaces son accesibles, intuitivas y pensadas para que cualquier perfil profesional pueda usarlas sin formación previa.",
  },
  {
    icon: Zap,
    title: "Eficiencia Medible",
    description:
      "No prometemos magia: mostramos datos. Cada flujo automatizado incluye métricas de tiempo ahorrado, coste evitado y tasa de error, para que el ROI sea transparente desde el día uno.",
  },
  {
    icon: Heart,
    title: "Impacto Social",
    description:
      "NeoFlow está alineado con los Objetivos de Desarrollo Sostenible (ODS 8, 9 y 12). Creemos que la IA debe democratizar el acceso a herramientas de productividad avanzadas para todas las PYMEs.",
  },
];

const timelineItems = [
  {
    date: "Sept 2025",
    title: "Investigación y Análisis",
    description: "Benchmarking de ineficiencia en PYMEs españolas. Identificación del problema: 10,5h mensuales perdidas en tareas manuales repetitivas.",
  },
  {
    date: "Nov 2025",
    title: "Arquitectura y Diseño",
    description: "Diseño de la arquitectura agéntica con n8n como motor de orquestación y modelos de IA como ChatGPT, Claude y Gemini como cerebros de decisión.",
  },
  {
    date: "Feb 2026",
    title: "Desarrollo del MVP",
    description: "Construcción de los flujos core: clasificación de leads, generación de presupuestos automáticos y respuestas inteligentes a clientes.",
  },
  {
    date: "Abr 2026",
    title: "Validación y Testing",
    description: "Pruebas con datos reales de PYMEs. Refinamiento de los agentes de IA y optimización de tiempos de respuesta por debajo de los 3 segundos.",
  },
  {
    date: "May 2026",
    title: "Lanzamiento Público",
    description: "Presentación oficial como Trabajo de Fin de Ciclo. Despliegue de la plataforma web y apertura del acceso a la demo gratuita.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-transparent selection:bg-brand-primary/20">
      <Navbar extraLinks={[
        { label: "Acerca de", href: "/acerca-de", isRoute: true },
        { label: "Términos", href: "/terminos", isRoute: true },
      ]} />

      {/* Hero de la página */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Efecto decorativo de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-bg-2/40 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span className="font-mono text-[10px] text-brand-primary tracking-widest uppercase">
              Acerca de NeoFlow
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight text-brand-fg mb-6"
          >
            IA que trabaja{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary">
              para ti
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-brand-fg/70 max-w-2xl mx-auto leading-relaxed"
          >
            NeoFlow nace de una pregunta simple:{" "}
            <span className="text-brand-primary font-medium">
              ¿por qué las PYMEs españolas siguen dedicando más de 10 horas al mes a tareas que una IA podría resolver en minutos?
            </span>
          </motion.p>
        </div>
      </section>

      {/* Misión */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={0}
              variants={fadeUp}
            >
              <p className="font-mono text-xs text-brand-primary tracking-[0.3em] uppercase mb-3">
                // nuestra misión
              </p>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-fg mb-6 tracking-tight">
                Automatizar con{" "}
                <span className="text-brand-primary">serenidad</span>
              </h2>
              <p className="text-brand-fg/70 leading-relaxed mb-4">
                NeoFlow es un motor de automatización inteligente diseñado específicamente para pequeñas y medianas empresas. 
                Combinamos agentes de IA avanzados (ChatGPT, Claude, Gemini) con flujos de trabajo orquestados por n8n 
                para transformar procesos manuales en sistemas autónomos que funcionan 24/7.
              </p>
              <p className="text-brand-fg/70 leading-relaxed">
                No se trata solo de velocidad. Se trata de devolver a los profesionales el recurso más valioso que tienen: 
                <span className="text-brand-fg font-medium"> su tiempo</span>. Cada automatización de NeoFlow está diseñada 
                para funcionar en silencio, con la calma de un sistema que simplemente trabaja.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={1}
              variants={fadeUp}
              className="relative"
            >
              <div className="bg-brand-bg-2/60 backdrop-blur-sm border border-brand-primary/10 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-brand-primary">10,5h</p>
                      <p className="text-xs text-brand-fg/50 font-mono">horas manuales / mes ahorradas</p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-brand-accent">&lt;3s</p>
                      <p className="text-xs text-brand-fg/50 font-mono">tiempo medio de respuesta IA</p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-brand-secondary" />
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-brand-secondary">100%</p>
                      <p className="text-xs text-brand-fg/50 font-mono">cumplimiento RGPD</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs text-brand-primary tracking-[0.3em] uppercase mb-3">
              // principios fundamentales
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-brand-fg tracking-tight">
              Nuestros{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
                Valores
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={i}
                variants={fadeUp}
                className="group relative bg-brand-bg-2/40 backdrop-blur-sm border border-brand-primary/10 rounded-2xl p-6 hover:border-brand-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <value.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-brand-fg mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-brand-fg/60 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline del proyecto */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs text-brand-primary tracking-[0.3em] uppercase mb-3">
              // cronología
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-brand-fg tracking-tight">
              El camino de{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
                NeoFlow
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/40 via-brand-primary/20 to-transparent md:-translate-x-px" />

            {timelineItems.map((item, i) => (
              <motion.div
                key={item.date}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={i}
                variants={fadeUp}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Punto en la línea */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(0,229,184,0.5)] -translate-x-1.5 mt-1.5 z-10" />

                {/* Contenido */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="inline-block font-mono text-xs text-brand-primary tracking-wider uppercase mb-1 px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                    {item.date}
                  </span>
                  <h3 className="font-display font-bold text-lg text-brand-fg mt-2 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-fg/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Créditos y Proyecto */}
      <section className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
        </div>

        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            variants={fadeUp}
          >
            <p className="font-mono text-xs text-brand-primary tracking-[0.3em] uppercase mb-3">
              // el proyecto
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-fg mb-8 tracking-tight">
              Trabajo de Fin de Ciclo{" "}
              <span className="text-brand-primary">2026</span>
            </h2>

            <div className="bg-brand-bg-2/40 backdrop-blur-sm border border-brand-primary/10 rounded-2xl p-8 md:p-10 text-left space-y-4">
              <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                <span className="font-mono text-brand-primary/70 uppercase tracking-wider text-xs">Autor</span>
                <span className="text-brand-fg">Munir Torres</span>

                <span className="font-mono text-brand-primary/70 uppercase tracking-wider text-xs">Centro</span>
                <span className="text-brand-fg">Pro2FP — Formación Profesional</span>

                <span className="font-mono text-brand-primary/70 uppercase tracking-wider text-xs">Ciclo</span>
                <span className="text-brand-fg">Sistemas Microinformáticos y Redes (SMR)</span>

                <span className="font-mono text-brand-primary/70 uppercase tracking-wider text-xs">Curso</span>
                <span className="text-brand-fg">2025 — 2026</span>

                <span className="font-mono text-brand-primary/70 uppercase tracking-wider text-xs">Comunidad</span>
                <span className="text-brand-fg">Comunidad de Madrid</span>

                <span className="font-mono text-brand-primary/70 uppercase tracking-wider text-xs">Tecnologías</span>
                <span className="text-brand-fg">React, TypeScript, n8n, ChatGPT, Claude, Gemini, Vite</span>

                <span className="font-mono text-brand-primary/70 uppercase tracking-wider text-xs">Enfoque</span>
                <span className="text-brand-fg">Desarrollo Agéntico · Green Coding · Sostenibilidad Digital</span>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent my-4" />

              <p className="text-sm text-brand-fg/60 leading-relaxed text-center italic">
                "NeoFlow representa la convergencia entre la inteligencia artificial moderna y las necesidades reales 
                del tejido empresarial español. No se trata de reemplazar humanos, sino de potenciarlos."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
