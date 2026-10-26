import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductoCard({ producto, onAgregar, cantidadEnCarrito = 0 }) {
  const sinStock = producto.stock === 0;
  const maximoAlcanzado = cantidadEnCarrito >= producto.stock;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={producto.imagen}
        alt={producto.nombre}
        style={{ height: 220, objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="align-self-start mb-2">
          {producto.categoria}
        </Badge>
        <Card.Title>{producto.nombre}</Card.Title>
        <Card.Text className="text-muted">{producto.descripcion}</Card.Text>

        <div className="mt-auto">
          <p className="fs-5 fw-bold mb-1">
            ${producto.precio.toLocaleString("es-AR")}
          </p>
          {sinStock ? (
            <Badge bg="danger">Sin stock</Badge>
          ) : (
            <small className="text-success">Stock: {stockDisponible}</small>
          )}

          <div className="d-flex gap-2 mt-3">
            <Button
              as={Link}
              to={`/producto/${producto.id}`}
              variant="outline-dark"
              className="flex-fill"
            >
              Ver detalle
            </Button>
            <Button
              variant="dark"
              className="flex-fill"
              disabled={sinStock || maximoAlcanzado}
              onClick={() => onAgregar(producto)}
            >
              {sinStock
                ? "Sin stock"
                : maximoAlcanzado
                  ? "Máximo en carrito"
                  : "Agregar"}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductoCard;
