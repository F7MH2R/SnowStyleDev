// src/components/DepartamentoTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const DepartamentoTable = () => {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = async () => {
    const result = await axios.get("http://localhost:3076/departamentos");
    setDepartamentos(result.data);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre Departamento</th>
          <th>Imagenes</th>
        </tr>
      </thead>
      <tbody>
        {departamentos.map((departamento) => (
          <tr key={departamento.id_departamento}>
            <td>{departamento.nombre}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DepartamentoTable;
