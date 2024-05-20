// src/components/ProveedorTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const ProveedorTable = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    const result = await axios.get("http://localhost:3076/proveedores");
    setProveedores(result.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3076/proveedores/${id}`);
    fetchProveedores();
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre Proveedor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.map((proveedor) => (
          <tr key={proveedor.id_proveedor}>
            <td>{proveedor.id_proveedor}</td>
            <td>{proveedor.name_proveedor}</td>
            <td>
              <Button
                variant="danger"
                onClick={() => handleDelete(proveedor.id_proveedor)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProveedorTable;
