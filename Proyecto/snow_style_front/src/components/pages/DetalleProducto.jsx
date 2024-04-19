import React, { useState } from "react";
import img1 from "../Multimedia/a1.png";
import img2 from "../Multimedia/a2.png";
import img3 from "../Multimedia/a3.png";
import img4 from "../Multimedia/Sueter 3.png";
import s1 from "../Multimedia/s1.png";
import s2 from "../Multimedia/s2.png";

const DetalleProducto = () => {

  return (
    <div style={styles.detalleProductoContainer}>
      <div style={styles.detalleProductoImage}>
        <img
          src={img4}
          alt="Logo de SnowStyle"
          className="logo"
          style={{ ...styles.imagen,}}
          
        />
      </div>
      <div style={styles.detalleProductoContent}>
        <h1 style={styles.titulo}>Jersey cropped punto rib hombro caído</h1>
        <div style={styles.caracteristicasContainer}>
          <p style={styles.caracteristicas}>Ref 2174/376/700</p>
          <div style={styles.imagenesContainer1}>
            <img
              src={s1}
              alt="Imagen 1"
              style={{ ...styles.imagenMiniatura, }}
            />
            <img
              src={s2}
              alt="Imagen 2"
              style={{ ...styles.imagenMiniatura, }}
            />
          </div>
          <p style={styles.caracteristicas}>Precio: $39.95</p>
        </div>
        <h1 style={styles.titulo}>Tallas Disponibles</h1>
        <div style={styles.botonesContainer}>
          <button className="btn btn-outline-dark" style={styles.btnPequeno}>
            S
          </button>
          <button className="btn btn-outline-dark" style={styles.btnPequeno}>
            M
          </button>
          <button className="btn btn-outline-dark" style={styles.btnPequeno}>
            L
          </button>
          <button className="btn btn-outline-dark" style={styles.btnPequeno}>
            XL
          </button>
          <button className="btn btn-outline-dark" style={styles.btnPequeno}>
            XXL
          </button>
        </div>
        <div style={styles.descripcionContainer}>
          <h1 style={styles.titulo}>Descripcion</h1>
          <p style={styles.descripcion}>
            Blusa diseño estampado con detalle fruncido y revuelo en bordes,
            estilo casual. Prenda versátil que puedes combinar con pantalones,
            jeans o short, su estilo romántico denota feminidad y calidez,
            además aporta un look juvenil a tu atuendo. Cuello cuadrado y
            tirantes gruesos.
          </p>

          <p style={styles.descripcion}>
            Medidas de la modelo: Busto: 87cm, cintura: 65cm, cadera: 99cm,
            estatura: 1.68cm. *Utiliza talla S
          </p>
          <p style={styles.descripcion}>
            Cuidados de la prenda: lavar con prendas de colores similares, no
            use blanqueador, cuelgue la prenda para secar.
          </p>
        </div>
        <button className="btn btn-dark" style={styles.btnAgregarCarrito}>
          Agregar al carrito
        </button>
        <div style={styles.imagenesContainer}>
          <img
            src={img2}
            alt="Imagen 1"
            style={{ ...styles.imagenadd, }}
          />
          <img
            src={img3}
            alt="Imagen 2"
            style={{ ...styles.imagenadd,}}
          />
          <img
            src={img1}
            alt="Imagen 3"
            style={{ ...styles.imagenadd,}}
          />
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;

const styles = {
  detalleProductoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "20px",
  },
  detalleProductoImage: {
    width: "50%", // La imagen ocupa el 50% del contenedor
    marginRight: "20px", // Agregamos margen derecho para separar la imagen del contenido
  },
  imagen: {
    width: "100%", // La imagen ocupa todo el ancho del contenedor
    height: "auto",
    transition: "transform 0.3s ease", // Transición suave para el efecto de zoom
  },
  zoomedImage: {
    transform: "scale(1.2)", // Aumentar tamaño al hacer zoom
  },
  detalleProductoContent: {
    width: "80%", // El contenido ocupa el 50% del contenedor
  },
  titulo: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  caracteristicasContainer: {
    marginBottom: "20px",
  },
  caracteristicas: {
    margin: "5px 0",
  },
  descripcionContainer: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center", // Centramos el texto horizontalmente
  },
  descripcion: {
    margin: "0", // Eliminamos el margen inferior
  },
  btnAgregarCarrito: {
    backgroundColor: "#000000",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Agregamos una sombra
  },
  imagenesContainer: {
    display: "flex",
    justifyContent: "space-between", // Espacio uniforme entre las imágenes
    marginTop: "20px", // Margen superior para separar las imágenes del resto del contenido
  },
  imagenesContainer1: {
    display: "flex",
    justifyContent: "left", // Espacio uniforme entre las imágenes
    marginTop: "20px", // Margen superior para separar las imágenes del resto del contenido
  },
  imagenMiniatura: {
    width: "10%", // Ajustamos el ancho de las imágenes miniatura
    height: "auto",
    transition: "transform 0.3s ease", // Transición suave para el efecto de zoom
  },
  imagenadd: {
    width: "30%", // Ajustamos el ancho de las imágenes miniatura
    height: "auto",
    transition: "transform 0.3s ease", // Transición suave para el efecto de zoom
  },
  botonesContainer: {
    display: "flex",
    justifyContent: "Left", // Espacio uniforme entre los botones
    marginTop: "20px", // Margen superior para separar los botones del resto del contenido
  },
  btnPequeno: {
    backgroundColor: "##EFEFEF",
    color: "#000000",
    border: "5px",
    padding: "15px 50px",
    borderRadius: "2px",
    cursor: "pointer",
    fontSize: "14px",
    marginRight: "10px", // Aumentamos el margen entre los botones
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Agregamos una sombra
  },
};
