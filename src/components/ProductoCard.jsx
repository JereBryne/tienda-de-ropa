import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/formato";

function ProductoCard({
  producto,
  onAgregar,
  cantidadEnCarrito = 0,
  esFavorito,
  onFavorito,
}) {
  const sinStock = producto.stock === 0;
  const maximoAlcanzado = cantidadEnCarrito >= producto.stock;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  return (
    <Card className="h-100 shadow-sm position-relative">
      <Button
        variant="light"
        size="sm"
        className="position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
        style={{ zIndex: 1 }}
        onClick={() => onFavorito(producto.id)}
        aria-pressed={esFavorito}
        aria-label={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <span className={esFavorito ? "text-danger" : "text-dark"}>
          {esFavorito ? "♥" : "♡"}
        </span>
      </Button>
      <Link to={`/producto/${producto.id}`}>
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
          style={{
            height: 220,
            objectFit: "cover",
            opacity: sinStock ? 0.5 : 1,
          }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="align-self-start mb-2">
          {producto.categoria}
        </Badge>
        <Card.Title>{producto.nombre}</Card.Title>
        <Card.Text className="text-muted small">
          {producto.descripcion}
        </Card.Text>

        <div className="mt-auto">
          <p className="fs-5 fw-bold mb-1">
            {formatearPrecio(producto.precio)}
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
