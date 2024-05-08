import React, { useState, useEffect } from "react";
import logo from "./img/Logo SnowStyle.PNG";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Col,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import usplaceholder from "../Multimedia/estaticos/userplaceholder.png";
import "../pages/css/Modal.css";
import Login from "../pages/Login";
import Carrito from "../Carrito/Carrito";
import Filtro from "../Filtro/Filtro";

function NavBar(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const idUsu = localStorage.getItem("UserId")
    ? JSON.parse(localStorage.getItem("UserId"))
    : 0;

  const UsuarioEnSesionImg = `http://localhost:3001/imagenUsuario_${idUsu}.jpg`;

  useEffect(() => {
    setIsLogged(props.data);
  }, [props.data]);

  useEffect(() => {
    console.log("Estado de autenticación actualizado:", isLogged);
  }, [isLogged]);

  console.log("Renderizando NavBar. Estado de autenticación:", isLogged);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(idUsu);
    setIsLogged(false);
    navigate("/");
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleLoginSuccess = () => {
    setIsLogged(true);
  };

  return (
    <>
      <Navbar expand="lg" className="nava fixed-top bggreen mx-0 py-1">
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span
            className="navbar-toggler-icon"
            style={{ color: "black", fontSize: "2.4rem" }}
          >
            <FontAwesomeIcon icon={faBars} />
          </span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Col
            xs={12}
            lg={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Nav className="w-100 whitetxt justify-content-center">
              <Nav.Link as={Link} to="mujeres" className="text-center">
                <h2 className="d-inline mx-2 mt-auto normaltxt whitetxt">
                  Dama
                </h2>
              </Nav.Link>
              <Nav.Link as={Link} to="hombres" className="text-center">
                <h2 className="d-inline mx-2 mt-auto normaltxt whitetxt">
                  Caballero
                </h2>
              </Nav.Link>
              <Nav.Link as={Link} to="niños" className="text-center">
                <h2 className="d-inline mx-2 mt-auto normaltxt whitetxt">
                  Niños
                </h2>
              </Nav.Link>
              <Nav.Link as={Link} to="WhoAre" className="text-center">
                <h2 className="d-inline mx-2 mt-auto normaltxt whitetxt">
                  Conócenos
                </h2>
              </Nav.Link>
            </Nav>
          </Col>

          <Col
            xs={12}
            lg={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Navbar.Brand as={Link} to={"/"}>
              <img
                alt=""
                src={logo}
                className="d-inline-block align-top logo"
              />
            </Navbar.Brand>
          </Col>

          <Col
            xs={12}
            lg={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Nav className="w-100 justify-content-center align-items-center">
              {isLogged ? (
                <>
                  <Nav.Link as={Link} className="d-inline">
                    <h2
                      className="d-inline mx-2 mt-auto normaltxt whitetxt"
                      onClick={handleSearchClick}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
                      <b className="d-none d-xl-inline-block">Buscar</b>
                    </h2>
                  </Nav.Link>
                  <Filtro />
                  <Carrito />
                  <Nav.Link as={Link} to="properties" className="d-inline">
                    <h2 className="d-inline mx-2 mt-auto normaltxt whitetxt">
                      <img
                        src={UsuarioEnSesionImg ?? usplaceholder}
                        alt=""
                        height="50px"
                        style={{ borderRadius: "50%" }}
                      />
                    </h2>
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/"
                    className=""
                    onClick={handleLogout}
                  >
                    <h2 className="d-inline mx-2 mt-auto normaltxt whitetxt">
                      <FontAwesomeIcon icon={faUser} /> Cerrar Sesión
                    </h2>
                  </Nav.Link>
                </>
              ) : (
                <div>
                  <Nav.Link
                    as={Link}
                    to="#"
                    className=""
                    onClick={openLoginModal}
                  >
                    <h2 className="d-inline mx-2 mt-auto normaltxt whitetxt">
                      <FontAwesomeIcon icon={faUser} /> Iniciar Sesión
                    </h2>
                  </Nav.Link>
                  {/* Renderiza el modal de inicio de sesión solo si showLoginModal es true */}
                  {showLoginModal && (
                    <Login
                      onLoginSuccess={handleLoginSuccess}
                      handleClose={closeLoginModal}
                    />
                  )}
                </div>
              )}
            </Nav>
          </Col>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showSearch} onHide={handleSearchClick} centered>
        <Modal.Header closeButton>
          <Modal.Title>Buscar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mx-auto">
            <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
            <Button variant="success" onClick={handleSearchClick}>
              Buscar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
