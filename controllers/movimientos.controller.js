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

// GET
exports.obtenerMovimientos = (req, res) => {
  res.json(movimientos);
};

// POST
exports.crearMovimiento = (req, res) => {
  const { tipo, monto, fuente, fecha_movimiento } = req.body;

  if (!tipo || !monto || !fuente || !fecha_movimiento) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  if (!["ingreso", "egreso"].includes(tipo)) {
    return res.status(400).json({ mensaje: "Tipo inválido" });
  }

  if (isNaN(monto) || monto <= 0) {
    return res.status(400).json({ mensaje: "Monto inválido" });
  }

  const nuevoMovimiento = {
    id: movimientos.length + 1,
    tipo,
    monto,
    fuente,
    fecha_movimiento,
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

  movimientos[index] = {
    ...movimientos[index],
    ...req.body
  };

  res.json(movimientos[index]);
};