import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaTshirt } from "react-icons/fa";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";
import "../Create/PrendaForm.css"; // Import the CSS file

const UpdateP = () => {
  const [formData, setFormData] = useState({
    id_marca: "",
    id_departamento: "",
    disponibilidad: "", // Change to string to match value comparison
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

  const [showModal, setShowModal] = useState(false);
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
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        disponibilidad: value, // Update disponibilidad directly
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
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
      setShowModal(true); // Show the success modal
    } catch (error) {
      console.error("Error al guardar la prenda", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/tablePrenda"); // Navigate after closing the modal
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
            <b>{id ? "Actualizar Prenda" : "Nueva Prenda"}</b>
          </h4>
          <Form onSubmit={handleSubmit} className="prenda-custom-form">
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
                {marcas.map((marca) => (
                  <option key={marca.id_marca} value={marca.id_marca}>
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
                {departamentos.map((departamento) => (
                  <option
                    key={departamento.id_departamento}
                    value={departamento.id_departamento}
                  >
                    {departamento.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="custom-form-group">
              <Form.Label className="custom-label">Disponibilidad</Form.Label>
              <div className="custom-control">
                <Form.Check
                  type="radio"
                  label="Disponible"
                  name="disponibilidad"
                  value="1"
                  checked={formData.disponibilidad === "1"}
                  onChange={handleChange}
                  className="custom-control"
                />
                <Form.Check
                  type="radio"
                  label="No Disponible"
                  name="disponibilidad"
                  value="0"
                  checked={formData.disponibilidad === "0"}
                  onChange={handleChange}
                  className="custom-control"
                />
              </div>
            </Form.Group>
            {/*
            <Form.Group className="custom-form-group">
              <Form.Label className="custom-label">Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                className="custom-control"
              />
            </Form.Group>*/}
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
                {proveedores.map((proveedor) => (
                  <option
                    key={proveedor.id_proveedor}
                    value={proveedor.id_proveedor}
                  >
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
                {formData.imagen1 && (
                  <img
                    src={formData.imagen1}
                    alt="Previsualización Imagen 1"
                    className="image-preview"
                  />
                )}
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
                {formData.imagen2 && (
                  <img
                    src={formData.imagen2}
                    alt="Previsualización Imagen 2"
                    className="image-preview"
                  />
                )}
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
                {formData.imagen3 && (
                  <img
                    src={formData.imagen3}
                    alt="Previsualización Imagen 3"
                    className="image-preview"
                  />
                )}
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
                {formData.imagen4 && (
                  <img
                    src={formData.imagen4}
                    alt="Previsualización Imagen 4"
                    className="image-preview"
                  />
                )}
              </Form.Group>
            </div>

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
                  {tipoPrendas.map((tipoPrenda) => (
                    <option
                      key={tipoPrenda.id_tipo_prenda}
                      value={tipoPrenda.id_tipo_prenda}
                    >
                      {tipoPrenda.nombre_tipo}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="custom-form-group">
                <Form.Label className="custom-label">Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
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
            <Button className="custom-button" type="submit" variant="primary">
              {id ? "Actualizar Prenda" : "Agregar Prenda"}
            </Button>
          </Form>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Felicidades!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content">
            <FaTshirt className="modal-icon" size={100} />
            <p>
              Has {id ? "actualizado" : "agregado"} tu prenda correctamente.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateP;
