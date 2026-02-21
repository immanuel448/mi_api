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
  const nuevoMovimiento = {
    id: movimientos.length + 1,
    ...req.body,
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