import React, { useState, useEffect } from "react";
import Item from "../Item/Item";
import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import googleFontsURL from "../Fuentes/FuenteLetras";
import { FaShoppingCart } from "react-icons/fa";
import shoppingCartIcon from "../Multimedia/shopping-cart-icon.png"; // Ruta a tu imagen de icono de carrito de compras
import "./Carrito.css"; // Cambio en la importación del CSS
import { ejecutarGet } from "../compartidos/request";
import Pago from "../pages/Pago";

const Carrito = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const idUsuario = localStorage.getItem("UserId");
    const itemsCarrito = await ejecutarGet(`/api/carrito/${idUsuario}/items`);
    let costoTotal = 0;
    if (itemsCarrito.data) {
      costoTotal = itemsCarrito.data.reduce(
        (total, item) => total + parseFloat(item.precio * item.cantidad),
        0
      );
      setItems(itemsCarrito.data);
    }
    setTotal(parseFloat(costoTotal));
  }

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
          {items.length > 0 ? (
            items.map((item) => {
              return (
                <Item
                  imagen={item.imagen}
                  descripcion={item.descripcion}
                  precio={parseFloat(item.precio)}
                  cantidad={parseFloat(item.cantidad)}
                  id={item.id}
                  key={item.id} // Agregado el key prop para evitar advertencias en la consola
                  idItemsCarrito={item.id_itemcarrito}
                  talla={item.talla}
                  fetchItems={fetchItems}
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
                <span style={{ marginRight: "70%" }}>Total:&nbsp;</span>
                <span>
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
            </div>
          </div>
          {items.length > 0 ? (
            <Row className="carrito-row">
              <Col>
                <Pago items={items} fetchItems={fetchItems}></Pago>
              </Col>
            </Row>
          ) : null}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Carrito;
