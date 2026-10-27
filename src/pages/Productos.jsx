import { useState } from "react";
import ProductoCard from "../components/ProductoCard";
import { productos } from "../data/productos";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
function Productos({ carrito, onAgregar, favoritos, onFavoritos }) {
  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        "",
      ); /*Normalizo texto apra que no importen las tildes*/
  }
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [favoritosState, onFavoritosState] = useState(false);

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = normalizarTexto(producto.nombre).includes(
      normalizarTexto(
        busqueda,
      ).trim() /* Normlizo texto para que no impoten las tildes */,
    );
    const coincideCategoria =
      categoria === "" || producto.categoria === categoria;

    const coincideFavoritos =
      !favoritosState || favoritos.includes(producto.id);

    return coincideNombre && coincideCategoria && coincideFavoritos;
  });
  return (
    <Container as="main" className="my-4">
      <h1 className="mb-4">Productos</h1>
      <Row className="g-3 mb-4 align-items-end">
        <Col md={6}>
          <Form.Group controlId="busqueda">
            <Form.Label>Buscar producto</Form.Label>
            <Form.Control
              type="search"
              placeholder="Ingrese el nombre del producto"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Check
            type="switch"
            id="solo-favoritos"
            label="Solo favoritos"
            checked={favoritosState}
            onChange={(evento) => onFavoritosState(evento.target.checked)}
          />
        </Col>
        <Col md={4}>
          <Form.Group controlId="categoria">
            <Form.Label>Filtrar por categoría</Form.Label>
            <Form.Select
              value={categoria}
              onChange={(evento) => setCategoria(evento.target.value)}
            >
              <option value="">Todas</option>
              <option value="Remeras">Remeras</option>
              <option value="Buzos">Buzos</option>
              <option value="Pantalones">Pantalones</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {productosFiltrados.map((producto) => (
          <Col key={producto.id}>
            <ProductoCard
              producto={producto}
              carrito={carrito}
              onAgregar={onAgregar}
              esFavoritos={favoritos.includes(producto.id)}
              onFavoritos={onFavoritos}
            />
          </Col>
        ))}
      </Row>

      {productosFiltrados.length === 0 && (
        <Alert variant="danger">No encontramos productos con esos filtros.</Alert>
      )}
    </Container>
  );
}
export default Productos;
