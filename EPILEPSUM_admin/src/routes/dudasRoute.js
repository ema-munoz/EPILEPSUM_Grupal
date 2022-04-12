const express = require('express');

const routes = express.Router() 

const {Ingreso} = require("../lib/auth");

const {mostrar, agregar, lista, traerDatos, editar, eliminar, mostrarRespuestas, agregarRespuestas, listaRespuestas, eliminarRespuestas, traerRespuestas, editarRespuestas, traerPreguntas} = require("../Controllers/dudasController");

routes.use (Ingreso)

routes.get ("/preguntas/agregar/:id", Ingreso, mostrar)

routes.post ("/preguntas/agregar/:id", Ingreso, agregar)

routes.get ("/preguntas/lista/:id", Ingreso, lista)

routes.get ("/preguntas/editar/:id", Ingreso, traerPreguntas)

routes.post ("/preguntas/editar/:id", Ingreso, editar)

routes.get ("/preguntas/eliminar/:id", Ingreso, eliminar)


routes.get ("/respuestas/agregar/:id", Ingreso, mostrarRespuestas)

routes.post ("/respuestas/agregar/:id", Ingreso, agregarRespuestas)

routes.get ("/respuestas/lista/:id", Ingreso, listaRespuestas)

routes.get ("/respuestas/editar/:id", Ingreso, traerRespuestas)

routes.post ("/respuestas/editar/:id", Ingreso, editarRespuestas)

routes.get ("/respuestas/eliminar/:id", Ingreso, eliminarRespuestas)

module.exports = routes
