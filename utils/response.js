// Este archivo define funciones helper para estandarizar las respuestas de la API.
// Sirve para que todas las respuestas tengan el mismo formato JSON,
// evitando repetir código en cada controlador.

// Función para respuestas exitosas
const success = (res, data = null, message = "OK", status = 200) => {
  return res.status(status).json({
    success: true,   // Indica que la operación fue exitosa
    message,         // Mensaje descriptivo
    data             // Datos que se envían al cliente
  });
};

// Función para respuestas de error
const error = (res, message = "Error", status = 500) => {
  return res.status(status).json({
    success: false,  // Indica que ocurrió un error
    message,         // Mensaje de error
    data: null       // En errores normalmente no se envían datos
  });
};

// Exporta ambas funciones para poder usarlas en controladores o middlewares
module.exports = { success, error };