import react from "react";
import Item from "../Item/Item";

const Carrito = ({ items }) => {
  return (
    <div className="container">
      {items ? (
        items.map((item) => {
          console.log("imagen: ", item.imagen);
          return (
            <Item
              imagen={item.imagen}
              descripcion={item.descripcion}
              precio={item.precio}
              id={item.id}
            />
          );
        })
      ) : (
        <p>No tienes productos en tu carrito</p>
      )}
    </div>
  );
};

export default Carrito;
