import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const imagenesBanner = [
  { src: "/img/productos/02-buzo-con-capucha.png", alt: "Buzo con capucha" },
  { src: "/img/productos/01-remera-basica.png", alt: "Remera básica" },
  { src: "/img/productos/10-pantalon-cargo.png", alt: "Pantalón cargo" },
];

const beneficios = [
  {
    titulo: "Envíos a todo el país",
    texto: "Recibí tu pedido en tu casa o retiralo por el local.",
  },
  {
    titulo: "Cambios sin vueltas",
    texto: "Si no te queda bien, tenés 30 días para cambiarlo.",
  },
  {
    titulo: "Calidad que dura",
    texto: "Telas seleccionadas para prendas que usás todos los días.",
  },
];

function Inicio() {
  return (
    <>
      {/* Banner principal */}
      <section className="bg-dark text-light py-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col md={6}>
              <img
                src="/logo.svg"
                alt="Logo de Tienda de Ropa"
                width={72}
                height={72}
                className="mb-3"
              />
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
              <Row className="g-2">
                <Col xs={7}>
                  <img
                    src={imagenesBanner[0].src}
                    alt={imagenesBanner[0].alt}
                    className="img-fluid rounded shadow w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
                <Col xs={5} className="d-flex flex-column gap-2">
                  {imagenesBanner.slice(1).map((imagen) => (
                    <img
                      key={imagen.src}
                      src={imagen.src}
                      alt={imagen.alt}
                      className="img-fluid rounded shadow"
                    />
                  ))}
                </Col>
              </Row>
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

      {/* Beneficios */}
      <section className="pb-5">
        <Container>
          <Row xs={1} md={3} className="g-4 text-center">
            {beneficios.map((beneficio) => (
              <Col key={beneficio.titulo}>
                <div className="border rounded p-4 h-100">
                  <h3 className="fs-5">{beneficio.titulo}</h3>
                  <p className="text-muted mb-0">{beneficio.texto}</p>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5">
            <Button as={Link} to="/productos" variant="dark" size="lg">
              Empezar a comprar
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Inicio;
