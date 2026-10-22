import { Link } from "react-router-dom";

function Navbar({ cantidadProductos, usuario, onCerrarSesion }) {
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
      {usuario ? (
        <div>
          <span>Bienvenido, {usuario.name}</span>
          <button onClick={onCerrarSesion}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <span>No has iniciado sesión</span>
          <Link to="/acceso?modo=login" state={{from: location.pathname}}>Iniciar Sesión</Link> | <Link to="/acceso?modo=registro" state={{from: location.pathname}}>Registrarse</Link>
        </div>
      )}

      <p>Productos en el carrito: {cantidadProductos}</p>
    </header>
  );
}

export default Navbar;
