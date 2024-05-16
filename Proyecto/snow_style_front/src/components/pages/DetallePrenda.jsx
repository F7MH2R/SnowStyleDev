import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Button, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import withLoader from "../Load/withLoader ";
const DetallePrenda = () => {
  const { id_prenda } = useParams(); // Obtener el ID de la prenda de la URL
  const [prenda, setPrenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrenda = async () => {
      try {
        const response = await axios.get(`/api/prendas/${id_prenda}`); // Llamada a la API
        setPrenda(response.data); // Establecer la prenda obtenida
        setLoading(false);
      } catch (err) {
        setError("No se pudieron obtener los detalles de la prenda.");
        setLoading(false);
      }
    };

    fetchPrenda();
  }, [id_prenda]); // Ejecutar el efecto cuando cambia el ID de la prenda

  if (loading) {
    return <div>Cargando detalles de la prenda...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {prenda ? (
        <Card>
          <Card.Header>{prenda.nombre_prenda}</Card.Header>
          <Card.Body>
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
            <Card.Text>
              {prenda.descripcion} {/* Descripción de la prenda */}
            </Card.Text>
            <Button variant="primary">Agregar al carrito</Button>{" "}
            {/* Botón para agregar al carrito */}
          </Card.Body>
        </Card>
      ) : (
        <div>Prenda no encontrada.</div>
      )}
    </div>
  );
};

export default withLoader(DetallePrenda);
