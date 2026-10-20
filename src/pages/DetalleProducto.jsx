import { useParams, Link } from "react-router-dom";
import { productos } from "../data/productos";

function DetalleProducto({ carrito, onAgregar }) {
  const { id } = useParams();
  const producto = productos.find((producto) => producto.id === Number(id));
  if (!producto) {
    return (
      <main>
        <h1>Producto no encontrado</h1>
        <Link to="/productos">Volver al catálogo</Link>
      </main>
    );
  }
  const cantidadEnCarrito = carrito.filter(
    (item) => item.id === producto.id,
  ).length;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  return (
    <main>
      <h1>{producto.nombre}</h1>
      <p>Categoria: {producto.categoria}</p>
      <p>Precio: ${producto.precio}</p>
      <p>
        {stockDisponible > 0
          ? `Stock disponible: ${stockDisponible}`
          : "Sin stock"}
      </p>
      <button
        type="button"
        disabled={stockDisponible <= 0}
        onClick={() => onAgregar(producto)}
      >
        Agregar al carrito
      </button>
      <Link to="/productos">Volver al catálogo</Link>
    </main>
  );
}

export default DetalleProducto;
