// Esta clase/configuración crea y configura una API con Express.
// - Inicializa el servidor
// - Permite leer JSON en las peticiones
// - Registra rutas externas
// - Define una ruta base de prueba
// - Usa un middleware global para manejo de errores

const express = require('express'); // Importa Express (framework para crear servidores y APIs)
const app = express(); // Crea la aplicación de Express

app.use(express.json()); // Middleware que permite recibir datos en formato JSON en req.body

// Importa las rutas relacionadas con "movimientos"
const movimientosRoutes = require('./routes/movimientos.routes');

// Todas las rutas definidas en ese archivo empezarán con /movimientos
app.use('/movimientos', movimientosRoutes);

// Ruta raíz para comprobar que la API está funcionando
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

module.exports = app; // Exporta la app para usarla en otro archivo (ej. server.js)

// Middleware global para manejo centralizado de errores
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler); // Debe ir al final para capturar errores de toda la app