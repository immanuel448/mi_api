const express = require('express');
const router = express.Router();

const movimientosController = require('../controllers/movimientos.controller');

router.get('/', movimientosController.obtenerMovimientos);

module.exports = router;