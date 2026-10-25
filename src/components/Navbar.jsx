import { Link, NavLink } from "react-router-dom";
import {
  Navbar as NavBs,
  Container,
  Nav,
  Button,
  Badge,
} from "react-bootstrap";

function Navbar({ cantidadProductos, tema, onCambiarTema }) {
  return (
    <NavBs expand="lg" bg="body-tertiary">
      <Container>
        <NavBs.Brand as={Link} to="/">
          Tienda de Ropa
        </NavBs.Brand>
        <Button
          className="ms-auto me-2 order-lg-last"
          variant="outline-secondary"
          aria-label="Cambiar tema"
          onClick={onCambiarTema}
        >
          {tema === "light" ? "⏾" : "☀︎"}
        </Button>
        <NavBs.Toggle aria-controls="menu"></NavBs.Toggle>
        <NavBs.Collapse id="menu">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>

            <Nav.Link as={NavLink} to="/carrito">
              Carrito <Badge bg="secondary">{cantidadProductos}</Badge>
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contacto">
              Finalizar compra
            </Nav.Link>
          </Nav>
        </NavBs.Collapse>
      </Container>
    </NavBs>
  );
}

export default Navbar;
