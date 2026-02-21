const { error } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  return error(res, "Error interno del servidor", 500);
};

module.exports = errorHandler;