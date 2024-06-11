const pool = require("../config/database");

exports.getTallasPrenda = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tallas_prenda");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error fetching tallas_prenda" });
  }
};

exports.createTallasPrenda = async (req, res) => {
  try {
    const { id_prenda, id_talla, cantidad } = req.body;

    console.log(id_prenda);

    const result = await pool.query(
      "INSERT INTO tallas_prenda (id_prenda, id_talla, cantidad) VALUES ($1, $2, $3) RETURNING *",
      [id_prenda, id_talla, cantidad]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error creating tallas_prenda" });
  }
};
