import React from "react";
import { Card } from "react-bootstrap";
import "./Menu.css";

const Menu = () => {
  const menuItems = [
    { to: "/register", label: "Registrar", imageSrc: "https://i.ibb.co/6H8nkCF/Registrarse.png" },
    { to: "/tallas", label: "Tallas", imageSrc: "https://i.ibb.co/qFwsd4n/Talla.png" },
    { to: "/marcaTable", label: "Marca", imageSrc: "https://i.ibb.co/RcSzjc6/Marca.png" },
    { to: "/estadisticas", label: "Estadísticas", imageSrc: "https://i.ibb.co/J5hHJ2G/Estad-stica.png" },
    { to: "/tableproveedor", label: "Proveedores", imageSrc: "https://i.ibb.co/L07fRyg/Proveedor.png" },
    { to: "/tablePrenda", label: "Prendas", imageSrc: "https://i.ibb.co/VYPJWhV/Prenda.png" }, 
    { to: "/depaTable", label: "Departamentos", imageSrc: "https://i.ibb.co/MCctb75/Departamento.png" },
    { to: "/FormPrenda", label: "Agregar Prenda", imageSrc: "https://i.ibb.co/pdG7vjN/Agregar-prenda.png" },
  ];

  return (
    <div className="menu-container">
      {menuItems.map((item, index) => (
        <MenuItemWithHref key={index} {...item} />
      ))}
    </div>
  );
};

const MenuItemWithHref = ({ to, icon, label, imageSrc }) => (
  <div className="menu-item-container">
    <Card className="menu-item">
      <Card.Img variant="top" src={imageSrc} className="menu-item-image" />
      <Card.Body>
        <Card.Title>{label}</Card.Title>
        <Card.Text>
          <span className="menu-icon">{icon}</span>
        </Card.Text>
        <a href={to} className="stretched-link"></a>
      </Card.Body>
    </Card>
  </div>
);

export default Menu;
