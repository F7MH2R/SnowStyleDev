const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3077;

// Configuración de CORS para permitir solicitudes desde cualquier origen
app.use(cors());
app.use(bodyParser.json()); // Middleware para analizar cuerpos JSON

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: "SNOWSTYLE", // Cambia por tu usuario
  host: "localhost",
  database: "SNOWSTYLE", // Nombre de tu base de datos
  password: "1704", // Cambia por tu contraseña
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res
      .status(400)
      .json({ message: "Usuario o contraseña incorrectos." });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res
      .status(400)
      .json({ message: "Usuario o contraseña incorrectos." });
  }

  // Generar JWT
  const accessToken = jwt.sign({ email: user.email }, "your_secret_key", {
    expiresIn: "1h",
  });

  res.json({ accessToken });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
