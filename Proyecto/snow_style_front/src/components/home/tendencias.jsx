import React from "react";
import "../pages/css/Modal.css"
import { Link } from "react-router-dom";


const TrendingSection = () => {
  // Datos de ejemplo para las cards de imágenes
  const trendingItems = [
    { id: 1, imageUrl: "https://img.freepik.com/foto-gratis/retrato-joven-modelo-elegante-riendo-ropa-casual-verano-negro-gorra-maquillaje-natural-gris_158538-11815.jpg?t=st=1713413481~exp=1713417081~hmac=967c5124afada81f6c9a149df9861d224ea7474daac4b4b69960ff2b020d9180&w=900" },
    { id: 2, imageUrl: "https://img.freepik.com/foto-gratis/jovencita-expresiva-posando-estudio_176474-76298.jpg?t=st=1713413498~exp=1713417098~hmac=83cf06f80b1ffc409291210313e87840e77ff38eaeb29a8057a64f26405eef3f&w=1380" },
    { id: 3, imageUrl: "https://img.freepik.com/foto-gratis/retrato-joven-modelo-elegante-riendo-ropa-casual-verano-negro-gorra-maquillaje-natural-gris_158538-11815.jpg?t=st=1713413481~exp=1713417081~hmac=967c5124afada81f6c9a149df9861d224ea7474daac4b4b69960ff2b020d9180&w=900" },
    { id: 4, imageUrl: "https://img.freepik.com/foto-gratis/jovencita-expresiva-posando-estudio_176474-76298.jpg?t=st=1713413498~exp=1713417098~hmac=83cf06f80b1ffc409291210313e87840e77ff38eaeb29a8057a64f26405eef3f&w=1380" },
  ];

  return (
    <div className="trending-section">
      <h1 className="mujeres-header">MUJERES</h1>
      <h2 className="trending-header">TENDENCIAS</h2>
      <div className="card-container">
        {trendingItems.map((item) => (
          <Link key={item.id} to={`/detalle/${item.id}`} className="card bg-dark text-white">
            <img src={item.imageUrl} alt={`Producto ${item.id}`} className="card-img" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;