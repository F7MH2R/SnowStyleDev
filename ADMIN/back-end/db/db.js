const { Pool } = require("pg");

const pool = new Pool({
  user: "slayer",
  host: "localhost",
  database: "snow",
  password: "1234",
  port: 5433,
});

module.exports = pool;
