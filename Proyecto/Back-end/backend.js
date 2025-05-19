const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 3077;
const {
  queryCarrito,
  updateCantidadItems,
  deleteItemCarrito,
  insertarItemsCarrito,
  insertarCarrito,
  obtenerCarritoPorUsuario,
  actualizarEstadoCarrito,
  obtenerDatosPrenda,
  descontarInventario,
  obtenerTallasPorPrenda,
  cantidadEnInventario,
} = require("./queries");

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use(cors());
app.use(bodyParser.json()); // Middleware para analizar cuerpos JSON
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: "postgres", // Cambia por tu usuario
  host: "localhost",
  database: "Snowstyle", // Nombre de tu base de datos
  password: "deku", // Cambia por tu contraseña
  port: 5432, // Puerto estándar para PostgreSQL
});

// Conexión a la base de datos
pool
  .connect()
  .then(() => console.log("Conexión exitosa a PostgreSQL"))
  .catch((err) => console.error("Error de conexión:", err));

app.post("/api/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE correo_electronico = $1",
      [email]
    );

    if (result.rows.length > 0) {
      const userId = result.rows[0].id_usuario;
      res.status(200).json({ exists: true, userId });
    } else {
      res.status(404).json({ exists: false });
      console.error("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).json({ error: "Error al verificar correo" });
  }
});

app.post("/api/reset-password", async (req, res) => {
  const { userId, newPassword } = req.body; // Usa userId en lugar de email
  try {
    const hashedPassword = newPassword; // Hashear la nueva contraseña

    const result = await pool.query(
      "UPDATE usuario SET password = $1 WHERE id_usuario = $2", // Cambia a ID
      [hashedPassword, userId]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" }); // Ajustar mensaje de error
    }
  } catch (error) {
    res.status(500).json({ error: "Error al restablecer la contraseña" });
  }
});

//Login---------------------------------------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE correo_electronico = $1",
      [email]
    );

    if (result.rows.length === 1) {
      const user = result.rows[0];
      if (password === user.password) {
        const IDUsuario = user.id_usuario; // Corregir el acceso al ID de usuario
        const imagenURL = user.img_perfil;
        res.status(200).json({ IDUsuario: IDUsuario, imgPerfil: imagenURL });
      } else {
        // Contraseña incorrecta
        res.status(401).json({ message: "Credenciales incorrectas" });
      }
    } else {
      // Usuario no encontrado
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error en la autenticación" });
  }
});

// Endpoint para registrar usuarios
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, address, phone, dui, profileImage } =
      req.body;

    // Encriptar la contraseña
    const hashedPassword = password;

    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      "INSERT INTO usuario (nombre, correo_electronico, password, direccion, telefono, dui, img_perfil) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_usuario",
      [fullName, email, hashedPassword, address, phone, dui, profileImage]
    );

    res.status(201).json({
      message: "Usuario registrado con éxito",
      userId: result.rows[0].id,
    });
  } catch (error) {
    if (error.code === "23505") {
      // Error de restricción UNIQUE (correo electrónico duplicado)
      res.status(409).json({ message: "Correo electrónico ya registrado" });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});
// Endpoint para obtener prendas por tipo de prenda
app.get("/api/prendas/tipo/:tipoPrendaId/:departamento", async (req, res) => {
  const { tipoPrendaId, departamento } = req.params;

  try {
    const result = await pool.query(
      ` select * from prenda p
        where 
        p.id_tipo_prenda = $1 AND p.id_departamento = $2 AND p.disponibilidad = 1;  `,

      [tipoPrendaId, departamento]
    );
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron prendas de este tipo." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error al obtener prendas." });
  }
});

// Endpoint para obtener detalles de una prenda por ID
app.get("/api/prendas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(obtenerDatosPrenda, [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Prenda no encontrada" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener detalles de la prenda",
      error: error,
    });
  }
});

// Nodemailer setup (ensure you have a valid SMTP service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "snowstyle342@gmail.com",
    pass: "grhf xjfn wsxs lrby",
  },
});

