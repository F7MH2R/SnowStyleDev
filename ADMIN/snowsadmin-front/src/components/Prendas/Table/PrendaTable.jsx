// src/components/PrendaTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PrendaTable = () => {
  const [prendas, setPrendas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrendas();
  }, []);

  const fetchPrendas = async () => {
    const result = await axios.get("http://localhost:3076/prendas");
    setPrendas(result.data);
  };

  const handleDelete = async (id_prenda) => {
    await axios.delete(`http://localhost:3076/prendas/${id_prenda}`);
    fetchPrendas();
  };

  const handleUpdate = (id_prenda) => {
    navigate(`/UpdatePrenda/${id_prenda}`);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => navigate("/prenda-form")}
        style={{ marginBottom: "10px" }}
      >
        Agregar Prenda
      </Button>
      <Table striped bordered hover>
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
                  variant="warning"
                  onClick={() => handleUpdate(prenda.id_prenda)}
                  style={{ marginRight: "10px" }}
                >
                  Update
                </Button>
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
    </>
  );
};

export default PrendaTable;
