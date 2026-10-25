import { Button } from "react-bootstrap";

function CarritoItem({ producto, onAgregar, onDisminuir, onEliminar }) {
  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>${producto.precio}</td>
      <td>{producto.cantidad}</td>
      <td>${producto.precio * producto.cantidad}</td>
      <td>
        <Button
          variant="outline-secondary"
          className="ms-2"
          size="sm"
          disabled={producto.cantidad <= 1}
          onClick={() => onDisminuir(producto.id)}
        >
          —
        </Button>
        <Button
          variant="outline-secondary"
          className="ms-2"
          size="sm"
          disabled={producto.cantidad >= producto.stock}
          onClick={() => onAgregar(producto)}
        >
          ✚
        </Button>
        <Button
          className="ms-2"
          size="sm"
          variant="outline-danger"
          onClick={() => onEliminar(producto.id)}
        >
          Eliminar
        </Button>
      </td>
    </tr>
  );
}

export default CarritoItem;
