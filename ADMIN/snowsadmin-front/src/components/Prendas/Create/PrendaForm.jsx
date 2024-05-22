import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";
import "../Create/PrendaForm.css";

const PrendaForm = () => {
  const [formData, setFormData] = useState({
    id_marca: "",
    id_departamento: "",
    disponibilidad: "",
    cantidad: "",
    id_proveedor: "",
    precio_unitario: "",
    imagen1: "",
    imagen2: "",
    imagen3: "",
    imagen4: "",
    nombre_prenda: "",
    id_tipo_prenda: "",
    descripcion: "",
    material1: "",
    material2: "",
    material3: "",
    material4: "",
    material5: "",
  });
  const navigate = useNavigate();

  const [marcas, setMarcas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [tipoPrendas, setTipoPrendas] = useState([]);

  useEffect(() => {
    // Fetch data for dropdowns
    const fetchData = async () => {
      const marcasResult = await axios.get("http://localhost:3076/marcas");
      const departamentosResult = await axios.get(
        "http://localhost:3076/departamentos"
      );
      const proveedoresResult = await axios.get(
        "http://localhost:3076/proveedores"
      );
      const tipoPrendasResult = await axios.get(
        "http://localhost:3076/tipo_prendas"
      );

      setMarcas(marcasResult.data);
      setDepartamentos(departamentosResult.data);
      setProveedores(proveedoresResult.data);
      setTipoPrendas(tipoPrendasResult.data);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3076/prendas", formData);

    setFormData({
      id_marca: "",
      id_departamento: "",
      disponibilidad: "",
      cantidad: "",
      id_proveedor: "",
      precio_unitario: "",
      imagen1: "",
      imagen2: "",
      imagen3: "",
      imagen4: "",
      nombre_prenda: "",
      id_tipo_prenda: "",
      descripcion: "",
      material1: "",
      material2: "",
      material3: "",
      material4: "",
      material5: "",
    });

    navigate(`/tallas/${prendaId}`);
  };

  return (
    <>
      <div
        className="prenda-form-container"
        style={{ fontFamily: "Prompt, sans-serif" }}
      >
        <link rel="stylesheet" href={googleFontsURL} />
        <div className="prenda-form-all">
          <h4>
            <b>Nueva Prenda</b>
          </h4>
          <Form
            striped
            bordered
            hove
            onSubmit={handleSubmit}
            className="prenda-custom-form"
          >
            <Form.Group className="custom-form-group">
              <Form.Label className="custom-label">Nombre Prenda</Form.Label>
              <Form.Control
                type="text"
                name="nombre_prenda"
                value={formData.nombre_prenda}
                onChange={handleChange}
                className="custom-control"
              />
            </Form.Group>
            <Form.Group className="custom-form-group">
              <Form.Label className="custom-label">Marca</Form.Label>
              <Form.Control
                as="select"
                name="id_marca"
                value={formData.id_marca}
                onChange={handleChange}
                className="custom-control"
              >
                <option value="">Seleccione Marca</option>
                {marcas.map((marca, index) => (
                  <option key={index} value={index + 1}>
                    {marca.nom_marca}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="custom-form-group">
              <Form.Label className="custom-label">Departamento</Form.Label>
              <Form.Control
                as="select"
                name="id_departamento"
                value={formData.id_departamento}
                onChange={handleChange}
                className="custom-control"
              >
                <option value="">Seleccione Departamento</option>
                {departamentos.map((departamento, index) => (
                  <option key={index} value={index + 1}>
                    {departamento.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="custom-form-group">
              <Form.Label className="custom-label">Disponibilidad</Form.Label>
              <Form.Control
                type="number"
                name="disponibilidad"
                value={formData.disponibilidad}
                onChange={handleChange}
                className="custom-control"
              />
            </Form.Group>
            <Form.Group className="custom-form-group">
              <Form.Label className="custom-label">Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                className="custom-control"
              />
            </Form.Group>
          </Form>

          <Form onSubmit={handleSubmit} className="prenda-custom-form">
            <Form.Group className="custom-form-group">
              <Form.Label className="custom-label">Proveedor</Form.Label>
              <Form.Control
                as="select"
                name="id_proveedor"
                value={formData.id_proveedor}
                onChange={handleChange}
                className="custom-control"
              >
                <option value="">Seleccione Proveedor</option>
                {proveedores.map((proveedor, index) => (
                  <option key={index} value={index + 1}>
                    {proveedor.name_proveedor}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="custom-form-group">
              <Form.Label className="custom-label">Precio Unitario</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="precio_unitario"
                value={formData.precio_unitario}
                onChange={handleChange}
                className="custom-control"
              />
            </Form.Group>

            <div className="custom-form-section">
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Imagen 1</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen1"
                  value={formData.imagen1}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Imagen 2</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen2"
                  value={formData.imagen2}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Imagen 3</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen3"
                  value={formData.imagen3}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Imagen 4</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen4"
                  value={formData.imagen4}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
            </div>
          </Form>

          <Form onSubmit={handleSubmit} className="prenda-custom-form">
            <div className="custom-form-section">
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Tipo Prenda</Form.Label>
                <Form.Control
                  as="select"
                  name="id_tipo_prenda"
                  value={formData.id_tipo_prenda}
                  onChange={handleChange}
                  className="custom-control"
                >
                  <option value="">Seleccione Tipo Prenda</option>
                  {tipoPrendas.map((tipoPrenda, index) => (
                    <option key={index} value={index + 1}>
                      {tipoPrenda.nombre_tipo}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Material 1</Form.Label>
                <Form.Control
                  type="text"
                  name="material1"
                  value={formData.material1}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Material 2</Form.Label>
                <Form.Control
                  type="text"
                  name="material2"
                  value={formData.material2}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Material 3</Form.Label>
                <Form.Control
                  type="text"
                  name="material3"
                  value={formData.material3}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Material 4</Form.Label>
                <Form.Control
                  type="text"
                  name="material4"
                  value={formData.material4}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Material 5</Form.Label>
                <Form.Control
                  type="text"
                  name="material5"
                  value={formData.material5}
                  onChange={handleChange}
                  className="custom-control"
                />
              </Form.Group>
            </div>
            <button className="custom-button" variant="primary">
              Agregar Prenda
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PrendaForm;