app.post("/api/request-password-change", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query(
      "SELECT id_usuario FROM usuario WHERE correo_electronico = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Correo electrónico no encontrado" });
    }
    const userId = result.rows[0].id_usuario;
    const resetLink = `http://localhost:3000/reset/${userId}`;

    const mailOptions = {
      to: email,
      from: "snowstyle342@gmail.com",
      subject: "Solicitud de cambio de contraseña",
      text: `Recibiste esto porque solicitaste cambiar tu contraseña.\n\n
         Por favor, haz clic en el siguiente enlace o pégalo en tu navegador para completar el proceso:\n\n
         ${resetLink}\n\n
         Si no solicitaste esto, ignora este correo y tu contraseña permanecerá igual.\n`,
      html: `
    <html>
    <head>
      <style>
        /* Estilos personalizados aquí */
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .card {
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .card-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .card-content {
          margin-bottom: 20px;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background-color: transparent;
          color: #007bff;
          text-decoration: none;
          border: 2px solid #007bff;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #007bff;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="card-content">
          <h2 class="card-title">Solicitud Para Cambiar Contraseña</h2>
          <p>Haz solicitado cambiar tu contraseña.</p>
          <p>Por favor, haz clic en el siguiente enlace o pégalo en tu navegador para completar el proceso:</p>
          <a href="${resetLink}" class="btn">Click Aquí Para Cambiar Contraseña</a>
        </div>
        <div class="card-image">
          <img src="https://i.ibb.co/n11ZmdR/Snow-Style.jpg" alt="Logo de la empresa" style="width: 100%;">
        </div>
      </div>
    </body>
    </html>
  `,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "./logo/SnowStyle.jpg"),
          cid: "logo", // mismo cid que en el src de la imagen
        },
      ],
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error al enviar el correo electrónico" });
      }
      res.status(200).json({ message: "Correo de confirmación enviado" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Ruta para cambiar la contraseña
app.post("/api/reset-password/:userId", async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;
  try {
    // Buscar al usuario por su ID
    const result = await pool.query(
      "SELECT * FROM usuario WHERE id_usuario = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    // Generar el hash de la nueva contraseña
    const hashedPassword = newPassword;

    // Actualizar la contraseña del usuario en la base de datos
    await pool.query("UPDATE usuario SET password = $1 WHERE id_usuario = $2", [
      hashedPassword,
      userId,
    ]);

    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});
// Ruta para obtener los detalles de un usuario por su ID
app.get("/api/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Consulta a la base de datos para obtener los detalles del usuario
    const result = await pool.query(
      "SELECT * FROM usuario WHERE id_usuario = $1",
      [userId]
    );

    // Si no se encuentra ningún usuario con el ID proporcionado, devuelve un 404
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devuelve los detalles del usuario
    res.status(200).json(result.rows[0]);
  } catch (error) {
    // Si hay un error en el servidor, devuelve un 500
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.get("/api/carrito/:idUsuario/items", async (req, res) => {
  const idUsuario = req.params.idUsuario;
  try {
    const result = await pool.query(queryCarrito, [idUsuario]);
    if (result.rowCount > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las prendas del carrito" });
  }
});

app.patch("/api/carrito/items/:idItemCarrito", async (req, res) => {
  const idItemCarrito = req.params.idItemCarrito;
  const cantidad = req.body.cantidad;
  try {
    const resultado = await pool.query(updateCantidadItems, [
      cantidad,
      idItemCarrito,
    ]);
    res.status(200).json({ cantidad: cantidad, resultado: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizaar la cantidad de items" });
  }
});

app.delete("/api/carrito/items/:id/delete", async (req, res) => {
  const idItemCarrito = req.params.id;
  try {
    const resultado = await pool.query(deleteItemCarrito, [idItemCarrito]);
    res.status(200).json({ estado: "eliminado", resultado: resultado });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar un item del carrito" });
  }
});

app.post("/api/carrito/items/add", async (req, res) => {
  const idPrenda = req.body.idPrenda;
  const idUsuario = req.body.idUsuario;
  const idTalla = req.body.idTalla;
  try {
    const carrito = await pool.query(obtenerCarritoPorUsuario, [idUsuario]);
    let idCarrito = 0;
    if (carrito.rowCount > 0) {
      idCarrito = carrito.rows[0].id;
    } else {
      await pool.query(insertarCarrito, [idUsuario, idPrenda]);
      const carrito = await pool.query(obtenerCarritoPorUsuario, [idUsuario]);
      idCarrito = carrito.rows[0].id;
    }
    await pool.query(insertarItemsCarrito, [idCarrito, idPrenda, idTalla]);
    res.status(200).json({ estado: "Carrito actualizado - Prenda agregada" });
  } catch (error) {
    res.status(500).json({ mensaje: error });
  }
});

app.patch("/api/carrito/update", async (req, res) => {
  const idUsario = req.body.idUsuario;
  try {
    await pool.query(actualizarEstadoCarrito, [idUsario]);
    res.status(200).json({ mensaje: "Carrito actualizado" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar el carrito", error: error });
  }
});

app.patch("/api/prendas/update", async (req, res) => {
  const idPrenda = req.body.idPrenda;
  const cantidad = req.body.cantidad;
  const idTalla = req.body.idTalla;
  try {
    await pool.query(descontarInventario, [cantidad, idPrenda, idTalla]);
    res.status(200).json({ mensaje: "Inventario actualizado" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al actualizar el inventario", error: error });
  }
});

app.get("/api/prendas/:id/tallas", async (req, res) => {
  const idPrenda = req.params.id;
  try {
    const tallas = await pool.query(obtenerTallasPorPrenda, [idPrenda]);
    res.status(200).json({ tallasDisponibles: tallas.rows });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener tallas de la prenda", error: error });
  }
});

app.get("/api/prendas/:idPrenda/tallas/:idTalla/cantidad", async (req, res) => {
  const { idPrenda, idTalla } = req.params;
  try {
    const result = await pool.query(cantidadEnInventario, [idPrenda, idTalla]);
    if (result != null && result.rows.length === 0) {
      res.status(404).json({ error: "Prenda no encontrada" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener detalles de la prenda",
      error: error,
    });
  }
});

//endpoint de envio de factura pdf

app.post("/api/facturas/upload", upload.single("file"), async (req, res) => {
  const { idUsuario } = req.body;
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({ message: "No se ha proporcionado ningún archivo" });
  }

  try {
    const result = await pool.query(
      "SELECT correo_electronico FROM usuario WHERE id_usuario = $1",
      [idUsuario]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const email = result.rows[0].correo_electronico;

    // Enviar el archivo PDF por correo electrónico
    const mailOptions = {
      to: email,
      from: "snowstyle342@gmail.com",
      subject: "Factura de compra - SnowStyle",
      text: `Gracias por su compra. Adjuntamos su factura en formato PDF.`,
      attachments: [
        {
          filename: "SnowStyleFactura.pdf",
          content: file.buffer,
          contentType: "application/pdf",
        },
      ],
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error al enviar el correo electrónico:", error);
        return res
          .status(500)
          .json({ message: "Error al enviar el correo electrónico" });
      }
      res
        .status(200)
        .json({ message: "Factura enviada por correo electrónico" });
    });
  } catch (error) {
    console.error("Error al enviar la factura:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
