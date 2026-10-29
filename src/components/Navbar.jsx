import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Badge,
  Button,
} from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";

const from =
  location.pathname === "/acceso"
    ? (location.state?.from ?? "/")
    : location.pathname;

function Navbar({
  cantidadProductos,
  usuario,
  onCerrarSesion,
  tema,
  onCambiarTema,
}) {
  const location = useLocation();

  return (
    <BsNavbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <BsNavbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img src="/logo.svg" alt="" width={32} height={32} />
          Tienda de Ropa
        </BsNavbar.Brand>
        <Button
          className="ms-auto me-2 order-lg-last"
          variant="outline-secondary"
          aria-label="Cambiar tema"
          onClick={onCambiarTema}
        >
          {tema === "light" ? "⏾ Oscuro" : "☀︎ Claro"}
        </Button>
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
            <Nav.Link as={NavLink} to="/nosotros">
              Nosotros
            </Nav.Link>
          </Nav>

          <Nav className="align-items-lg-center gap-lg-2">
            {usuario ? (
              <>
                <span className="navbar-text me-lg-2">
                  Bienvenido, {usuario.name}
                </span>
                <Button
                  className="ms-auto me-2 order-lg-last"
                  variant="outline-secondary"
                  aria-label="Cerrar sesión"
                  onClick={onCerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <div className="d-flex gap-2 mt-2 mt-lg-0">
                <Button
                  as={Link}
                  to="/acceso?modo=login"
                  state={{ from }}
                  variant="outline-secondary"
                >
                  Iniciar sesión
                </Button>
                <Button
                  as={Link}
                  to="/acceso?modo=registro"
                  state={{ from }}
                  variant="outline-secondary"
                >
                  Registrarse
                </Button>
              </div>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
