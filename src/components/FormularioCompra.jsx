import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

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
    <Form onSubmit={enviarFormulario} noValidate>

      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre y apellido</Form.Label>

        <Form.Control
          name="nombre"
          type="text"
          placeholder="Ingresá tu nombre y apellido"
          value={datos.nombre}
          onChange={cambiarCampo}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>

        <Form.Control
          name="email"
          type="email"
          placeholder="Ingresá tu email"
          value={datos.email}
          onChange={cambiarCampo}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="telefono">
        <Form.Label>Teléfono</Form.Label>

        <Form.Control
          name="telefono"
          type="tel"
          placeholder="Ingresá tu teléfono"
          value={datos.telefono}
          onChange={cambiarCampo}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="direccion">
        <Form.Label>Dirección o localidad</Form.Label>

        <Form.Control
          name="direccion"
          type="text"
          placeholder="Ingresá tu dirección o localidad"
          value={datos.direccion}
          onChange={cambiarCampo}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="entrega">
        <Form.Label>Método de entrega</Form.Label>

        <Form.Select
          name="entrega"
          value={datos.entrega}
          onChange={cambiarCampo}
        >
          <option value="">Seleccionar</option>
          <option value="retiro">Retiro por el local</option>
          <option value="envio">Envío a domicilio</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="mensaje">
        <Form.Label>Aclaración opcional</Form.Label>

        <Form.Control
          as="textarea"
          rows={3}
          name="mensaje"
          placeholder="Podés agregar una aclaración"
          value={datos.mensaje}
          onChange={cambiarCampo}
        />
      </Form.Group>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="dark"
        size="lg"
        className="w-100"
      >
        Confirmar compra
      </Button>

    </Form>
  );
}

export default FormularioCompra;