import React, { useState } from "react";
import { Button, Col, Container, Form, Offcanvas, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import "./Filtro.css";

const Filtro = ({ tallas }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="navbar-link-iconos" variant="black" onClick={handleShow}>
        <FaFilter />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrar por...</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <hr />
          <Container>
            <div>Talla</div>
            <Row className="p-1">
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  XS
                </Button>
              </Col>
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  S
                </Button>
              </Col>
            </Row>
            <Row className="p-1">
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  M
                </Button>
              </Col>
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  L
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  XL
                </Button>
              </Col>
              <Col className="text-center"></Col>
            </Row>
          </Container>
          <hr />
          <Container>
            <div>Precio</div>
            <Row className="p-1">
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  Hasta $20
                </Button>
              </Col>
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  Hasta $30
                </Button>
              </Col>
            </Row>
            <Row className="p-1">
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  Hasta $40
                </Button>
              </Col>
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  Hasta $50
                </Button>
              </Col>
            </Row>
            <Row className="p-1">
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  Hasta $60
                </Button>
              </Col>
              <Col className="text-center">
                <Button className="btn-filtro" variant="primary">
                  Hasta $70
                </Button>
              </Col>
            </Row>
          </Container>
          <hr />
          <Container>
            <Row>
              <Col>En liquidaci&oacute;n</Col>
              <Col>
                <Form.Check
                  className="check-filtro"
                  type="checkbox"
                  id="Check1"
                />
              </Col>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Filtro;
