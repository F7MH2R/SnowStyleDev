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
import googleFontsURL from "../Fuentes/FuenteLetras";
import Carrito from "../Carrito/Carrito";
import Filtro from "../Filtro/Filtro";
const NavBar = () => {
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false); // Estado para controlar la visibilidad del área de búsqueda
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Para redirigir después del inicio de sesión

  const handleSubmit = async (event) => {
    event.preventDefault();
    <link rel="stylesheet" href={googleFontsURL} />
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Haz algo con la respuesta, por ejemplo, almacenar el token en el almacenamiento local
        localStorage.setItem("token", data.token);

        // Redirigir al usuario a otra página después de iniciar sesión
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Error al iniciar sesión:", errorData.message);
        // Puedes mostrar un mensaje de error al usuario aquí
      }
    } catch (error) {
      console.error("Error de red:", error);
      // Manejar errores de red
    }

    // Cerrar el modal
    setIsOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="navbar">
      <div className="navbar-left" style={{ fontFamily: "Prompt, sans-serif" }} >
        <a href="#mujer" className="navbar-link">
          Damas
        </a>
        <a href="#hombre" className="navbar-link">
          Caballeros
        </a>
        <a href="#niño" className="navbar-link">
          Niños
        </a>
        <a href="/WHOARE" className="navbar-link">
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
        <div className="buscar-icono">
          <FaSearch className="navbar-link-iconos"/>
        </div>
        {mostrarBusqueda && (
          <div className="area-busqueda-container">
            <div className="area-busqueda">
              <input type="text" placeholder="Escribe aquí para buscar..." />
              <button>Buscar</button>
            </div>
          </div>
        )}
        <Carrito />
        <Filtro />
        <a href="#Login" className="navbar-link-iconos" onClick={openModal}>
          <FaUser />
        </a>

        {/* Modal Component */}
        {/* Modal de inicio de sesión */}
        <section className="page modal-1-page">
          <div
            className={`modal-1-overlay ${isOpen ? "open" : ""}`}
            onClick={closeModal}
          >
            <div className="modal-1-modal" onClick={(e) => e.stopPropagation()}>
              <header>
                <h2>Iniciar Sesión</h2>
              </header>

              <form onSubmit={handleSubmit}>
                <div className="textbox">
                  <EmailIcon />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="textbox">
                  <LockIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>

                <button type="submit">Iniciar Sesión</button>
              </form>
            </div>
          </div>
        </section>
        {/* End of Modal Component */}
      </div>
    </div>
  );
};

export default NavBar;
