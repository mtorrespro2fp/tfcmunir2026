import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlassButton as LiquidGlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
  isRoute?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Solución", href: "#solucion" },
  { label: "Casos de uso", href: "#casos-uso" },
  { label: "Demo", href: "#live-demo" },
  { label: "Flujos", href: "#flujos" },
  { label: "Precios", href: "/precios", isRoute: true },
];

interface NavbarProps {
  extraLinks?: NavLink[];
}

const Navbar = ({ extraLinks = [] }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string, isRoute?: boolean) => {
    if (isRoute) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      // Pequeño delay para asegurar que el DOM de la home cargue antes de scrollear
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  const goHome = () => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navContent = (
    <nav className="container mx-auto px-2 py-2 flex items-center justify-between">
      <button
        onClick={goHome}
        aria-label="NeoFlow — ir al inicio"
        className="font-display text-xl font-bold text-brand-primary tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 rounded px-4"
      >
        NeoFlow
      </button>

      <div className="hidden md:flex items-center gap-2">
        {[...NAV_LINKS, ...extraLinks].map((link) => (
          <LiquidGlassButton
            key={link.href}
            size="sm"
            onClick={() => handleNav(link.href, link.isRoute)}
            className="text-brand-fg/80 hover:text-brand-primary"
            glassColor="rgba(255, 255, 255, 0.05)"
          >
            {link.label}
          </LiquidGlassButton>
        ))}
      </div>

      <div className="hidden md:block">
        <LiquidGlassButton
          size="sm"
          onClick={() => handleNav("#contacto")}
          className="text-brand-primary font-bold ml-2"
          glassColor="rgba(0, 229, 184, 0.15)"
        >
          Empezar
        </LiquidGlassButton>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-brand-fg hover:text-brand-primary p-2 flex flex-col justify-center items-center gap-[5px] w-10 h-10 relative z-50 transition-colors"
        aria-label="Alternar menú"
      >
        <span className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 translate-x-3' : ''}`} />
        <span className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>
    </nav>
  );

  return (
    <>
      <GlassFilter />
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
        <div className="max-w-5xl mx-auto pointer-events-auto">
          <GlassEffect className="rounded-full border border-brand-primary/20 bg-brand-bg/40 backdrop-blur-md">
            {navContent}
          </GlassEffect>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#030712] flex flex-col items-center justify-start pt-[120px] pb-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-5 w-full max-w-sm h-max">
              {[...NAV_LINKS, ...extraLinks].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                >
                  <LiquidGlassButton
                    onClick={() => handleNav(link.href, link.isRoute)}
                    className="w-full justify-center text-xl font-display font-medium text-white py-5 shadow-lg"
                    glassColor="rgba(255, 255, 255, 0.1)"
                  >
                    {link.label}
                  </LiquidGlassButton>
                </motion.div>
              ))}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ([...NAV_LINKS, ...extraLinks].length) * 0.05 + 0.1, duration: 0.3 }}
              >
                <LiquidGlassButton
                  onClick={() => handleNav("#contacto")}
                  className="w-full justify-center font-display font-bold text-2xl py-5 text-brand-primary shadow-[0_0_30px_rgba(0,229,184,0.2)]"
                  glassColor="rgba(0, 229, 184, 0.2)"
                >
                  Empezar
                </LiquidGlassButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
