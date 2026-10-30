import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductoCard from "../components/ProductoCard";
import { productos } from "../data/productos";

const categorias = [
  ...new Set(productos.map((producto) => producto.categoria)),
];

/* Normalizo texto para que no importen mayúsculas ni tildes */
function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function Productos({ carrito, onAgregar, favoritos, onFavorito }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("");
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = normalizarTexto(producto.nombre).includes(
      normalizarTexto(busqueda).trim(),
    );
    const coincideCategoria =
      categoria === "" || producto.categoria === categoria;
    const coincideFavoritos = !soloFavoritos || favoritos.includes(producto.id);
    return coincideNombre && coincideCategoria && coincideFavoritos;
  });

  // sort modifica el array, por eso ordeno una copia
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (orden === "menor") return a.precio - b.precio;
    if (orden === "mayor") return b.precio - a.precio;
    return 0;
  });

  function cantidadEnCarrito(id) {
    return carrito.find((item) => item.id === id)?.cantidad ?? 0;
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Productos</h1>

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Form.Label htmlFor="busqueda">Buscar producto</Form.Label>
          <Form.Control
            id="busqueda"
            type="search"
            placeholder="Ej: remera"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </Col>
        <Col sm={6} md={3}>
          <Form.Label htmlFor="categoria">Categoría</Form.Label>
          <Form.Select
            id="categoria"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((nombreCategoria) => (
              <option key={nombreCategoria} value={nombreCategoria}>
                {nombreCategoria}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col sm={6} md={3}>
          <Form.Label htmlFor="orden">Ordenar por</Form.Label>
          <Form.Select
            id="orden"
            value={orden}
            onChange={(evento) => setOrden(evento.target.value)}
          >
            <option value="">Destacados</option>
            <option value="menor">Precio: menor a mayor</option>
            <option value="mayor">Precio: mayor a menor</option>
          </Form.Select>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Form.Check
            type="switch"
            id="solo-favoritos"
            label="Solo favoritos"
            className="mb-md-2"
            checked={soloFavoritos}
            onChange={(evento) => setSoloFavoritos(evento.target.checked)}
          />
        </Col>
      </Row>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {productosOrdenados.map((producto) => (
          <Col key={producto.id}>
            <ProductoCard
              producto={producto}
              onAgregar={onAgregar}
              cantidadEnCarrito={cantidadEnCarrito(producto.id)}
              esFavorito={favoritos.includes(producto.id)}
              onFavorito={onFavorito}
            />
          </Col>
        ))}
      </Row>

      {productosOrdenados.length === 0 && (
        <p className="text-center text-muted mt-4">
          {soloFavoritos && favoritos.length === 0
            ? "Todavía no marcaste productos como favoritos"
            : "No encontramos productos con esos filtros"}
        </p>
      )}
    </Container>
  );
}

export default Productos;
