import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

import Item from "../Item/Item"; // Importa el componente Item si no está en el mismo directorio

const Carrito = ({ items }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const generarFactura = () => {
    const factura = items.map((item) => ({
      nombre: item.descripcion,
      cantidad: 1,
      subtotal: item.precio,
      imagen: item.imagen // Añade la imagen al objeto de la factura
    }));

    return factura;
  };

  const descargarFactura = () => {
    const factura = generarFactura();
    const facturaTexto = factura.map((item, index) => (
      `Producto ${index + 1} - ${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: ${item.subtotal}\n`
    ));
    facturaTexto.push(`Total: ${items.reduce((total, item) => total + item.precio, 0)}`);

    const facturaBlob = new Blob([facturaTexto.join("\n")], { type: "text/plain" });
    const url = window.URL.createObjectURL(facturaBlob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "factura.txt");
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  let total = items.reduce((total, item) => total + item.precio, 0);

  return (
    <div className="offcanvas offcanvas-end show" tabIndex="-1" id="offcanvasNavbar">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
          Canasta de compra
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
      <div className="offcanvas-body">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id}>
              <Item
                imagen={item.imagen} // Pasa la imagen al componente Item
                descripcion={item.descripcion}
                precio={item.precio}
                id={item.id}
              />
            </div>
          ))
        ) : (
          <p>No tienes productos en tu carrito</p>
        )}
        <div className="row">
          <div className="col">Total: ${total}</div>
        </div>
        <div className="row mt-3">
         
<Link to="/PAGO">
  <Button variant="outline-success" onClick={handleShow}>
    Pagar
  </Button>
</Link>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row row-cols-2">
            {items.map((item, index) => (
              <div className="col" key={index}>
                <div className="d-flex align-items-center mb-3">
                  <img src={item.imagen} alt={item.descripcion} className="img-fluid me-2" style={{ maxWidth: "50px" }} />
                  <div>
                    <p className="mb-0">{item.descripcion}</p>
                    <p className="mb-0">Cantidad: 1 - Subtotal: ${item.precio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="fw-bold">Total: ${total}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="primary" onClick={"/PAGO"}>Descargar Factura</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Carrito;
