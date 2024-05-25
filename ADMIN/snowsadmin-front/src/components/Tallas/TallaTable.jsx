import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Button } from "react-bootstrap";
import TallasForm from "../Prendas/AddTalla/TallasForm"; // Importa el componente TallasForm sin llaves
import googleFontsURL from "../FuenteLetra/FuenteLetra";
import "./TallaTable.css";

const TallaTable = () => {
  const [tallas, setTallas] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="talla-container">
      <link rel="stylesheet" href={googleFontsURL} />
      <div
        className="talla-table-container"
        style={{ fontFamily: "Prompt, sans-serif" }}
      >
        <h2>Tallas</h2>
        {/*<Button className="talla-table-button" onClick={handleShowModal}>
          + Nueva Talla
  </Button>*/}
        <Table striped bordered hover className="talla-table">
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
                <td data-label="ID Talla">{talla.id_talla}</td>
                <td data-label="Nombre Talla">{talla.nom_talla}</td>
                <td data-label="Código">{talla.codigo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Tallas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TallasForm />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TallaTable;
