// src/components/PrendaForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";

const UpdateP = () => {
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
  const { id } = useParams(); // Obtener el id de los parámetros de la URL
  const [marcas, setMarcas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [tipoPrendas, setTipoPrendas] = useState([]);

  useEffect(() => {
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

    if (id) {
      // Si hay un id, estamos en modo de actualización
      const fetchPrenda = async () => {
        const result = await axios.get(`http://localhost:3076/prendas/${id}`);
        setFormData(result.data);
      };
      fetchPrenda();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Si hay un id, actualizar la prenda existente
        await axios.put(`http://localhost:3076/prendas/${id}`, formData);
      } else {
        // Si no hay id, crear una nueva prenda
        const response = await axios.post(
          "http://localhost:3076/prendas",
          formData
        );
        const prendaId = response.data.id_prenda;
        navigate(`/tallas/${prendaId}`);
      }
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
    } catch (error) {
      console.error("Error al guardar la prenda", error);
    }
    navigate("/tablePrenda");
  };

  return (
    <div className="container" style={{ fontFamily: "Prompt, sans-serif" }}>
      <link rel="stylesheet" href={googleFontsURL} />
      <Form
        onSubmit={handleSubmit}
        style={{ fontFamily: "Prompt, sans-serif" }}
      >
        <Form.Group>
          <Form.Label>Nombre Prenda</Form.Label>
          <Form.Control
            type="text"
            name="nombre_prenda"
            value={formData.nombre_prenda}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Marca</Form.Label>
          <Form.Control
            as="select"
            name="id_marca"
            value={formData.id_marca}
            onChange={handleChange}
          >
            <option value="">Seleccione Marca</option>
            {marcas.map((marca, index) => (
              <option key={index} value={index + 1}>
                {marca.nom_marca}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Departamento</Form.Label>
          <Form.Control
            as="select"
            name="id_departamento"
            value={formData.id_departamento}
            onChange={handleChange}
          >
            <option value="">Seleccione Departamento</option>
            {departamentos.map((departamento, index) => (
              <option key={index} value={index + 1}>
                {departamento.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Disponibilidad</Form.Label>
          <Form.Control
            type="number"
            name="disponibilidad"
            value={formData.disponibilidad}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Proveedor</Form.Label>
          <Form.Control
            as="select"
            name="id_proveedor"
            value={formData.id_proveedor}
            onChange={handleChange}
          >
            <option value="">Seleccione Proveedor</option>
            {proveedores.map((proveedor, index) => (
              <option key={index} value={index + 1}>
                {proveedor.name_proveedor}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio Unitario</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="precio_unitario"
            value={formData.precio_unitario}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Imagen 1</Form.Label>
          <Form.Control
            type="text"
            name="imagen1"
            value={formData.imagen1}
            onChange={handleChange}
          />
          {formData.imagen1 && (
            <img
              src={formData.imagen1}
              alt="Previsualización Imagen 1"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Imagen 2</Form.Label>
          <Form.Control
            type="text"
            name="imagen2"
            value={formData.imagen2}
            onChange={handleChange}
          />
          {formData.imagen2 && (
            <img
              src={formData.imagen2}
              alt="Previsualización Imagen 2"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Imagen 3</Form.Label>
          <Form.Control
            type="text"
            name="imagen3"
            value={formData.imagen3}
            onChange={handleChange}
          />
          {formData.imagen3 && (
            <img
              src={formData.imagen3}
              alt="Previsualización Imagen 3"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Imagen 4</Form.Label>
          <Form.Control
            type="text"
            name="imagen4"
            value={formData.imagen4}
            onChange={handleChange}
          />
          {formData.imagen4 && (
            <img
              src={formData.imagen4}
              alt="Previsualización Imagen 4"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Tipo Prenda</Form.Label>
          <Form.Control
            as="select"
            name="id_tipo_prenda"
            value={formData.id_tipo_prenda}
            onChange={handleChange}
          >
            <option value="">Seleccione Tipo Prenda</option>
            {tipoPrendas.map((tipoPrenda, index) => (
              <option key={index} value={index + 1}>
                {tipoPrenda.nombre_tipo}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Material 1</Form.Label>
          <Form.Control
            type="text"
            name="material1"
            value={formData.material1}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Material 2</Form.Label>
          <Form.Control
            type="text"
            name="material2"
            value={formData.material2}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Material 3</Form.Label>
          <Form.Control
            type="text"
            name="material3"
            value={formData.material3}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Material 4</Form.Label>
          <Form.Control
            type="text"
            name="material4"
            value={formData.material4}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Material 5</Form.Label>
          <Form.Control
            type="text"
            name="material5"
            value={formData.material5}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? "Actualizar Prenda" : "Agregar Prenda"}
        </Button>
      </Form>
    </div>
  );
};

export default UpdateP;
