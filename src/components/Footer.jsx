import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const claseLink =
  "link-light link-opacity-50 link-opacity-75-hover text-decoration-none";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row className="gy-3 align-items-center text-center text-md-start">
          <Col md={4}>
            <h5 className="mb-1">Tienda de Ropa</h5>
            <small className="text-secondary">
              Indumentaria cómoda y con estilo propio.
            </small>
          </Col>

          <Col md={4} className="text-center">
            <Link to="/" className={`${claseLink} me-3`}>
              Inicio
            </Link>
            <Link to="/productos" className={`${claseLink} me-3`}>
              Productos
            </Link>
            <Link to="/carrito" className={`${claseLink} me-3`}>
              Carrito
            </Link>
            <Link to="/contacto" className={claseLink}>
              Finalizar compra
            </Link>
          </Col>

          <Col md={4} className="text-md-end">
            <small className="text-secondary">
              © 2026 Tienda de Ropa · TP Construcción de Interfaces de Usuario
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;