const express = require('express');
const router = express.Router();

const movimientosController = require('../controllers/movimientos.controller');

router.get('/', movimientosController.obtenerMovimientos);
router.post('/', movimientosController.crearMovimiento);
router.put('/:id', movimientosController.actualizarMovimiento);
router.delete('/:id', movimientosController.eliminarMovimiento);

module.exports = router;