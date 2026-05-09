const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm text-cool-gray">
            <span className="text-primary font-semibold">NeoFlow</span> — Proyecto de Fin de Ciclo 2026
          </div>
          <div className="font-mono text-xs text-cool-gray/60">
            Desarrollo Agéntico · Sostenibilidad Digital · Green Tech
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
