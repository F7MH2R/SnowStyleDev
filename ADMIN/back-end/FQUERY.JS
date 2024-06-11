const pool = require("./config/database");

const getSalesByDate = async () => {
  const res = await pool.query(`
    SELECT f.fecha, SUM(p.precio_unitario * ic.cantidad) AS total_vendido
    FROM factura f
    JOIN detalle_factura df ON f.id_factura = df.id_factura
    JOIN items_carrito ic ON df.id_prenda = ic.id_prenda
    JOIN prenda p ON ic.id_prenda = p.id_prenda
    GROUP BY f.fecha
    ORDER BY f.fecha;
  `);
  return res.rows;
};

const getSalesByDepartment = async () => {
  const res = await pool.query(`
   SELECT d.nombre, SUM(p.precio_unitario * ic.cantidad) AS total_vendido
FROM prenda p
JOIN departamento d ON p.id_departamento = d.id_departamento
JOIN items_carrito ic ON p.id_prenda = ic.id_prenda
GROUP BY d.nombre
ORDER BY total_vendido DESC;

  `);
  return res.rows;
};

const getSalesBySize = async () => {
  const res = await pool.query(`
   SELECT t.nom_talla, SUM(p.precio_unitario * ic.cantidad) AS total_vendido
FROM prenda p
JOIN tallas_prenda tp ON p.id_prenda = tp.id_prenda
JOIN talla t ON tp.id_talla = t.id_talla
JOIN items_carrito ic ON p.id_prenda = ic.id_prenda AND ic.id_talla = t.id_talla
GROUP BY t.nom_talla
ORDER BY total_vendido DESC;

  `);
  return res.rows;
};

const getSalesByProvider = async () => {
  const res = await pool.query(`
  SELECT pr.name_proveedor, SUM(p.precio_unitario * ic.cantidad) AS total_vendido
FROM prenda p
JOIN proveedor pr ON p.id_proveedor = pr.id_proveedor
JOIN items_carrito ic ON p.id_prenda = ic.id_prenda
GROUP BY pr.name_proveedor
ORDER BY total_vendido DESC;
  `);
  return res.rows;
};

const getSalesByBrand = async () => {
  const res = await pool.query(`
   SELECT m.nom_marca, SUM(p.precio_unitario * ic.cantidad) AS total_vendido
FROM prenda p
JOIN marca m ON p.id_marca = m.id_marca
JOIN items_carrito ic ON p.id_prenda = ic.id_prenda
GROUP BY m.nom_marca
ORDER BY total_vendido DESC;

  `);
  return res.rows;
};

const quer = async (id) => {
  const res = await pool.query(
    "SELECT * FROM tallas_prenda WHERE id_prenda = $1",
    [id]
  );
  return res.rows;
};

module.exports = {
  getSalesByDate,
  getSalesByDepartment,
  getSalesBySize,
  getSalesByProvider,
  getSalesByBrand,
  quer,
};
