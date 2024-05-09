import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirigir al login

function ResetPasswordModal({ show, onClose, userId }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate(); // Navegador para redirigir

  const handleResetPassword = async (userId, newPassword) => {
    try {
      const response = await axios.post(
        "http://localhost:3077/api/reset-password",
        {
          userId,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setAlertType("success");
        setAlertMessage("Contraseña restablecida con éxito");
        setAlertVisible(true); // Mostrar alerta
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

  useEffect(() => {
    if (alertVisible && alertType === "success") {
      const timeout = setTimeout(() => {
        onClose(); // Cierra el modal
        navigate("/"); // Redirigir al login
      }, 7000); // 15 segundos

      return () => clearTimeout(timeout); // Limpieza para evitar fugas de memoria
    }
  }, [alertVisible, alertType, onClose, navigate]); // Efecto que redirige y cierra el modal

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
          onClick={() => handleResetPassword(userId, newPassword)}
        >
          Restablecer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetPasswordModal;
