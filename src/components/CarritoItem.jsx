import { ListGroup, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/formato";

function CarritoItem({ producto, onAgregar, onDisminuir, onEliminar }) {
  return (
    <ListGroup.Item className="py-3">
      <Row className="align-items-center g-3">
        <Col xs={3} md={2}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded"
            style={{ aspectRatio: "1", objectFit: "cover" }}
          />
        </Col>

        <Col xs={9} md={4}>
          <Link
            to={`/producto/${producto.id}`}
            className="fw-semibold link-body-emphasis text-decoration-none"
          >
            {producto.nombre}
          </Link>
          <div className="text-muted small">
            {formatearPrecio(producto.precio)} c/u
          </div>
        </Col>

        <Col xs={6} md={3}>
          <ButtonGroup size="sm" aria-label={`Cantidad de ${producto.nombre}`}>
            <Button
              variant="outline-dark"
              disabled={producto.cantidad <= 1}
              onClick={() => onDisminuir(producto.id)}
              aria-label="Quitar una unidad"
            >
              −
            </Button>
            <Button variant="outline-dark" disabled className="px-3 text-body">
              {producto.cantidad}
            </Button>
            <Button
              variant="outline-dark"
              disabled={producto.cantidad >= producto.stock}
              onClick={() => onAgregar(producto)}
              aria-label="Agregar una unidad"
            >
              +
            </Button>
          </ButtonGroup>
          {producto.cantidad >= producto.stock && (
            <div className="text-muted small mt-1">Máximo disponible</div>
          )}
        </Col>

        <Col xs={6} md={3} className="text-end">
          <div className="fw-bold">
            {formatearPrecio(producto.precio * producto.cantidad)}
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-danger p-0"
            onClick={() => onEliminar(producto.id)}
          >
            Eliminar
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default CarritoItem;
