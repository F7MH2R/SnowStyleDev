import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import img1 from "../Multimedia/a1.png";
import img2 from "../Multimedia/a2.png";
import img3 from "../Multimedia/a3.png";
import img4 from "../Multimedia/Sueter 3.png";
import s1 from "../Multimedia/s1.png";
import s2 from "../Multimedia/s2.png";

const MujerDepartamento = () => {
  // Array de productos
  const productos = [
    { id: 1, nombre: "Producto 1", precio: 10, imagen: img1 },
    { id: 2, nombre: "Producto 2", precio: 20, imagen: img1 },
    { id: 3, nombre: "Producto 3", precio: 39.95, imagen: img1 },
    { id: 4, nombre: "Producto 4", precio: 45.99, imagen: img1 },
    { id: 5, nombre: "Producto 5", precio: 29.95, imagen: img4 },
    { id: 6, nombre: "Producto 6", precio: 30, imagen: img4 },
    { id: 7, nombre: "Producto 5", precio: 29.99, imagen: img4 },
    { id: 8, nombre: "Producto 6", precio: 45.80, imagen: img4 },
  ];

  return (
    <Container fluid>
      <Row>
        {/* Iterar sobre los productos y crear una tarjeta para cada uno */}
        {productos.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
            <Card style={styles.card}>
              {/* Envuelve la imagen en Link y establece el to a la página deseada */}
              <Link to={`/DETALLEPRODUCTO`}>
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} style={styles.imagen} />
              </Link>
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>Precio: ${producto.precio}</Card.Text>
                {/* Otros detalles del producto si es necesario */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MujerDepartamento;

const styles = {
  card: {
    marginBottom: "20px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  imagen: {
    objectFit: "cover",
    borderRadius: "10px 10px 0 0",
    height: "700px", // Altura fija para todas las imágenes
  },
};
