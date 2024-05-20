import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DepartmentComponent from "./DepartamentComponent"; // Importa tu nuevo componente aquí
import "./admin.css"; // Importa tu archivo CSS aquí

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


  return (
    <div className="admin-container">
      <h2>Dashboard del Administrador</h2>
      <h3>Departamentos</h3>
      <DepartmentComponent />
      <h3>Lista de Usuarios</h3>
      {users.length > 0 ? (
        <table className="admin-table">
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
                  <img src={user.img_perfil} alt="Perfil" />
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
