import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Navbar from "./components/Navbar";
import Carrito from "./pages/Carrito";
import Acceso from "./pages/Acceso";
import Inicio from "./pages/Inicio";
import Footer from "./components/Footer";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import NoEncontrado from "./pages/NoEncontrado";
import ScrollAlInicio from "./components/ScrollAlInicio";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function cargarGuardado(clave, valorPorDefecto) {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

function temaInicial() {
  const temaGuardado = localStorage.getItem("tema");
  if (temaGuardado) return temaGuardado;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  const [usuario, setUsuario] = useState(null);
  // Cada item del carrito es el producto más su cantidad: { ...producto, cantidad }
  const [carrito, setCarrito] = useState(() => cargarGuardado("carrito", []));
  const [favoritos, setFavoritos] = useState(() =>
    cargarGuardado("favoritos", []),
  );
  const [tema, setTema] = useState(temaInicial);
  // Cupón aplicado en el carrito: { codigo, porcentaje } o null
  const [cupon, setCupon] = useState(null);

  // Guarda el carrito y los favoritos cada vez que cambian, así no se pierden al recargar
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // Aplica el tema de Bootstrap a toda la página
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  const cantidadProductos = carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0,
  );

  function cambiarTema() {
    setTema((temaActual) => (temaActual === "light" ? "dark" : "light"));
  }

  function alternarFavorito(id) {
    setFavoritos((favoritosActuales) =>
      favoritosActuales.includes(id)
        ? favoritosActuales.filter((favoritoId) => favoritoId !== id)
        : [...favoritosActuales, id],
    );
  }

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
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item,
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
    setCupon(null);
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollAlInicio />
      <Navbar
        cantidadProductos={cantidadProductos}
        usuario={usuario}
        onCerrarSesion={cerrarSesion}
        tema={tema}
        onCambiarTema={cambiarTema}
      />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={
              <Productos
                carrito={carrito}
                onAgregar={agregarAlCarrito}
                favoritos={favoritos}
                onFavorito={alternarFavorito}
              />
            }
          />
          <Route
            path="/producto/:id"
            element={
              <DetalleProducto
                carrito={carrito}
                onAgregar={agregarAlCarrito}
                favoritos={favoritos}
                onFavorito={alternarFavorito}
              />
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
                cupon={cupon}
                onAplicarCupon={setCupon}
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
                cupon={cupon}
                usuario={usuario}
                onConfirmar={vaciarCarrito}
              />
            }
          />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
