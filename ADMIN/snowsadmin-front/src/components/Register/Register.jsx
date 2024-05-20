import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.css";
import googleFontsURL from "../FuenteLetra/FuenteLetra";
import "./Register.css";

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
      console.error("Error durante el registro:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al crear usuario, espacios requeridos");
      }
    }
  };

  return (
    <div style={{ fontFamily: "Prompt, sans-serif" }} className="register-body">
      <link rel="stylesheet" href={googleFontsURL} />
      <div className="register-container register_fadeInUp register_animated">
        <div className="register-header">
          <h2>Registrar Usuario</h2>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <div className="input-group">
              <label htmlFor="nombre">
                <i className="fas fa-user"></i> Nombre *
              </label>
              <input
                style={{ fontFamily: "Prompt, sans-serif" }}
                type="text"
                name="nombre"
                id="nombre"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="apellidos">
                <i className="fas fa-user"></i> Apellidos *
              </label>
              <input
                style={{ fontFamily: "Prompt, sans-serif" }}
                type="text"
                name="apellidos"
                id="apellidos"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="register-form-group">
            <div className="input-group">
              <label htmlFor="correo_electronico">
                <i className="fas fa-envelope"></i> Correo electrónico *
              </label>
              <input
                style={{ fontFamily: "Prompt, sans-serif" }}
                type="email"
                name="correo_electronico"
                id="correo_electronico"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i> Contraseña *
              </label>
              <input
                style={{ fontFamily: "Prompt, sans-serif" }}
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="register-form-group">
            <div className="input-group">
              <label htmlFor="direccion">
                <i className="fas fa-map-marker-alt"></i> Dirección *
              </label>
              <input
                style={{ fontFamily: "Prompt, sans-serif" }}
                type="text"
                name="direccion"
                id="direccion"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="telefono">
                <i className="fas fa-phone"></i> Número de teléfono *
              </label>
              <input
                style={{ fontFamily: "Prompt, sans-serif" }}
                type="tel"
                name="telefono"
                id="telefono"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="register-form-group">
            <div className="input-group">
              <label htmlFor="dui">
                <i className="fas fa-id-card"></i> Número de DUI *
              </label>
              <input
                style={{ fontFamily: "Prompt, sans-serif" }}
                type="text"
                name="dui"
                id="dui"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="img_perfil">
                <i className="fas fa-image"></i> URL imagen de perfil
              </label>
              <input
                style={{ fontFamily: "Prompt, sans-serif" }}
                type="text"
                name="img_perfil"
                id="img_perfil"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="register-button-container">
            <button
              style={{ fontFamily: "Prompt, sans-serif" }}
              type="submit"
              className="register-button"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
