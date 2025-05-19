require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Snowstyle",
  password: "deku",
  port: 5432,
});

module.exports = pool;
