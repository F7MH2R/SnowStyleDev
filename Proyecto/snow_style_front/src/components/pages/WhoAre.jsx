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
                <h2 className="textoWAU">QUIÉNES SOMOS</h2>
              </header>
              <p className="textoWAU">
                Bienvenido a SnowStyle, tu destino definitivo para la moda en la
                nieve y el frío. Nos enorgullece presentar una selección
                cuidadosamente curada de ropa diseñada para aquellos que aman la
                aventura al aire libre y buscan estilo sin sacrificar
                funcionalidad.
              </p>
              <p className="textoWAU">
                Nuestra pasión por la moda en la nieve se refleja en cada
                aspecto de nuestro negocio. Desde la cuidadosa selección de
                marcas de renombre hasta nuestro compromiso con la calidad y el
                servicio al cliente excepcional, nos esforzamos por brindarte
                una experiencia de compra impecable en cada visita a nuestro
                sitio.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WhoAre;
