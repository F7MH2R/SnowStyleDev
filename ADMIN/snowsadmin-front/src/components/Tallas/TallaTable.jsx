import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const TallaTable = () => {
  const [tallas, setTallas] = useState([]);

  useEffect(() => {
    // Fetch all tallas from the API
    const fetchTallas = async () => {
      try {
        const response = await axios.get("http://localhost:3076/tallas");
        setTallas(response.data);
      } catch (error) {
        console.error("Error fetching tallas:", error);
      }
    };

    fetchTallas();
  }, []);

  return (
    <div className="container">
      <h2>Tallas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Talla</th>
            <th>Nombre Talla</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {tallas.map((talla) => (
            <tr key={talla.id_talla}>
              <td>{talla.id_talla}</td>
              <td>{talla.nom_talla}</td>
              <td>{talla.codigo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TallaTable;
