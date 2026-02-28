const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'movimientos_db',
//   password: '12345',
//   port: 5432,
// });

const pool = new Pool({
  user: process.env.DB_USER,       // postgres de Railway
  host: process.env.DB_HOST,       // host que Railway te da
  database: process.env.DB_NAME,   // normalmente postgres
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;

