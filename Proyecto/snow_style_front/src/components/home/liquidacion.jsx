import React from "react";
import "../pages/css/Modal.css"
import googleFontsURL from "../Fuentes/FuenteLetras"

const Liquidacion = () => {
  return (
    <div className="liquidacion-container" style={{ fontFamily: 'Prompt, sans-serif' }}>
      <link rel="stylesheet" href={googleFontsURL} />
      <div className="liquidacion-content">
        <h1>LIQUIDACIÓN</h1>
        <p>DESCUBRE LAS PROMOCIONES DE TUS MARCAS</p>
        <button>CLICK AQUÍ</button>
      </div>
    </div>
  );
};

export default Liquidacion;
