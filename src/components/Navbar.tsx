import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlassButton as LiquidGlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Solución", href: "#solucion" },
  { label: "Casos de uso", href: "#casos-uso" },
  { label: "Demo", href: "#live-demo" },
  { label: "Flujos", href: "#flujos" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
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
        {NAV_LINKS.map((link) => (
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
        className="md:hidden text-brand-fg hover:text-brand-primary p-2 transition-colors"
        aria-label="Alternar menú"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
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

      {/* Menú Móvil Fullscreen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-bg/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 px-4"
          >
            <div className="flex flex-col gap-4 w-full max-w-sm">
              {NAV_LINKS.map((link) => (
                <LiquidGlassButton
                  key={link.href}
                  onClick={() => handleNav(link.href, link.isRoute)}
                  className="w-full justify-center text-lg md:text-xl font-display font-medium text-brand-fg/80 hover:text-brand-primary py-3"
                  glassColor="rgba(255, 255, 255, 0.05)"
                >
                  {link.label}
                </LiquidGlassButton>
              ))}
              <div className="mt-4">
                <LiquidGlassButton
                  onClick={() => handleNav("#contacto")}
                  className="w-full justify-center font-display font-bold text-lg py-3 text-brand-primary"
                  glassColor="rgba(0, 229, 184, 0.15)"
                >
                  Empezar
                </LiquidGlassButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
