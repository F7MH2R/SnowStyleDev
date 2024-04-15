import react from "react";
import "./Item.css";
const Item = ({ imagen, descripcion, precio, id }) => {
  return (
    <div className="container">
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
        <div className="col">mas y menos</div>
        <div className="col">
          <a href={`eliminar/${id}`}>Eliminar</a>
        </div>
      </div>
    </div>
  );
};

export default Item;
