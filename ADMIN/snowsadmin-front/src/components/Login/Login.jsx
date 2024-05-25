import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import googleFontsURL from "../FuenteLetra/FuenteLetra";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    correo_electronico: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef(null);
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
        onLoginSuccess();
        navigate("/admin"); // Redirige a la página de administrador después del inicio de sesión exitoso
      } else {
        setError("Credenciales incorrectas");
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error al iniciar sesión");
      toast.error("Error al iniciar sesión");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
          <button style={{ fontFamily: "Prompt, sans-serif" }} type="submit" className="login__button mb-4">Iniciar Sesión</button>
        </form>
        <Link to="/register" className="lost" style={{color: "black"}}>
              No tengo cuenta || Crear cuenta
          </Link>
      </div>
    </div>
    
  );
}

export default Login;
