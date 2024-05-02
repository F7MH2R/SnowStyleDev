import React, { useState } from "react";
import { Button, Form, Alert, Modal, Table } from "react-bootstrap";

const Pago = ({ total, items, nombre, correo }) => {
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

  const handleDescargarFactura = () => {
    const facturaTexto = generateFacturaTexto(items, total, nombreTarjeta, correoElectronico);
    downloadFile(facturaTexto, "factura.txt");
  };

  const generateFacturaTexto = (items, total, nombre, correo) => {
    let facturaTexto = `Factura\n\nCliente: ${nombre}\nCorreo: ${correo}\n\nProductos:\n`;
    items.forEach((item) => {
      facturaTexto += `${item.nombre} - Cantidad: ${item.cantidad} - Precio unitario: ${item.precio}\n`;
    });
    facturaTexto += `\nTotal: ${total}`;
    return facturaTexto;
  };

  const downloadFile = (content, fileName) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Pago en línea</h1>
      {pagoExitoso && (
        <div className="text-center">
          <Alert variant="success">
            ¡Pago exitoso! Se ha procesado el pago correctamente.
          </Alert>
          <Button variant="outline-primary" onClick={handleVerFactura}>
            Ver factura
          </Button>
        </div>
      )}

      {!pagoExitoso && (
        <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
          <Form.Group controlId="formNombreTarjeta">
            <Form.Label>Nombre en la tarjeta</Form.Label>
            <Form.Control type="text" name="nombreTarjeta" defaultValue={nombre} placeholder="Ingrese su nombre" required />
          </Form.Group>
          <Form.Group controlId="formCorreoElectronico">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" name="correoElectronico" defaultValue={correo} placeholder="Ingrese su correo electrónico" required />
          </Form.Group>
          <Form.Group controlId="formCodigoPostal">
            <Form.Label>Código postal</Form.Label>
            <Form.Control type="text" name="postalCode" placeholder="Ingrese su código postal" required />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="w-100 mt-3">
            {loading ? "Procesando..." : "Pagar ahora"}
          </Button>
        </Form>
      )}

      <Modal show={mostrarFactura} onHide={handleCloseFactura}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold">Cliente: {nombreTarjeta}</p>
          <p className="fw-bold">Correo: {correoElectronico}</p>
          <Table striped bordered hover>
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
          <p className="fw-bold">Total: ${total}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFactura}>Cerrar</Button>
          <Button variant="primary" onClick={handleDescargarFactura}>Descargar factura</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pago;
