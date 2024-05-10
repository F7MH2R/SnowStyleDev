import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Card, Carousel, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../pages/css/Modal.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CardsPrenda = () => {
  const { tipoPrendaId, departamento } = useParams();
  const [prendas, setPrendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrendas = async () => {
      try {
        const response = await axios.get(
          `/api/prendas/tipo/${tipoPrendaId}/${departamento}`
        );
        setPrendas(response.data);
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

  if (loading) {
    return <div>Cargando prendas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Row className="prendas-container">
      {prendas.length > 0 ? (
        prendas.map((prenda) => (
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
              </Carousel>
              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/detalle/${prenda.id_prenda}`}
                    className="card-link"
                  >
                    {prenda.nombre_prenda}
                  </Link>
                </Card.Title>
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
          No se encontraron prendas de este tipo.
        </div>
      )}
    </Row>
  );
};

CardsPrenda.propTypes = {
  tipoPrendaId: PropTypes.string,
};

export default CardsPrenda;
