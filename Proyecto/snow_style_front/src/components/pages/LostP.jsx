import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import ResetPasswordModal from "./ResetPasswordModal";
import googleFontsURL from "../Fuentes/FuenteLetras";
import axios from "axios";
import "./css/Modal.css";

function LostP({ show, onClose }) { // Corregido el destructuring de props
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleCheckEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3077/api/check-email",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.exists) {
        setUserId(data.userId);
        console.log(data.userId);
        setModalVisible(true);
      } else {
        setAlertType("danger");
        setAlertMessage("Correo electrónico no encontrado");
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      setAlertType("danger");
      setAlertMessage("Error al verificar el correo");
      setAlertVisible(true);
    }
  };

  return (
    <div className="container-form">
      <div style={{ fontFamily: "Prompt, sans-serif" }} className="lost-password-form"> 
        <link rel="stylesheet" href={googleFontsURL} />
        <h3 className="lost-password-form-title">Verificación Correo Electrónico</h3> 
        {alertVisible && (
          <Alert
            variant={alertType}
            onClose={() => setAlertVisible(false)}
            dismissible
            className="lost-password-form-alert"
          >
            {alertMessage}
          </Alert>
        )}
        <Form>
          <Form.Group className="lost-password-form-group"> 
            <Form.Label className="lost-password-form-label">Digite su correo:</Form.Label> 
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="lost-password-form-control" 
            />
          </Form.Group>
          <Button variant="primary" onClick={handleCheckEmail} className="lost-password-form-btn"> 
            Verificar
          </Button>
        </Form>
        <ResetPasswordModal
          show={modalVisible}
          userId={userId}
          onClose={() => setModalVisible(false)}
        />
      </div>
    </div>
  );
}

export default LostP;
