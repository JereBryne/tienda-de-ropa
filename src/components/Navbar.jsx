import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Badge,
  Button,
} from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar({ cantidadProductos, usuario, onCerrarSesion }) {
  const location = useLocation();

  return (
    <BsNavbar expand="md" bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <BsNavbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img src="/logo.svg" alt="" width={32} height={32} />
          Tienda de Ropa
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="menu-principal" />

        <BsNavbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">
              Carrito{" "}
              <Badge bg="light" text="dark" pill>
                {cantidadProductos}
              </Badge>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">
              Finalizar compra
            </Nav.Link>
          </Nav>

          <Nav className="align-items-md-center">
            {usuario ? (
              <>
                <span className="navbar-text me-md-3">
                  Bienvenido, {usuario.name}
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={onCerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/acceso?modo=login"
                  state={{ from: location.pathname }}
                >
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/acceso?modo=registro"
                  state={{ from: location.pathname }}
                >
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;