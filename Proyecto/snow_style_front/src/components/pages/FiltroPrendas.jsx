import React, { useState, useEffect } from "react";
import { Button, Form, FormControl, Offcanvas } from "react-bootstrap";

const FiltroPrendas = ({ filtrarPrendas }) => {
  const [nombrePrenda, setNombrePrenda] = useState("");
  const [mostrarLiquidacion, setMostrarLiquidacion] = useState(false);
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setShowFilter(true); // Mostrar el filtro al montar el componente
  }, []);

  const handleNombrePrendaChange = (e) => {
    setNombrePrenda(e.target.value);
  };

  const handleMostrarLiquidacionChange = () => {
    setMostrarLiquidacion(!mostrarLiquidacion);
  };

  const handleTallaSeleccionada = (talla) => {
    if (tallasSeleccionadas.includes(talla)) {
      setTallasSeleccionadas(tallasSeleccionadas.filter((t) => t !== talla));
    } else {
      setTallasSeleccionadas([...tallasSeleccionadas, talla]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filtrarPrendas(nombrePrenda, mostrarLiquidacion, tallasSeleccionadas);
    setShowFilter(false);
  };

  return (
    <>
      <Offcanvas show={showFilter} onHide={() => setShowFilter(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtro de Prendas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombrePrenda">
              <Form.Label>Buscar por nombre de prenda:</Form.Label>
              <FormControl
                type="text"
                placeholder="Ingrese el nombre de la prenda"
                value={nombrePrenda}
                onChange={handleNombrePrendaChange}
              />
            </Form.Group>
            <Form.Group controlId="formMostrarLiquidacion">
              <Form.Check
                type="checkbox"
                label="Mostrar solo prendas en liquidación"
                checked={mostrarLiquidacion}
                onChange={handleMostrarLiquidacionChange}
              />
            </Form.Group>
            <Form.Group controlId="formTallas">
              <Form.Label>Filtrar por tallas:</Form.Label>
              <div>
                <Button
                  variant={
                    tallasSeleccionadas.includes("S")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleTallaSeleccionada("S")}
                  className="mr-2 mb-2"
                >
                  S
                </Button>
                <Button
                  variant={
                    tallasSeleccionadas.includes("M")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleTallaSeleccionada("M")}
                  className="mr-2 mb-2"
                >
                  M
                </Button>
                <Button
                  variant={
                    tallasSeleccionadas.includes("L")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleTallaSeleccionada("L")}
                  className="mr-2 mb-2"
                >
                  L
                </Button>
                <Button
                  variant={
                    tallasSeleccionadas.includes("XL")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleTallaSeleccionada("XL")}
                  className="mr-2 mb-2"
                >
                  XL
                </Button>
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Aplicar filtros
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FiltroPrendas;
