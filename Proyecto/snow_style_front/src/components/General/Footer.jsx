import React from "react";
import "../pages/css/Modal.css" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTiktok, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import googleFontsURL from "../Fuentes/FuenteLetras"

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
            <link rel="stylesheet" href={googleFontsURL} />
            <p style={{ fontFamily: 'Prompt, sans-serif' }}>© Snow Style 2024</p>
          </div>
          {/* Sección de Conócenos */}
          <div className="seccion">
            <link rel="stylesheet" href={googleFontsURL} />
            <h2 style={{ fontFamily: 'Prompt, sans-serif' }}>Conócenos</h2>
            <p style={{ fontFamily: 'Prompt, sans-serif' }}>Aquí puedes encontrar información sobre nuestra empresa y nuestra historia.</p>
          </div>
          {/* Sección de Contacto */}
          <div className="seccion">
            <link rel="stylesheet" href={googleFontsURL} />
            <h2 style={{ fontFamily: 'Prompt, sans-serif' }}>Contacto</h2>
            <p style={{ fontFamily: 'Prompt, sans-serif' }}>Si tienes alguna pregunta o quieres contactarnos, no dudes en escribirnos a nuestro correo electrónico o llamarnos.</p>
          </div>
          {/* Sección de Snow Style */}
          <div className="seccion">
            <link rel="stylesheet" href={googleFontsURL} />
            <h2 style={{ fontFamily: 'Prompt, sans-serif' }}>Snow Style</h2>
            <p style={{ fontFamily: 'Prompt, sans-serif' }}>Explora nuestro catálogo de productos y descubre lo último en moda de invierno.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
