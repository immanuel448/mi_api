// Este archivo define las rutas HTTP relacionadas con "movimientos".
// Aquí solo se declaran endpoints y se conectan con sus funciones controlador.
// No contiene lógica de negocio, solo enruta requests → controllers.

const express = require('express'); // Importa Express
const router = express.Router(); // Crea un enrutador independiente (mini app de rutas)

// Importa el controlador donde está la lógica real de cada endpoint
const movimientosController = require('../controllers/movimientos.controller');

// ---------- ENDPOINTS ----------

// GET /movimientos
// Obtiene todos los movimientos
router.get('/', movimientosController.obtenerMovimientos);

// GET /movimientos/:id
// Obtiene un movimiento específico por id
router.get('/:id', movimientosController.obtenerMovimientoPorId);

// POST /movimientos
// Crea un nuevo movimiento
router.post('/', movimientosController.crearMovimiento);

// PUT /movimientos/:id
// Actualiza un movimiento existente
router.put('/:id', movimientosController.actualizarMovimiento);

// DELETE /movimientos/:id
// Elimina un movimiento
router.delete('/:id', movimientosController.eliminarMovimiento);

// Exporta el router para que app.js lo pueda usar con app.use()
module.exports = router;