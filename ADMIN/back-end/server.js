const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const port = 3076;
const nodemailer = require("nodemailer");

app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "snows",
  password: "1704",
  port: 5433,
});
// Opción 1: Verificar la conexión inmediatamente
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Se conectó a la base de datos exitosamente");
  release();
});
// Configura el transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "snowstyle342@gmail.com",
    pass: "grhf xjfn wsxs lrby",
  },
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
    admin,
  } = req.body;

  try {
    const hashedPassword = password;
    const newUser = await pool.query(
      "INSERT INTO public.usuario (nombre, apellidos, correo_electronico, password, direccion, telefono, dui, img_perfil, admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        nombre,
        apellidos,
        correo_electronico,
        hashedPassword,
        direccion,
        telefono,
        dui,
        img_perfil,
        admin,
      ]
    );

    // Configura el correo electrónico
    const mailOptions = {
      from: "snowstyle342@gmail.com",
      to: correo_electronico,
      subject: "Cuenta creada exitosamente",
      text: `Hola ✔😊 ${nombre},\n\nTu cuenta administrador se ha sido creada exitosamente.\n\nSaludos,\nEl equipo de soporte`,
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
      } else {
        console.log("Correo enviado:", info.response);
      }
    });

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
      "SELECT * FROM public.usuario WHERE correo_electronico = $1 AND password = $2 AND admin = true",
      [correo_electronico, password]
    );

    if (user.rows.length > 0) {
      const validPassword = user.rows[0].password === password;

      if (validPassword) {
        res.status(200).send({ message: "Inicio de sesión exitoso" });
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
    const result = await pool.query(
      "SELECT * FROM public.usuario Where admin= true"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al obtener usuarios" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
