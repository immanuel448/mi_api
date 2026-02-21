let movimientos = [
  {
    id: 1,
    tipo: "ingreso",
    monto: 1500,
    fuente: "venta",
    fecha_movimiento: "2026-02-20",
    fecha_registro: "2026-02-20",
  },
  {
    id: 2,
    tipo: "egreso",
    monto: 500,
    fuente: "compra",
    fecha_movimiento: "2026-02-19",
    fecha_registro: "2026-02-20",
  },
];

const { success, error } = require("../utils/response");

const validarMovimiento = (data, esCreacion = true) => {
  const { tipo, monto, fuente, fecha_movimiento } = data;

  if (esCreacion) {
    if (!tipo || !monto || !fuente || !fecha_movimiento) {
      return "Faltan datos obligatorios";
    }
  }

  if (tipo && !["ingreso", "egreso"].includes(tipo)) {
    return "Tipo inválido";
  }

  if (monto && (isNaN(monto) || monto <= 0)) {
    return "Monto inválido";
  }

  return null;
};

// GET
exports.obtenerMovimientos = (req, res) => {
  return success(res, movimientos);
};

// GET por ID
exports.obtenerMovimientoPorId = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return error(res, "ID inválido", 400);
  }

  const movimiento = movimientos.find((m) => m.id === id);

  if (!movimiento) {
    return error(res, "Movimiento no encontrado", 404);
  }

  return success(res, movimiento);
};

// POST
exports.crearMovimiento = (req, res) => {
  const errorMsg = validarMovimiento(req.body, true);

  if (errorMsg) {
    return error(res, errorMsg, 400);
  }

  const nuevoMovimiento = {
    id: movimientos.length + 1,
    tipo: req.body.tipo,
    monto: req.body.monto,
    fuente: req.body.fuente,
    fecha_movimiento: req.body.fecha_movimiento,
    fecha_registro: new Date().toISOString().split("T")[0],
  };

  movimientos.push(nuevoMovimiento);

  return success(res, nuevoMovimiento, "Movimiento creado", 201);
};

// DELETE
exports.eliminarMovimiento = (req, res) => {
  const id = parseInt(req.params.id);
  const index = movimientos.findIndex((m) => m.id === id);

  if (index === -1) {
    return error(res, "Movimiento no encontrado", 404);
  }

  movimientos.splice(index, 1);

  return success(res, null, "Movimiento eliminado");
};

// PUT
exports.actualizarMovimiento = (req, res) => {
  const id = parseInt(req.params.id);
  const index = movimientos.findIndex((m) => m.id === id);

  if (index === -1) {
    return error(res, "Movimiento no encontrado", 404);
  }

  const errorMsg = validarMovimiento(req.body, false);

  if (errorMsg) {
    return error(res, errorMsg, 400);
  }

  const datosActualizados = { ...req.body };

  delete datosActualizados.id;
  delete datosActualizados.fecha_registro;

  movimientos[index] = {
    ...movimientos[index],
    ...datosActualizados,
  };

  return success(res, movimientos[index], "Movimiento actualizado");
};