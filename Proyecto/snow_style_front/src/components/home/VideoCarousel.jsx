import React from "react";
import { Carousel } from "react-bootstrap";
import "../pages/css/Modal.css"

const VideoCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item className="carousel-item">
        {/* Contenido del primer slide */}
        <img
          src="https://img.freepik.com/foto-gratis/frustrado-conmocionado-palabras-atonita-mujer-rubia-acusada-abrir-ojos-sorprendido-interrogado-mirar-camara_1258-139544.jpg?w=1380&t=st=1713402834~exp=1713403434~hmac=5f6a28ce8dac6b78bdccc24ca73c3e79b7b3aa40d854c04920b9c4790c6118d3"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        {/* Contenido del segundo slide */}
        <img
          src="https://img.freepik.com/foto-gratis/moda-joven-vistiendo-abrigo-rojo-sombrero-negro-jeans-raidos-levantando-manos-aire_273609-9062.jpg?t=st=1713402934~exp=1713406534~hmac=6e1eb30281e86bd867ae620a0e48e60a971b96d5ae3d9864e39db2bd43e2c889&w=1380"
          alt="Second slide"
        />
      </Carousel.Item>
      {/* Agrega más Carousel.Items según sea necesario */}
    </Carousel>
  );
};

export default VideoCarousel;


