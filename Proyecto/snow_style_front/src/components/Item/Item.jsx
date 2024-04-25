import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
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
    <div className="container">
      <div className="row">
        <div className="col imagen-small">
          {imagen ? (
            <img className="imagen-small" src={imagen} alt="Item" />
          ) : (
            <div>No imagen</div>
          )}
        </div>
        <div className="col">
          <div className="row">$ {precio}</div>
          <div className="row">{descripcion}</div>
          <div className="row">
            <Button variant="outline-dark" onClick={handleShow}>
              Ver Detalles
            </Button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Artículo</Modal.Title>
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
          <div>Precio: $ {precio}</div>
          <div>
            <Form>
              <Form.Label>Cantidad:</Form.Label>
              <div className="d-flex">
                <Button variant="outline-secondary" onClick={reducirCantidad}>
                  -
                </Button>
                <FormControl
                  className="mx-2"
                  type="number"
                  value={cantidad}
                  readOnly
                />
                <Button variant="outline-secondary" onClick={aumentarCantidad}>
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
  );
};

export default Item;
