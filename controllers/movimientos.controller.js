// Este archivo es el controlador de "movimientos".
// Contiene la lógica de negocio de cada endpoint (CRUD).
// Usa un arreglo en memoria como base de datos temporal
// y funciones helper para enviar respuestas estándar.

const pool = require("../config/db");

// Importa funciones helper para respuestas JSON estandarizadas
const { success, error } = require("../utils/response");

// ---------- VALIDADOR ----------
// Valida datos antes de crear o actualizar un movimiento
const validarMovimiento = (data, esCreacion = true) => {
  if (!data || typeof data !== "object") {
    // eeeee valida body válido
    return "Body inválido";
  }

  const { tipo, monto, fuente, fecha_movimiento } = data;
  // Si es creación, todos los campos son obligatorios
  if (esCreacion) {
    if (!tipo || monto === undefined || !fuente || !fecha_movimiento) {
      // eeeee monto puede ser 0
      return "Faltan datos obligatorios";
    }
  }

  // Valida tipo permitido
  if (tipo && !["ingreso", "egreso"].includes(tipo)) {
    return "Tipo inválido";
  }

  if (monto !== undefined) {
    // eeeee valida aunque sea 0
    const montoNum = Number(monto); // eeeee fuerza número
    if (isNaN(montoNum) || montoNum <= 0) {
      return "Monto inválido";
    }
  }

  if (fecha_movimiento && isNaN(Date.parse(fecha_movimiento))) {
    // eeeee valida fecha real
    return "Fecha inválida";
  }

  return null;
};

// ---------- GET TODOS ----------
// Devuelve todos los movimientos
exports.obtenerMovimientos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movimientos ORDER BY id");
    return success(res, result.rows);
  } catch (err) {
    console.error(err);
    return error(res, "Error al obtener movimientos", 500);
  }
};

// ---------- GET POR ID ----------
// Busca un movimiento específico
exports.obtenerMovimientoPorId = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return error(res, "ID inválido", 400);
  }

  try {
    const result = await pool.query("SELECT * FROM movimientos WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return error(res, "Movimiento no encontrado", 404);
    }

    return success(res, result.rows[0]);
  } catch (err) {
    console.error(err);
    return error(res, "Error al obtener movimiento", 500);
  }
};

// ---------- POST ----------
// Crea un movimiento nuevo
exports.crearMovimiento = async (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return error(res, "Body inválido", 400);
  }

  const errorMsg = validarMovimiento(req.body, true);
  if (errorMsg) {
    return error(res, errorMsg, 400);
  }

  const { tipo, monto, fuente, fecha_movimiento } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO movimientos (tipo, monto, fuente, fecha_movimiento, fecha_registro)
       VALUES ($1, $2, $3, $4, CURRENT_DATE)
       RETURNING *`,
      [tipo, Number(monto), fuente, fecha_movimiento],
    );

    return success(res, result.rows[0], "Movimiento creado", 201);
  } catch (err) {
    console.error(err);
    return error(res, "Error al crear movimiento", 500);
  }
};

// ---------- DELETE ----------
// Elimina un movimiento por id
exports.eliminarMovimiento = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return error(res, "ID inválido", 400);

  try {
    const result = await pool.query(
      "DELETE FROM movimientos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return error(res, "Movimiento no encontrado", 404);
    }

    return success(res, null, "Movimiento eliminado");

  } catch (err) {
    console.error(err);
    return error(res, "Error al eliminar movimiento", 500);
  }
};

// ---------- PUT ----------
// Actualiza un movimiento por id
exports.actualizarMovimiento = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return error(res, "ID inválido", 400);

  const { tipo, monto, fuente, fecha_movimiento } = req.body;

  const errorMsg = validarMovimiento(req.body, false);
  if (errorMsg) return error(res, errorMsg, 400);

  try {
    const result = await pool.query(
      `UPDATE movimientos
       SET tipo = COALESCE($1, tipo),
           monto = COALESCE($2, monto),
           fuente = COALESCE($3, fuente),
           fecha_movimiento = COALESCE($4, fecha_movimiento)
       WHERE id = $5
       RETURNING *`,
      [tipo, monto, fuente, fecha_movimiento, id],
    );

    if (result.rows.length === 0) {
      return error(res, "Movimiento no encontrado", 404);
    }

    return success(res, result.rows[0], "Movimiento actualizado");

  } catch (err) {
    console.error(err);
    return error(res, "Error al actualizar movimiento", 500);
  }
};
