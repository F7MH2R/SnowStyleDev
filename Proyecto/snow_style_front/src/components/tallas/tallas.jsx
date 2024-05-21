import React, { useEffect, useState } from "react";
import { ejecutarGet } from "../compartidos/request";
import { Button, Col, Row } from "react-bootstrap";
import "./Tallas.css";

export const Tallas = ({ idPrenda }) => {
  const [tallasDisponibles, setTallasDisponibles] = useState([]);
  useEffect(() => {
    ejecutarGet(`/api/prendas/${idPrenda}/tallas`)
      .then((response) => {
        const tallasDB = response.data?.tallasDisponibles;
        console.log("DAtos de las tallas: ", tallasDB);
        setTallasDisponibles(tallasDB);
      })
      .catch((error) => console.log("Error al obtener las tallas: ", error));
  }, [idPrenda]);

  return (
    <>
      {tallasDisponibles.length > 0 ? (
        <Row className="p-2">
          {tallasDisponibles.map((talla) => (
            <Col>
              <Button className="boton-talla">{talla.talla}</Button>
            </Col>
          ))}
        </Row>
      ) : (
        <div>No existen tallas disponibles</div>
      )}
    </>
  );
};
