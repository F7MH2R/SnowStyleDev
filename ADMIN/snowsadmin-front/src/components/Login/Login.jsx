import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Modal.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <section className="page modal-1-page">
      <div className="modal-1-overlay open">
        <div className="modal-1-modal" ref={modalRef}>
          <header>
            <h2>Iniciar Sesión</h2>
            <h3>SnowStyle</h3>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="textbox">
              <span className="material-symbols-outlined">
                <EmailIcon />
              </span>
              <input
                type="email"
                name="correo_electronico"
                placeholder="Email"
                value={credentials.correo_electronico}
                onChange={handleChange}
                required
              />
            </div>
            <div className="textbox">
              <span className="material-symbols-outlined">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <button
                className="password-toggle"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            <button className="signup-button" type="submit">
              <span className="material-symbols-outlined">
                <KeyboardTabOutlinedIcon />
                Iniciar Sesión
              </span>
            </button>
            <Link to="/register" className="lost">
              No tengo cuenta || Crear cuenta
            </Link>
          </form>
          <p>No necesitas tarjeta de crédito</p>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </section>
  );
}

export default Login;
