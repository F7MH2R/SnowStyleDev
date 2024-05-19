// src/components/PrendaTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const PrendaTable = () => {
  const [prendas, setPrendas] = useState([]);

  useEffect(() => {
    fetchPrendas();
  }, []);

  const fetchPrendas = async () => {
    const result = await axios.get("http://localhost:3076/prendas");
    setPrendas(result.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3076/prendas/${id}`);
    fetchPrendas();
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio Unitario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {prendas.map((prenda) => (
          <tr key={prenda.id_prenda}>
            <td>{prenda.id_prenda}</td>
            <td>{prenda.nombre_prenda}</td>
            <td>{prenda.precio_unitario}</td>
            <td>
              <Button
                variant="danger"
                onClick={() => handleDelete(prenda.id_prenda)}
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

export default PrendaTable;
