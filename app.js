const express = require('express');
const app = express();

app.use(express.json());

const movimientosRoutes = require('./routes/movimientos.routes');

app.use('/movimientos', movimientosRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

module.exports = app;