const express = require('express');
const rutas = express.Router()

const { lista, actualizar, eliminar } = require('../controllers/projectControllers')

rutas.get('/agregar/', enseñar)
rutas.post('/agregar/', dirigir)
rutas.get('/lista/id', lista)
rutas.get('/editar/id', traer)
rutas.post('/editar/id', actualizar)
rutas.get('/elliminar:id', eliminar)

module.exports = rutas