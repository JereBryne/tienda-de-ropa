import { useState } from "react";

function FormularioCompra({ onConfirmar }) {
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    entrega: "",
    mensaje: "",
  });
  const [error, setError] = useState("");
  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));
  }
  function enviarFormulario(evento) {
    evento.preventDefault();

    if (
      !datos.nombre.trim() ||
      !datos.email.trim() ||
      !datos.telefono.trim() ||
      !datos.direccion.trim() ||
      !datos.entrega
    ) {
      setError("Completá todos los campos obligatorios.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) {
      setError("Ingresá un email válido.");
      return;
    }

    setError("");
    onConfirmar(datos);
  }

  return (
    <form onSubmit={enviarFormulario} noValidate>
      <label htmlFor="nombre">Nombre y apellido</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        value={datos.nombre}
        onChange={cambiarCampo}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={datos.email}
        onChange={cambiarCampo}
      />

      <label htmlFor="telefono">Teléfono</label>
      <input
        id="telefono"
        name="telefono"
        type="tel"
        value={datos.telefono}
        onChange={cambiarCampo}
      />

      <label htmlFor="direccion">Dirección o localidad</label>
      <input
        id="direccion"
        name="direccion"
        type="text"
        value={datos.direccion}
        onChange={cambiarCampo}
      />

      <label htmlFor="entrega">Método de entrega</label>
      <select
        id="entrega"
        name="entrega"
        value={datos.entrega}
        onChange={cambiarCampo}
      >
        <option value="">Seleccionar</option>
        <option value="retiro">Retiro por el local</option>
        <option value="envio">Envío a domicilio</option>
      </select>

      <label htmlFor="mensaje">Aclaración opcional</label>
      <textarea
        id="mensaje"
        name="mensaje"
        value={datos.mensaje}
        onChange={cambiarCampo}
      />
      {error && <p>{error}</p>}
      <button type="submit">Confirmar compra</button>
    </form>
  );
}
export default FormularioCompra;
