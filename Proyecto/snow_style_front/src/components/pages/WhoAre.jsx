import React from "react";
import videoBackground from "../Multimedia/videoWhoAreUs.mp4";

const WhoAre = () => {
  return (
    <>
      <video autoPlay muted loop className="background-video">
          <source src={videoBackground} type="video/mp4" />
          Tu navegador no admite el elemento de video.
        </video>
        <div className="container">
      <section className="content">
        <div className="text-overlay">
          <div className="text-content">
            <header>
              <h2>QUIÉNES SOMOS</h2>
            </header>
            <p className="textoWAU">
              Somos una empresa dedicada a ofrecer soluciones innovadoras en el
              mundo del desarrollo web y móvil. Nuestro equipo está compuesto por
              expertos en diferentes áreas que trabajan juntos para ofrecer
              productos de alta calidad y satisfacer las necesidades de nuestros
              clientes.
            </p>
            <p>
              Nos enorgullece ofrecer un enfoque personalizado y centrado en el
              cliente en todos nuestros proyectos. Creemos en la transparencia, la
              comunicación abierta y la colaboración, y nos esforzamos por superar
              las expectativas en todo lo que hacemos.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
    
  );
};

export default WhoAre;
