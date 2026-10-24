import { Link } from "react-router-dom";

function Navbar({ cantidadProductos, tema, onCambiarTema }) {
  return (
    <header>
      <Link to="/">Tienda de Ropa</Link>
      <nav>
        <Link to="/">Inicio</Link>
        {" | "}
        <Link to="/productos">Productos</Link>
        {" | "}
        <Link to="/carrito">Carrito</Link>
        {" | "}
        <Link to="/contacto">Finalizar compra</Link>
        {" | "}
        <button onClick={onCambiarTema}>
          Cambiar a {tema === "light" ? "modo oscuro" : "modo claro"}
        </button>
      </nav>

      <p>Productos en el carrito: {cantidadProductos}</p>
    </header>
  );
}

export default Navbar;
