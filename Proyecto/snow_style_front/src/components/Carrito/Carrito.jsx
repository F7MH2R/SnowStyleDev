import React, { useState } from "react";
import Item from "../Item/Item";
import { Button, Offcanvas } from "react-bootstrap";
import googleFontsURL from "../Fuentes/FuenteLetras";
import { FaShoppingCart } from "react-icons/fa";
import shoppingCartIcon from "../Multimedia/shopping-cart-icon.png"; // Ruta a tu imagen de icono de carrito de compras
import "./Carrito.css"; // Cambio en la importación del CSS
//remover al unir con el backend
import imagen from "../Multimedia/blusaCarrito.jpg";


const Carrito = ({ items }) => {
  items = [
    {
      imagen: imagen,
      descripcion: "Jersey cropped",
      precio: 10.25,
      id: 1,
    },
    {
      imagen: imagen,
      descripcion: "Jersey cropped",
      precio: 10.25,
      id: 2,
    },
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let total = 0.0;
  return (
    <>
     <div>
        <link rel="stylesheet" href={googleFontsURL} />
        <Button className="navbar-link-iconos" variant="black" onClick={handleShow}>
          <FaShoppingCart />
        </Button>
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton className="carrito-offcanvas-header"> {/* Cambio en la clase */}
            <Offcanvas.Title style={{ fontFamily: "Prompt, sans-serif" }} className="carrito-offcanvas-title">
              <img src={shoppingCartIcon} alt="Carrito de compras" className="mr-2" />
              Carro de compra
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="carrito-offcanvas-body"> {/* Cambio en la clase */}
            {items ? (
              items.map((item) => {
                total += item.precio;
                return (
                  <Item
                    imagen={item.imagen}
                    descripcion={item.descripcion}
                    precio={item.precio}
                    id={item.id}
                    key={item.id} // Agregado el key prop para evitar advertencias en la consola
                  />
                );
              })
            ) : (
              <p style={{ fontFamily: "Prompt, sans-serif" }}>No tienes productos en tu carrito</p>
            )}
            <div style={{ fontFamily: "Prompt, sans-serif" }}>
              <div className="carrito-total">
                <div style={{ fontFamily: "Prompt, sans-serif" }} className="carrito-col">
                    <span style={{ marginRight: '70%' }}>Total:</span> {/* Espacio adicional a la derecha */}
                    <span>${total}</span>
                  </div>
              </div>
                <div className="carrito-row"> {/* Cambio en la clase */}
                  <button href="#" className="carrito-pay-button"> {/* Cambio en la clase */}
                    Pagar
                  </button>
                </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
     </div>
      
    </>
  );
};

export default Carrito;
