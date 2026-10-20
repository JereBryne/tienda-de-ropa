import "./App.css";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Navbar from "./components/Navbar";
import Carrito from "./pages/Carrito";
import Inicio from "./pages/Inicio";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [carrito, setCarrito] = useState([]);
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
        <Route path="/carrito" element={<Carrito carrito={carrito} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
