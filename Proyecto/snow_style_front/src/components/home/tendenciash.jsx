import React from "react";
import "../pages/css/Modal.css";
import { Link } from "react-router-dom";
const TrendingSectionH = () => {
  const trendingItems = [
    {
      id: 1,
      imageUrl: "https://i.ibb.co/dWjJ7Zz/hombres-imagen1.jpg",
      title: "Sudaderas",
      departamento: 1,
    },
    {
      id: 2,
      imageUrl: "https://i.ibb.co/VVdjZnk/hombres-imagen2.webp",
      title: "Camisas",
      departamento: 1,
    },
    {
      id: 3,
      imageUrl: "https://i.ibb.co/vZktKXh/hombres-imagen3.webp",
      title: "Pantalones",
      departamento: 1,
    },
    {
      id: 4,
      imageUrl: "https://i.ibb.co/2SNvfJX/hombres-imagen4.jpg",
      title: "Abrigos",
      departamento: 1,
    },
  ];

  return (
    <div
      className="trending-section"
      style={{ fontFamily: "Prompt, sans-serif" }}
    >
      <h1 className="seccion-ropa-header">CABALLERO</h1>
      <h3 className="trending-header">------- TENDENCIAS -------</h3>
      <div className="card-container">
        {trendingItems.map((item) => (
          <div key={item.id} className="card-wrapper">
            <Link
              to={`/prendas/${item.id}/${item.departamento}`}
              className="card bg-dark text-white"
            >
              {" "}
              {/* Cambiado para dirigir a CardsPrenda */}
              <img
                src={item.imageUrl}
                alt={`Producto ${item.id}`}
                className="card-img"
              />
            </Link>
            <div className="title-container">
              <h4>{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="see-all-container">
        <Link to="/todos-los-productos" className="see-all-link">
          Todos los Productos
        </Link>
      </div>
    </div>
  );
};

export default TrendingSectionH;
