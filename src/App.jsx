import "./App.css";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Navbar from "./components/Navbar";
import Carrito from "./pages/Carrito";
import Acceso from "./pages/Acceso";
import Inicio from "./pages/Inicio";
import Footer from "./components/Footer";
import Contacto from "./pages/Contacto";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  function cerrarSesion() {
    setUsuario(null);
    setCarrito([]);
  }


  function iniciarSesion(usuarioData) {
    setUsuario(usuarioData);
  }

  function agregarAlCarrito(producto) {
    if (!usuario) {
      navigate("/acceso?modo=login", { state: { from: location.pathname } });
      return;
    }
    setCarrito((carritoActual) => {
      const cantidadActual = carritoActual.filter(
        (item) => item.id === producto.id,
      ).length;

      if (cantidadActual >= producto.stock) {
        return carritoActual;
      }

      return [...carritoActual, producto];
    });
  }
  function quitarUnaUnidad(id) {
    setCarrito((carritoActual) => {
      const indiceAEliminar = carritoActual.findIndex(
        (producto) => producto.id === id,
      );

      if (indiceAEliminar === -1) return carritoActual;

      return carritoActual.filter(
        (_producto, indice) => indice !== indiceAEliminar,
      );
    });
  }
  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) =>
      carritoActual.filter((producto) => producto.id !== id),
    );
  }
  function vaciarCarrito() {
    setCarrito([]);
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        cantidadProductos={carrito.length}
        usuario={usuario}
        onCerrarSesion={cerrarSesion}
      />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={<Productos carrito={carrito} onAgregar={agregarAlCarrito} />}
          />
          <Route
            path="/producto/:id"
            element={
              <DetalleProducto carrito={carrito} onAgregar={agregarAlCarrito} />
            }
          />
          <Route
            path="/acceso"
            element={<Acceso onIniciarSesion={iniciarSesion} />}
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                onAgregar={agregarAlCarrito}
                onDisminuir={quitarUnaUnidad}
                onEliminar={eliminarDelCarrito}
              />
            }
          />
          <Route
            path="/contacto"
            element={<Contacto carrito={carrito} onConfirmar={vaciarCarrito} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;