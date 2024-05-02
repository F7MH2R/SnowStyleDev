import React, { useState } from "react";
import "./css/Modal.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";
import { Link } from "react-router-dom"; // Removemos useHistory
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3077/login", { email, password });

      const { token } = response.data;

      if (token) {
        // Si se recibe un token de acceso
        // Guardar el token en el almacenamiento local
        localStorage.setItem("token", token);
        // Redireccionar a la página de inicio
        window.location.href = "/"; // Redirige a la página principal
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error de inicio de sesión");
      console.error("Error de inicio de sesión:", error);
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
