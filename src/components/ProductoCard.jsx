import { Link } from "react-router-dom";
function ProductoCard({ producto, carrito, onAgregar }) {
  const cantidadEnCarrito = carrito.filter(
    (item) => item.id === producto.id,
  ).length;

  const stockDisponible = producto.stock - cantidadEnCarrito;
  return (
    <article>
      <h2>{producto.nombre}</h2>
      <p>Categoria: {producto.categoria}</p>
      <p>Precio: ${producto.precio}</p>
      <p>
        {stockDisponible > 0
          ? `Stock disponible: ${stockDisponible}`
          : "Sin stock"}
      </p>
      <Link to={`/producto/${producto.id}`}>Ver detalle</Link>
      <button
        type="button"
        disabled={stockDisponible <= 0}
        onClick={() => onAgregar(producto)}
      >
        Agregar al carrito
      </button>
    </article>
  );
}
export default ProductoCard;
