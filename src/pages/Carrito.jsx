import CarritoItem from "../components/CarritoItem";

function Carrito({ carrito }) {
  return (
    <main>
      <h1>Carrito</h1>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((producto, indice) => (
            <CarritoItem key={indice} producto={producto} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default Carrito;
