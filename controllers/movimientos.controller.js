let movimientos = [
  {
    id: 1,
    tipo: "ingreso",
    monto: 1500,
    fuente: "venta",
    fecha_movimiento: "2026-02-20",
    fecha_registro: "2026-02-20"
  },
  {
    id: 2,
    tipo: "egreso",
    monto: 500,
    fuente: "compra",
    fecha_movimiento: "2026-02-19",
    fecha_registro: "2026-02-20"
  }
];

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
  res.json(movimientos);
};

// POST
exports.crearMovimiento = (req, res) => {
  const error = validarMovimiento(req.body, true);

  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const nuevoMovimiento = {
    id: movimientos.length + 1,
    tipo: req.body.tipo,
    monto: req.body.monto,
    fuente: req.body.fuente,
    fecha_movimiento: req.body.fecha_movimiento,
    fecha_registro: new Date().toISOString().split('T')[0]
  };

  movimientos.push(nuevoMovimiento);
  res.status(201).json(nuevoMovimiento);
};

// DELETE
exports.eliminarMovimiento = (req, res) => {
  const id = parseInt(req.params.id);

  movimientos = movimientos.filter(m => m.id !== id);

  res.json({ mensaje: "Movimiento eliminado" });
};

// PUT (actualizar movimiento)
exports.actualizarMovimiento = (req, res) => {
  const id = parseInt(req.params.id);
  const index = movimientos.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Movimiento no encontrado" });
  }

  const error = validarMovimiento(req.body, false);

  if (error) {
    return res.status(400).json({ mensaje: error });
  }

  const datosActualizados = { ...req.body };

  delete datosActualizados.id;
  delete datosActualizados.fecha_registro;

  movimientos[index] = {
    ...movimientos[index],
    ...datosActualizados
  };

  res.json(movimientos[index]);
};

