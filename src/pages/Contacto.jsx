import { Link } from "react-router-dom";
import { useState } from "react";
import { Container,Row, Col, Card, Alert, Button} from "react-bootstrap";
import FormularioCompra from "../components/FormularioCompra";

function Contacto({ carrito, onConfirmar }) {
  const [compraConfirmada, setCompraConfirmada] = useState(false);

  function confirmarCompra() {
    if (carrito.length === 0) 
      return;

    setCompraConfirmada(true);
    onConfirmar();
  }

  if (compraConfirmada) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Alert variant="success" className="text-center">
              <Alert.Heading>
                Compra simulada confirmada
              </Alert.Heading>

              <p>
                Gracias por tu compra. Los datos fueron registrados
                correctamente.
              </p>

              <Button
                as={Link}
                to="/productos"
                variant="success"
              >
                Volver al catálogo
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={7}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5">

              <h1 className="mb-3">
                Finalizar compra
              </h1>

              {carrito.length === 0 ? (
                <Alert variant="warning">
                  <Alert.Heading>
                    El carrito está vacío
                  </Alert.Heading>

                  <p>
                    Agregá productos al carrito antes de continuar.
                  </p>

                  <Button
                    as={Link}
                    to="/productos"
                    variant="dark"
                  >
                    Ver productos
                  </Button>
                </Alert>
              ) : (
                <>
                  <p className="text-muted mb-4">
                    Completá tus datos para confirmar la compra.
                  </p>

                  <FormularioCompra
                    onConfirmar={confirmarCompra}
                  />
                </>
              )}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;