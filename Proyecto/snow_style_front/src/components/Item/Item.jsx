import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import googleFontsURL from "../Fuentes/FuenteLetras";
import "./Item.css";
import { ejecutarPatch, eliminarItem } from "../compartidos/request";

const Item = ({
  imagen,
  descripcion,
  precio,
  id,
  cantidad,
  idItemsCarrito,
  fetchItems,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [cantidadItems, setCantidad] = useState(cantidad);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const aumentarCantidad = () => {
    async function actualizarCantidad() {
      await ejecutarPatch(`/api/carrito/items/${idItemsCarrito}`, {
        cantidad: cantidadItems + 1,
      });
      setCantidad((prevCantidad) => prevCantidad + 1);
      fetchItems();
    }

    actualizarCantidad();
  };

  const reducirCantidad = () => {
    if (cantidadItems > 1) {
      descontarCantidad();
      fetchItems();
    }

    async function descontarCantidad() {
      await ejecutarPatch(`/api/carrito/items/${idItemsCarrito}`, {
        cantidad: cantidadItems - 1,
      });
      setCantidad((prevCantidad) => prevCantidad - 1);
    }
  };

  const handleDelete = () => {
    if (window.confirm("¿desea eliminar la prenda?") === true) {
      eliminar();
    }

    async function eliminar() {
      console.log("EJecutando eliminar!", idItemsCarrito);
      await eliminarItem(`/api/carrito/items/${idItemsCarrito}/delete`, {});
      fetchItems();
    }
  };

  return (
    <div className="item-container">
      <link rel="stylesheet" href={googleFontsURL} />
      <div className="container">
        <div className="row">
          <div className="col imagen-small">
            {imagen ? <img src={imagen} alt="Item" /> : <div>No imagen</div>}
          </div>
          <div className="col precio-descripcion">
            <div className="row">
              {precio.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }) +
                ` x ` +
                cantidadItems}
            </div>
            <div className="row">{descripcion}</div>
            <div className="row">
              <Button className="btn-ver-detalles" onClick={handleShow}>
                Ver Detalle
              </Button>
            </div>
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={handleClose}
          style={{ fontFamily: "Prompt, sans-serif" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Detalles de compra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {imagen ? (
                <img className="modal-imagen" src={imagen} alt="Item" />
              ) : (
                <div>No imagen</div>
              )}
            </div>
            <div>Descripción: {descripcion}</div>
            <div>Precio: ${precio}</div>
            <div>
              <Form>
                <Form.Label>Cantidad:</Form.Label>
                <div className="d-flex">
                  <Button className="btn-reducir" onClick={reducirCantidad}>
                    -
                  </Button>
                  <FormControl
                    className="mx-2"
                    type="number"
                    value={cantidadItems}
                    readOnly
                  />
                  <Button className="btn-aumentar" onClick={aumentarCantidad}>
                    +
                  </Button>
                </div>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Item;
