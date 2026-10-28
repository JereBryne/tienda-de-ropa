import { Container, Row, Col, Card } from "react-bootstrap";

function Nosotros() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Sobre nosotros</h1>
      <p className="text-center lead mb-5">
        Somos un emprendimiento de indumentaria que busca ofrecer prendas
        básicas, cómodas y duraderas a precios accesibles.
      </p>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Nuestra historia</Card.Title>
              <Card.Text>
                Nacimos con la idea de crear una tienda simple, directa y
                pensada para el día a día. Creemos que una prenda bien elegida
                puede marcar la diferencia sin gastar de más. Por eso
                seleccionamos cada una de nuestras prendas con atención al
                detalle, priorizando la calidad y la comodidad.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Misión y valores</Card.Title>
              <Card.Text>
                Nuestra misión es acercar indumentaria con estilo propio a
                todos, ofreciendo productos duraderos a precios justos.
                Valoramos la confianza que depositan nuestros clientes,
                priorizamos la atención cercana y creemos en compras simples,
                rápidas y sin complicaciones.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Nosotros;
