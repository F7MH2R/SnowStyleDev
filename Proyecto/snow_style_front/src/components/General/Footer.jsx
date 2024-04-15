import React from "react";
import "../pages/css/Modal.css" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTiktok, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
      <footer className="footer">
        <div className="redes-sociales">
          {/* Botones de redes sociales */}
          <button><FontAwesomeIcon icon={faFacebook} /></button>
          <button><FontAwesomeIcon icon={faTiktok} /></button>
          <button><FontAwesomeIcon icon={faTwitter} /></button>
          <button><FontAwesomeIcon icon={faInstagram} /></button>
        </div>
        <div className="secciones">
          {/* Sección de Copyright */}
          <div className="seccion">
            <p>© Snow Style 2024</p>
          </div>
          {/* Sección de Conócenos */}
          <div className="seccion">
            <h2>Conócenos</h2>
            <p>Aquí puedes encontrar información sobre nuestra empresa y nuestra historia.</p>
          </div>
          {/* Sección de Contacto */}
          <div className="seccion">
            <h2>Contacto</h2>
            <p>Si tienes alguna pregunta o quieres contactarnos, no dudes en escribirnos a nuestro correo electrónico o llamarnos.</p>
          </div>
          {/* Sección de Snow Style */}
          <div className="seccion">
            <h2>Snow Style</h2>
            <p>Explora nuestro catálogo de productos y descubre lo último en moda de invierno.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
