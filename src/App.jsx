import "./App.css";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Navbar from "./components/Navbar";
import Carrito from "./pages/Carrito";
import Inicio from "./pages/Inicio";
import Footer from "./components/Footer";
import Contacto from "./pages/Contacto";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [carrito, setCarrito] = useState(()=> {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto) {
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
    <>
      <Navbar cantidadProductos={carrito.length} />
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
      <Footer />
    </>
  );
}

export default App;
