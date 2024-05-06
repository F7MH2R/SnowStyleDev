import React from "react";
import { Carousel } from "react-bootstrap";
import "../pages/css/Modal.css"

const VideoCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item className="carousel-item">
        {/* Contenido del segundo slide */}
        <img src="https://i.ibb.co/VNdb8qm/carrusel-imagen4.jpg" alt="Fourth Slide"></img>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        {/* Contenido del segundo slide */}
        <img src="https://i.ibb.co/vPg6jRB/carrusel-imagen3.jpg" alt="Third Slide"></img>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        {/* Contenido del segundo slide */}
        <img src="https://i.ibb.co/vJM1qM9/carrusel-imagen2.jpg" alt="Second Slide"></img>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        {/* Contenido del primer slide */}
        <img src="https://i.ibb.co/dpL04B5/carrusel-imagen1.jpg" alt="First Slide"></img>
      </Carousel.Item>
    </Carousel>
  );
};

export default VideoCarousel;


