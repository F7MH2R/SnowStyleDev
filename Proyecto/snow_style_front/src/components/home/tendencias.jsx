import React from "react";
import "../pages/css/Modal.css";
import { Link } from "react-router-dom";
import googleFontsURL from "../Fuentes/FuenteLetras";

const TrendingSection = () => {
  // Datos de ejemplo para las cards de imágenes
  const trendingItems = [
    {
      id: 1,
      imageUrl: "https://i.ibb.co/WVzLKMc/mujeres-imagen1.webp",
      title: "Sudaderas",
      departamento: 2,
    },
    {
      id: 2,
      imageUrl: "https://i.ibb.co/HHbn4m4/mujeres-imagen2.webp",
      title: "Camisas",
      departamento: 2,
    },
    {
      id: 3,
      imageUrl: "https://i.ibb.co/FgQFcjs/mujeres-imagen3.jpg",
      title: "Pantalones",
      departamento: 2,
    },
    {
      id: 4,
      imageUrl: "https://i.ibb.co/whDJFRV/mujeres-imagen4.webp",
      title: "Abrigos",
      departamento: 2,
    },
  ];

  return (
    <div
      className="trending-section"
      style={{ fontFamily: "Prompt, sans-serif" }}
    >
      <link rel="stylesheet" href={googleFontsURL} />
      <h1 className="seccion-ropa-header" id="dama">
        DAMA
      </h1>
      <h3 className="trending-header">------- TENDENCIAS -------</h3>
      <div className="card-container">
        {trendingItems.map((item) => (
          <div key={item.id} className="card-wrapper">
            <Link
              to={`/prendas/${item.id}/${item.departamento}`}
              className="card bg-dark text-white"
            >
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
        <Link
          to="/DETALLEPRODUCTO"
          className="see-all"
          style={{ textDecoration: "none" }}
        >
          <h3 style={{ color: "black" }}>Todos los Productos</h3>
        </Link>
      </div>
    </div>
  );
};

export default TrendingSection;
