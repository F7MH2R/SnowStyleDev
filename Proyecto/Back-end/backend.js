const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Añade la importación de JWT
const app = express();
const port = process.env.PORT || 3077;

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use(cors());
app.use(bodyParser.json()); // Middleware para analizar cuerpos JSON

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: "slayer", // Cambia por tu usuario
  host: "localhost",
  database: "snowstyle", // Nombre de tu base de datos
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
      console.log("Usuario encontrado, ID:", userId); // Mostrar ID en consola
      res.status(200).json({ exists: true, userId });
    } else {
      res.status(404).json({ exists: false });
      console.error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al verificar correo:", error);
    res.status(500).json({ error: "Error al verificar correo" });
  }
});

app.post("/api/reset-password", async (req, res) => {
  const { userId, newPassword } = req.body; // Usa userId en lugar de email
  console.log("Id es " + userId);
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hashear la nueva contraseña

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
    console.error("Error al restablecer la contraseña:", error);
    res.status(500).json({ error: "Error al restablecer la contraseña" });
  }
});

//Login---------------------------------------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Datos recibidos del frontend:", email, password);

  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE correo_electronico = $1",
      [email]
    );

    console.log("Resultado de la consulta:", result.rows);

    if (result.rows.length === 1) {
      const user = result.rows[0];
      if (password === user.password) {
        const IDUsuario = user.id_usuario; // Corregir el acceso al ID de usuario
        console.log("ID del usuario después de la verificación:", IDUsuario);
        res.status(200).json({ IDUsuario });
      } else {
        // Contraseña incorrecta
        res.status(401).json({ message: "Credenciales incorrectas" });
      }
    } else {
      // Usuario no encontrado
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (err) {
    // Manejar errores de la base de datos
    console.error("Error en la consulta:", err);
    res.status(500).json({ message: "Error en la autenticación" });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
