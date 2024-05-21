import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  MdPerson,
  MdFormatListNumbered,
  MdStore,
  MdEqualizer,
  MdLocalShipping,
  MdShoppingCart,
  MdAssignment,
  MdLibraryBooks,
} from "react-icons/md";

const Menu = () => {
  return (
    <div className="container">
      <Row className="justify-content-center">
        <MenuItemWithHref
          to="/register"
          icon={<MdPerson />}
          label="Register"
          imageSrc="image1.jpg"
        />
        <MenuItemWithHref
          to="/tallas"
          icon={<MdFormatListNumbered />}
          label="Tallas"
          imageSrc="image2.jpg"
        />
        <MenuItemWithHref
          to="/marcaTable"
          icon={<MdStore />}
          label="Marca"
          imageSrc="image3.jpg"
        />
      </Row>
      <Row className="justify-content-center">
        <MenuItemWithHref
          to="/estadisticas"
          icon={<MdEqualizer />}
          label="Estadísticas"
          imageSrc="image4.jpg"
        />
        <MenuItemWithHref
          to="/tableproveedor"
          icon={<MdLocalShipping />}
          label="Proveedores"
          imageSrc="image5.jpg"
        />
        <MenuItemWithHref
          to="/tablePrenda"
          icon={<MdShoppingCart />}
          label="Prendas"
          imageSrc="image6.jpg"
        />
      </Row>
      <Row className="justify-content-center">
        <MenuItemWithHref
          to="/depaTable"
          icon={<MdAssignment />}
          label="Departamentos"
          imageSrc="image7.jpg"
        />
        <MenuItemWithHref
          to="/FormPrenda"
          icon={<MdLibraryBooks />}
          label="Agregar Prenda"
          imageSrc="image8.jpg"
        />
      </Row>
    </div>
  );
};

const MenuItemWithHref = ({ to, icon, label, imageSrc }) => (
  <Col xs={12} sm={6} md={4} lg={4}>
    <Card className="menu-item">
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{label}</Card.Title>
        <Card.Text>
          <span className="menu-icon">{icon}</span>
        </Card.Text>
        <a href={to} className="stretched-link"></a>
      </Card.Body>
    </Card>
  </Col>
);

export default Menu;
