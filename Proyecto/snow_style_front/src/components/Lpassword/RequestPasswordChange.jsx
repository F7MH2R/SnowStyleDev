import React, { useState } from "react";
import axios from "axios";

function RequestPasswordChange() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/request-password-change", {
        email,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Hubo un error al solicitar el cambio de contraseña. Inténtalo de nuevo."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Solicitar Cambio de Contraseña</h2>
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Solicitar Cambio</button>
    </form>
  );
}

export default RequestPasswordChange;
