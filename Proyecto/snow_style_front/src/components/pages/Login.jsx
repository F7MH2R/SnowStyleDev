import React, { useState } from "react";
import "./css/Modal.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ handleClose, onLoginSuccess }) => { // Agrega la prop onLoginSuccess
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:3077/login", user);
      console.log("Respuesta del servidor:", response.data); // Agregado para depuración

      if (response.data.IDUsuario) {
        // Redirige al usuario a la página
        navigate("/");
        handleClose(); // Cierra el modal
        onLoginSuccess(); // Llama a la función de devolución de llamada para el inicio de sesión exitoso
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error.response.data.message);
      setError("Error de inicio de sesión: " + error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className="page modal-1-page">
      <div className="modal-1-overlay open">
        <div className="modal-1-modal" onClick={(e) => e.stopPropagation()}>
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
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="textbox">
              <span className="material-symbols-outlined">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Iniciar Sesión{" "}
              </span>
            </button>
            <Link to={"/lost-password"} className="lost">Olvidé mi contraseña</Link>
            <Link to="/register" className="lost">No tengo cuenta || Crear cuenta</Link>
          </form>
          <p>No necesitas tarjeta de crédito</p>
          {error && <p>{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default Login;
