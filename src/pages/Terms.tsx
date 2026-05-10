import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const Terms = () => {
  const lastUpdate = "10 de mayo de 2026";

  const sections = [
    {
      id: "1",
      title: "1. Aceptación de los Términos",
      content: [
        "Al acceder y utilizar la plataforma NeoFlow (en adelante, \"el Servicio\"), usted acepta quedar vinculado por los presentes Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al Servicio.",
        "NeoFlow se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en esta página. El uso continuado del Servicio tras la publicación de cambios constituye su aceptación de los mismos.",
      ],
    },
    {
      id: "2",
      title: "2. Descripción del Servicio",
      content: [
        "NeoFlow es un motor de automatización inteligente que utiliza agentes de Inteligencia Artificial para optimizar procesos empresariales. El Servicio permite a las PYMEs automatizar tareas como la clasificación de leads, la generación de presupuestos, la gestión de reservas y la atención al cliente mediante flujos de trabajo orquestados con tecnología n8n.",
        "El Servicio se ofrece \"tal cual\" y \"según disponibilidad\". NeoFlow no garantiza que el Servicio sea ininterrumpido, puntual, seguro o libre de errores. Los resultados obtenidos del uso del Servicio pueden variar.",
      ],
    },
    {
      id: "3",
      title: "3. Registro y Cuentas de Usuario",
      content: [
        "Para acceder a determinadas funcionalidades del Servicio, puede ser necesario crear una cuenta de usuario. Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta.",
        "Se compromete a proporcionar información veraz, actual y completa durante el proceso de registro, y a mantener dicha información actualizada. NeoFlow se reserva el derecho de suspender o cancelar cuentas que contengan información falsa o incompleta.",
      ],
    },
    {
      id: "4",
      title: "4. Protección de Datos y Privacidad",
      content: [
        "NeoFlow cumple con el Reglamento General de Protección de Datos (RGPD — Reglamento UE 2016/679) y con la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).",
        "Los datos personales recogidos a través del Servicio serán tratados con la finalidad exclusiva de prestar el servicio contratado. No se cederán datos a terceros salvo obligación legal o consentimiento expreso del usuario.",
        "El responsable del tratamiento es NeoFlow, con domicilio en la Comunidad de Madrid, España. Los usuarios pueden ejercer sus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición contactando a través del formulario de contacto de la web o escribiendo a la dirección de correo electrónico indicada en la sección de contacto.",
        "Los datos procesados por los agentes de IA (ChatGPT, Claude, Gemini) se transmiten de forma cifrada y no se almacenan más allá del tiempo estrictamente necesario para completar la tarea solicitada. NeoFlow no utiliza los datos de los clientes para entrenar modelos de IA propios ni de terceros.",
      ],
    },
    {
      id: "5",
      title: "5. Uso de Inteligencia Artificial",
      content: [
        "NeoFlow integra modelos de IA de terceros (OpenAI, Anthropic, Google DeepMind) para proporcionar respuestas automatizadas, análisis y procesamiento de datos. El usuario reconoce que:",
        "a) Los resultados generados por IA son orientativos y no constituyen asesoramiento profesional vinculante. Se recomienda la revisión humana de decisiones críticas.",
        "b) NeoFlow implementa controles de calidad y filtros de contenido, pero no puede garantizar la precisión absoluta de las respuestas generadas por IA.",
        "c) El uso de los modelos de IA está sujeto además a los términos de servicio de los proveedores respectivos (OpenAI, Anthropic, Google).",
        "d) NeoFlow cumple con el Reglamento Europeo de Inteligencia Artificial (AI Act — Reglamento UE 2024/1689) en lo que respecta a la transparencia y la supervisión humana de los sistemas de IA.",
      ],
    },
    {
      id: "6",
      title: "6. Propiedad Intelectual",
      content: [
        "Todos los contenidos del Servicio, incluyendo pero no limitándose a textos, gráficos, logotipos, iconos, imágenes, código fuente, diseño de interfaz y flujos de automatización, son propiedad de NeoFlow o de sus licenciantes y están protegidos por las leyes de propiedad intelectual aplicables.",
        "El usuario retiene todos los derechos sobre los datos que introduce en el Servicio. NeoFlow solo utiliza dichos datos para la prestación del servicio contratado.",
        "Se prohíbe la reproducción, distribución, modificación o uso comercial de cualquier elemento del Servicio sin autorización previa y por escrito de NeoFlow.",
      ],
    },
    {
      id: "7",
      title: "7. Planes y Condiciones de Pago",
      content: [
        "NeoFlow ofrece diferentes planes de suscripción (Gratuito, Profesional y Empresarial) con distintos niveles de funcionalidad. Los precios y características de cada plan están detallados en la sección de Precios de la web.",
        "Los pagos se procesarán a través de pasarelas de pago seguras con cifrado SSL/TLS. Las suscripciones se renovarán automáticamente salvo cancelación previa por parte del usuario.",
        "El usuario podrá cancelar su suscripción en cualquier momento. La cancelación será efectiva al final del período de facturación en curso. No se realizarán reembolsos por períodos parciales.",
      ],
    },
    {
      id: "8",
      title: "8. Limitación de Responsabilidad",
      content: [
        "En la máxima medida permitida por la ley aplicable, NeoFlow no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo, incluyendo sin limitación, pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles.",
        "La responsabilidad total acumulada de NeoFlow por cualquier reclamación derivada del uso del Servicio no excederá la cantidad total abonada por el usuario en los doce (12) meses anteriores al evento que dio lugar a la reclamación.",
        "NeoFlow no será responsable de las interrupciones del servicio causadas por factores fuera de su control razonable, incluyendo fallos de infraestructura de terceros, desastres naturales o interrupciones de servicios de IA externos.",
      ],
    },
    {
      id: "9",
      title: "9. Uso Aceptable",
      content: [
        "El usuario se compromete a utilizar el Servicio de manera legal y ética. Queda expresamente prohibido:",
        "• Utilizar el Servicio para generar contenido ilegal, difamatorio, discriminatorio o que incite al odio.",
        "• Intentar acceder sin autorización a sistemas, datos o redes de NeoFlow o de otros usuarios.",
        "• Realizar ingeniería inversa, descompilar o desensamblar cualquier parte del Servicio.",
        "• Utilizar el Servicio para enviar comunicaciones comerciales no solicitadas (spam).",
        "• Sobrecargar deliberadamente la infraestructura del Servicio o interferir con su funcionamiento normal.",
        "NeoFlow se reserva el derecho de suspender o cancelar el acceso al Servicio en caso de incumplimiento de estas condiciones.",
      ],
    },
    {
      id: "10",
      title: "10. Cookies y Tecnologías de Seguimiento",
      content: [
        "NeoFlow utiliza cookies técnicas estrictamente necesarias para el funcionamiento del Servicio. No se utilizan cookies de rastreo publicitario ni se comparten datos de navegación con terceros con fines publicitarios.",
        "El usuario puede configurar su navegador para rechazar cookies, aunque esto podría afectar a la funcionalidad del Servicio.",
      ],
    },
    {
      id: "11",
      title: "11. Legislación Aplicable y Jurisdicción",
      content: [
        "Los presentes Términos y Condiciones se rigen por la legislación española. Para la resolución de cualquier controversia derivada de estos términos, las partes se someten a la jurisdicción de los Juzgados y Tribunales de la Comunidad de Madrid, España.",
        "Si alguna disposición de estos términos fuera declarada nula o inaplicable, las disposiciones restantes mantendrán su plena validez y efecto.",
      ],
    },
    {
      id: "12",
      title: "12. Contacto",
      content: [
        "Para cualquier consulta relacionada con estos Términos y Condiciones, protección de datos o el funcionamiento del Servicio, puede ponerse en contacto con nosotros a través del formulario de contacto disponible en la web o mediante los canales indicados en la sección de Contacto.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-transparent selection:bg-brand-primary/20">
      <Navbar extraLinks={[
        { label: "Acerca de", href: "/acerca-de", isRoute: true },
        { label: "Términos", href: "/terminos", isRoute: true },
      ]} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-brand-primary/3 rounded-full blur-[100px]" />
        </div>

        <div className="relative container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-bg-2/40 backdrop-blur-sm"
          >
            <Scale className="w-3.5 h-3.5 text-brand-primary" />
            <span className="font-mono text-[10px] text-brand-primary tracking-widest uppercase">
              Marco Legal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-brand-fg mb-4"
          >
            Términos y{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
              Condiciones
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-brand-fg/50 font-mono text-sm"
          >
            Última actualización: {lastUpdate}
          </motion.p>
        </div>
      </section>

      {/* Índice rápido */}
      <section className="pb-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="bg-brand-bg-2/40 backdrop-blur-sm border border-brand-primary/10 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-brand-primary" />
              <h2 className="font-display font-bold text-lg text-brand-fg">Índice</h2>
            </div>
            <nav className="grid sm:grid-cols-2 gap-1.5">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="text-sm text-brand-fg/60 hover:text-brand-primary transition-colors py-1 px-2 rounded hover:bg-brand-primary/5"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Contenido legal */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-3xl space-y-12">
          {sections.map((section, i) => (
            <motion.article
              key={section.id}
              id={`section-${section.id}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={i}
              variants={fadeUp}
              className="scroll-mt-24"
            >
              <h2 className="font-display font-bold text-xl md:text-2xl text-brand-fg mb-4 tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-sm md:text-base text-brand-fg/70 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {i < sections.length - 1 && (
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent" />
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* Aviso final */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-brand-bg-2/40 backdrop-blur-sm border border-brand-primary/10 rounded-2xl p-6 md:p-8 text-center">
            <p className="text-sm text-brand-fg/50 leading-relaxed">
              Este documento forma parte del{" "}
              <span className="text-brand-fg/70 font-medium">
                Trabajo de Fin de Ciclo "NeoFlow"
              </span>{" "}
              (curso 2025-2026) y tiene carácter académico-profesional. Los términos aquí expuestos 
              reflejan las buenas prácticas legales aplicables a un servicio de automatización con IA 
              en el marco regulatorio español y europeo.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
