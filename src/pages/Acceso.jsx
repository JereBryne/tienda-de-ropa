import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

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
    } else if (!formData.email.includes("@")) {
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

              <form onSubmit={handleSubmit} noValidate>
                {esRegistro && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre:
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback"> {errors.name} </div>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo Electronico:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email} </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña:
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password} </div>
                  )}
                </div>
                {esRegistro && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar Contraseña:
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.confirmPassword}{" "}
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    {esRegistro ? "Registrarse" : "Iniciar Sesión"}
                  </button>
                </div>
              </form>
              {esRegistro ? (
                <p>
                  ¿ya tenes una cuenta?{" "}
                  <Link
                    onClick={() => setErrors({})}
                    to="/acceso?modo=login"
                    state={{ from }}
                  >
                    Inicia sesión
                  </Link>
                </p>
              ) : (
                <p>
                  ¿no tenes cuenta?{" "}
                  <Link
                    onClick={() => setErrors({})}
                    to="/acceso?modo=registro"
                    state={{ from }}
                  >
                    Regístrate
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Acceso;
