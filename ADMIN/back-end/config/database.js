require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "slayer",
  host: "localhost",
  database: "snowstyle",
  password: "deku",
  port: 5432,
});

module.exports = pool;
