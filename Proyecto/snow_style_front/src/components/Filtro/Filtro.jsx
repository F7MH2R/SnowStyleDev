import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

const Filtro = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="black" onClick={handleShow}>
        <FaFilter />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrar</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>Body del offcanvas de los filtros</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Filtro;
