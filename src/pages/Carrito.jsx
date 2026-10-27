import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CarritoItem from "../components/CarritoItem";
import { formatearPrecio } from "../utils/formato";

function Carrito({
  carrito,
  cantidadProductos,
  onAgregar,
  onDisminuir,
  onEliminar,
  onVaciar,
}) {
  const total = carrito.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0,
  );

  if (carrito.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h1 className="mb-3">Carrito</h1>
        <p className="text-muted">Tu carrito está vacío.</p>
        <Button as={Link} to="/productos" variant="dark">
          Ver productos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Carrito</h1>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm">
            <ListGroup variant="flush">
              {carrito.map((producto) => (
                <CarritoItem
                  key={producto.id}
                  producto={producto}
                  onAgregar={onAgregar}
                  onDisminuir={onDisminuir}
                  onEliminar={onEliminar}
                />
              ))}
            </ListGroup>
          </Card>
          <Button
            variant="outline-danger"
            size="sm"
            className="mt-3"
            onClick={onVaciar}
          >
            Vaciar carrito
          </Button>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Resumen</Card.Title>
              <div className="d-flex justify-content-between mb-2">
                <span>Unidades</span>
                <span>{cantidadProductos}</span>
              </div>
              <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-2 mb-3">
                <span>Total</span>
                <span>{formatearPrecio(total)}</span>
              </div>
              <Button as={Link} to="/contacto" variant="dark" className="w-100">
                Finalizar compra
              </Button>
              <Button
                as={Link}
                to="/productos"
                variant="link"
                className="w-100 text-dark mt-1"
              >
                Seguir comprando
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;
