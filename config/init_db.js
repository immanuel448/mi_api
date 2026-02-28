const pool = require('./db');

const init = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS movimientos (
      id SERIAL PRIMARY KEY,
      tipo VARCHAR(20) NOT NULL,
      monto NUMERIC(10,2) NOT NULL,
      fuente VARCHAR(100),
      fecha_movimiento DATE,
      fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO movimientos (tipo, monto, fuente, fecha_movimiento)
    VALUES
    ('ingreso', 1500, 'salario', '2026-02-20'),
    ('egreso', 350.50, 'supermercado', '2026-02-21')
    ON CONFLICT DO NOTHING;
  `);
  console.log('Tabla inicializada con datos de prueba ✅');
  process.exit();
};

init().catch(err => {
  console.error(err);
  process.exit(1);
});