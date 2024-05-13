import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Card, Carousel, Button, Offcanvas } from "react-bootstrap";
import PropTypes from "prop-types";
import "../pages/css/Modal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FiltroPrendas from "./FiltroPrendas";

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

  const handleComprar = (prendaId) => {
    console.log(`Comprar prenda con ID: ${prendaId}`);
  };

  const filtrarPrendas = (
    nombrePrenda,
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

    // Filtrar por liquidación
    if (mostrarLiquidacion) {
      filtered = filtered.filter((prenda) => prenda.en_liquidacion);
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

  return (
    <>
      <Row className="prendas-container">
        {filteredPrendas.length > 0 ? (
          filteredPrendas.map((prenda) => (
            <Col key={prenda.id_prenda} md={3} sm={6} xs={12} className="mb-4">
              <Card className="card-wrapper">
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
                  <p>Tallas disponibles:</p>
                  <Button>{prenda.nom_talla}</Button>
                  {prendas.map((talla, index) => (
                    <Button key={index}>{talla.nom_talla}</Button>
                  ))}
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/detalle/${prenda.id_prenda}`}
                  >
                    Ver más
                  </Button>{" "}
                  <Button
                    variant="success"
                    onClick={() => handleComprar(prenda.id_prenda)}
                  >
                    Comprar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="no-prendas">
            No se encontraron prendas según los filtros aplicados.
          </div>
        )}
      </Row>
      <Button variant="primary" onClick={() => setShowFilter(true)}>
        Filtrar Prendas
      </Button>
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

export default CardsPrenda;