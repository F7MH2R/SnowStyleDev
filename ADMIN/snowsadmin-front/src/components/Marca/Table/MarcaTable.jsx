// src/components/MarcaTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MarcaTable = () => {
  const [marcas, setMarcas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    const result = await axios.get("http://localhost:3076/marcas");
    setMarcas(result.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3076/marcas/${id}`);
    fetchMarcas();
  };

  const handleAddMarca = () => {
    navigate("/formMarca");
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleAddMarca}
        style={{ marginBottom: "10px" }}
      >
        Agregar Marca
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Marca</th>
            <th>Código</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.id_marca}>
              <td>{marca.id_marca}</td>
              <td>{marca.nom_marca}</td>
              <td>{marca.codigo}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(marca.id_marca)}
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

export default MarcaTable;
