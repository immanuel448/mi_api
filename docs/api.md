API Movimientos

API REST para gestionar movimientos financieros (ingresos y egresos).

Base URL
http://localhost:3000/api

Endpoints
Crear movimiento

POST /movimientos

Body
{
  "tipo": "ingreso",
  "monto": 1500,
  "fuente": "salario",
  "fecha_movimiento": "2026-02-24"
}
Response 201
{
  "success": true,
  "data": {
    "id": 1,
    "tipo": "ingreso",
    "monto": 1500,
    "fuente": "salario",
    "fecha_movimiento": "2026-02-24",
    "created_at": "2026-02-24T18:00:00.000Z"
  },
  "message": "Movimiento creado"
}
Obtener todos los movimientos

GET /movimientos

Response 201
{
  "success": true,
  "data": [],
  "message": "Lista de movimientos"
}
Obtener movimiento por ID

GET /movimientos/:id

Response 201
{
  "success": true,
  "data": {},
  "message": "Movimiento encontrado"
}
Actualizar movimiento

PUT /movimientos/:id

Body (campos opcionales)
{
  "tipo": "egreso",
  "monto": 500
}
Response 201
{
  "success": true,
  "data": {},
  "message": "Movimiento actualizado"
}
Eliminar movimiento

DELETE /movimientos/:id

Response 201
{
  "success": true,
  "data": null,
  "message": "Movimiento eliminado"
}
Modelo Movimiento
{
  "id": number,
  "tipo": "ingreso | egreso",
  "monto": number,
  "fuente": string,
  "fecha_movimiento": date,
  "created_at": date
}
Respuestas de error
Ejemplo
{
  "success": false,
  "data": null,
  "message": "Monto inválido"
}
Cómo ejecutar el proyecto
npm install
npm run dev
Testing recomendado

Puedes probar la API con:

Thunder Client (VS Code)

Postman

cURL

