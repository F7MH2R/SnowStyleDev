import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import Logo from "./img/Logo SnowStyle.PNG";
import Login from "../Login/Login";
import BotonFlotante from "./BotonFlotante";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/admin"); // Estado para almacenar la URL de redirección

  useEffect(() => {
    // Cargar el estado de autenticación desde localStorage cuando el componente se monte
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Guardar el estado en localStorage
    handleClose();
    navigate(redirectUrl); // Redirige a la URL almacenada después del inicio de sesión exitoso
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Eliminar el estado de localStorage
    navigate("/"); // Redirige a la página de inicio después del cierre de sesión
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href={isAuthenticated ? redirectUrl : "/"} className="mx-auto">
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
        <Login onLoginSuccess={handleLogin} />
      </Modal>

      <BotonFlotante isAuthenticated={isAuthenticated} />
    </>
  );
};

export default NavBar;
