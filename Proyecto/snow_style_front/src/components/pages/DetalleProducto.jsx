import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import googleFontsURL from "../Fuentes/FuenteLetras";
import { Button, Table } from "react-bootstrap";
import withLoader from "../Load/withLoader ";
import { ejecutarPost } from "../compartidos/request";
import { Tallas } from "../tallas/tallas";
const DetalleProducto = () => {
  const { id_prenda } = useParams(); // Obtener el ID de la prenda de la URL
  const [prenda, setPrenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrenda = async () => {
      try {
        const response = await axios.get(`/api/prendas/${id_prenda}`); // Llamada a la API
        setPrenda(response.data); // Establecer la prenda obtenida
        setLoading(false);
      } catch (err) {
        setError("No se pudieron obtener los detalles de la prenda.");
        setLoading(false);
      }
    };

    fetchPrenda();
  }, [id_prenda]); // Ejecutar el efecto cuando cambia el ID de la prenda

  if (loading) {
    return <div>Cargando detalles de la prenda...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleComprar = (prendaId) => {
    const idUsuario = localStorage.getItem("UserId");

    agregarAlCarrito(prendaId, idUsuario);

    async function agregarAlCarrito(prendaId, idUsuario) {
      await ejecutarPost(`/api/carrito/items/add`, {
        idPrenda: prendaId,
        idUsuario: idUsuario,
      });
      window.location.reload();
    }
  };

  return (
    <div style={{ fontFamily: "Prompt, sans-serif" }}>
      <div style={styles.detalleProductoContainer}>
        <link rel="stylesheet" href={googleFontsURL} />
        <div style={styles.detalleProductoImage}>
          <img
            src={prenda.imagen4}
            alt="Logo de SnowStyle"
            className="logo"
            style={{ ...styles.imagen }}
          />
        </div>
        <div style={styles.detalleProductoContent}>
          <h1 style={styles.titulo}>{prenda.nombre_prenda}</h1>
          <div style={styles.caracteristicasContainer}>
            <p style={styles.caracteristicas}>Ref 2174/376/700</p>
            <div style={styles.imagenesContainer1}>
              <img
                src={prenda.imagen1}
                alt="Imagen 1"
                style={{ ...styles.imagenMiniatura }}
              />
              <img
                src={prenda.imagen2}
                alt="Imagen 2"
                style={{ ...styles.imagenMiniatura }}
              />
            </div>
            <p style={styles.caracteristicas}>
              Precio: ${prenda.precio_unitario}
            </p>
          </div>
          <h1 style={styles.titulo}>Tallas Disponibles</h1>
          <div style={styles.botonesContainer}>
            <Tallas idPrenda={id_prenda} />
          </div>
          <div style={styles.descripcionContainer}>
            <h1 style={styles.titulo}>Descripcion</h1>
            <p style={styles.descripcion}>{prenda.descripcion}</p>
          </div>
          <Table striped bordered hover responsive="md" style={styles.table}>
            <thead>
              <tr>
                <th>Información</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Exportado</td>
                <td>{prenda.material1}</td>
              </tr>
              <tr>
                <td>Fabricado</td>
                <td>{prenda.material2}</td>
              </tr>
              <tr>
                <td>Material</td>
                <td>{prenda.material3}</td>
              </tr>
              <tr>
                <td>Medida</td>
                <td>{prenda.material4} metros</td>
              </tr>
              <tr>
                <td>Marca</td>
                <td>{prenda.material5}</td>
              </tr>
            </tbody>
          </Table>
          <Button
            className="btn btn-dark"
            style={styles.btnAgregarCarrito}
            onClick={() => handleComprar(id_prenda)}
          >
            Agregar al carrito
          </Button>
          <div style={styles.imagenesContainer}>
            <img
              src={prenda.imagen1}
              alt="Imagen 1"
              style={{ ...styles.imagenadd }}
            />
            <img
              src={prenda.imagen2}
              alt="Imagen 2"
              style={{ ...styles.imagenadd }}
            />
            <img
              src={prenda.imagen3}
              alt="Imagen 3"
              style={{ ...styles.imagenadd }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLoader(DetalleProducto);

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
  table: {
    marginTop: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    overflowX: "auto",
  },
};
