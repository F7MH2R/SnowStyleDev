import React from "react";
import "../pages/css/Modal.css"
import { Link } from "react-router-dom";


const TrendingSectionH = () => {
    // Datos de ejemplo para las cards de imágenes
    const trendingItems = [
      { id: 1, imageUrl: "https://img.freepik.com/foto-gratis/hombre-moda-ropa-punto-invierno_158595-4105.jpg?t=st=1713413203~exp=1713416803~hmac=f9d956035804f68be9d8d2cb91295d75e423d688a32005179891cad76b43291b&w=826", title: "Sudaderas" },
      { id: 2, imageUrl: "https://img.freepik.com/foto-gratis/modelo-masculino-jeans-camiseta-blanca-parka-roja-gris-leyendo-algo-hoja-papel-blanco-aislado-blanco_346278-952.jpg?t=st=1713413244~exp=1713416844~hmac=185b295aae4eda57c12cadd6742c1182589ad5b6f5f1bfd59557072544aa6a67&w=1380", title: "Camisas" },
      { id: 3, imageUrl: "https://img.freepik.com/foto-gratis/hombre-moda-ropa-punto-invierno_158595-4105.jpg?t=st=1713413203~exp=1713416803~hmac=f9d956035804f68be9d8d2cb91295d75e423d688a32005179891cad76b43291b&w=826", title: "Pantalones" },
      { id: 4, imageUrl: "https://img.freepik.com/foto-gratis/modelo-masculino-jeans-camiseta-blanca-parka-roja-gris-leyendo-algo-hoja-papel-blanco-aislado-blanco_346278-952.jpg?t=st=1713413244~exp=1713416844~hmac=185b295aae4eda57c12cadd6742c1182589ad5b6f5f1bfd59557072544aa6a67&w=1380", title: "Abrigos" },
    ];

    return (
      <div className="trending-section">
        <h1 className="mujeres-header">HOMBRES</h1>
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

export default TrendingSectionH;

