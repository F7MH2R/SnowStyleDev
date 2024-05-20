const pool = require("../config/database");

exports.getTallas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM talla");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error fetching tallas" });
  }
};

exports.createTalla = async (req, res) => {
  try {
    const { nom_talla, codigo } = req.body;
    const result = await pool.query(
      "INSERT INTO talla (nom_talla, codigo) VALUES ($1, $2) RETURNING *",
      [nom_talla, codigo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error creating talla" });
  }
};
