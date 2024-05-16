import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChangePassword = async () => {
    // No es necesario pasar newPassword como argumento
    try {
      await axios.post(`/api/reset-password/${userId}`, { newPassword }); // Enviar la nueva contraseña como parte del cuerpo de la solicitud
      // Handle success
    } catch (error) {
      // Handle error
      console.error("Error resetting password:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Change Password</h2>
      <p>Username: {userData.nombre}</p>
      {/* Display other user information as needed */}
      <input
        type="password"
        placeholder="New Password"
        value={newPassword} // Enlazar el valor del campo de entrada al estado newPassword
        onChange={(e) => setNewPassword(e.target.value)} // Actualizar el estado newPassword cuando cambie el valor del campo de entrada
      />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
