import { Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";

function ProductoCard({
  producto,
  carrito,
  onAgregar,
  esFavoritos,
  onFavoritos,
}) {
  const cantidadEnCarrito = carrito.filter(
    (item) => item.id === producto.id,
  ).length;

  const stockDisponible = producto.stock - cantidadEnCarrito;
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column text-center">
        <Card.Title>{producto.nombre}</Card.Title>

        <Card.Text className="fw-bold fs-5 mt-2">
          {producto.descripcion}
        </Card.Text>
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
          <Badge bg="secondary">Categoria: {producto.categoria}</Badge>
          <Badge bg={stockDisponible > 0 ? "success" : "danger"}>
            {stockDisponible > 0
              ? `Stock disponible: ${stockDisponible}`
              : "Sin stock"}
          </Badge>
        </div>

        <Card.Text className="fw-bold fs-6 mt-2">
          Precio: ${producto.precio}
        </Card.Text>

        <div className="mt-auto d-flex flex-wrap justify-content-center gap-2">
          <Button
            as={Link}
            to={`/producto/${producto.id}`}
            variant="outline-primary"
          >
            Ver detalle
          </Button>
          <Button
            variant={
              stockDisponible <= 0 ? "outline-danger" : "outline-primary"
            }
            disabled={stockDisponible <= 0}
            onClick={() => onAgregar(producto)}
          >
            Agregar al carrito
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => onFavoritos(producto.id)}
            aria-pressed={esFavoritos}
          >
            {esFavoritos ? "❤︎︎" : "♡︎"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProductoCard;
