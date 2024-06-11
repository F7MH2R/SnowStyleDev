import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardGroup,
  Carousel,
  Button,
  Offcanvas,
} from "react-bootstrap";
import PropTypes from "prop-types";
import "../pages/css/Modal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FiltroPrendas from "./FiltroPrendas";
import withLoader from "../Load/withLoader ";
import { Tallas } from "../tallas/tallas";

const CardsPrenda = () => {
  const { tipoPrendaId, departamento } = useParams();
  const [prendas, setPrendas] = useState([]);
  const [filteredPrendas, setFilteredPrendas] = useState([]); // Estado para las prendas filtradas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchPrendas = async () => {
      try {
        const response = await axios.get(
          `/api/prendas/tipo/${tipoPrendaId}/${departamento}`
        );
        setPrendas(response.data);
        setFilteredPrendas(response.data); // Inicialmente, las prendas filtradas son iguales a todas las prendas
        setLoading(false);
      } catch (err) {
        setError("No se pudieron obtener las prendas.");
        setLoading(false);
      }
    };

    fetchPrendas();
  }, [tipoPrendaId, departamento]);

  const filtrarPrendas = (
    nombrePrenda,
    minPrecio,
    maxPrecio,
    mostrarLiquidacion,
    tallasSeleccionadas
  ) => {
    let filtered = prendas; // Comenzamos con todas las prendas

    // Filtrar por nombre de prenda
    if (nombrePrenda) {
      filtered = filtered.filter((prenda) =>
        prenda.nombre_prenda.toLowerCase().includes(nombrePrenda.toLowerCase())
      );
    }

    // Filtrar por precio mínimo
    if (minPrecio) {
      filtered = filtered.filter(
        (prenda) => prenda.precio_unitario >= parseFloat(minPrecio)
      );
    }

    // Filtrar por precio máximo
    if (maxPrecio) {
      filtered = filtered.filter(
        (prenda) => prenda.precio_unitario <= parseFloat(maxPrecio)
      );
    }

    // Filtrar por liquidación
    if (mostrarLiquidacion) {
      filtered = filtered.filter((prenda) => prenda.precio_unitario < 15);
    }

    // Filtrar por tallas seleccionadas
    if (tallasSeleccionadas.length > 0) {
      filtered = filtered.filter((prenda) =>
        tallasSeleccionadas.includes(prenda.talla)
      );
    }

    setFilteredPrendas(filtered); // Actualizamos el estado de las prendas filtradas
  };

  if (loading) {
    return <div>Cargando prendas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedPrendas = chunkArray(filteredPrendas, 3);

  return (
    <>
      <Button variant="dark" onClick={() => setShowFilter(true)}>
        Filtrar Prendas
      </Button>
      {chunkedPrendas.map((chunk, index) => (
        <Row key={index} className="mb-4">
          <CardGroup>
            {chunk.map((prenda) => (
              <Card key={prenda.id_prenda} className="mb-4">
                <Carousel>
                  {prenda.imagen1 && (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={prenda.imagen1}
                        alt={`Imagen de ${prenda.nombre_prenda}`}
                      />
                    </Carousel.Item>
                  )}
                  {prenda.imagen2 && (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={prenda.imagen2}
                        alt={`Imagen de ${prenda.nombre_prenda}`}
                      />
                    </Carousel.Item>
                  )}
                  {prenda.imagen3 && (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={prenda.imagen3}
                        alt={`Imagen de ${prenda.nombre_prenda}`}
                      />
                    </Carousel.Item>
                  )}
                  {prenda.imagen4 && (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={prenda.imagen4}
                        alt={`Imagen de ${prenda.nombre_prenda}`}
                      />
                    </Carousel.Item>
                  )}
                </Carousel>
                <Card.Body>
                  <Card.Title>
                    <h3>{prenda.nombre_prenda} </h3>
                  </Card.Title>
                  <Card.Title>
                    <h4>Precio: ${prenda.precio_unitario} </h4>
                  </Card.Title>
                  {/* Botones de tallas */}
                  <h5>Comprar en esta talla:</h5>
                  <Tallas idPrenda={prenda.id_prenda} />
                  <Row className="p-2">
                    <Col>
                      <Button
                        variant="dark"
                        as={Link}
                        to={`/detalle/${prenda.id_prenda}`}
                      >
                        Ver más
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        </Row>
      ))}

      <Offcanvas show={showFilter} onHide={() => setShowFilter(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrar Prendas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FiltroPrendas filtrarPrendas={filtrarPrendas} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

CardsPrenda.propTypes = {
  tipoPrendaId: PropTypes.string,
};

export default withLoader(CardsPrenda);
