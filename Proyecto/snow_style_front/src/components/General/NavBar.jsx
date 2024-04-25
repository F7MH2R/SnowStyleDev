import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "./img/Logo SnowStyle.PNG";
import "../pages/css/Modal.css"; // Importa el archivo de estilos CSS
import { Link, useNavigate } from "react-router-dom";
//Login
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";
import googleFontsURL from "../Fuentes/FuenteLetras"

const NavBar = () => {
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false); // Estado para controlar la visibilidad del área de búsqueda

  // Función para manejar el clic en el icono de búsqueda
  const handleToggleBusqueda = () => {
    setMostrarBusqueda(!mostrarBusqueda); // Cambia el estado para mostrar u ocultar el área de búsqueda
  };
  // Función para abrir el modal
  const openModal = () => {
    setIsOpen(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para enviar el formulario

    // Limpia los campos de entrada después del envío del formulario
    setEmail("");
    setPassword("");

    // Cierra el modal
    closeModal();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Función para cerrar el modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="navbar" style={{ fontFamily: 'Prompt, sans-serif' }}>
      <link rel="stylesheet" href={googleFontsURL} />
      <div className="navbar-secciones">
        <a href="#hombre" className="navbar-secciones">
          Hombre
        </a>
        <a href="#mujer" className="navbar-secciones">
          Mujeres
        </a>
        <a href="#niño" className="navbar-secciones">
          Niños
        </a>
        <a href="/WHOARE" className="navbar-secciones">
          Conócenos
        </a>
      </div>
      <div className="navbar-brand " href="/">
        <a href="/">
          {" "}
          <img src={logo} alt="Logo de SnowStyle" href="/" className="logo" />
        </a>
      </div>
      <div
        className={`navbar-right ${mostrarBusqueda ? "mostrar-busqueda" : ""}`}
      >
        <div className="buscar-icono" onClick={handleToggleBusqueda}>
          <FaSearch />
        </div>
        {mostrarBusqueda && (
          <div className="area-busqueda-container">
            <div className="area-busqueda">
              <input type="text" placeholder="Escribe aquí para buscar..." />
              <button>Buscar</button>
            </div>
          </div>
        )}
        <a href="/cart" className="navbar-link">
          <FaShoppingCart />
        </a>
        <a href="#Login" className="navbar-link" onClick={openModal}>
          <FaUser />
        </a>

        {/* Modal Component */}
        <section className="page modal-1-page">
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
                //llamar la ruta lost
                <Link to={"/Lost"} className="lost" href="#">
                  Olvidé mi contraseña
                </Link>
                //llamar la ruta registrarse
                <Link to="REGIST" className="lost">
                  No tengo cuenta || Crear cuenta
                </Link>
              </form>
              <p>No necesitas tarjeta de credito</p>
            </div>
          </div>
        </section>
        {/* End of Modal Component */}
      </div>
    </div>
  );
};

export default NavBar;
