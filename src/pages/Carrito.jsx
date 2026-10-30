import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CarritoItem from "../components/CarritoItem";
import { descuentos } from "../data/descuentos";
import { calcularTotales } from "../utils/carrito";
import { formatearPrecio } from "../utils/formato";

function Carrito({
  carrito,
  cantidadProductos,
  cupon,
  onAplicarCupon,
  onAgregar,
  onDisminuir,
  onEliminar,
  onVaciar,
}) {
  const [codigo, setCodigo] = useState("");
  const [errorCupon, setErrorCupon] = useState("");

  const { subtotal, descuento, total } = calcularTotales(carrito, cupon);

  function aplicarCupon(evento) {
    evento.preventDefault();
    const codigoNormalizado = codigo.trim().toUpperCase();
    const porcentaje = descuentos[codigoNormalizado];

    if (porcentaje) {
      onAplicarCupon({ codigo: codigoNormalizado, porcentaje });
      setErrorCupon("");
      setCodigo("");
    } else {
      setErrorCupon("Código de descuento inválido.");
    }
  }

  if (carrito.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h1 className="mb-3">Carrito</h1>
        <p className="text-body-secondary">Tu carrito está vacío.</p>
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

              <Form onSubmit={aplicarCupon} className="mb-3">
                <Form.Label htmlFor="cupon" className="small">
                  Código de descuento
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id="cupon"
                    placeholder="Ej: DESCUENTO10"
                    value={codigo}
                    onChange={(evento) => setCodigo(evento.target.value)}
                    isInvalid={!!errorCupon}
                  />
                  <Button type="submit" variant="outline-dark">
                    Aplicar
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errorCupon}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form>

              <div className="d-flex justify-content-between mb-2">
                <span>Unidades</span>
                <span>{cantidadProductos}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatearPrecio(subtotal)}</span>
              </div>
              {cupon && (
                <div className="d-flex justify-content-between align-items-center mb-2 text-success">
                  <span>
                    {cupon.codigo} (−{cupon.porcentaje}%){" "}
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-danger align-baseline"
                      onClick={() => onAplicarCupon(null)}
                    >
                      Quitar
                    </Button>
                  </span>
                  <span>−{formatearPrecio(descuento)}</span>
                </div>
              )}
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
                className="w-100 link-body-emphasis mt-1"
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
