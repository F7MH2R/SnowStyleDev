import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import Logo from "./img/Logo SnowStyle.PNG";
import Login from '../Login/Login';

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Cargar el estado de autenticación desde localStorage cuando el componente se monte
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Guardar el estado en localStorage
    handleClose();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Eliminar el estado de localStorage
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#" className="mx-auto">
          <img
            src={Logo}
            width="100%"
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Nav className="ml-auto">
          {!isAuthenticated ? (
            <Button variant="primary" onClick={handleShow}>
              Iniciar Sesión
            </Button>
          ) : (
            <>
              <Button variant="secondary" className="mr-2">
                Administrar
              </Button>
              <Button variant="secondary" className="mr-2">
                Ver Detalles
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          )}
        </Nav>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login onLoginSuccess={handleLogin} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
