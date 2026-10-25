import CarritoItem from "../components/CarritoItem";

function Carrito({ carrito, onAgregar, onDisminuir, onEliminar }) {
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

          <p>Unidades totales: {carrito.length}</p>
          <p>Total de la compra: ${total}</p>
        </>
      )}
    </main>
  );
}

export default Carrito;
