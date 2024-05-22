// src/components/DepartamentoTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";
import "../Table/DepartamentoTable.css";

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
    <div className="departamento-table-container" style={{ fontFamily: "Prompt, sans-serif" }}>
      <link rel="stylesheet" href={googleFontsURL} />
      <Table striped bordered hover className="departamento-container" style={{ fontFamily: "Prompt, sans-serif" }}>
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
    </div>
  );
};

export default DepartamentoTable;
