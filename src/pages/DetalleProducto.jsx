import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Alert } from "react-bootstrap";
import { productos } from "../data/productos";

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
  const cantidadEnCarrito = carrito.filter(
    (item) => item.id === producto.id,
  ).length;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  const caracteristicas = producto.caracteristicas ?? [];

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
          <p className="fs-3 fw-bold">
            ${producto.precio.toLocaleString("es-AR")}
          </p>
          <p className="text-muted">{producto.descripcion}</p>

          {stockDisponible > 0 ? (
            <p className="text-success">Stock disponible: {stockDisponible}</p>
          ) : (
            <Badge bg="danger" className="mb-3">
              Sin stock
            </Badge>
          )}

          {caracteristicas.length > 0 && (
            <>
              <h2 className="fs-5">Características</h2>
              <ul>
                {caracteristicas.map((caracteristica) => (
                  <li key={caracteristica}>{caracteristica}</li>
                ))}
              </ul>
            </>
          )}

          <div>
            <Button
              variant="dark"
              size="lg"
              disabled={stockDisponible <= 0}
              onClick={() => onAgregar(producto)}
            >
              Agregar al carrito
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;