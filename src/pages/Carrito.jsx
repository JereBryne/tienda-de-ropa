import CarritoItem from "../components/CarritoItem";
import { useState } from "react";
import { descuentos } from "../data/descuentos";

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
      <h1>Carrito</h1>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {productosAgrupados.map((producto) => (
              <CarritoItem
                key={producto.id}
                producto={producto}
                onAgregar={onAgregar}
                onDisminuir={onDisminuir}
                onEliminar={onEliminar}
              />
            ))}
          </ul>
          <input
            id="descuento"
            name="descuento"
            type="text"
            placeholder="Ingrese un código de descuento"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          {errorDes && <p>{errorDes}</p>}

          <button type="button" onClick={aplicarDescuento}>Aplicar descuento</button>
          
          <p>Unidades totales: {carrito.length}</p>
          <p>Subtotal de la compra: ${total}</p>
          {descuento && <p>Descuento aplicado: {descuento}%: -${totalDescuento}</p>}
          <p>Total a pagar: ${totalConDescuento}</p>
        </>
      )}
    </main>
  );
}

export default Carrito;
