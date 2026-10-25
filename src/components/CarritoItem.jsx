function CarritoItem({ producto, onAgregar, onDisminuir, onEliminar }) {
  return (
    <li>
      <h2>{producto.nombre}</h2>
      <p>Precio por unidad: ${producto.precio}</p>
      <p>Cantidad: {producto.cantidad}</p>
      <p>Subtotal: ${producto.precio * producto.cantidad}</p>
      <button
        type="button"
        disabled={producto.cantidad <= 1}
        onClick={() => onDisminuir(producto.id)}
      >
        -
      </button>
      <button
        type="button"
        disabled={producto.cantidad >= producto.stock}
        onClick={() => onAgregar(producto)}
      >
        +
      </button>
      <button type="button" onClick={() => onEliminar(producto.id)}>
        Eliminar
      </button>
    </li>
  );
}

export default CarritoItem;
