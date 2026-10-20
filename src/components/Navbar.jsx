import { Link } from "react-router-dom";

function Navbar({ cantidadProductos }) {
  return (
    <header>
      <Link to="/">Tienda de Ropa</Link>
      <nav>
        <Link to="/">Inicio</Link>
        {" | "}
        <Link to="/productos">Productos</Link>
        {" | "}
        <Link to="/carrito">Carrito</Link>
      </nav>

      <p>Productos en el carrito: {cantidadProductos}</p>
    </header>
  );
}

export default Navbar;
