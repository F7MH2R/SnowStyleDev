require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "snowstyle",
  password: "1704",
  port: 5433,
});

module.exports = pool;
