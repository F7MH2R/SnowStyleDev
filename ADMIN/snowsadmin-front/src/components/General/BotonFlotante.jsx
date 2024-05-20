import React from "react";
import { Button } from "react-bootstrap";
import "./BotonFlotante.css"; // Archivo CSS para estilos personalizados

const BotonFlotante = ({ isAuthenticated }) => {
  if (!isAuthenticated) return null;

  return (
    <div className="boton-flotante">

      <Button href="/FormPrenda" variant="success">
        + Agregar Prenda
      </Button>
    </div>
  );
};

export default BotonFlotante;
