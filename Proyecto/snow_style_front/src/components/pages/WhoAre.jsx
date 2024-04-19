import React from "react";
import videoBackground from "../Multimedia/videoWhoAreUs.mp4";
import videoConocenos from "../Multimedia/videoWhoAreUs2.mp4";

const WhoAre = () => {
  return (
    <>
      <div>
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
                  Bienvenido a SnowStyle, tu destino definitivo para la moda en
                  la nieve y el frío. Nos enorgullece presentar una selección
                  cuidadosamente curada de ropa diseñada para aquellos que aman
                  la aventura al aire libre y buscan estilo sin sacrificar
                  funcionalidad.
                </p>
                <p className="textoWAU">
                  Nuestra pasión por la moda en la nieve se refleja en cada
                  aspecto de nuestro negocio. Desde la cuidadosa selección de
                  marcas de renombre hasta nuestro compromiso con la calidad y
                  el servicio al cliente excepcional, nos esforzamos por
                  brindarte una experiencia de compra impecable en cada visita a
                  nuestro sitio.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <video
          autoPlay
          muted
          loop
          className="background-video"
          style={{
            position: "absolute",
            top: 1,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={videoConocenos} type="video/mp4" />
          Tu navegador no admite el elemento de video.
        </video>
        <div
          className="container2"
          style={{ position: "relative", zIndex: "1" }}
        >
          <div className="text-content-conocenos">
            <header>
              <h2 className="conocenos-title">CONÓCENOS</h2>
            </header>
            <address>
              <h5>Calle Brasilia, Avenida favela 3, Santa Elena 2</h5>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.9679182863996!2d-89.5561119123206!3d13.989131327893555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f62e99d55002015%3A0x5a6cf0f7b8b1cda5!2sEl%20Salvador!5e0!3m2!1spt-BR!2ssv!4v1713502672027!5m2!1spt-BR!2ssv"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <h5>Teléfono: 2442-9089</h5>
              <h5>Correo electrónico: informacion@snowstyle.com</h5>
            </address>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhoAre;
