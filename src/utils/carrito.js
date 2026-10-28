// Subtotal, descuento del cupón y total final del carrito
export function calcularTotales(carrito, cupon) {
  const subtotal = carrito.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0,
  );
  const descuento = cupon ? Math.round(subtotal * (cupon.porcentaje / 100)) : 0;

  return { subtotal, descuento, total: subtotal - descuento };
}
