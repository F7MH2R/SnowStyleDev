import React, { useEffect, useState } from "react";
import { Button, Form, Alert, Modal, Table } from "react-bootstrap";
import googleFontsURL from "../Fuentes/FuenteLetras";
import { PDFDocument, rgb } from "pdf-lib";
import "./css/Modal.css";
import { ejecutarGet, ejecutarPatch } from "../compartidos/request";

const Pago = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [mostrarFactura, setMostrarFactura] = useState(false);
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Simulación de proceso de pago ficticio
    setTimeout(() => {
      setLoading(false);
      validarInventario(items)
        .then((resultado) => {
          console.log("Valor retornado: ", resultado);
          if (resultado) {
            setPagoExitoso(true);
            descontarInventario(items).then(() => {
              console.log("Inventario actualizado");
              actualizarCarrito();
            });
          } else {
            window.alert(
              "Lo sentimos, pero no hay suficiente inventario para esta compra."
            );
          }
        })
        .catch((error) => console.log("Ha ocurrido un error: ", error));
    }, 2000); // Simulación de un proceso de pago de 2 segundos
  };

  async function actualizarCarrito() {
    if (localStorage.getItem("UserId")) {
      const idUsuario = localStorage.getItem("UserId");
      await ejecutarPatch("/api/carrito/update", {
        idUsuario: idUsuario,
      });
    }
  }

  async function validarInventario(items) {
    try {
      // Usamos Promise.all para ejecutar todas las consultas a la API simultáneamente
      const consultas = items.map(async (item) => {
        const prenda = await ejecutarGet(
          `/api/prendas/${item.id}/tallas/${item.idtalla}/cantidad`
        ).then((response) => response.data);
        if (prenda.cantidad < item.cantidad) {
          return false; // Si no hay suficiente cantidad, devolvemos false
        }
        return true;
      });

      // Esperamos a que todas las consultas se completen
      const resultados = await Promise.all(consultas);

      // Verificamos si algún resultado es false
      if (resultados.includes(false)) {
        return false; // Si hay al menos un resultado false, retornamos false
      }

      return true; // Si todas las consultas pasaron, retornamos true
    } catch (error) {
      console.error("Error al validar inventario:", error);
      throw error; // Rechazamos la promesa si hay un error
    }
  }

  async function descontarInventario(items) {
    const consultas = items.map(async (item) => {
      console.log("prenda___: ", item);
      const prenda = await ejecutarPatch(`/api/prendas/update`, {
        idPrenda: item.id,
        cantidad: item.cantidad,
        idTalla: item.idtalla,
      }).then((prenda) => prenda);
      if (prenda.cantidad <= item.cantidad) {
        return false; // Si no hay suficiente cantidad, devolvemos false
      }
      return true;
    });

    // Esperamos a que todas las consultas se completen
    const resultados = await Promise.all(consultas);
  }

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

  const generateFacturaTexto = (total, nombre, correo) => {
    let facturaTexto = `Factura\n\nCliente: ${nombre}\nCorreo: ${correo}\n\nProductos:\n`;
    items.forEach((item) => {
      facturaTexto += `${item.descripcion} - Cantidad: ${
        item.cantidad
      } - Precio unitario: ${item.precio.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}\n`;
    });
    facturaTexto += `\nTotal: ${total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })}`; // Corregido para agregar el total al texto de la factura
    return facturaTexto;
  };

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const idUsuario = localStorage.getItem("UserId");
    const itemsCarrito = await ejecutarGet(`/api/carrito/${idUsuario}/items`);
    let costoTotal = 0;
    if (itemsCarrito.data) {
      costoTotal = itemsCarrito.data.reduce(
        (total, item) => total + parseFloat(item.precio * item.cantidad),
        0
      );
      setItems(itemsCarrito.data);
    }
    setTotal(parseFloat(costoTotal));
  }

  const handleNombre = (evento) => {
    setNombreTarjeta(evento.target.value);
  };

  const handleCorreo = (evento) => {
    setCorreoElectronico(evento.target.value);
  };

  const handleCodigoPostal = (evento) => {
    setCodigoPostal(evento.target.value);
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
                  defaultValue={nombreTarjeta}
                  placeholder="Ingrese su nombre"
                  onChange={handleNombre}
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
                  defaultValue={correoElectronico}
                  placeholder="Ingrese su correo electrónico"
                  onChange={handleCorreo}
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
                  onChange={handleCodigoPostal}
                  value={codigoPostal}
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
                    <th>Talla</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.descripcion}</td>
                      <td>{item.talla}</td>
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
                Total:{" "}
                {total.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
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
