import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    dui: "",
    profileImage: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Nuevo estado para la alerta

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "profileImage") {
      setPreviewImage(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "El nombre completo es requerido";
    if (!formData.email) errors.email = "El correo electrónico es requerido";
    if (!formData.password) errors.password = "La contraseña es requerida";
    if (!formData.address) errors.address = "La dirección es requerida";
    if (!formData.phone) errors.phone = "El teléfono es requerido";
    if (!formData.dui) errors.dui = "El DUI es requerido";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await axios.post("http://localhost:3077/register", formData);

      // Limpiar el formulario
      setFormData({
        fullName: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        dui: "",
        profileImage: "",
      });

      setPreviewImage(null);

      // Mostrar la alerta de éxito
      setShowSuccessAlert(true);

      // Redirigir después del registro exitoso
      setTimeout(() => {
        setShowSuccessAlert(false); // Ocultar la alerta después de unos segundos
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(
        "Error al registrar usuario:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container">
      <h2>Registro de Usuario</h2>
      {/* Alerta de éxito */}
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
        >
          El usuario se ha registrado con éxito.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        {[
          { label: "Nombre Completo", name: "fullName", type: "text" },
          { label: "Correo Electrónico", name: "email", type: "email" },
          { label: "Contraseña", name: "password", type: "password" },
          { label: "Dirección", name: "address", type: "text" },
          { label: "Teléfono", name: "phone", type: "number" },
          { label: "DUI", name: "dui", type: "number" },
          {
            label: "Link de Imagen de Perfil",
            name: "profileImage",
            type: "text",
          },
        ].map(({ label, name, type }) => (
          <Form.Group key={name}>
            <Form.Label>{label}:</Form.Label>
            <Form.Control
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              isInvalid={!!formErrors[name]}
            />
            {formErrors[name] && (
              <Form.Control.Feedback type="invalid">
                {formErrors[name]}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        ))}

        {previewImage && (
          <Form.Group>
            <Form.Label>Vista previa de la imagen de perfil:</Form.Label>
            <img
              src={previewImage}
              alt="Vista previa de la imagen de perfil"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </Form.Group>
        )}

        <Button type="submit" variant="dark">
          Registrar
        </Button>
      </Form>
    </div>
  );
};

export default Register;
