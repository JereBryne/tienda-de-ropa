import { useState } from "react";
import ProductoCard from "../components/ProductoCard";
import { productos } from "../data/productos";
function Productos({ carrito, onAgregar }) {
  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        "",
      ); /*Normalizo texto apra que no importen las tildes*/
  }
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = normalizarTexto(producto.nombre).includes(
      normalizarTexto(
        busqueda,
      ).trim() /* Normlizo texto para que no impoten las tildes */,
    );
    const coincideCategoria =
      categoria === "" || producto.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });
  return (
    <main>
      <h1>Productos</h1>
      <label>
        Buscar producto
        <input
          type="search"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
        />
      </label>
      <p>estas buscando: {busqueda}</p>
      <label>
        Categoria{" "}
        <select
          value={categoria}
          onChange={(evento) => setCategoria(evento.target.value)}
        >
          <option value="">Todas</option>
          <option value="Remeras">Remeras</option>
          <option value="Buzos">Buzos</option>
          <option value="Pantalones">Pantalones</option>
        </select>
      </label>
      <p>Categoria elegida: {categoria}</p>
      {productosFiltrados.map((producto) => (
        <ProductoCard
          key={producto.id}
          producto={producto}
          carrito={carrito}
          onAgregar={onAgregar}
        />
      ))}
      {productosFiltrados.length === 0 && (
        <p>No encontramos productos con esos filtros</p>
      )}
    </main>
  );
}
export default Productos;
