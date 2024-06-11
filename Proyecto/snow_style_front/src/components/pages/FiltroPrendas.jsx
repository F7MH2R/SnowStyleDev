import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const FiltroPrendas = ({ filtrarPrendas }) => {
  const [nombrePrenda, setNombrePrenda] = useState("");
  const [minPrecio, setMinPrecio] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");
  const [mostrarLiquidacion, setMostrarLiquidacion] = useState(false);
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    filtrarPrendas(
      nombrePrenda,
      minPrecio,
      maxPrecio,
      mostrarLiquidacion,
      tallasSeleccionadas
    );
  };

  const handleTallasChange = (e) => {
    const value = e.target.value;
    setTallasSeleccionadas(
      e.target.checked
        ? [...tallasSeleccionadas, value]
        : tallasSeleccionadas.filter((talla) => talla !== value)
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNombrePrenda">
        <Form.Label>Nombre de la Prenda</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre de la prenda"
          value={nombrePrenda}
          onChange={(e) => setNombrePrenda(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formMinPrecio">
        <Form.Label>Precio Mínimo</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingrese el precio mínimo"
          value={minPrecio}
          onChange={(e) => setMinPrecio(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formMaxPrecio">
        <Form.Label>Precio Máximo</Form.Label>
        <Form.Control
          type="number"
          placeholder="Ingrese el precio máximo"
          value={maxPrecio}
          onChange={(e) => setMaxPrecio(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formMostrarLiquidacion">
        <Form.Check
          type="checkbox"
          label="Mostrar solo en liquidación"
          checked={mostrarLiquidacion}
          onChange={(e) => setMostrarLiquidacion(e.target.checked)}
        />
      </Form.Group>
      {/*}
      <Form.Group controlId="formTallas">
        <Form.Label>Tallas</Form.Label>
        <Form.Check
          type="checkbox"
          label="S"
          value="S"
          onChange={handleTallasChange}
        />
        <Form.Check
          type="checkbox"
          label="M"
          value="M"
          onChange={handleTallasChange}
        />
        <Form.Check
          type="checkbox"
          label="L"
          value="L"
          onChange={handleTallasChange}
        />
      </Form.Group>*/}
      <Button variant="dark" type="submit">
        Aplicar Filtros
      </Button>
    </Form>
  );
};

export default FiltroPrendas;
