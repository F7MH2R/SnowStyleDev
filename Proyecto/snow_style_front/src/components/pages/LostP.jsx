import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import ResetPasswordModal from "./ResetPasswordModal";
import axios from "axios";
function LostP(show, onClose) {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleCheckEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3077/api/check-email",
        { email }, // Pasa el objeto directamente
        {
          headers: {
            "Content-Type": "application/json", // Encabezado para JSON
          },
        }
      );

      const data = response.data; // Con `axios`, usa `data` para obtener la respuesta JSON

      if (data.exists) {
        setUserId(data.userId);
        console.log(data.userId); // Asigna el ID del usuario
        setModalVisible(true); // Muestra el modal para restablecer la contraseña
      } else {
        setAlertType("danger");
        setAlertMessage("Correo electrónico no encontrado");
        setAlertVisible(true); // Muestra el mensaje de error
      }
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      setAlertType("danger");
      setAlertMessage("Error al verificar el correo");
      setAlertVisible(true);
    }
  };

  return (
    <div>
      <h2>Verificar Correo Electrónico</h2>
      {alertVisible && (
        <Alert
          variant={alertType}
          onClose={() => setAlertVisible(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Form>
        <Form.Group>
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCheckEmail}>
          Verificar
        </Button>
      </Form>
      <ResetPasswordModal
        show={modalVisible}
        userId={userId} // Pasar el ID del usuario al modal
        onClose={() => setModalVisible(false)} // Asegúrate de cerrar el modal cuando se cierre
      />
    </div>
  );
}

export default LostP;
