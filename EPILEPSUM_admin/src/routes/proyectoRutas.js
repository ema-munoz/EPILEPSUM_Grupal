const express = require('express');
const rutas = express.Router()

const { enseñar, dirigir, lista, traer, actualizar, eliminar } = require('../controllers/proyectoControllers')

rutas.get('/agregar/:id', enseñar)
rutas.post('/agregar/:id', dirigir)
rutas.get('/lista/:id', lista)
rutas.get('/editar/:id', traer)
rutas.post('/editar/:id', actualizar)
rutas.get('/eliminar/:id', eliminar)

module.exports = rutas