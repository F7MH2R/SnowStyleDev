import React, { useState } from "react";
import Item from "../Item/Item";
import { Button, Offcanvas } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "./Carrito.css";
//remover al unir con el backend
import imagen from "../Item/blusa.png";

const Carrito = ({ items }) => {
  items = [
    {
      imagen: imagen,
      descripcion: "Prenda 1",
      precio: 10.25,
      id: 1,
    },
    {
      imagen: imagen,
      descripcion: "Prenda 2",
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
      <Button variant="black" onClick={handleShow}>
        <FaShoppingCart />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Canasta de compra</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {items ? (
            items.map((item) => {
              total += item.precio;
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
          <div className="row">
            <dir className="col">Total: $ {total}</dir>
          </div>
          <div className="row">
            <button href="#" className="btn btn-outline-success">
              Pagar
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Carrito;
