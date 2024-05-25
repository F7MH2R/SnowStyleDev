import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import googleFontsURL from "../../FuenteLetra/FuenteLetra";
import "./TallasForm.css";

const TallasForm = () => {
  const { id_prenda } = useParams();
  const [tallas, setTallas] = useState([]);
  const [selectedTallas, setSelectedTallas] = useState(Array(5).fill(""));
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
  }, []);

  const handleChange = (index, value) => {
    const newSelectedTallas = [...selectedTallas];
    newSelectedTallas[index] = value;
    setSelectedTallas(newSelectedTallas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tallas_Guardar = selectedTallas.filter((talla) => talla.length > 0);
    for (let i = 0; i < tallas_Guardar.length; i++) {
      if (tallas_Guardar[i]) {
        try {
          await axios.post("http://localhost:3076/tallas_prenda", {
            id_prenda: id_prenda,
            id_talla: tallas_Guardar[i],
          });
        } catch (error) {
          console.error("Error adding tallas:", error);
        }
      }
    }
    navigate(`/admin`);
  };

  return (
    <div
      className="tallas-form-container"
      style={{ fontFamily: "Prompt, sans-serif" }}
    >
      <link rel="stylesheet" href={googleFontsURL} />
      <Form
        onSubmit={handleSubmit}
        style={{ fontFamily: "Prompt, sans-serif" }}
      >
        {[...Array(5)].map((_, index) => (
          <Form.Group key={index} className={`talla-select-group-${index}`}>
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
        ))}
        <Button variant="primary" type="submit" className="submit-button">
          Agregar Tallas
        </Button>
      </Form>
    </div>
  );
};

export default TallasForm;
