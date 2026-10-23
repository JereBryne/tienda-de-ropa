import { Link } from "react-router-dom";
import { useState } from "react";
import FormularioCompra from "../components/FormularioCompra";
function Contacto({ carrito, onConfirmar }) {
  const [compraConfirmada, setCompraConfirmada] = useState(false);
  if (compraConfirmada) {
    return (
      <main>
        <h1>Compra simulada confirmada</h1>
        <p>Gracias por tu compra.</p>
        <Link to="/productos">Volver al catálogo</Link>
      </main>
    );
  }
  function confirmarCompra() {
    if (carrito.length === 0) return;

    setCompraConfirmada(true);
    onConfirmar();
  }
  return (
    <main>
      <h1>Finalizar compra</h1>
      {carrito.length === 0 ? (
        <>
          <p>Agregá productos al carrito antes de ocntinuar.</p>
          <Link to="/productos">Ver productos</Link>
        </>
      ) : (
        <>
          <p>Completá tus datos para confirmar la compra.</p>
          <FormularioCompra onConfirmar={confirmarCompra} />
        </>
      )}
    </main>
  );
}
export default Contacto;
