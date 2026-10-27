import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Navbar from "./components/Navbar";
import Carrito from "./pages/Carrito";
import Acceso from "./pages/Acceso";
import Inicio from "./pages/Inicio";
import Footer from "./components/Footer";
import Contacto from "./pages/Contacto";
import NoEncontrado from "./pages/NoEncontrado";
import ScrollAlInicio from "./components/ScrollAlInicio";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const CLAVE_CARRITO = "carrito";

function cargarCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) ?? [];
  } catch {
    return [];
  }
}

function App() {
  const [usuario, setUsuario] = useState(null);
  // Cada item del carrito es el producto más su cantidad: { ...producto, cantidad }
  const [carrito, setCarrito] = useState(cargarCarrito);

  // Guarda el carrito cada vez que cambia, así no se pierde al recargar
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const cantidadProductos = carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0,
  );

  function cerrarSesion() {
    setUsuario(null);
  }

  function iniciarSesion(usuarioData) {
    setUsuario(usuarioData);
  }

  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const existente = carritoActual.find((item) => item.id === producto.id);

      if (!existente) {
        if (producto.stock <= 0) return carritoActual;
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }

      if (existente.cantidad >= producto.stock) return carritoActual;

      return carritoActual.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
      );
    });
  }

  function quitarUnaUnidad(id) {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  }

  function eliminarDelCarrito(id) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id),
    );
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollAlInicio />
      <Navbar
        cantidadProductos={cantidadProductos}
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
                cantidadProductos={cantidadProductos}
                onAgregar={agregarAlCarrito}
                onDisminuir={quitarUnaUnidad}
                onEliminar={eliminarDelCarrito}
                onVaciar={vaciarCarrito}
              />
            }
          />
          <Route
            path="/contacto"
            element={
              <Contacto
                carrito={carrito}
                usuario={usuario}
                onConfirmar={vaciarCarrito}
              />
            }
          />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
