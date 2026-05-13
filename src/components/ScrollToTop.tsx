import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Al cambiar de ruta, forzar el scroll al tope de la página
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
