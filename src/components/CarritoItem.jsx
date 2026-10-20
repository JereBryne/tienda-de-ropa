function CarritoItem({ producto }) {
  return (
    <li>
      {producto.nombre} - ${producto.precio}
    </li>
  );
}

export default CarritoItem;
