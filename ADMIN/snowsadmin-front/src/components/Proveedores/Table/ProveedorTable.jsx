import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Button, Modal } from "react-bootstrap";
import "../Table/ProveedorTable.css";
import ProveedorForm from "../Create/ProveedorForm ";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";

const ProveedorTable = () => {
  const [proveedores, setProveedores] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const result = await axios.get("http://localhost:3076/proveedores");
      setProveedores(result.data);
    } catch (error) {
      console.error("Error fetching proveedores:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3076/proveedores/${id}`);
      fetchProveedores();
      toast.success("Proveedor eliminado exitosamente!", {
        autoClose: 1000,
        onClose: () => toast.dismiss(),
      });
    } catch (error) {
      console.error("Error deleting proveedor:", error);
      toast.error("Error eliminando el proveedor.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddProveedor = async () => {
    setShowModal(false);
    await fetchProveedores();
    toast.success("Proveedor agregado exitosamente!", {
      autoClose: 1000,
      onClose: () => toast.dismiss(),
    });
  };

  return (
    <>
      <div className="proveedor-table-container" style={{ fontFamily: "Prompt, sans-serif" }}>
        <link rel="stylesheet" href={googleFontsURL} />
        <Table striped bordered hover className="proveedor-container">
          <Button
            className="proveedor-table-button"
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            + Nuevo Proveedor
          </Button>
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
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Proveedor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProveedorForm handleAddProveedor={handleAddProveedor} />
          </Modal.Body>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
};

export default ProveedorTable;
