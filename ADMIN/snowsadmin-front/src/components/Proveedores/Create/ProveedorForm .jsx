import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";
import "../Create/ProveedorForm.css"; 

const ProveedorForm = ({ handleAddProveedor }) => {
  const [formData, setFormData] = useState({
    name_proveedor: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3076/proveedores", formData);
      handleAddProveedor();
    } catch (error) {
      console.error("Error adding proveedor:", error);
    }
  };

  return (
    <div style={{ fontFamily: "Prompt, sans-serif" }}>
      <link rel="stylesheet" href={googleFontsURL} />
      <Form onSubmit={handleSubmit} className="proveedor-form">
      <Form.Group>
        <Form.Label className="form-label">Nombre Proveedor</Form.Label>
        <Form.Control
          type="text"
          name="name_proveedor"
          value={formData.name_proveedor}
          onChange={handleChange}
          className="form-control"
        />
      </Form.Group>
        <div className="proveedor-button-group">
            <Button className="proveedor-form-button" variant="primary" type="submit">
              Agregar Proveedor
            </Button>
        </div>
      </Form>
    </div>
    
  );
};

export default ProveedorForm;
