import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [credentials, setCredentials] = useState({
    correo_electronico: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", credentials);
      if (response.status === 200) {
        toast.success("Inicio de sesión exitoso");
        navigate("/admin"); // Redirige a la página de administrador después del inicio de sesión exitoso
      } else {
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Error al iniciar sesión");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="correo_electronico"
          placeholder="Correo Electrónico"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
