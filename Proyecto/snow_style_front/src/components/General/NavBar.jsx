import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "./img/Logo SnowStyle.PNG";
import "../pages/css/Modal.css"; // Importa el archivo de estilos CSS

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
    <div className="navbar">
      <div className="navbar-left">
        <a href="#hombre" className="navbar-link">
          Hombre
        </a>
        <a href="#mujer" className="navbar-link">
          Mujeres
        </a>
        <a href="#niño" className="navbar-link">
          Niños
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
        <a href="#usuario" className="navbar-link">
          <FaUser />
        </a>
      </div>
    </div>
  );
};

export default NavBar;
