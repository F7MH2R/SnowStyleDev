import React, { useState, useRef } from "react";
import Item from "../Item/Item";
import { Button, Offcanvas } from "react-bootstrap";
import googleFontsURL from "../Fuentes/FuenteLetras";
import { FaShoppingCart } from "react-icons/fa";
import shoppingCartIcon from "../Multimedia/shopping-cart-icon.png"; // Ruta a tu imagen de icono de carrito de compras
import "./Carrito.css"; // Cambio en la importación del CSS
import { ejecutarGet } from "../compartidos/request";

const Carrito = () => {
  let items = useRef(ejecutarGet("/api/carrito/2/items"));

  console.log("items: ====>", items);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  let total = items.reduce((total, item) => total + item.precio, 0);

  return (
    <>
      <link rel="stylesheet" href={googleFontsURL} />
      <Button
        className="navbar-link-iconos"
        variant="black"
        onClick={handleShow}
      >
        <FaShoppingCart />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton className="carrito-offcanvas-header">
          {" "}
          {/* Cambio en la clase */}
          <Offcanvas.Title
            style={{ fontFamily: "Prompt, sans-serif" }}
            className="carrito-offcanvas-title"
          >
            <img
              src={shoppingCartIcon}
              alt="Carrito de compras"
              className="mr-2"
            />
            Carro de compra
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="carrito-offcanvas-body">
          {" "}
          {/* Cambio en la clase */}
          {items.current.values ? (
            items.current.values.map((item) => {
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
            <p style={{ fontFamily: "Prompt, sans-serif" }}>
              No tienes productos en tu carrito
            </p>
          )}
          <div style={{ fontFamily: "Prompt, sans-serif" }}>
            <div className="carrito-total">
              <div
                style={{ fontFamily: "Prompt, sans-serif" }}
                className="carrito-col"
              >
                <span style={{ marginRight: "70%" }}>Total:</span>{" "}
                {/* Espacio adicional a la derecha */}
                <span>${total}</span>
              </div>
            </div>
            <div className="carrito-row">
              {" "}
              {/* Cambio en la clase */}
              <a href="/PAGO">
                <button
                  variant="outline-success"
                  style={{ fontFamily: "Prompt, sans-serif" }}
                  onClick={handleShowModal}
                  className="carrito-pay-button"
                >
                  Pagar
                </button>
              </a>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Carrito;
