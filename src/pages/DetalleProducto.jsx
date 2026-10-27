import { useParams, Link } from "react-router-dom";
import { productos } from "../data/productos";
import { Button } from "react-bootstrap";

function DetalleProducto({ carrito, onAgregar, favoritos, onFavoritos }) {
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
  const esFavorito = favoritos.includes(producto.id);
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
      <Button
        variant="secondary"
        disabled={stockDisponible <= 0}
        onClick={() => onAgregar(producto)}
      >
        Agregar al carrito
      </Button>
      <Button
        variant="outline-danger"
        onClick={() => onFavoritos(producto.id)}
        aria-pressed={esFavorito}
      >
        {esFavorito ? "❤︎︎" : "♡︎"}
      </Button>
      <Button variant="outline-secondary" href="/productos">
        Volver al catálogo
      </Button>
    </main>
  );
}

export default DetalleProducto;
