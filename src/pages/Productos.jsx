import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductoCard from "../components/ProductoCard";
import { productos } from "../data/productos";

function Productos({ carrito, onAgregar }) {
  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        "",
      ); /*Normalizo texto para que no importen las tildes*/
  }
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = normalizarTexto(producto.nombre).includes(
      normalizarTexto(
        busqueda,
      ).trim() /* Normalizo texto para que no importen las tildes */,
    );
    const coincideCategoria =
      categoria === "" || producto.categoria === categoria;
    return coincideNombre && coincideCategoria;
  });

  return (
    <Container className="py-4">
      <h1 className="mb-4">Productos</h1>

      <Row className="g-3 mb-4">
        <Col md={8}>
          <Form.Label htmlFor="busqueda">Buscar producto</Form.Label>
          <Form.Control
            id="busqueda"
            type="search"
            placeholder="Ej: remera"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Label htmlFor="categoria">Categoría</Form.Label>
          <Form.Select
            id="categoria"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
          >
            <option value="">Todas</option>
            <option value="Remeras">Remeras</option>
            <option value="Buzos">Buzos</option>
            <option value="Pantalones">Pantalones</option>
          </Form.Select>
        </Col>
      </Row>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {productosFiltrados.map((producto) => (
          <Col key={producto.id}>
            <ProductoCard
              producto={producto}
              onAgregar={onAgregar}
              cantidadEnCarrito={
                carrito.filter((item) => item.id === producto.id).length
              }
            />
          </Col>
        ))}
      </Row>

      {productosFiltrados.length === 0 && (
        <p className="text-center text-muted mt-4">
          No encontramos productos con esos filtros
        </p>
      )}
    </Container>
  );
}

export default Productos;