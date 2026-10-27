import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function validar(datos) {
  const errores = {};

  if (!datos.nombre.trim()) {
    errores.nombre = "Ingresá tu nombre y apellido.";
  }

  if (!datos.email.trim()) {
    errores.email = "Ingresá tu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) {
    errores.email = "Ingresá un email válido.";
  }

  if (!datos.telefono.trim()) {
    errores.telefono = "Ingresá tu teléfono.";
  } else if (!/^[\d\s()+-]{8,}$/.test(datos.telefono.trim())) {
    errores.telefono = "Ingresá un teléfono válido (solo números, mínimo 8).";
  }

  if (!datos.direccion.trim()) {
    errores.direccion = "Ingresá tu dirección o localidad.";
  }

  if (!datos.entrega) {
    errores.entrega = "Elegí un método de entrega.";
  }

  return errores;
}

function FormularioCompra({ emailInicial = "", onConfirmar }) {
  const [datos, setDatos] = useState({
    nombre: "",
    email: emailInicial,
    telefono: "",
    direccion: "",
    entrega: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});

  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }));
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      onConfirmar(datos);
    }
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
          isInvalid={!!errores.nombre}
        />
        <Form.Control.Feedback type="invalid">
          {errores.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Ingresá tu email"
          value={datos.email}
          onChange={cambiarCampo}
          isInvalid={!!errores.email}
        />
        <Form.Control.Feedback type="invalid">
          {errores.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="telefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          name="telefono"
          type="tel"
          placeholder="Ingresá tu teléfono"
          value={datos.telefono}
          onChange={cambiarCampo}
          isInvalid={!!errores.telefono}
        />
        <Form.Control.Feedback type="invalid">
          {errores.telefono}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="direccion">
        <Form.Label>Dirección o localidad</Form.Label>
        <Form.Control
          name="direccion"
          type="text"
          placeholder="Ingresá tu dirección o localidad"
          value={datos.direccion}
          onChange={cambiarCampo}
          isInvalid={!!errores.direccion}
        />
        <Form.Control.Feedback type="invalid">
          {errores.direccion}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="entrega">
        <Form.Label>Método de entrega</Form.Label>
        <Form.Select
          name="entrega"
          value={datos.entrega}
          onChange={cambiarCampo}
          isInvalid={!!errores.entrega}
        >
          <option value="">Seleccionar</option>
          <option value="retiro">Retiro por el local</option>
          <option value="envio">Envío a domicilio</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errores.entrega}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="mensaje">
        <Form.Label>Aclaración (opcional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="mensaje"
          placeholder="Podés agregar una aclaración"
          value={datos.mensaje}
          onChange={cambiarCampo}
        />
      </Form.Group>

      <Button type="submit" variant="dark" size="lg" className="w-100">
        Confirmar compra
      </Button>
    </Form>
  );
}

export default FormularioCompra;
