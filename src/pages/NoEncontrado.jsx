import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoEncontrado() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-4 fw-bold">404</h1>
      <p className="lead text-muted">La página que buscás no existe.</p>
      <Button as={Link} to="/" variant="dark">
        Volver al inicio
      </Button>
    </Container>
  );
}

export default NoEncontrado;
