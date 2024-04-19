import React from "react";
import "../pages/css/Modal.css"
import { Link } from "react-router-dom";


const TrendingSectionN = () => {
  // Datos de ejemplo para las cards de imágenes
  const trendingItems = [
    { id: 1, imageUrl: "https://img.freepik.com/foto-gratis/mujer-adolescente-camisa-cuadros-gorro-gesticulando-aislado_176474-97232.jpg?t=st=1713496228~exp=1713499828~hmac=1ebac0229eaf65ca3390aaa5a8445406f79345d1be48db459230df921a785a92&w=1380", title: "Sudaderas" },
    { id: 2, imageUrl: "https://img.freepik.com/foto-gratis/chica-manos-cruzadas-pecho-mirando-izquierda_23-2148333190.jpg?t=st=1713496368~exp=1713499968~hmac=cc9026b3d774516c28fdcf7f3678b6faae62483f32650f0e241c4f1bfdbffa6a&w=1380", title: "Camisas" },
    { id: 3, imageUrl: "https://img.freepik.com/foto-gratis/mujer-adolescente-camisa-cuadros-gorro-gesticulando-aislado_176474-97232.jpg?t=st=1713496228~exp=1713499828~hmac=1ebac0229eaf65ca3390aaa5a8445406f79345d1be48db459230df921a785a92&w=1380", title: "Pantalones" },
    { id: 4, imageUrl: "https://img.freepik.com/foto-gratis/chica-manos-cruzadas-pecho-mirando-izquierda_23-2148333190.jpg?t=st=1713496368~exp=1713499968~hmac=cc9026b3d774516c28fdcf7f3678b6faae62483f32650f0e241c4f1bfdbffa6a&w=1380", title: "Abrigos" },
  ];

  return (
    <div className="trending-section">
      <h1 className="mujeres-header">NIÑOS</h1>
      <h2 className="trending-header">TENDENCIAS</h2>
      <div className="card-container">
        {trendingItems.map((item) => (
          <div key={item.id} className="card-wrapper">
            <Link to={`/detalle/${item.id}`} className="card bg-dark text-white">
              <img src={item.imageUrl} alt={`Producto ${item.id}`} className="card-img" />
            </Link>
            <div className="title-container">
              <h4>{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="see-all-container">
        <Link to="/todos-los-productos" className="see-all" style={{ textDecoration: 'none' }}>
          <h3 style={{ color: 'black' }}>Todos los Productos</h3>
        </Link>
      </div>
    </div>
  );
};

export default TrendingSectionN;