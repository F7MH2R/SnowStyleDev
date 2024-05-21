import React from "react";
import "../pages/css/Modal.css";
import { Link } from "react-router-dom";
import googleFontsURL from "../Fuentes/FuenteLetras";

const TrendingSectionN = () => {
  // Datos de ejemplo para las cards de imágenes
  const trendingItems = [
    {
      id: 1,
      imageUrl: "https://i.ibb.co/6RddvmQ/ni-os-imagen1.jpg",
      title: "Sudaderas",
      departamento: 3,
    },
    {
      id: 2,
      imageUrl: "https://i.ibb.co/p2RYTQS/ni-os-imagen2.webp",
      title: "Camisas",
      departamento: 3,
    },
    {
      id: 3,
      imageUrl: "https://i.ibb.co/hgpP7cG/ni-os-imagen3.jpg",
      title: "Pantalones",
      departamento: 3,
    },
    {
      id: 4,
      imageUrl: "https://i.ibb.co/cTHRvHZ/ni-os-imagen4.jpg",
      title: "Abrigos",
      departamento: 3,
    },
  ];

  return (
    <div
      className="trending-section"
      style={{ fontFamily: "Prompt, sans-serif" }}
      id="ninios"
    >
      <link rel="stylesheet" href={googleFontsURL} />
      <h1 className="seccion-ropa-header">NIÑOS</h1>
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
          to="/todos-los-productos"
          className="see-all"
          style={{ textDecoration: "none" }}
        >
          <h3 style={{ color: "black" }}>Todos los Productos</h3>
        </Link>
      </div>
    </div>
  );
};

export default TrendingSectionN;
