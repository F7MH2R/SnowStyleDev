import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    correo_electronico: "",
    password: "",
    direccion: "",
    telefono: "",
    dui: "",
    img_perfil: "",
  });

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", user);
      toast.success("Usuario creado correctamente");
      history.push("/login");
    } catch (error) {
      toast.error("Error al crear usuario");
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          onChange={handleChange}
          required
        />
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
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
        />
        <input
          type="text"
          name="dui"
          placeholder="DUI"
          onChange={handleChange}
        />
        <input
          type="text"
          name="img_perfil"
          placeholder="URL de Imagen de Perfil"
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
