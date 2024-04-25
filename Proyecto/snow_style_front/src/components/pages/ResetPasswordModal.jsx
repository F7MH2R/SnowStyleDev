import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
function ResetPasswordModal({ show, onClose, userId }) {
  // Añade userId como prop
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleResetPassword = async (userId, newPassword) => {
    try {
      const response = await axios.post(
        "/api/reset-password",
        {
          userId, // Usa el ID del usuario
          newPassword, // Nueva contraseña
        },
        {
          headers: {
            "Content-Type": "application/json", // Establecer tipo de contenido
          },
        }
      );

      if (response.data.success) {
        setAlertType("success");
        setAlertMessage("Contraseña restablecida con éxito");
        setAlertVisible(true); // Muestra mensaje de éxito
      } else {
        setAlertType("danger");
        setAlertMessage("Error al restablecer la contraseña");
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      setAlertType("danger");
      setAlertMessage("Error al restablecer la contraseña");
      setAlertVisible(true);
    }
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Restablecer Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertVisible && (
          <Alert variant={alertType} dismissible>
            {alertMessage}
          </Alert>
        )}
        <Form>
          <Form.Group>
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={() => handleResetPassword(newPassword)}
        >
          Restablecer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetPasswordModal;
