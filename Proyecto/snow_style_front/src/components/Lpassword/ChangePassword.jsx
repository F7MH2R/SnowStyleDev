import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState(""); // Estado para almacenar la nueva contraseña

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChangePassword = async () => {
    try {
      await axios.post(`/api/reset-password/${userId}`, { newPassword });
      toast.success("La contraseña se cambio exitosamente");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error al cambiar contraseña");
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Cambio de Contraseña</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control type="text" value={userData.nombre} readOnly />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese la nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="outline-dark"
              type="button"
              className="mt-3 w-100"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ChangePassword;
