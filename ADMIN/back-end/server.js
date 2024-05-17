const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { Pool } = require("pg"); // Asegúrate de tener 'pg' instalado: npm install pg
const app = express();
const port = 3076;

app.use(bodyParser.json());

const pool = new Pool({
  user: "slayer",
  host: "localhost",
  database: "snowstyle",
  password: "deku",
  port: 5432,
});

// Ruta de registro de usuario
app.post("/api/register", async (req, res) => {
  const {
    nombre,
    apellidos,
    correo_electronico,
    password,
    direccion,
    telefono,
    dui,
    img_perfil,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO public.usuario (nombre, apellidos, correo_electronico, password, direccion, telefono, dui, img_perfil) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        nombre,
        apellidos,
        correo_electronico,
        hashedPassword,
        direccion,
        telefono,
        dui,
        img_perfil,
      ]
    );

    res
      .status(201)
      .send({ message: "Usuario creado correctamente", user: newUser.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al crear usuario" });
  }
});

// Ruta de inicio de sesión
app.post("/api/login", async (req, res) => {
  const { correo_electronico, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM public.usuario WHERE correo_electronico = $1",
      [correo_electronico]
    );

    if (user.rows.length > 0) {
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (validPassword) {
        // Verificar si el usuario es administrador
        const isAdmin = true; // Cambia esta lógica según tus necesidades
        res.send({ isAdmin });
      } else {
        res.status(401).send({ message: "Credenciales incorrectas" });
      }
    } else {
      res.status(401).send({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al iniciar sesión" });
  }
});

// Ruta para obtener todos los usuarios (solo para admins)
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.usuario");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al obtener usuarios" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
