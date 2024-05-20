import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import googleFontsURL from "../FuenteLetra/FuenteLetra";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    correo_electronico: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", credentials);
      if (response.status === 200) {
        toast.success("Inicio de sesión exitoso");
        navigate("/admin");
      } else {
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Error al iniciar sesión");
    }
  };

  return (
    <div style={{ fontFamily: "Prompt, sans-serif" }} className="login-body">
      <link rel="stylesheet" href={googleFontsURL} />
      <div className="login__container login__animated login__fadeInUp">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
        </div>
        <div class="avatar"></div>
        <form onSubmit={handleSubmit} className="login__form-box">
          <input style={{ fontFamily: "Prompt, sans-serif" }}
            type="email"
            name="correo_electronico"
            placeholder="Correo Electrónico"
            onChange={handleChange}
            required
          />
          <input style={{ fontFamily: "Prompt, sans-serif" }}
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />
          <button style={{ fontFamily: "Prompt, sans-serif" }} type="submit" className="login__button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
    
  );
}

export default Login;
