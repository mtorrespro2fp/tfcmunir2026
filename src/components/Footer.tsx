import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        {/* Fila principal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="font-mono text-sm text-cool-gray">
            <span className="text-primary font-semibold">NeoFlow</span> — Proyecto de Fin de Ciclo 2026
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
            <Link
              to="/acerca-de"
              className="font-mono text-xs text-cool-gray/60 hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5"
            >
              Acerca de
            </Link>
            <span className="text-cool-gray/20 hidden sm:inline">|</span>
            <Link
              to="/terminos"
              className="font-mono text-xs text-cool-gray/60 hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5"
            >
              Términos y Condiciones
            </Link>
            <span className="text-cool-gray/20 hidden sm:inline">|</span>
            <Link
              to="/precios"
              className="font-mono text-xs text-cool-gray/60 hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5"
            >
              Precios
            </Link>
            <span className="text-cool-gray/20 hidden sm:inline">|</span>
            <a
              href="#contacto"
              className="font-mono text-xs text-cool-gray/60 hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-primary/5"
            >
              Contacto
            </a>
          </nav>
        </div>

        {/* Fila secundaria */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-border/30">
          <p className="font-mono text-xs text-cool-gray/60">
            Desarrollo Agéntico · Sostenibilidad Digital · Green Tech
          </p>
          <p className="font-mono text-[10px] text-cool-gray/40">
            © {new Date().getFullYear()} NeoFlow · Munir Torres · Pro2FP · Comunidad de Madrid
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
