const { Pool } = require("pg");

const pool = new Pool();
  // new Pool({connectionString: process.env.CONN_STR,});

module.exports = pool;
