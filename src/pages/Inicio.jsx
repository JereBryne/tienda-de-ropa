import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <>
      {/* Banner principal */}
      <section className="bg-dark text-light py-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col md={6}>
              <h1 className="display-4 fw-bold">Tienda de Ropa</h1>
              <p className="lead">
                Indumentaria cómoda, de calidad y con estilo propio.
                Encontrá tu próxima prenda favorita.
              </p>
              <Button as={Link} to="/productos" variant="light" size="lg">
                Ver catálogo
              </Button>
            </Col>
            <Col md={6}>
              <img
                src="https://picsum.photos/seed/ropa/800/500"
                alt="Banner de la tienda"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Descripción del emprendimiento */}
      <section className="py-5">
        <Container className="text-center">
          <h2 className="mb-3">Quiénes somos</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: 600 }}>
            Somos un emprendimiento de indumentaria que busca ofrecer prendas
            básicas y duraderas a precios accesibles. Compra simple, envío
            rápido y atención cercana.
          </p>
        </Container>
      </section>
    </>
  )
}

export default Inicio