import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function Acceso({ onIniciarSesion }) {
  const [searchParams] = useSearchParams();
  const esRegistro = searchParams.get("modo") === "registro";
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function validateForm() {
    const newErrors = {};
    if (esRegistro) {
      if (formData.confirmPassword.trim() === "") {
        newErrors.confirmPassword = "El campo confirmar contraseña está vacío.";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden.";
      }
      if (formData.name.trim() === "") {
        newErrors.name = "El campo nombre está vacío.";
      }
    }
    if (formData.email.trim() === "") {
      newErrors.email = "El campo correo electrónico está vacío.";
    } else if (
      !formData.email.includes(
        "/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()).",
      )
    ) {
      newErrors.email = "El correo electrónico es inválido.";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "El campo contraseña está vacío.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const nombre = esRegistro ? formData.name : formData.email.split("@")[0];
      onIniciarSesion({ name: nombre, email: formData.email });
      navigate(from);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title mb-4">
                {esRegistro ? "Crear cuenta" : "Inicio de Sesión"}
              </h2>

              <Form onSubmit={handleSubmit} noValidate>
                {esRegistro && (
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label> Nombre:</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {esRegistro && (
                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirmar contraseña:</Form.Label>
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <Button type="submit" variant="outline-dark" className="w-100">
                  {esRegistro ? "Registrarse" : "Iniciar Sesión"}
                </Button>
              </Form>
              {esRegistro ? (
                <div className="text-center mt-3">
                  <span className="me-2">¿Ya tenés una cuenta?</span>
                  <Button
                    as={Link}
                    to="/acceso?modo=login"
                    state={{ from }}
                    size="sm"
                    variant="outline-dark"
                    onClick={() => setErrors({})}
                  >
                    Iniciá sesión
                  </Button>
                </div>
              ) : (
                <div className="text-center mt-3">
                  ¿no tenes cuenta?{" "}
                  <Button
                    as={Link}
                    to="/acceso?modo=registro"
                    state={{ from }}
                    size="sm"
                    variant="outline-dark"
                    onClick={() => setErrors({})}
                  >
                    Regístrate
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Acceso;
