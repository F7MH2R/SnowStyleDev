import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DepartmentComponent from "./DepartamentComponent"; // Importa tu nuevo componente aquí
import "./admin.css"; // Importa tu archivo CSS aquí
import Menu from "../Menu/Menu";
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

  const handleDeleteUser = async (userId) => {
    console.log("Deleting user with ID:", userId); // Registro para verificar el ID del usuario
    try {
      await axios.delete(`/api/users/${userId}`);
      // Utiliza una función de callback para asegurarte de que estás utilizando la última versión del estado
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id_usuario !== userId)
      );
      toast.success("Usuario eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar usuario");
    }
  };

  return (
    <div className="admin-container">
      <h2>Dashboard del Administrador</h2>
      <h3>Departamentos</h3>
      <DepartmentComponent />
      <Menu />
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
              <th>Acción</th>
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
                  <img
                    src={user.img_perfil}
                    alt="Perfil"
                    width="50"
                    height="50"
                  />
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id_usuario)}>
                    Eliminar Usuario
                  </button>
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
