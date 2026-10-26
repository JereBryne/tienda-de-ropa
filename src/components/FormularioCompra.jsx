import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function FormularioCompra({ onConfirmar }) {
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
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
    const nuevo = validarCampo();
    setErrores(nuevo);
    if (Object.keys(nuevo).length === 0) {
      onConfirmar(datos);
    }
  }

  function validarCampo() {
    const nuevos = {};
    if (!datos.nombre.trim()) {
      nuevos.nombre = "El nombre es obligatorio";
    }
    if (!datos.email.trim()) {
      nuevos.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(datos.email)) {
      nuevos.email = "El email no es válido";
    }

    if (!datos.telefono.trim()) {
      nuevos.telefono = "El teléfono es obligatorio";
    }
    if (!datos.direccion.trim()) {
      nuevos.direccion = "La dirección es obligatoria";
    }
    if (!datos.entrega.trim()) {
      nuevos.entrega = "El método de entrega es obligatorio";
    }
    return nuevos;
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
        <Form.Label>Aclaración opcional</Form.Label>

        <Form.Control
          as="textarea"
          rows={3}
          name="mensaje"
          placeholder="Podés agregar una aclaración"
          value={datos.mensaje}
          onChange={cambiarCampo}
          isInvalid={!!errores.mensaje}
        />
        <Form.Control.Feedback type="invalid">
          {errores.mensaje}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="outline-success" size="lg" className="w-100">
        Confirmar compra
      </Button>
    </Form>
  );
}

export default FormularioCompra;
