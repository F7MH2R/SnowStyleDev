import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const TallasForm = () => {
  const { prendaId } = useParams();
  const [tallas, setTallas] = useState([]);
  const [selectedTallas, setSelectedTallas] = useState(Array(5).fill(""));

  useEffect(() => {
    // Fetch tallas data
    const fetchTallas = async () => {
      const tallasResult = await axios.get("http://localhost:3076/tallas");
      setTallas(tallasResult.data);
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
    for (let i = 0; i < selectedTallas.length; i++) {
      if (selectedTallas[i]) {
        await axios.post("http://localhost:3076/tallas_prenda", {
          id_prenda: prendaId,
          id_talla: selectedTallas[i],
        });
      }
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        {[...Array(5)].map((_, index) => (
          <Form.Group key={index}>
            <Form.Label>Talla {index + 1}</Form.Label>
            <Form.Control
              as="select"
              value={selectedTallas[index]}
              onChange={(e) => handleChange(index, e.target.value)}
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
        <Button variant="primary" type="submit">
          Add Tallas
        </Button>
      </Form>
    </div>
  );
};

export default TallasForm;
