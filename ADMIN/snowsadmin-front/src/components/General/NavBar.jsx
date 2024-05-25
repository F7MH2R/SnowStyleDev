import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import Logo from "./img/Logo SnowStyle.PNG";
import Login from "../Login/Login";
import BotonFlotante from "./BotonFlotante";
import googleFontsURL from "../FuenteLetra/FuenteLetra";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("/admin");

  useEffect(() => {
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
    localStorage.setItem("isAuthenticated", "true"); 
    handleClose();
    navigate(redirectUrl); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/"); 
  };

  return (
    <>
      <link rel="stylesheet" href={googleFontsURL} />
      <Navbar bg="light" expand="lg" style={{ fontFamily: "Prompt, sans-serif" }}>
        <Navbar.Brand href={isAuthenticated ? redirectUrl : "/"} className="mx-auto">
          <img
            src={Logo}
            width="100%"
            height="45"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Nav className="ml-auto">
          {!isAuthenticated ? (
            <Button style={{marginRight: "30px"}} className="logo-inicio-button logo-inicio-button:hover" onClick={handleShow}>
              Iniciar Sesión
            </Button>
          ) : (
            <>
              <Button  style={{marginRight: "30px"}} className="logo-cerrar-button logo-cerrar-button:hover" onClick={handleLogout}>
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
