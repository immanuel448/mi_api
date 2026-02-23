const pool = require('./config/db'); // o la ruta donde creaste la conexión

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res?.rows);
  process.exit(); // termina el script
});