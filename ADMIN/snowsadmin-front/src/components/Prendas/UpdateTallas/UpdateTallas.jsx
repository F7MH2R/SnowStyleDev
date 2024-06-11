import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FaTshirt } from "react-icons/fa";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";
import "./TallasForm.css";

const UpdateTallas = () => {
  const { id } = useParams();
  const [tallas, setTallas] = useState([]);
  const [selectedTallas, setSelectedTallas] = useState(Array(5).fill(""));
  const [cantidad, setCantidad] = useState(Array(5).fill(""));
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTallas = async () => {
      try {
        const tallasResult = await axios.get("http://localhost:3076/tallas");
        setTallas(tallasResult.data);
      } catch (error) {
        console.error("Error fetching tallas:", error);
      }
    };

    fetchTallas();

    // Fetch existing tallas for the prenda
    const fetchTallasPrenda = async () => {
      try {
        const tallasPrendaResult = await axios.get(
          `http://localhost:3076/tallas_prenda/${id}`
        );
        const existingTallas = tallasPrendaResult.data;
        const newSelectedTallas = Array(5).fill("");
        const newCantidad = Array(5).fill("");
        existingTallas.forEach((talla, index) => {
          newSelectedTallas[index] = talla.id_talla;
          newCantidad[index] = talla.cantidad;
        });
        setSelectedTallas(newSelectedTallas);
        setCantidad(newCantidad);
      } catch (error) {
        console.error("Error fetching tallas_prenda:", error);
      }
    };

    if (id) {
      fetchTallasPrenda();
    }
  }, [id]);

  const handleChange = (index, value) => {
    const newSelectedTallas = [...selectedTallas];
    newSelectedTallas[index] = value;
    setSelectedTallas(newSelectedTallas);
  };

  const handleCantidadChange = (index, value) => {
    const newCantidad = [...cantidad];
    newCantidad[index] = value;
    setCantidad(newCantidad);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < selectedTallas.length; i++) {
      if (selectedTallas[i]) {
        try {
          await axios.post(`http://localhost:3076/tallas_prenda/${id}`, {
            id_talla: selectedTallas[i],
            cantidad: cantidad[i] || 0, // Default to 0 if no value is entered
          });
        } catch (error) {
          console.error("Error handling tallas:", error);
        }
      }
    }

    setShowModal(true); // Show the success modal
  };

  const handleDeleteTalla = async (tallaId) => {
    try {
      await axios.delete(`http://localhost:3076/tallas_prenda/${id}`, {
        data: {
          id_prenda: id,
          id_talla: tallaId,
        },
      });
      // Actualizar el estado después de la eliminación
      const updatedSelectedTallas = selectedTallas.filter(
        (_, index) => selectedTallas[index] !== tallaId
      );
      const updatedCantidad = cantidad.filter(
        (_, index) => selectedTallas[index] !== tallaId
      );
      setSelectedTallas(updatedSelectedTallas);
      setCantidad(updatedCantidad);
    } catch (error) {
      console.error("Error deleting talla:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate(`/tablePrenda`); // Navigate after closing the modal
  };

  return (
    <div className="container-tallas-form">
      <div
        className="tallas-form-wrapper"
        style={{ fontFamily: "Prompt, sans-serif" }}
      >
        <link rel="stylesheet" href={googleFontsURL} />
        <Form onSubmit={handleSubmit} className="tallas-form">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="talla-input-group">
              <Form.Group className={`talla-select-group-${index}`}>
                <Form.Label className={`talla-label-${index}`}>
                  Talla {index + 1}
                </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedTallas[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className={`talla-select-${index}`}
                >
                  <option value="">Seleccione Talla</option>
                  {tallas.map((talla) => (
                    <option key={talla.id_talla} value={talla.id_talla}>
                      {talla.nom_talla}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {selectedTallas[index] && (
                <>
                  <Form.Group className={`cantidad-input-group-${index}`}>
                    <Form.Label className={`cantidad-label-${index}`}>
                      Cantidad
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={cantidad[index]}
                      onChange={(e) =>
                        handleCantidadChange(index, e.target.value)
                      }
                      className={`cantidad-input-${index}`}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteTalla(selectedTallas[index])}
                    className={`delete-button-${index}`}
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </div>
          ))}
          <Button variant="primary" type="submit" className="submit-button">
            Actualizar Tallas
          </Button>
        </Form>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Felicidades!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content">
            <FaTshirt className="modal-icon" size={100} />
            <p>Has actualizado las tallas de tu prenda correctamente.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateTallas;
