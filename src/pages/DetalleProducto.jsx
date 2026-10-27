import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Alert } from "react-bootstrap";
import { productos } from "../data/productos";
import { formatearPrecio } from "../utils/formato";

function DetalleProducto({ carrito, onAgregar }) {
  const { id } = useParams();
  const producto = productos.find((producto) => producto.id === Number(id));
  if (!producto) {
    return (
      <Container className="py-4">
        <Alert variant="warning">Producto no encontrado</Alert>
        <Button as={Link} to="/productos" variant="dark">
          Volver al catálogo
        </Button>
      </Container>
    );
  }
  const cantidadEnCarrito =
    carrito.find((item) => item.id === producto.id)?.cantidad ?? 0;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  const sinStock = producto.stock === 0;

  return (
    <Container className="py-4">
      <Button as={Link} to="/productos" variant="outline-dark" className="mb-4">
        ← Volver al catálogo
      </Button>

      <Row className="g-4">
        <Col md={6}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow-sm w-100"
            style={{ maxHeight: 500, objectFit: "cover" }}
          />
        </Col>

        <Col md={6}>
          <Badge bg="secondary" className="mb-2">
            {producto.categoria}
          </Badge>
          <h1>{producto.nombre}</h1>
          <p className="fs-3 fw-bold">{formatearPrecio(producto.precio)}</p>
          <p className="text-muted">{producto.descripcionCompleta}</p>

          {sinStock ? (
            <Badge bg="danger" className="mb-3">
              Sin stock
            </Badge>
          ) : (
            <p className="text-success">Stock disponible: {stockDisponible}</p>
          )}

          <h2 className="fs-5">Características</h2>
          <ul>
            {producto.caracteristicas.map((caracteristica) => (
              <li key={caracteristica}>{caracteristica}</li>
            ))}
          </ul>

          <div className="d-flex flex-wrap align-items-center gap-3">
            <Button
              variant="dark"
              size="lg"
              disabled={stockDisponible <= 0}
              onClick={() => onAgregar(producto)}
            >
              {sinStock
                ? "Sin stock"
                : stockDisponible <= 0
                  ? "Máximo en carrito"
                  : "Agregar al carrito"}
            </Button>
            {cantidadEnCarrito > 0 && (
              <Link to="/carrito" className="text-dark">
                Tenés {cantidadEnCarrito} en el carrito
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;
