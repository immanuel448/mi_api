// Este archivo es el controlador de "movimientos".
// Contiene la lógica de negocio de cada endpoint (CRUD).
// Usa un arreglo en memoria como base de datos temporal
// y funciones helper para enviar respuestas estándar.

let movimientos = [
  // Base de datos simulada en memoria
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

// Importa funciones helper para respuestas JSON estandarizadas
const { success, error } = require("../utils/response");


// ---------- VALIDADOR ----------
// Valida datos antes de crear o actualizar un movimiento
const validarMovimiento = (data, esCreacion = true) => {
  const { tipo, monto, fuente, fecha_movimiento } = data;

  // Si es creación, todos los campos son obligatorios
  if (esCreacion) {
    if (!tipo || !monto || !fuente || !fecha_movimiento) {
      return "Faltan datos obligatorios";
    }
  }

  // Valida tipo permitido
  if (tipo && !["ingreso", "egreso"].includes(tipo)) {
    return "Tipo inválido";
  }

  // Valida monto numérico y positivo
  if (monto && (isNaN(monto) || monto <= 0)) {
    return "Monto inválido";
  }

  return null; // si no hay errores
};


// ---------- GET TODOS ----------
// Devuelve todos los movimientos
exports.obtenerMovimientos = (req, res) => {
  return success(res, movimientos);
};


// ---------- GET POR ID ----------
// Busca un movimiento específico
exports.obtenerMovimientoPorId = (req, res) => {
  const id = parseInt(req.params.id); // convierte string a número

  // valida id
  if (isNaN(id)) {
    return error(res, "ID inválido", 400);
  }

  // busca en el arreglo
  const movimiento = movimientos.find((m) => m.id === id);

  // si no existe
  if (!movimiento) {
    return error(res, "Movimiento no encontrado", 404);
  }

  return success(res, movimiento);
};


// ---------- POST ----------
// Crea un movimiento nuevo
exports.crearMovimiento = (req, res) => {
  // valida datos recibidos
  const errorMsg = validarMovimiento(req.body, true);

  if (errorMsg) {
    return error(res, errorMsg, 400);
  }

  // genera id único basado en el mayor existente
  const nuevoId =
    movimientos.length > 0
      ? Math.max(...movimientos.map(m => m.id)) + 1
      : 1;

  // crea objeto nuevo
  const nuevoMovimiento = {
    id: nuevoId,
    tipo: req.body.tipo,
    monto: req.body.monto,
    fuente: req.body.fuente,
    fecha_movimiento: req.body.fecha_movimiento,
    fecha_registro: new Date().toISOString().split("T")[0],
  };

  movimientos.push(nuevoMovimiento);

  return success(res, nuevoMovimiento, "Movimiento creado", 201);
};

// ---------- DELETE ----------
// Elimina un movimiento por id
exports.eliminarMovimiento = (req, res) => {
  const id = parseInt(req.params.id);

  // busca posición en el arreglo
  const index = movimientos.findIndex((m) => m.id === id);

  if (index === -1) {
    return error(res, "Movimiento no encontrado", 404);
  }

  movimientos.splice(index, 1); // elimina del arreglo

  return success(res, null, "Movimiento eliminado");
};


// ---------- PUT ----------
// Actualiza un movimiento existente
exports.actualizarMovimiento = (req, res) => {
  const id = parseInt(req.params.id);

  // validar id
  if (isNaN(id)) {
    return error(res, "ID inválido", 400);
  }

  // buscar movimiento
  const index = movimientos.findIndex((m) => m.id === id);
  if (index === -1) {
    return error(res, "Movimiento no encontrado", 404);
  }

  // SOLO campos permitidos
  const camposPermitidos = ["tipo", "monto", "fuente", "fecha_movimiento"];

  //Object.entries - crea pares clave-valor solo con campos permitidos 
  //Object.fromEntries - vuelve a convertir esos pares en un objeto con solo los campos válidos
  const datosActualizados = Object.fromEntries(
    Object.entries(req.body).filter(([key]) =>
      camposPermitidos.includes(key)
    )
  );

  // validar datos filtrados
  const errorMsg = validarMovimiento(datosActualizados, false);
  if (errorMsg) {
    return error(res, errorMsg, 400);
  }

  // actualizar mezclando datos
  movimientos[index] = {
    ...movimientos[index],
    ...datosActualizados
  };

  return success(res, movimientos[index], "Movimiento actualizado");
};