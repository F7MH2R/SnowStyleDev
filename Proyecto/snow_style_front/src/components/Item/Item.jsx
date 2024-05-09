import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import googleFontsURL from "../Fuentes/FuenteLetras";
import "./Item.css";

const Item = ({ imagen, descripcion, precio, id }) => {
  const [showModal, setShowModal] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const aumentarCantidad = () => {
    setCantidad((prevCantidad) => prevCantidad + 1);
  };

  const reducirCantidad = () => {
    if (cantidad > 1) {
      setCantidad((prevCantidad) => prevCantidad - 1);
    }
  };

  return (
    <div className="item-container">
      <link rel="stylesheet" href={googleFontsURL} />
      <div className="container">
        <div className="row">
          <div className="col imagen-small">
            {imagen ? (
              <img src={imagen} alt="Item" />
            ) : (
              <div>No imagen</div>
            )}
          </div>
          <div className="col precio-descripcion">
            <div className="row">$ {precio}</div>
            <div className="row">{descripcion}</div>
            <div className="row">
              <Button className="btn-ver-detalles" onClick={handleShow}>
                Ver Detalle
              </Button>
            </div>
          </div>
        </div>

        <Modal show={showModal} onHide={handleClose} style={{ fontFamily: "Prompt, sans-serif" }}>
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
                    value={cantidad}
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
            <Button
              variant="danger"
              onClick={() => console.log(`Eliminar ${id}`)}
            >
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Item;
