// src/components/MarcaForm.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MarcaForm = () => {
  const [formData, setFormData] = useState({
    nom_marca: "",
    codigo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3076/marcas", formData);
      toast.success("Marca agregada exitosamente!");
      setFormData({ nom_marca: "", codigo: "" });
      setTimeout(() => {
        navigate("/marcaTable");
      }, 2000); // Redirige después de 2 segundos
    } catch (error) {
      toast.error("Error al agregar la marca.");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre Marca</Form.Label>
          <Form.Control
            type="text"
            name="nom_marca"
            value={formData.nom_marca}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Código</Form.Label>
          <Form.Control
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Marca
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default MarcaForm;
