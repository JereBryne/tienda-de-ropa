import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de página, vuelve al principio (React Router no lo hace solo)
function ScrollAlInicio() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollAlInicio;
