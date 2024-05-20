// src/components/ProveedorForm.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ProveedorForm = () => {
  const [formData, setFormData] = useState({
    name_proveedor: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3076/proveedores", formData);
    setFormData({ name_proveedor: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nombre Proveedor</Form.Label>
        <Form.Control
          type="text"
          name="name_proveedor"
          value={formData.name_proveedor}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Proveedor
      </Button>
    </Form>
  );
};

export default ProveedorForm;
