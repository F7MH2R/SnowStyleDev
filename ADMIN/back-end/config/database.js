require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "slayer",
  host: "localhost",
  database: "snowstyle",
  password: "1234",
  port: 5432,
});

module.exports = pool;
