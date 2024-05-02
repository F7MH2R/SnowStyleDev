import React, { useState, useEffect } from "react";

import "./css/Modal.css";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (event) => {
    // Aquí puedes manejar la lógica para enviar el formulario
    event.preventDefault();
    // Por ahora, solo cerramos el modal al enviar el formulario
    closeModal();
  };
  useEffect(() => {
    openModal(); // Abre el modal cuando se renderiza el componente
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="page modal-1-page" style={{ fontFamily: 'Prompt, sans-serif' }}>
      <link rel="stylesheet" href={googleFontsURL} />
      <div
        className={`modal-1-overlay ${isOpen ? "open" : ""}`}
        onClick={closeModal}
      >
        <div className="modal-1-modal" onClick={(e) => e.stopPropagation()}>
          <header>
            <h2>Sign Up</h2>
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
          </form>
          <p>No necesitas tarjeta de credito</p>
        </div>
      </div>
    </section>
  );
};
export default Login;
