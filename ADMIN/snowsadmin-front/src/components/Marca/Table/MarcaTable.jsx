import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarcaForm from "../Form/MarcaForm";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";
import "../Table/MarcaTable.css"

const MarcaTable = () => {
  const [marcas, setMarcas] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleAddMarca = async () => {
    setShowModal(false); // Cerrar modal
    await fetchMarcas(); // Actualizar lista de marcas
    toast.success("Marca agregada exitosamente!", {
      autoClose: 1000, // Cerrar automáticamente después de 2 segundos
      onClose: () => toast.dismiss(), // Cerrar el mensaje si el usuario hace clic en él
    });
  };

  return (
    <>
      <div className="marca-table-container" style={{ fontFamily: "Prompt, sans-serif" }}>
        <link rel="stylesheet" href={googleFontsURL} />
        <Table striped bordered hover className="table-container " style={{ fontFamily: "Prompt, sans-serif" }}>
          <Button 
            className="table-marca-button"
            variant="primary"
            onClick={() => setShowModal(true)}
            style={{ marginBottom: "10px" }}
          >
            + Nueva Marca
          </Button>
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
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva Marca</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MarcaForm handleAddMarca={handleAddMarca} />
          </Modal.Body>
        </Modal>
        <ToastContainer />
      </div>
      
    </>
  );
};

export default MarcaTable;
