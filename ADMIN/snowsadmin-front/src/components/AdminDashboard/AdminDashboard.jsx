import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado y es admin
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Error al cargar usuarios");
        history.push("/login");
      }
    };

    fetchUsers();
  }, [history]);

  const handleLogout = () => {
    // Aquí puedes implementar la lógica de cierre de sesión
    toast.success("Sesión cerrada");
    history.push("/login");
  };

  return (
    <div>
      <h2>Dashboard del Administrador</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <h3>Lista de Usuarios</h3>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo Electrónico</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>DUI</th>
              <th>Imagen de Perfil</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_usuario}>
                <td>{user.id_usuario}</td>
                <td>{user.nombre}</td>
                <td>{user.apellidos}</td>
                <td>{user.correo_electronico}</td>
                <td>{user.direccion}</td>
                <td>{user.telefono}</td>
                <td>{user.dui}</td>
                <td>
                  <img src={user.img_perfil} alt="Perfil" width="50" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay usuarios registrados.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
