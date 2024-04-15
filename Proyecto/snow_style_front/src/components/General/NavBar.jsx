import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "./img/Logo SnowStyle.PNG"
import "../pages/css/Modal.css" // Importa el archivo de estilos CSS

const NavBar = () => {
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false); // Estado para controlar la visibilidad del área de búsqueda

  // Función para manejar el clic en el icono de búsqueda
  const handleToggleBusqueda = () => {
    setMostrarBusqueda(!mostrarBusqueda); // Cambia el estado para mostrar u ocultar el área de búsqueda
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <a href="#hombre" className="navbar-link">Hombre</a>
        <a href="#mujer" className="navbar-link">Mujeres</a>
        <a href="#niño" className="navbar-link">Niños</a>
      </div>
      <div className="navbar-brand">
        <img src={logo} alt="Logo de SnowStyle" className="logo" />
      </div>
      <div className={`navbar-right ${mostrarBusqueda ? 'mostrar-busqueda' : ''}`}>
        <div className="buscar-icono" onClick={handleToggleBusqueda}>
          <FaSearch />
        </div>
        {mostrarBusqueda && (
  <div className="area-busqueda-container">
    <div className="area-busqueda">
      <input type="text" placeholder="Escribe aquí para buscar..."  />
      <button>Buscar</button>
    </div>
  </div>
)}


        <a href="#carrito" className="navbar-link"><FaShoppingCart /></a>
        <a href="#usuario" className="navbar-link"><FaUser /></a>
      </div>
    </div>
  );
};

export default NavBar;
