const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const port = 3076;
const queries = require("./FQUERY.JS");
const nodemailer = require("nodemailer");
const cors = require("cors");
app.use(bodyParser.json());
const pool = require("./config/database");

app.use(cors({ origin: "http://localhost:4000" }));
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
    user: "snowstyleofficial@gmail.com",
    pass: "edci zorh yhkf fvsy",
  },
});

require("dotenv").config();

const tallaRoutes = require("./routes/tallaRoutes");
const tallasPrendaRoutes = require("./routes/tallasPrendaRoutes");
app.use("/tallas", tallaRoutes);
app.use("/tallas_prenda", tallasPrendaRoutes);
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
      from: "snowstyleofficial@gmail.com",
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

// Ruta para eliminar un usuario por su ID
app.delete("/api/users/:id", async (req, res) => {
  console.log("DELETE request received"); // Registro para verificar que la solicitud llegue al servidor
  const userId = req.params.id;

  try {
    console.log("Deleting user with ID:", userId); // Registro para verificar el ID del usuario
    const deletedUser = await pool.query(
      "DELETE FROM public.usuario WHERE id_usuario = $1 RETURNING *",
      [userId]
    );

    if (deletedUser.rows.length === 0) {
      // Si no se encontró el usuario con el ID proporcionado
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    console.log("User deleted:", deletedUser.rows[0]); // Registro para verificar si el usuario se ha eliminado correctamente
    res.status(200).send({
      message: "Usuario eliminado correctamente",
      user: deletedUser.rows[0],
    });
  } catch (error) {
    console.error("Error deleting user:", error); // Registro para verificar si hay errores en la consulta DELETE
    res.status(500).send({ message: "Error al eliminar usuario" });
  }
});

// CRUD endpoints for prenda
app.get("/prendas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM prenda");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/prendas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM prenda WHERE id_prenda = $1",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/prendas", async (req, res) => {
  try {
    const {
      id_marca,
      id_departamento,
      disponibilidad,
      cantidad,
      id_proveedor,
      precio_unitario,
      imagen1,
      imagen2,
      imagen3,
      imagen4,
      nombre_prenda,
      id_tipo_prenda,
      descripcion,
      material1,
      material2,
      material3,
      material4,
      material5,
    } = req.body;
    console.log(req.body);
    const result = await pool.query(
      "INSERT INTO prenda (id_marca, id_departamento, disponibilidad, cantidad, id_proveedor, precio_unitario, imagen1, imagen2, imagen3, imagen4, nombre_prenda, id_tipo_prenda, descripcion, material1, material2, material3, material4, material5) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *",
      [
        id_marca,
        id_departamento,
        disponibilidad,
        cantidad,
        id_proveedor,
        precio_unitario,
        imagen1,
        imagen2,
        imagen3,
        imagen4,
        nombre_prenda,
        id_tipo_prenda,
        descripcion,
        material1,
        material2,
        material3,
        material4,
        material5,
      ]
    );
    res.json({ id_prenda: result.rows[0].id_prenda });
    console.log(id_prenda);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/prendas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_marca,
      id_departamento,
      disponibilidad,
      cantidad,
      id_proveedor,
      precio_unitario,
      imagen1,
      imagen2,
      imagen3,
      imagen4,
      nombre_prenda,
      id_tipo_prenda,
      descripcion,
      material1,
      material2,
      material3,
      material4,
      material5,
    } = req.body;
    const result = await pool.query(
      "UPDATE prenda SET id_marca = $1, id_departamento = $2, disponibilidad = $3, cantidad = $4, id_proveedor = $5, precio_unitario = $6, imagen1 = $7, imagen2 = $8, imagen3 = $9, imagen4 = $10, nombre_prenda = $11, id_tipo_prenda = $12, descripcion = $13, material1 = $14, material2 = $15, material3 = $16, material4 = $17, material5 = $18 WHERE id_prenda = $19 RETURNING *",
      [
        id_marca,
        id_departamento,
        disponibilidad,
        cantidad,
        id_proveedor,
        precio_unitario,
        imagen1,
        imagen2,
        imagen3,
        imagen4,
        nombre_prenda,
        id_tipo_prenda,
        descripcion,
        material1,
        material2,
        material3,
        material4,
        material5,
        id,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/prendas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM prenda WHERE id_prenda = $1", [id]);
    res.json({ message: "Prenda deleted" });
  } catch (err) {
    console.error(err.message);
  }
});

// CRUD endpoints for tipo_prenda
app.get("/tipo_prendas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tipo_prenda");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/tipo_prendas", async (req, res) => {
  try {
    const { nombre_tipo } = req.body;
    const result = await pool.query(
      "INSERT INTO tipo_prenda (nombre_tipo) VALUES ($1) RETURNING *",
      [nombre_tipo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/tipo_prendas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo } = req.body;
    const result = await pool.query(
      "UPDATE tipo_prenda SET nombre_tipo = $1 WHERE id_tipo_prenda = $2 RETURNING *",
      [nombre_tipo, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/tipo_prendas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tipo_prenda WHERE id_tipo_prenda = $1", [id]);
    res.json({ message: "Tipo prenda deleted" });
  } catch (err) {
    console.error(err.message);
  }
});

// CRUD endpoints for proveedor
app.get("/proveedores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM proveedor");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/proveedores", async (req, res) => {
  try {
    const { name_proveedor } = req.body;
    console.log("este es tu proveedor " + name_proveedor);
    const result = await pool.query(
      "INSERT INTO proveedor (name_proveedor) VALUES ($1) RETURNING *",
      [name_proveedor]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/proveedores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name_proveedor } = req.body;
    const result = await pool.query(
      "UPDATE proveedor SET name_proveedor = $1 WHERE id_proveedor = $2 RETURNING *",
      [name_proveedor, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/proveedores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM proveedor WHERE id_proveedor = $1", [id]);
    res.json({ message: "Proveedor deleted" });
  } catch (err) {
    console.error(err.message);
  }
});

// CRUD endpoints for marca
app.get("/marcas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM marca");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/marcas", async (req, res) => {
  try {
    const { nom_marca, codigo } = req.body;
    const result = await pool.query(
      "INSERT INTO marca (nom_marca, codigo) VALUES ($1, $2) RETURNING *",
      [nom_marca, codigo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/marcas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_marca, codigo } = req.body;
    const result = await pool.query(
      "UPDATE marca SET nom_marca = $1, codigo = $2 WHERE id_marca = $3 RETURNING *",
      [nom_marca, codigo, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/marcas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM marca WHERE id_marca = $1", [id]);
    res.json({ message: "Marca deleted" });
  } catch (err) {
    console.error(err.message);
  }
});

// CRUD endpoints for departamento
app.get("/departamentos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM departamento");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/departamentos", async (req, res) => {
  try {
    const { nombre } = req.body;
    const result = await pool.query(
      "INSERT INTO departamento (nombre) VALUES ($1) RETURNING *",
      [nombre]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/departamentos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const result = await pool.query(
      "UPDATE departamento SET nombre = $1 WHERE id_departamento = $2 RETURNING *",
      [nombre, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/departamentos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM departamento WHERE id_departamento = $1", [
      id,
    ]);
    res.json({ message: "Departamento deleted" });
  } catch (err) {
    console.error(err.message);
  }
});

//endpoint para estadisticas
app.get("/api/sales-by-date", async (req, res) => {
  const data = await queries.getSalesByDate();
  res.json(data);
});

app.get("/api/sales-by-department", async (req, res) => {
  const data = await queries.getSalesByDepartment();
  res.json(data);
});

app.get("/api/sales-by-size", async (req, res) => {
  const data = await queries.getSalesBySize();
  res.json(data);
});

app.get("/api/sales-by-provider", async (req, res) => {
  const data = await queries.getSalesByProvider();
  res.json(data);
});

app.get("/api/sales-by-brand", async (req, res) => {
  const data = await queries.getSalesByBrand();
  res.json(data);
});

app.get("/api/sales-by-month", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        EXTRACT(MONTH FROM f.fecha) AS month,
        SUM(p.precio_unitario * ic.cantidad) AS total_vendido
      FROM factura f
      JOIN detalle_factura df ON f.id_factura = df.id_factura
    JOIN items_carrito ic ON df.id_prenda = ic.id_prenda
    JOIN prenda p ON ic.id_prenda = p.id_prenda
      GROUP BY month
      ORDER BY month;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Definir la ruta GET /tallas
app.get("/tallas", async (req, res) => {
  try {
    // Consultar todas las tallas desde la base de datos
    const result = await pool.query(
      "SELECT id_talla, nom_talla, codigo FROM public.talla"
    );

    // Devolver las tallas como respuesta en formato JSON
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener las tallas", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint to get tallas by prenda ID
app.get("/tallas_prenda/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM tallas_prenda WHERE id_prenda = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting tallas_prenda", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
