import React from "react";
import { Button } from "react-bootstrap";
import googleFontsURL from "../FuenteLetra/FuenteLetra";
import "./BotonFlotante.css"; // Archivo CSS para estilos personalizados

const BotonFlotante = ({ isAuthenticated }) => {
  if (!isAuthenticated) return null;

  return (
    <div className="boton-flotante" style={{ fontFamily: "Prompt, sans-serif" }}>
      <link rel="stylesheet" href={googleFontsURL} />
      <Button href="/FormPrenda" variant="success" style={{ fontFamily: "Prompt, sans-serif" }}>
        + Agregar Prenda
      </Button>
    </div>
  );
};

export default BotonFlotante;
