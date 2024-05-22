import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MarcaForm.css";

const MarcaForm = ({ handleAddMarca }) => {
  const [formData, setFormData] = useState({
    nom_marca: "",
    codigo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3076/marcas", formData);
      setFormData({ nom_marca: "", codigo: "" });
      handleAddMarca();
      toast.success("Marca agregada con éxito.");
    } catch (error) {
      toast.error("Error al agregar la marca.");
    }
  };

  const handleCancel = () => {
    setFormData({ nom_marca: "", codigo: "" });
  };

  return (
    <>
      <Form className="marca-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="marca-label">Nombre Marca</Form.Label>
          <Form.Control
            className="marca-input"
            type="text"
            name="nom_marca"
            value={formData.nom_marca}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="marca-label">Código</Form.Label>
          <Form.Control
            className="marca-input"
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="button-group">
          <Button className="marca-button" variant="primary" type="submit">
            Agregar Marca
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </>
  );
};

export default MarcaForm;
