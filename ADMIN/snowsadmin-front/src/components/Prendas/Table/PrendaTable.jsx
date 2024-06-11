import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import googleFontsURL from "../../FuenteLetra/FuenteLetra";
import "../Table/PrendaTable.css";

const PrendaTable = () => {
  const [prendas, setPrendas] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrendas();
  }, []);

  const fetchPrendas = async () => {
    const result = await axios.get("http://localhost:3076/prendas");
    setPrendas(result.data);
  };

  const handleDelete = async (id_prenda) => {
    navigate(`/UpdateTallas/${id_prenda}`);
    fetchPrendas();
  };

  const handleUpdate = (id_prenda) => {
    navigate(`/UpdatePrenda/${id_prenda}`);
  };

  const filteredPrendas = prendas.filter((prenda) => {
    const matchesName =
      prenda.nombre_prenda &&
      prenda.nombre_prenda.toLowerCase().includes(searchName.toLowerCase());
    const matchesMinPrice =
      minPrice === "" || prenda.precio_unitario >= parseFloat(minPrice);
    const matchesMaxPrice =
      maxPrice === "" || prenda.precio_unitario <= parseFloat(maxPrice);
    return matchesName && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <>
      <div
        className="prenda-table-container"
        style={{ fontFamily: "Prompt, sans-serif" }}
      >
        <link rel="stylesheet" href={googleFontsURL} />
        <Button
          className="prenda-button"
          variant="primary"
          onClick={() => navigate("/FormPrenda")}
          style={{ marginBottom: "10px" }}
        >
          + Nueva Prenda
        </Button>
        <Form className="mb-3">
          <Row>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="number"
                placeholder="Precio mínimo"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="number"
                placeholder="Precio máximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Col>
          </Row>
        </Form>
        <Table striped bordered hover className="prenda-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio Unitario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrendas.map((prenda) => (
              <tr key={prenda.id_prenda}>
                <td>{prenda.id_prenda}</td>
                <td>{prenda.nombre_prenda}</td>
                <td>{prenda.precio_unitario}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    onClick={() => handleUpdate(prenda.id_prenda)}
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => handleDelete(prenda.id_prenda)}
                  >
                    Tallas
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default PrendaTable;
