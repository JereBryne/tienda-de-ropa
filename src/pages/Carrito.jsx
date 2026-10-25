import CarritoItem from "../components/CarritoItem";
import { useState } from "react";
import { descuentos } from "../data/descuentos";
import {
  Button,
  Table,
  InputGroup,
  Form,
  Alert,
  Container,
} from "react-bootstrap";

function Carrito({ carrito, onAgregar, onDisminuir, onEliminar }) {
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState(null);
  const [errorDes, setErrorDes] = useState(null);

  const productosAgrupados = carrito.reduce((agrupados, producto) => {
    const existente = agrupados.find((item) => item.id === producto.id);
    if (existente) {
      return agrupados.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item,
      );
    }
    return [...agrupados, { ...producto, cantidad: 1 }];
  }, []);
  const total = productosAgrupados.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0,
  );
  const totalDescuento = descuento ? total * (descuento / 100) : 0;
  const totalConDescuento = total - totalDescuento;

  function aplicarDescuento() {
    const codigoNormalizado = codigo.trim().toUpperCase();
    const porcentaje = descuentos[codigoNormalizado];
    if (porcentaje) {
      setDescuento(porcentaje);
      setErrorDes(null);
    } else {
      setDescuento(null);
      setErrorDes("Código de descuento inválido");
    }
  }

  return (
    <main>
      <Container className="my-4">
        <h1>Carrito</h1>
        <Alert variant="dark">Unidades totales: {carrito.length}</Alert>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <Table responsive className="align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio por unidad</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productosAgrupados.map((producto) => (
                  <CarritoItem
                    key={producto.id}
                    producto={producto}
                    onAgregar={onAgregar}
                    onDisminuir={onDisminuir}
                    onEliminar={onEliminar}
                  />
                ))}
              </tbody>
            </Table>
            <InputGroup className="mb-3">
              <Form.Control
                id="descuento"
                name="descuento"
                type="text"
                placeholder="Ingrese un código de descuento"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              <Button variant="outline-success" onClick={aplicarDescuento}>
                Aplicar descuento
              </Button>
            </InputGroup>
            {errorDes && (
              <Alert variant="danger" className="mt-2">
                {errorDes}
              </Alert>
            )}{" "}
            <Alert variant="dark">Subtotal de la compra: ${total}</Alert>
            {descuento && (
              <Alert variant="success">
                Descuento aplicado: {descuento}%: -${totalDescuento}
              </Alert>
            )}
            <Alert variant="success">Total a pagar: ${totalConDescuento}</Alert>
          </>
        )}
      </Container>
    </main>
  );
}

export default Carrito;
