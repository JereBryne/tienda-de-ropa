import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Button,
  ListGroup,
} from "react-bootstrap";
import FormularioCompra from "../components/FormularioCompra";
import { formatearPrecio } from "../utils/formato";
import { calcularTotales } from "../utils/carrito";

function Contacto({ carrito, cupon, usuario, onConfirmar }) {
  // Guarda los datos de la compra confirmada para mostrarlos en el mensaje final
  const [compraConfirmada, setCompraConfirmada] = useState(null);

  function confirmarCompra(datos) {
    if (carrito.length === 0) return;

    setCompraConfirmada({
      datos,
      total: calcularTotales(carrito, cupon).total,
    });
    onConfirmar();
  }

  if (compraConfirmada) {
    const { datos, total } = compraConfirmada;
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Alert variant="success" className="text-center">
              <Alert.Heading>
                ¡Gracias por tu compra, {datos.nombre}!
              </Alert.Heading>
              <p>
                Registramos tu pedido por{" "}
                <strong>{formatearPrecio(total)}</strong>. Te enviamos el
                detalle a <strong>{datos.email}</strong>.
              </p>
              <p>
                {datos.entrega === "envio"
                  ? `Lo enviaremos a ${datos.direccion}.`
                  : "Podés retirarlo por el local cuando te avisemos."}
              </p>
              <Button as={Link} to="/productos" variant="success">
                Volver al catálogo
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (carrito.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Alert variant="warning">
              <Alert.Heading>El carrito está vacío</Alert.Heading>
              <p>Agregá productos al carrito antes de continuar.</p>
              <Button as={Link} to="/productos" variant="dark">
                Ver productos
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!usuario) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Alert variant="info">
              <Alert.Heading>
                Iniciá sesión para finalizar la compra
              </Alert.Heading>
              <p>Tu carrito queda guardado mientras tanto.</p>
              <div className="d-flex flex-wrap gap-2">
                <Button
                  as={Link}
                  to="/acceso?modo=login"
                  state={{ from: "/contacto" }}
                  variant="dark"
                >
                  Iniciar sesión
                </Button>
                <Button
                  as={Link}
                  to="/acceso?modo=registro"
                  state={{ from: "/contacto" }}
                  variant="outline-dark"
                >
                  Crear cuenta
                </Button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  const { subtotal, descuento, total } = calcularTotales(carrito, cupon);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Finalizar compra</h1>
      <Row className="g-4">
        <Col lg={7}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <p className="text-muted mb-4">
                Completá tus datos para confirmar la compra.
              </p>
              <FormularioCompra
                emailInicial={usuario.email}
                onConfirmar={confirmarCompra}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title>Tu pedido</Card.Title>
              <ListGroup variant="flush" className="mb-3">
                {carrito.map((producto) => (
                  <ListGroup.Item
                    key={producto.id}
                    className="d-flex justify-content-between px-0"
                  >
                    <span>
                      {producto.nombre} × {producto.cantidad}
                    </span>
                    <span>
                      {formatearPrecio(producto.precio * producto.cantidad)}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {cupon && (
                <>
                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>{formatearPrecio(subtotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between text-success mb-2">
                    <span>Descuento {cupon.codigo}</span>
                    <span>−{formatearPrecio(descuento)}</span>
                  </div>
                </>
              )}
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total</span>
                <span>{formatearPrecio(total)}</span>
              </div>
              <Link
                to="/carrito"
                className="d-block mt-3 link-body-emphasis small"
              >
                Modificar carrito
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;
