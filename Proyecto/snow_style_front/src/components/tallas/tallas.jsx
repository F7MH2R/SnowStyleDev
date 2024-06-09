import React, { useEffect, useState } from "react";
import { ejecutarGet, ejecutarPost } from "../compartidos/request";
import { Button, Col, Row, ToastContainer } from "react-bootstrap";
import "./Tallas.css";

export const Tallas = ({ idPrenda }) => {
  const [tallasDisponibles, setTallasDisponibles] = useState([]);
  useEffect(() => {
    ejecutarGet(`/api/prendas/${idPrenda}/tallas`)
      .then((response) => {
        const tallasDB = response.data?.tallasDisponibles;
        console.log("Datos de las tallas: ", tallasDB);
        setTallasDisponibles(tallasDB);
      })
      .catch((error) => console.log("Error al obtener las tallas: ", error));
  }, [idPrenda]);

  const handleComprar = (prendaId, tallaId) => {
    const idUsuario = localStorage.getItem("UserId");

    agregarAlCarrito(prendaId, idUsuario);

    async function agregarAlCarrito(prendaId, idUsuario) {
      await ejecutarPost(`/api/carrito/items/add`, {
        idPrenda: prendaId,
        idUsuario: idUsuario,
        idTalla: tallaId,
      });

      window.location.reload();
    }
  };

  return (
    <>
      {tallasDisponibles.length > 0 ? (
        <Row className="p-2">
          {tallasDisponibles.map((talla) => (
            <Col key={talla.id_talla}>
              <Button
                className="boton-talla"
                onClick={() => handleComprar(idPrenda, talla.id_talla)}
                key={talla.id_talla}
              >
                {talla.talla}
              </Button>
            </Col>
          ))}
        </Row>
      ) : (
        <div>No existen tallas disponibles</div>
      )}
      <ToastContainer />
    </>
  );
};
