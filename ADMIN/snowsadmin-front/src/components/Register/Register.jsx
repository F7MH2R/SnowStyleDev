import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    correo_electronico: "",
    password: "",
    direccion: "",
    telefono: "",
    dui: "",
    img_perfil: "",
    admin: true,
  });

  const [imgPreview, setImgPreview] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === "img_perfil") {
      setImgPreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", user);
      if (response.status === 201) {
        toast.success("Usuario creado correctamente");

        navigate("/");
      } else {
        toast.error("Error inesperado al crear usuario");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al crear usuario");
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2>Registrar Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formApellidos">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCorreoElectronico">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="correo_electronico"
            placeholder="Correo Electrónico"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDireccion">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            placeholder="Dirección"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTelefono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDui">
          <Form.Label>DUI</Form.Label>
          <Form.Control
            type="text"
            name="dui"
            placeholder="DUI"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formImgPerfil">
          <Form.Label>URL de Imagen de Perfil</Form.Label>
          <Form.Control
            type="text"
            name="img_perfil"
            placeholder="URL de Imagen de Perfil"
            onChange={handleChange}
          />
        </Form.Group>
        {imgPreview && (
          <div className="text-center mt-3">
            <img
              src={imgPreview}
              alt="Vista previa de imagen de perfil"
              className="img-thumbnail"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
        )}
        <Button variant="primary" type="submit" className="mt-3">
          Registrar
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
