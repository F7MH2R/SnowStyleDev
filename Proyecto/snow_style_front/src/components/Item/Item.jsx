import react from "react";
import "./Item.css";
import googleFontsURL from "../Fuentes/FuenteLetras"

const Item = ({ imagen, descripcion, precio, id }) => {
  return (
    <div className="container" style={{ fontFamily: 'Prompt, sans-serif' }}>
      <link rel="stylesheet" href={googleFontsURL} />
      <div className="row">
        <div className="col imagen-small">
          {imagen ? (
            <img className="imagen-small" src={imagen} />
          ) : (
            <div>No imagen</div>
          )}
        </div>
        <div className="col">
          <div className="row">$ {precio}</div>
          <div className="row">{descripcion}</div>
        </div>
        <div className="col">cantidad</div>
        <div className="col">
          <a href={`eliminar/${id}`}>Eliminar</a>
        </div>
      </div>
    </div>
  );
};

export default Item;
