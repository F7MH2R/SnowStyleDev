import React, { useState } from "react";
import { Button, Form, Alert, Modal, Table } from "react-bootstrap";
import googleFontsURL from "../Fuentes/FuenteLetras";
import imagen from "../Multimedia/blusaCarrito.jpg";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import "./css/Modal.css";

const Pago = ({ total, items, nombre, correo }) => {
  items = [
    {
      imagen: imagen,
      descripcion: "Jersey cropped",
      precio: 10.25,
      id: 1,
    },
    {
      imagen: imagen,
      descripcion: "Jersey cropped",
      precio: 10.25,
      id: 2,
    },
  ];
  const [loading, setLoading] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [nombreTarjeta, setNombreTarjeta] = useState(nombre);
  const [correoElectronico, setCorreoElectronico] = useState(correo);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Simulación de proceso de pago ficticio
    setTimeout(() => {
      setLoading(false);
      setPagoExitoso(true);
    }, 2000); // Simulación de un proceso de pago de 2 segundos
  };

  const handleVerFactura = () => {
    setMostrarFactura(true);
  };

  const handleCloseFactura = () => {
    setMostrarFactura(false);
  };

  const handleDescargarFactura = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      //contenido de la factura
      const facturaTexto = generateFacturaTexto(
        items,
        total,
        nombreTarjeta,
        correoElectronico
      );

      const { width, height } = page.getSize();
      const fontSize = 12;
      const textX = 50; // Posición X del texto
      let textY = height - 50; // Posición Y inicial del texto
      const textLines = facturaTexto.split("\n");

      page.drawText("Factura SnowStyle", {
        x: width / 2 - 50, // centrar el texto horizontalmente
        y: textY,
        size: 20,
        color: rgb(0, 0, 0), // color negro
      });
      textY -= 30; // espacio después del título

      // editar el texto
      for (const line of textLines) {
        page.drawText(line, {
          x: textX,
          y: textY,
          size: fontSize,
          color: rgb(0, 0, 0), // color negro
        });
        textY -= 20; // espacio entre líneas
      }

      // generar el archivo PDF
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      // crear un enlace de descarga para el PDF
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = "SnowStyleFactura.pdf";

      downloadLink.click();
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  const generateFacturaTexto = (items, total, nombre, correo) => {
    let facturaTexto = `Factura\n\nCliente: ${nombre}\nCorreo: ${correo}\n\nProductos:\n`;
    items.forEach((item) => {
      facturaTexto += `${item.nombre} - Cantidad: ${item.cantidad} - Precio unitario: ${item.precio}\n`;
    });
    facturaTexto += `\nTotal: ${total}`; // Corregido para agregar el total al texto de la factura
    return facturaTexto;
  };

  return (
    <>
      <link rel="stylesheet" href={googleFontsURL} />
      <div
        className="container-primero"
        style={{ fontFamily: "Prompt, sans-serif" }}
      >
        <div className="container payment-container">
          {pagoExitoso && (
            <div className="text-center">
              <h2 className="text-center mb-4">Pago en línea</h2>
              <Alert variant="success" className="custom-alert">
                ¡Pago exitoso! Se ha procesado el pago correctamente.
              </Alert>
              <Button variant="secondary" onClick={handleVerFactura}>
                Ver factura
              </Button>
            </div>
          )}

          {!pagoExitoso && (
            <Form
              onSubmit={handleSubmit}
              className="mx-auto custom-payment-form"
            >
              <Form.Group
                controlId="formNombreTarjeta"
                className="custom-form-group"
              >
                <h2 className="text-center mb-4">Pago en línea</h2>
                <h5 className="text-center mb-4">Datos Personales:</h5>
                <Form.Label className="label">Nombre en la tarjeta</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreTarjeta"
                  defaultValue={nombre}
                  placeholder="Ingrese su nombre"
                  required
                />
              </Form.Group>
              <Form.Group
                controlId="formCorreoElectronico"
                className="custom-form-group"
              >
                <Form.Label className="label">Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correoElectronico"
                  defaultValue={correo}
                  placeholder="Ingrese su correo electrónico"
                  required
                />
              </Form.Group>
              <Form.Group
                controlId="formCodigoPostal"
                className="custom-form-group"
              >
                <Form.Label className="label">Código postal</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  placeholder="Ingrese su código postal"
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="w-100 mt-3 custom-button"
              >
                {loading ? "Procesando..." : "Pagar ahora"}
              </Button>
            </Form>
          )}

          <Modal show={mostrarFactura} onHide={handleCloseFactura}>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontFamily: "Prompt, sans-serif" }}>
                Factura
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table
                striped
                bordered
                hover
                style={{ fontFamily: "Prompt, sans-serif" }}
              >
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>${item.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <p
                className="fw-bold"
                style={{ fontFamily: "Prompt, sans-serif" }}
              >
                Total: ${total}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleDescargarFactura}
                style={{ fontFamily: "Prompt, sans-serif" }}
              >
                Descargar Factura
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Pago;
