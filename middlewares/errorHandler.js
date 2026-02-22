// Este middleware maneja errores globalmente en la API.
// Su función es capturar cualquier error que ocurra en rutas o middlewares
// y enviar una respuesta estándar al cliente.

const { error } = require('../utils/response'); // Importa función helper para respuestas de error

// Middleware de manejo de errores (tiene 4 parámetros obligatorios para que Express lo reconozca)
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Muestra el error completo en consola para depuración

  // Envía respuesta genérica al cliente para no exponer detalles internos
  return error(res, "Error interno del servidor", 500);
};

module.exports = errorHandler; // Exporta el middleware para usarlo en app.js o server.js